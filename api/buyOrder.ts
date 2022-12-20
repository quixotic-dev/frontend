import { toast } from "react-toastify";
import { siteConfig } from "../shared/config";

export const postSeaportBuyOrder = async (order, orderHash) => {
  const url = `${siteConfig.BACKEND_URL}/api/buyorder/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ order, orderHash }),
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    const json = await res.json();
    if (json && json.error) {
      toast.error(`Error: ${json.error}`);
    } else {
      toast.error("There was an error completing this transaction");
    }
    return null;
  }
};

export const fetchBuyOrder = async (buyOrderId) => {
  const url = `${siteConfig.BACKEND_URL}/api/buyorder/${buyOrderId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    toast.error("There was an error completing this transaction");
    return null;
  }
};

export const fetchBuyOrders = async (collectionAddress, tokenId) => {
  const url = `${siteConfig.BACKEND_URL}/api/buyorder/get-buy-orders-for-token/?token=${collectionAddress}:${tokenId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    toast.error("There was an error completing this transaction");
    return null;
  }
};
