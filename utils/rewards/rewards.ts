import { ethers } from "ethers";
import { toast } from "react-toastify";
import { fetchSellOrder } from "../../api/sellOrder";
import { siteConfig } from "../../shared/config";
import { assertOptimism } from "../exchange/exchange";
import { getSigner } from "../wallet";
import { campaignTrackerABI } from "./campaignTrackerABI";
import { rewardDeriverABI } from "./rewardDeriverABI";

const getCollectionBoostCampaignId = (collectionAddress) => {
  return `COLLECTION_BOOST_${collectionAddress.toLowerCase()}`;
};

export const toggleCampaign = async (collectionAddress) => {
  await assertOptimism();

  const signer = await getSigner();
  const contract = new ethers.Contract(
    siteConfig.CAMPAIGN_TRACKER_ADDRESS,
    campaignTrackerABI,
    signer
  );
  const formattedCollectionAddress =
    getCollectionBoostCampaignId(collectionAddress);

  try {
    const txn = await contract.toggleRewardsForCampaign(
      formattedCollectionAddress
    );
    return txn.hash;
  } catch (error) {
    toast.error("There was an error toggling the rewards campaign");
    return null;
  }
};

export const getRewardBreakdown = async (orderId, recipient) => {
  const sellOrder = await fetchSellOrder(orderId);
  const order = JSON.parse(sellOrder.order_json);

  const signer = await getSigner();
  const contract = new ethers.Contract(
    siteConfig.REWARDS_DERIVER,
    rewardDeriverABI,
    signer
  );
  const rewards = await contract.getRewardInOP(order, recipient);
  return rewards;
};

export const getRewardBreakdownMultipleOrders = async (
  orderIds: [],
  recipient
) => {
  let orders = [];
  for (const orderId of orderIds) {
    const sellOrder = await fetchSellOrder(orderId);
    const order = JSON.parse(sellOrder.order_json);
    orders.push({ order: order });
  }

  const signer = await getSigner();
  const contract = new ethers.Contract(
    siteConfig.REWARDS_DERIVER,
    rewardDeriverABI,
    signer
  );

  let rewards = [];
  for (const orderObj of orders) {
    rewards.push(await contract.getRewardInOP(orderObj.order, recipient));
  }

  const map = {};
  for (const i1 in rewards) {
    for (const i2 in rewards[i1]) {
      const rewardType = rewards[i1][i2][0];
      const rewardValue = Number(rewards[i1][i2][1].toString());
      if (map[rewardType]) {
        map[rewardType] += rewardValue;
      } else {
        map[rewardType] = rewardValue;
      }
    }
  }
  rewards = Object.keys(map).map((key) => [key, map[key]]);
  return rewards;
};
