import { ethers } from "ethers";
import fetch from "node-fetch";
import { toast } from "react-toastify";
import { activityEventRegistry } from "../components/Common/Utils";
import { createCollectionDetailsSignature } from "../utils/signatureUtils";
import { siteConfig } from "../shared/config";

export async function fetchCollection(address, networkId = null) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/${
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

export async function fetchAllCollections() {
  const url = `${siteConfig.BACKEND_URL}/api/collection/`;

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

export async function fetchExploreCollections() {
  const url = `${siteConfig.BACKEND_URL}/api/collection/explore/`;

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

export async function fetchLaunchpadCollections() {
  const url = `${siteConfig.BACKEND_URL}/api/collection/launchpad/`;

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

export async function fetchCollectionTokens(address) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/tokens/`;

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
export async function fetchCollectionFilteredTokens(
  address,
  attributes,
  intersectAttributes,
  availability,
  sort,
  minPrice,
  maxPrice,
  paymentToken,
  chains,
  searchQuery
) {
  const attributes_string = attributes
    .map(
      (attribute) =>
        `attribute=${encodeURIComponent(
          attribute.trait_type
        )}:${encodeURIComponent(attribute.value)}`
    )
    .join("&");
  const chains_string =
    "&" + chains.map((chain) => `chain=${encodeURIComponent(chain)}`).join("&");
  const intersect_attributes_string = intersectAttributes
    ? "&intersect_attributes=true"
    : "";
  const availability_string = "&availability=" + availability;
  const sort_string = "&sort=" + sort;
  const price_string =
    minPrice || maxPrice
      ? "&price=" +
        (minPrice ? ethers.utils.parseUnits(minPrice, "gwei") : 0) +
        (maxPrice && ":" + ethers.utils.parseUnits(maxPrice, "gwei"))
      : "";
  const currency_string = paymentToken ? "&currency=" + paymentToken : "";
  const query_string = "&query=" + searchQuery;

  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/tokens/?${attributes_string}${chains_string}${intersect_attributes_string}${availability_string}${sort_string}${price_string}${query_string}${currency_string}`;

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

export async function fetchCollectionActivity(address) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/activity/`;

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
export async function fetchCollectionFilteredActivity(
  address,
  sort,
  events,
  attributes,
  intersectAttributes,
  minPrice,
  maxPrice,
  paymentToken,
  chains
) {
  const sort_string = "&activity_sort=" + sort;
  const events_string = events
    .map((event) => `event=${encodeURIComponent(activityEventRegistry[event])}`)
    .join("&");
  const chains_string =
    "&" + chains.map((chain) => `chain=${encodeURIComponent(chain)}`).join("&");
  const attributes_string =
    "&" +
    attributes
      .map(
        (attribute) =>
          `attribute=${encodeURIComponent(
            attribute.trait_type
          )}:${encodeURIComponent(attribute.value)}`
      )
      .join("&");
  const intersect_attributes_string = intersectAttributes
    ? "&intersect_attributes=true"
    : "";
  const price_string =
    minPrice || maxPrice
      ? "&price=" +
        (minPrice ? ethers.utils.parseUnits(minPrice, "gwei") : 0) +
        (maxPrice && ":" + ethers.utils.parseUnits(maxPrice, "gwei"))
      : "";
  const currency_string = paymentToken ? "&currency=" + paymentToken : "";

  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/activity/?${events_string}${chains_string}${sort_string}${attributes_string}${intersect_attributes_string}${price_string}${currency_string}`;

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

export async function fetchCollectionAttributes(address) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/attributes/`;

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

export async function fetchCollectionSettings(address, networkId = null) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/settings/${
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

export async function fetchCollectionDailyStats(address) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/daily-stats/`;

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

export async function updateCollectionRoyalties(
  handle: string,
  form: FormData
) {
  const postUrl = `${siteConfig.BACKEND_URL}/api/collection/${handle}/update-collection-royalties/`;

  const { message, signature } = await createCollectionDetailsSignature();
  form.append("message", message);
  form.append("signature", signature);

  const res = await fetch(postUrl, {
    method: "POST",
    headers: {
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: form,
  });

  if (res.status < 400) {
    toast.success("Successfully saved changes");
    return res.status;
  } else {
    try {
      const responseJson = await res.json();
      if (responseJson.error) {
        toast.error(`Error: ${responseJson.error}`);
      } else {
        toast.error("Error saving changes, please try again later");
        return res.status;
      }
    } catch {
      toast.error("Error saving changes, please try again later");
      return res.status;
    }
  }
}

export async function updateCollectionSettings(handle: string, form: FormData) {
  const postUrl = `${siteConfig.BACKEND_URL}/api/collection/${handle}/update-collection-settings/`;

  const { message, signature } = await createCollectionDetailsSignature();
  form.append("message", message);
  form.append("signature", signature);

  const res = await fetch(postUrl, {
    method: "POST",
    headers: {
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: form,
  });

  if (res.status < 400) {
    toast.success("Successfully saved changes");
    return res.status;
  } else {
    try {
      const responseJson = await res.json();
      if (responseJson.error) {
        toast.error(`Error: ${responseJson.error}`);
      } else {
        toast.error("Error saving changes, please try again later");
        return res.status;
      }
    } catch {
      toast.error("Error saving changes, please try again later");
      return res.status;
    }
  }
}

export async function fetchCollectionWithRefreshedCampaign(address) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/${address}/refresh-campaign/`;

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
