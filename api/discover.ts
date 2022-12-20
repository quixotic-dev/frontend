import fetch from "node-fetch";
import { siteConfig } from "../shared/config";

export async function fetchProfileFeed(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/feed/`;

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

export async function fetchFollowedProfiles(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/followed-profiles/`;

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

export async function fetchFollowedCollections(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/followed-collections/`;

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

export async function updateProfileFollow(
  address,
  follow_address,
  action,
  type
) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/${action}/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({
      follow_address: follow_address,
      type: type,
    }),
  });

  if (res.status < 400) {
    const responseJson = await res.json();
    return responseJson;
  } else {
    return null;
  }
}
