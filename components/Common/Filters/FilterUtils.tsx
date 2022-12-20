import router from "next/router";
import { toast } from "react-toastify";
import { fetchMoreByURL } from "../../../api/general";

export const fetchMoreCollectionFilters = async (
  collectionFilters,
  setCollectionFilters
) => {
  const moreCollections = await fetchMoreByURL(
    collectionFilters.collections.next
  );

  setCollectionFilters({
    ...collectionFilters,
    collections: moreCollections,
    moreCollections: moreCollections.next ? true : false,
    collectionResults: collectionFilters.collectionResults.concat(
      moreCollections.results
    ),
  });
};

export const updateSearchQuery = async (
  newSearchQuery,
  filters,
  setFilters
) => {
  if (filters.searchQuery != newSearchQuery) {
    setFilters({ ...filters, searchQuery: newSearchQuery });

    router.query.query = newSearchQuery;
    router.push(router, undefined, { shallow: true, scroll: false });
  }
};

export const updateTokenSort = async (newSort, filters, setFilters) => {
  if (filters.tokenSort != newSort) {
    setFilters({ ...filters, tokenSort: newSort, searchQuery: "" });
    router.query.sort = newSort;
    router.query.query = null;
    router.push(router, undefined, { shallow: true, scroll: false });
  }
};

export const updateActivitySort = async (newSort, filters, setFilters) => {
  if (filters.activitySort != newSort) {
    if (newSort.startsWith("price") && filters.paymentToken == "all") {
      setFilters({ ...filters, activitySort: newSort, paymentToken: "ETH" });
      router.query.currency = "ETH";
      router.query.activitySort = newSort;
    } else {
      setFilters({ ...filters, activitySort: newSort });
      router.query.activitySort = newSort;
    }

    router.push(router, undefined, { shallow: true, scroll: false });
  }
};

export const updatePriceFilter = async (
  newMinPrice,
  newMaxPrice,
  newPaymentToken,
  filters,
  setFilters
) => {
  if (isNaN(newMinPrice) || isNaN(newMaxPrice)) {
    return toast.warning("Please enter a valid number");
  }

  if (newMaxPrice && Number(newMaxPrice) < Number(newMinPrice)) {
    return toast.warning("Minimum price must be less than the max price");
  }

  if (newPaymentToken == "all") {
    newPaymentToken = "ETH";
  }

  setFilters({
    ...filters,
    minPrice: newMinPrice,
    maxPrice: newMaxPrice,
    paymentToken: newPaymentToken,
    searchQuery: "",
  });

  router.query.price =
    newMinPrice || newMaxPrice
      ? (newMinPrice ? newMinPrice : 0) + (newMaxPrice && ":" + newMaxPrice)
      : null;
  router.query.currency = newPaymentToken;
  router.query.query = null;
  router.push(router, undefined, { shallow: true, scroll: false });
};

export const updatePaymentTokenFilter = async (
  newPaymentToken,
  filters,
  setFilters
) => {
  setFilters({
    ...filters,
    paymentToken: newPaymentToken,
    searchQuery: "",
  });

  router.query.currency = newPaymentToken;
  router.query.query = null;
  router.push(router, undefined, { shallow: true, scroll: false });
};

export const updateAvailability = async (
  newAvailability,
  filters,
  setFilters
) => {
  if (filters.availability != newAvailability) {
    setFilters({ ...filters, availability: newAvailability, searchQuery: "" });

    router.query.availability = newAvailability;
    router.query.query = null;
    router.push(router, undefined, { shallow: true, scroll: false });
  }
};

export const updateCollections = async (
  addCollection,
  collectionId,
  filters,
  setFilters
) => {
  let newCollections;

  if (addCollection) {
    newCollections = filters.collections.concat(collectionId);
  } else {
    const index = filters.collections.findIndex((e) => e == collectionId);

    if (index > -1) {
      newCollections = [
        ...filters.collections.slice(0, index),
        ...filters.collections.slice(index + 1),
      ];
    } else {
      newCollections = [...filters.collections];
    }
  }

  setFilters({ ...filters, collections: newCollections });
  router.query.collections = newCollections
    .map((f) => `collection=${f}`)
    .join("&");
  router.push(router, undefined, { shallow: true, scroll: false });
};

export const updateAttributes = async (
  addAttribute,
  attribute,
  filters,
  setFilters
) => {
  let newAttributes;

  if (addAttribute) {
    newAttributes = await filters.attributes.concat(attribute);
  } else {
    const index = await filters.attributes.findIndex(
      (e) =>
        e.trait_type === attribute.trait_type &&
        e.value[0] === attribute.value[0]
    );

    if (index > -1) {
      newAttributes = [
        ...filters.attributes.slice(0, index),
        ...filters.attributes.slice(index + 1),
      ];
    } else {
      newAttributes = [...filters.attributes];
    }
  }

  setFilters({
    ...filters,
    attributes: newAttributes,
    searchQuery: "",
  });
  setFilters({
    ...filters,
    attributes: newAttributes,
  });

  router.query.attributes = newAttributes
    .map((f) => `attribute=${f.trait_type}:${f.value}`)
    .join("&");
  router.query.query = null;
  router.push(router, undefined, { shallow: true, scroll: false });
};

export const updateAttributeIntersect = async (
  intersect,
  filters,
  setFilters
) => {
  setFilters({
    ...filters,
    intersectAttributes: intersect,
    searchQuery: "",
  });

  router.query.intersect_attributes = intersect;
  router.query.query = null;
  router.push(router, undefined, { shallow: true, scroll: false });
};

export const updateEventTypes = async (
  addEventType,
  eventType,
  filters,
  setFilters
) => {
  let newEventTypes;

  if (addEventType) {
    newEventTypes = filters.eventTypes.concat(eventType);
  } else {
    const index = filters.eventTypes.findIndex((e) => e == eventType);

    if (index > -1) {
      newEventTypes = [
        ...filters.eventTypes.slice(0, index),
        ...filters.eventTypes.slice(index + 1),
      ];
    } else {
      newEventTypes = [...filters.eventTypes];
    }
  }

  setFilters({
    ...filters,
    eventTypes: newEventTypes,
  });

  router.query.eventTypes = newEventTypes.map((f) => `event=${f}`).join("&");
  router.push(router, undefined, { shallow: true, scroll: false });
};

export const updateChains = async (addChain, chain, filters, setFilters) => {
  let newChains;

  if (addChain) {
    newChains = filters.chains.concat(chain);
  } else {
    const index = filters.chains.findIndex((e) => e == chain);

    if (index > -1) {
      newChains = [
        ...filters.chains.slice(0, index),
        ...filters.chains.slice(index + 1),
      ];
    } else {
      newChains = [...filters.chains];
    }
  }

  setFilters({
    ...filters,
    chains: newChains,
  });

  router.query.chains = newChains.map((f) => `chain=${f}`).join("&");
  router.push(router, undefined, { shallow: true, scroll: false });
};
