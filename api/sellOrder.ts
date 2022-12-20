import { toast } from "react-toastify";
import { siteConfig } from "../shared/config";

export const postSeaportSellOrder = async (order, orderHash) => {
  const url = `${siteConfig.BACKEND_URL}/api/sellorder/`;
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
    toast.error("There was an error completing this transaction");
    return null;
  }
};

export const fetchSellOrderTimestamps = async (duration) => {
  const url = `${siteConfig.BACKEND_URL}/api/sellorder/get-timestamps/?duration=${duration}`;
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
    toast.error(
      "The current block is cancelled, please try again in a few minutes"
    );
    return null;
  }
};

export const fetchSellOrder = async (orderId) => {
  const url = `${siteConfig.BACKEND_URL}/api/sellorder/${orderId}/`;
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

export const fetchSellOrders = async (
  collectionAddress,
  tokenId,
  sellerAddress
) => {
  const url = `${siteConfig.BACKEND_URL}/api/sellorder/?collectionAddress=${collectionAddress}&tokenId=${tokenId}&sellerAddress=${sellerAddress}`;
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
