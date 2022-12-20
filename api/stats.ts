import fetch from "node-fetch";
import { siteConfig } from "../shared/config";

let statsController = null;
export async function fetchMarketplaceStats(sort, range, first = null) {
  const url = `${siteConfig.BACKEND_URL}/api/collection/stats/?&sort=${sort}&range=${range}`;

  if (first) {
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
  } else {
    if (statsController) statsController.abort();
    statsController = new AbortController();
    const signal = statsController.signal;

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
}
