import fetch from "node-fetch";
import { toast } from "react-toastify";
import { siteConfig } from "../shared/config";

export async function fetchTokenMetadata(address, token_id, layer) {
  const url = `${siteConfig.BACKEND_URL}/api/token-metadata/${address}:${token_id}/?layer=${layer}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    const responseJson = await res.json();
    return responseJson;
  } else {
    return null;
  }
}

export async function fetchL1Token(l2address) {
  const url = `${siteConfig.BACKEND_URL}/api/erc721bridge/get-l1-address/?l2Address=${l2address}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    const responseJson = await res.json();
    return responseJson;
  } else {
    return null;
  }
}

export async function fetchL2Token(l1address) {
  const url = `${siteConfig.BACKEND_URL}/api/erc721bridge/get-l2-address/?l1Address=${l1address}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    const responseJson = await res.json();
    return responseJson;
  } else {
    return null;
  }
}

export async function initiateL1Contract(l1address) {
  const url = `${siteConfig.BACKEND_URL}/api/erc721bridge/initiate-contract/?l1Address=${l1address}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  return res.status;
}
