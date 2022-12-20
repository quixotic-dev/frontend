import { ethers } from "ethers";
import { siteConfig } from "../shared/config";

export async function fetchTokens() {
  const url = `${siteConfig.BACKEND_URL}/api/token/`;

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

let tokensController = null;
export async function fetchFilteredTokens(
  collections,
  availability,
  sort,
  minPrice,
  maxPrice,
  paymentToken
) {
  const collections_string = collections
    .map((collection) => `collection=${collection}`)
    .join("&");
  const availability_string = "&availability=" + availability;
  const sort_string = "&sort=" + sort;
  const price_string =
    minPrice || maxPrice
      ? "&price=" +
        (minPrice ? ethers.utils.parseUnits(minPrice, "gwei") : 0) +
        (maxPrice && ":" + ethers.utils.parseUnits(maxPrice, "gwei"))
      : "";
  const currency_string = paymentToken ? "&currency=" + paymentToken : "";

  const url = `${siteConfig.BACKEND_URL}/api/token/?${collections_string}${availability_string}${sort_string}${price_string}${currency_string}`;

  if (tokensController) tokensController.abort();
  tokensController = new AbortController();
  const signal = tokensController.signal;

  try {
    const res = await fetch(url, {
      signal,
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
  } catch (error) {
    return null;
  }
}

export async function fetchToken(address, tokenId, networkId = null) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/${
    networkId ? `?network=${networkId}` : ""
  }`;

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

export async function fetchTokenActivity(address, tokenId) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/activity/`;

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

export async function fetchErc1155TokenOwners(address, tokenId) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/owners/`;

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

export async function fetchErc1155TokenOwnedQuantity(
  address,
  tokenId,
  profileAddress
) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/owners/?address=${profileAddress}`;
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
    return { quantity: 0, listed: 0 };
  }
}

export async function fetchRelatedTokens(address, tokenId) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/more-from-collection/`;

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

export async function queueRefreshToken(address, tokenId) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/queue-refresh/`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  // if (res.status < 400) {
  //   const responseJson = await res.json();
  //   return responseJson;
  // } else {
  //   return null;
  // }
}

export async function refreshToken(address, tokenId) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/refresh-token/`;

  const res = await fetch(url, {
    method: "PUT",
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

export async function refreshTokenOrders(address, tokenId) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/refresh-orders/`;

  const res = await fetch(url, {
    method: "PUT",
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

// export async function refreshTokenMetadata(address, tokenId) {
//   const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/refresh-metadata/`;

//   const res = await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
//     },
//   });

//   if (res.status < 400) {
//     const responseJson = await res.json();
//     return responseJson;
//   } else {
//     return null;
//   }
// }

export async function likeToken(address, tokenId, profileAddress) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/like-token/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ profile_address: profileAddress }),
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    return null;
  }
}

export async function unlikeToken(address, tokenId, profileAddress) {
  const url = `${siteConfig.BACKEND_URL}/api/token/${address}:${tokenId}/unlike-token/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ profile_address: profileAddress }),
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    return null;
  }
}
