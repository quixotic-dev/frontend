import { Seaport } from "@opensea/seaport-js";
import { OrderWithCounter } from "@opensea/seaport-js/lib/types";
import { executeAllActions } from "@opensea/seaport-js/lib/utils/usecase";
import { BigNumber } from "ethers";
import { fetchBuyOrder, postSeaportBuyOrder } from "../../api/buyOrder";
import { fetchSellOrderTimestamps } from "../../api/sellOrder";
import { siteConfig } from "../../shared/config";
import { MARKETPLACE_FEE, MARKETPLACE_PAYOUT_ADDRESS } from "../constants";
import { handleError } from "../errors";
import { getSigner } from "../wallet";

const PAUSABLE_ZONE_ADDRESS = siteConfig.PAUSABLE_ZONE;
const SEAPORT_ADDRESS = siteConfig.EXCHANGE_V6;

export const createSeaportBuyOrder = async ({
  buyer,
  contractAddress,
  tokenId,
  duration,
  price,
  collectionRoyaltyPerMille,
  collectionRoyaltyPayoutAddress,
  paymentToken,
  nftItemType,
}) => {
  try {
    const { startTime, endTime } = await fetchSellOrderTimestamps(duration);

    const signer = await getSigner();
    const seaport = new Seaport(signer, {
      overrides: { contractAddress: SEAPORT_ADDRESS },
    });

    const marketplaceFee = price.div(1 / MARKETPLACE_FEE);

    let royaltyFee = BigNumber.from(0);
    if (collectionRoyaltyPerMille) {
      const priceGwei = price.div(10 ** 9).toNumber();
      const royaltyFeeGwei = Math.round(
        priceGwei * (collectionRoyaltyPerMille / 1000)
      );
      royaltyFee = BigNumber.from(royaltyFeeGwei).mul(10 ** 9);
    }

    const offer = [
      {
        amount: price.toString(),
        token: paymentToken.address,
      },
    ];

    let consideration = [
      {
        itemType: nftItemType,
        token: contractAddress,
        identifier: tokenId,
        recipient: buyer,
      },
      {
        amount: marketplaceFee.toString(),
        token: paymentToken.address,
        recipient: MARKETPLACE_PAYOUT_ADDRESS,
      },
    ];

    if (collectionRoyaltyPerMille) {
      consideration = [
        ...consideration,
        {
          amount: royaltyFee.toString(),
          recipient: collectionRoyaltyPayoutAddress,
          token: paymentToken.address,
        },
      ];
    }

    const orderParams = {
      offer,
      consideration,
      offerer: buyer,
      zone: PAUSABLE_ZONE_ADDRESS,
      restrictedByZone: true,
      startTime,
      endTime,
    };

    // @ts-ignore
    const { actions } = await seaport.createOrder(orderParams);
    const filteredActions = actions.filter((o) => o.type != "approval");

    // @ts-ignore
    let order = (await executeAllActions(filteredActions)) as OrderWithCounter;
    const orderHash = seaport.getOrderHash(order.parameters);
    const buyOrder = await postSeaportBuyOrder(order, orderHash);

    return buyOrder;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const fillSeaportBuyOrder = async (orderId) => {
  const buyOrder = await fetchBuyOrder(orderId);
  const order = JSON.parse(buyOrder.order_json);
  const signer = await getSigner();
  const seaport = new Seaport(signer, {
    overrides: { contractAddress: SEAPORT_ADDRESS },
  });

  const address = await signer.getAddress();

  try {
    const { executeAllActions: executeAllFulfillActions } =
      await seaport.fulfillOrder({
        order,
        accountAddress: address,
      });

    const transaction = await executeAllFulfillActions();
    return transaction;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const sendCancelSeaportBuyOrder = async (orderId) => {
  const buyOrders = await fetchBuyOrder(orderId);
  const order = JSON.parse(buyOrders.order_json).parameters;
  const signer = await getSigner();
  const seaport = new Seaport(signer, {
    overrides: { contractAddress: SEAPORT_ADDRESS },
  });

  try {
    const res = await seaport.cancelOrders([order]).transact();
    return res;
  } catch (error) {
    handleError(error);
    return null;
  }
};
