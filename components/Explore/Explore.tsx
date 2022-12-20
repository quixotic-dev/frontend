import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHistory, FaImages } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchFilteredActivity } from "../../api/activity";
import { fetchMoreByURL } from "../../api/general";
import { fetchFilteredTokens } from "../../api/token";
import { CollectionCard } from "../CollectionCard/CollectionCard";
import { CollectionCardGhost } from "../CollectionCard/CollectionCardGhost";
import { CollectionCardLarge } from "../CollectionCard/CollectionCardLarge";
import { CollectionsGrid } from "../CollectionCard/styles";
import { Menu, MenuIcon, MenuItem } from "../Common/Menu/styles";
import { ExploreActivty } from "./ExploreActivity";
import { ExploreTokens } from "./ExploreTokens";
import { ContainerBackground, ContainerExtended, Title } from "./styles";

export const Explore = ({ collections, tab }) => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(tab);
  const [paramsLoaded, setParamsLoaded] = useState(false);

  const [filtersUI, setFiltersUI] = useState({
    filtersVisible: false,
    sortCollapsed: false,
    availabilityCollapsed: false,
    eventTypesCollapsed: false,
    priceCollapsed: false,
    paymentTokenCollapsed: false,
    collectionsCollapsed: false,
  });

  const [filters, setFilters] = useState({
    tokenSort: "listed_timestamp:desc",
    activitySort: "timestamp:desc",
    availability: "all",
    eventTypes: ["Sale"],
    minPrice: "",
    maxPrice: "",
    paymentToken: "all",
    collections: [],
  });

  const [collectionFilters, setCollectionFilters] = useState({
    collections: null,
    moreCollections: false,
    collectionResults: [],
  });

  const [pageState, setPageState] = useState({
    collections: collections,
    moreCollections: collections.next ? true : false,
    collectionResults: collections.results,
    tokens: null,
    moreTokens: false,
    tokenResults: [],
    tokensUpdating: false,
  });

  const [activityState, setActivityState] = useState({
    activity: null,
    moreActivity: false,
    activityResults: [],
    activityUpdating: true,
  });

  async function fetchMoreCollections() {
    const moreCollections = await fetchMoreByURL(pageState.collections.next);

    setPageState({
      ...pageState,
      collections: moreCollections,
      moreCollections: moreCollections.next ? true : false,
      collectionResults: pageState.collectionResults.concat(
        moreCollections.results
      ),
    });
  }

  const updateTokens = async () => {
    setPageState({
      ...pageState,
      tokensUpdating: true,
    });

    const updatedTokens = await fetchFilteredTokens(
      filters.collections,
      filters.availability,
      filters.tokenSort,
      filters.minPrice,
      filters.maxPrice,
      filters.paymentToken
    );

    if (updatedTokens) {
      setPageState({
        ...pageState,
        tokens: updatedTokens,
        moreTokens: updatedTokens.next ? true : false,
        tokenResults: updatedTokens.results,
        tokensUpdating: false,
      });
    }
  };

  const updateActivity = async () => {
    setActivityState({
      ...activityState,
      activityUpdating: true,
    });

    const updatedActivity = await fetchFilteredActivity(
      filters.activitySort,
      filters.collections,
      filters.eventTypes,
      filters.minPrice,
      filters.maxPrice,
      filters.paymentToken
    );

    if (updatedActivity) {
      setActivityState({
        ...activityState,
        activity: updatedActivity,
        moreActivity: updatedActivity.next ? true : false,
        activityResults: updatedActivity.results,
        activityUpdating: false,
      });
    }
  };

  const updateSelectedTab = (tab) => {
    setSelectedTab(tab);
    router.query.tab = tab;
    router.push(router, undefined, { shallow: true, scroll: false });
  };

  useEffect(() => {
    if (
      (router.query.availability ||
        router.query.sort ||
        router.query.price ||
        router.query.collections ||
        router.query.eventTypes ||
        router.query.activitySort ||
        router.query.currency) &&
      !paramsLoaded
    ) {
      const availabilityParam = router.query.availability
        ? String(router.query.availability)
        : "all";
      const sortParam = router.query.sort
        ? String(router.query.sort)
        : "expiration_timestamp:asc";
      const activitySortParam = router.query.activitySort
        ? String(router.query.activitySort)
        : "timestamp:desc";
      const priceArr = router.query.price
        ? String(router.query.price).split(":")
        : [];
      const paymentTokenParam = router.query.currency
        ? String(router.query.currency)
        : "all";

      let minPriceParam = "";
      let maxPriceParam = "";
      if (priceArr.length == 1) {
        minPriceParam = priceArr[0];
      } else if (priceArr.length == 2) {
        minPriceParam = priceArr[0];
        maxPriceParam = priceArr[1];
      }

      const collectionsParam = router.query.collections
        ? String(router.query.collections)
            .split("&collection=")
            .map((collectionId) => {
              if (collectionId != "") {
                return collectionId.replace("collection=", "");
              }
            })
            .filter(function (e) {
              return e !== undefined;
            })
        : [];
      const eventTypesParam = router.query.eventTypes
        ? String(router.query.eventTypes)
            .split("&event=")
            .map((event) => {
              if (event != "") {
                return event.replace("event=", "");
              }
            })
            .filter(function (e) {
              return e !== undefined;
            })
        : ["Sale"];

      setFilters({
        ...filters,
        collections: collectionsParam,
        availability: availabilityParam,
        tokenSort: sortParam,
        activitySort: activitySortParam,
        eventTypes: eventTypesParam,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
        paymentToken: paymentTokenParam,
      });

      setParamsLoaded(true);
    }
  }, [router]);

  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  useEffect(() => {
    updateTokens();
    updateActivity();
  }, [filters]);

  return (
    <ContainerBackground
      className={filtersUI.filtersVisible ? "filtersVisible" : null}
    >
      <ContainerExtended>
        <Title>Explore NFTs</Title>

        <Menu>
          <MenuItem
            className={selectedTab == 0 ? "selected" : null}
            onClick={() => {
              updateSelectedTab(0);
            }}
          >
            <MenuIcon>
              <IoGrid />
            </MenuIcon>
            Collections
          </MenuItem>
          <MenuItem
            className={selectedTab == 1 ? "selected" : ""}
            onClick={() => updateSelectedTab(1)}
          >
            <MenuIcon>
              <FaImages />
            </MenuIcon>
            Items
          </MenuItem>
          <MenuItem
            className={selectedTab == 2 ? "selected" : ""}
            onClick={() => updateSelectedTab(2)}
          >
            <MenuIcon>
              <FaHistory />
            </MenuIcon>
            Activity
          </MenuItem>
        </Menu>

        {selectedTab == 0 && (
          <CollectionsGrid>
            <InfiniteScroll
              dataLength={pageState.collectionResults.length}
              next={fetchMoreCollections}
              hasMore={pageState.moreCollections}
              loader={[...Array(6)].map((e, i) => (
                <CollectionCardGhost key={i} />
              ))}
              style={{ display: "contents", overflow: "visible" }}
            >
              {pageState.collectionResults.map((collection) => (
                <CollectionCardLarge
                  key={collection.address}
                  collection={collection}
                  settingsLink={false}
                />
              ))}
            </InfiniteScroll>
          </CollectionsGrid>
        )}

        {selectedTab == 1 && (
          <ExploreTokens
            filters={filters}
            setFilters={setFilters}
            filtersUI={filtersUI}
            setFiltersUI={setFiltersUI}
            pageState={pageState}
            setPageState={setPageState}
            collectionFilters={collectionFilters}
            setCollectionFilters={setCollectionFilters}
          />
        )}

        {selectedTab == 2 && (
          <ExploreActivty
            filters={filters}
            setFilters={setFilters}
            filtersUI={filtersUI}
            setFiltersUI={setFiltersUI}
            activityState={activityState}
            setActivityState={setActivityState}
            collectionFilters={collectionFilters}
            setCollectionFilters={setCollectionFilters}
          />
        )}
      </ContainerExtended>
    </ContainerBackground>
  );
};
