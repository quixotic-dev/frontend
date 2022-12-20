import { ethers } from "ethers";
import fetch from "node-fetch";
import { activityEventRegistry } from "../components/Common/Utils";
import { siteConfig } from "../shared/config";

export async function fetchActivity() {
  const url = `${siteConfig.BACKEND_URL}/api/activity/`;

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
export async function fetchFilteredActivity(
  sort,
  collections,
  events,
  minPrice,
  maxPrice,
  paymentToken
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
  const currency_string = paymentToken ? "&currency=" + paymentToken : "";

  const url = `${siteConfig.BACKEND_URL}/api/activity/?${collections_string}${sort_string}${events_string}${price_string}${currency_string}`;

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
