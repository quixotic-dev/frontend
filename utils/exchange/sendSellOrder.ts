import { Seaport } from "@opensea/seaport-js";
import {
  BasicErc721Item,
  OrderWithCounter,
} from "@opensea/seaport-js/lib/types";
import { executeAllActions } from "@opensea/seaport-js/lib/utils/usecase";
import { BigNumber } from "ethers";
import {
  fetchSellOrder,
  fetchSellOrders,
  fetchSellOrderTimestamps,
  postSeaportSellOrder,
} from "../../api/sellOrder";
import { siteConfig } from "../../shared/config";
import { MARKETPLACE_FEE, MARKETPLACE_PAYOUT_ADDRESS } from "../constants";
import { handleError } from "../errors";
import { rewardsWrapperABI } from "../rewards/seaportWrapperABI";
import { getSigner } from "../wallet";
import { createContract } from "./exchange";

const PAUSABLE_ZONE_ADDRESS = siteConfig.PAUSABLE_ZONE;
const SEAPORT_ADDRESS = siteConfig.EXCHANGE_V6;
const REWARDS_ADDRESS = siteConfig.REWARDS_WRAPPER;

export const createSeaportSellOrder = async ({
  seller,
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

    const proceeds = price.sub(marketplaceFee.add(royaltyFee));

    let consideration = [
      {
        amount: marketplaceFee.toString(),
        recipient: MARKETPLACE_PAYOUT_ADDRESS,
        token: paymentToken.address,
      },
      {
        amount: proceeds.toString(),
        recipient: seller,
        token: paymentToken.address,
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

    const offer = [
      {
        itemType: nftItemType,
        token: contractAddress,
        identifier: tokenId,
      } as BasicErc721Item,
    ];

    const orderParams = {
      offer,
      consideration,
      offerer: seller,
      zone: PAUSABLE_ZONE_ADDRESS,
      restrictedByZone: true,
      startTime,
      endTime,
    };

    const { actions } = await seaport.createOrder(orderParams);
    const filteredActions = actions.filter((o) => o.type != "approval");

    // @ts-ignore
    let order = (await executeAllActions(filteredActions)) as OrderWithCounter;
    const orderHash = seaport.getOrderHash(order.parameters);
    const sellOrder = await postSeaportSellOrder(order, orderHash);

    return sellOrder;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const fillSeaportSellOrder = async (orderId) => {
  const sellOrder = await fetchSellOrder(orderId);
  const order = JSON.parse(sellOrder.order_json);
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

export const fillSeaportRewardsSellOrder = async (orderId) => {
  const sellOrder = await fetchSellOrder(orderId);
  const order = JSON.parse(sellOrder.order_json);

  try {
    const contract = await createContract(REWARDS_ADDRESS, rewardsWrapperABI);
    const overrides = {
      value: order.parameters.consideration
        .map((e) => BigNumber.from(e.startAmount))
        .reduce((a, b) => a.add(b))
        .toString(),
    };
    const transaction = await contract.fulfillOrder(order, overrides);

    return transaction;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const fillSeaportSellOrders = async (orderIds: []) => {
  let orders = [];
  for (const orderId of orderIds) {
    const sellOrder = await fetchSellOrder(orderId);
    const order = JSON.parse(sellOrder.order_json);
    orders.push({ order: order });
  }

  const signer = await getSigner();
  const address = await signer.getAddress();

  const seaport = new Seaport(signer, {
    overrides: { contractAddress: SEAPORT_ADDRESS },
  });

  try {
    const { executeAllActions: executeAllFulfillActions } =
      await seaport.fulfillOrders({
        fulfillOrderDetails: orders,
        accountAddress: address,
      });

    const transaction = await executeAllFulfillActions();
    return transaction;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const fillSeaportRewardsSellOrders = async (orderIds: []) => {
  let orders = [];
  for (const orderId of orderIds) {
    const sellOrder = await fetchSellOrder(orderId);
    const order = JSON.parse(sellOrder.order_json);
    orders.push({ order: order });
  }

  try {
    const contract = await createContract(REWARDS_ADDRESS, rewardsWrapperABI);
    let value = BigNumber.from(0);
    let orderFulfillments = [];
    let i = 0;
    let considerationFulfillments = [];
    for (const orderObj of orders) {
      value = value.add(
        orderObj.order.parameters.consideration
          .map((e) => BigNumber.from(e.startAmount))
          .reduce((a, b) => a.add(b))
      );
      orderFulfillments.push([{ orderIndex: i, itemIndex: 0 }]);
      const { totalOriginalConsiderationItems } = orderObj.order.parameters;
      // @ts-ignore
      for (let j = 0; j < totalOriginalConsiderationItems; j++) {
        considerationFulfillments.push([{ orderIndex: i, itemIndex: j }]);
      }
      i++;
    }
    const maximumFulfilled = orders.length;
    const overrides = { value };
    const formattedOrders = orders.map((obj) => [
      obj.order.parameters,
      obj.order.signature,
    ]);
    const transaction = await contract.fulfillAvailableOrders(
      formattedOrders,
      orderFulfillments,
      considerationFulfillments,
      maximumFulfilled,
      overrides
    );
    return transaction;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const cancelSeaportOrder = async (
  collectionAddress,
  tokenId,
  sellerAddress
) => {
  const sellOrders = await fetchSellOrders(
    collectionAddress,
    tokenId,
    sellerAddress
  );
  const orders = sellOrders.map((so) => JSON.parse(so.order_json).parameters);
  const signer = await getSigner();
  const seaport = new Seaport(signer, {
    overrides: { contractAddress: SEAPORT_ADDRESS },
  });

  try {
    const res = await seaport.cancelOrders(orders).transact();
    return res;
  } catch (error) {
    handleError(error);
    return null;
  }
};
