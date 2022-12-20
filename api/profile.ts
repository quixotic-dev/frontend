import { ethers } from "ethers";
import fetch from "node-fetch";
import { activityEventRegistry } from "../components/Common/Utils";
import { siteConfig } from "../shared/config";

export async function postProfile(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ address }),
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    return null;
  }
}

export async function fetchProfile(handle) {
  const url = `${
    siteConfig.BACKEND_URL
  }/api/profile/get-profile/?address=${encodeURIComponent(handle)}`;

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
    if (res.status == 404) {
      return postProfile(handle);
    } else {
      return null;
    }
  }
}

export async function fetchMostFollowedProfiles() {
  const url = `${siteConfig.BACKEND_URL}/api/profile/most-followed/`;

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

export async function fetchProfileBalance(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/get-balances/`;

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

export async function fetchProfileTokens(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/tokens/`;

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
let erc721TokensController = null;
let erc1155TokensController = null;
export async function fetchProfileFilteredTokens(
  address,
  collections,
  availability,
  sort,
  minPrice,
  maxPrice,
  paymentToken,
  chains,
  searchQuery,
  erc721 = false,
  erc1155 = false
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
  const chains_string =
    "&" + chains.map((chain) => `chain=${encodeURIComponent(chain)}`).join("&");
  const query_string = "&query=" + searchQuery;

  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/${
    erc721 ? "erc721tokens" : erc1155 ? "erc1155tokens" : "tokens"
  }/?${collections_string}${availability_string}${sort_string}${chains_string}${price_string}${query_string}${currency_string}`;

  let signal;
  if (erc721) {
    if (erc721TokensController) erc721TokensController.abort();
    tokensController = new AbortController();
    signal = tokensController.signal;
  } else if (erc1155) {
    if (erc1155TokensController) erc1155TokensController.abort();
    erc1155TokensController = new AbortController();
    signal = erc1155TokensController.signal;
  } else {
    if (tokensController) tokensController.abort();
    tokensController = new AbortController();
    signal = tokensController.signal;
  }

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

export async function fetchProfileActivity(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/activity/`;

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

let activityController = null;
export async function fetchProfileFilteredActivity(
  address,
  sort,
  collections,
  events,
  minPrice,
  maxPrice,
  paymentToken,
  chains
) {
  const sort_string = "&activity_sort=" + sort;
  const collections_string = collections
    .map((collection) => `collection=${collection}`)
    .join("&");
  const events_string =
    events.length > 0
      ? "&" +
        events
          .map(
            (event) =>
              `event=${encodeURIComponent(activityEventRegistry[event])}`
          )
          .join("&")
      : "";
  const price_string =
    minPrice || maxPrice
      ? "&price=" +
        (minPrice ? ethers.utils.parseUnits(minPrice, "gwei") : 0) +
        (maxPrice && ":" + ethers.utils.parseUnits(maxPrice, "gwei"))
      : "";
  const chains_string =
    "&" + chains.map((chain) => `chain=${encodeURIComponent(chain)}`).join("&");
  const currency_string = paymentToken ? "&currency=" + paymentToken : "";

  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/activity/?${collections_string}${sort_string}${events_string}${chains_string}${price_string}${currency_string}`;

  if (activityController) activityController.abort();
  activityController = new AbortController();
  const signal = activityController.signal;

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

export async function fetchProfileOwnedCollections(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/owned-collections/`;

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

export async function fetchProfileListedTokens(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/listed-tokens/`;

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

export async function fetchProfileUnlistedTokens(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/unlisted-tokens/`;

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

export async function fetchProfileOffersMade(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/offers-made/`;

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

export async function fetchProfileOffersReceived(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/offers-received/`;

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

export async function fetchProfileNotificationStatus(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/notification-status/`;

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
    return { notifications_read: true };
  }
}

export async function fetchProfileNotifications(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/notifications/`;

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

export async function fetchProfileLikedTokens(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/likes/`;

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

export async function fetchProfileHiddenTokens(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/hidden-tokens/`;

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

export async function markNotificationsRead(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/notifications-read/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });
}

export async function lookupEns(ens) {
  const url = `${
    siteConfig.BACKEND_URL
  }/api/profile/get-ens/?ens=${encodeURIComponent(ens)}`;

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

export async function fetchProfileCollections(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/collections/`;

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

export async function hideToken(profile_address, collection_address, token_id) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${profile_address}/hide-token/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ collection_address, token_id }),
  });

  if (res.status < 400) {
    return true;
  } else {
    return null;
  }
}

export async function showToken(profile_address, collection_address, token_id) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${profile_address}/show-token/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ collection_address, token_id }),
  });

  if (res.status < 400) {
    return true;
  } else {
    return null;
  }
}

export async function featureToken(
  profile_address,
  collection_address,
  token_id
) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${profile_address}/feature-token/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ collection_address, token_id }),
  });

  if (res.status < 400) {
    return true;
  } else {
    return null;
  }
}

export async function unfeatureToken(
  profile_address,
  collection_address,
  token_id
) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${profile_address}/unfeature-token/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({ collection_address, token_id }),
  });

  if (res.status < 400) {
    return true;
  } else {
    return null;
  }
}
