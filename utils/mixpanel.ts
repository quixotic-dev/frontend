import mixpanel from "mixpanel-browser";
import { addressReducer } from "../store/address";

export const initMixpanel = () => {
  if (typeof window !== "undefined") {
    mixpanel.init("d00382e5cadf4ea620a54c210b3baa97", { debug: false });
  }
};

export const setMixpanelProfile = (address) => {
  mixpanel.identify(address);
  mixpanel.people.set({ address });
};

export const assetVisited = (collectionId, assetId) => {
  initMixpanel();
  if (typeof window !== "undefined") {
    mixpanel.track("assetVisited", {
      collectionId,
      assetId,
    });
  }
};

export const visitHomePage = () => {
  initMixpanel();
  mixpanel.track("visitHomePage");
};

export const collectionVisited = (collectionId) => {
  initMixpanel();
  if (typeof window !== "undefined") {
    mixpanel.track("collectionVisited", {
      collectionId,
    });
  }
};

export const purchaseFlowStarted = (collectionId, assetId) => {
  initMixpanel();
  if (typeof window !== "undefined") {
    mixpanel.track("purchaseFlowStarted", {
      collectionId,
      assetId,
    });
  }
};

export const purchaseFlowFinished = (collectionId, assetId) => {
  initMixpanel();
  if (typeof window !== "undefined") {
    mixpanel.track("purchaseFlowFinished", {
      collectionId,
      assetId,
    });
  }
};
