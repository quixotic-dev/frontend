import Image from "next/image";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../api/general";
import { fetchProfileActivity } from "../../api/profile";
import { PriceImage } from "../Asset/AssetButtons/styles";
import { ActivityRow } from "../Common/Activity/ActivityRow";
import { ActivityRowGhost } from "../Common/Activity/ActivityRowGhost";
import {
  ActivityGrid,
  ActivityGridRow,
  ActivityInfo,
} from "../Common/Activity/styles";
import { ActiveCollectionButton } from "../Common/Filters/Filters";
import {
  updateChains,
  updateEventTypes,
  updatePriceFilter,
} from "../Common/Filters/FilterUtils";
import {
  ActiveFilterButton,
  ActiveFiltersGrid,
} from "../Common/Filters/styles";
import { NoItems } from "../Common/styles";
import {
  activityIconRegistry,
  chainIconRegistry,
  chainRegistry,
} from "../Common/Utils";

export const ProfileActivity = ({
  address,
  activityState,
  setActivityState,
  filters,
  setFilters,
  collectionFilters,
}) => {
  const fetchActivity = async () => {
    const res = await fetchProfileActivity(address);

    setActivityState({
      ...activityState,
      moreActivity: res.next ? true : false,
      activity: res,
      activityResults: activityState.activityResults.concat(res.results),
      activityUpdating: false,
    });
  };

  const fetchMoreActivity = async () => {
    const res = await fetchMoreByURL(activityState.activity.next);

    setActivityState({
      ...activityState,
      moreActivity: res.next ? true : false,
      activity: res,
      activityResults: activityState.activityResults.concat(res.results),
    });
  };

  useEffect(() => {
    if (!activityState.activity) {
      fetchActivity();
    }
  }, []);

  return (
    <>
      {(filters.collections.length > 0 ||
        filters.eventTypes.length > 0 ||
        filters.chains.length > 0 ||
        filters.minPrice ||
        filters.maxPrice) && (
        <ActiveFiltersGrid>
          {filters.eventTypes.map((event, index) => (
            <ActiveFilterButton
              key={index}
              onClick={() =>
                updateEventTypes(false, event, filters, setFilters)
              }
            >
              {activityIconRegistry[event]}
              {event}
              <MdClose />
            </ActiveFilterButton>
          ))}

          {filters.chains.map((chain, index) => (
            <ActiveFilterButton
              key={index}
              onClick={() => updateChains(false, chain, filters, setFilters)}
            >
              <PriceImage>
                <Image
                  src={`/payment_tokens/${chainIconRegistry[chain]}.png`}
                  alt=""
                  layout="responsive"
                  objectFit="contain"
                  objectPosition="center"
                  width={50}
                  height={50}
                  priority
                />
              </PriceImage>
              {chainRegistry[chain]}
              <MdClose />
            </ActiveFilterButton>
          ))}

          {(filters.minPrice || filters.maxPrice) && (
            <ActiveFilterButton
              onClick={() => {
                updatePriceFilter(
                  "",
                  "",
                  filters.paymentToken,
                  filters,
                  setFilters
                );
              }}
            >
              {filters.minPrice && filters.maxPrice
                ? filters.minPrice +
                  " - " +
                  filters.maxPrice +
                  " " +
                  (filters.paymentToken != "all" ? filters.paymentToken : "")
                : filters.minPrice
                ? "> " +
                  filters.minPrice +
                  " " +
                  (filters.paymentToken != "all" ? filters.paymentToken : "")
                : "< " +
                  filters.maxPrice +
                  " " +
                  (filters.paymentToken != "all" ? filters.paymentToken : "")}
              <MdClose />
            </ActiveFilterButton>
          )}

          {collectionFilters.collectionResults.length > 0 &&
            filters.collections.map((collectionId, index) => {
              const collection = collectionFilters.collectionResults.find(
                (e) => e.address == collectionId
              );
              if (collection)
                return (
                  <ActiveCollectionButton
                    key={index}
                    collection={collection}
                    filters={filters}
                    setFilters={setFilters}
                  />
                );
            })}
        </ActiveFiltersGrid>
      )}

      {activityState.activityUpdating ? (
        <ActivityGrid>
          <ActivityGridRow className="title">
            <ActivityInfo className="title">Event</ActivityInfo>
            <ActivityInfo className="title">Item</ActivityInfo>
            <ActivityInfo className="title">Price</ActivityInfo>
            <ActivityInfo className="title">From</ActivityInfo>
            <ActivityInfo className="title">To</ActivityInfo>
            <ActivityInfo className="title">Date</ActivityInfo>
          </ActivityGridRow>
          {[...Array(9)].map((e, i) => (
            <ActivityRowGhost key={i} />
          ))}
        </ActivityGrid>
      ) : !!activityState.activity &&
        activityState.activityResults.length > 0 ? (
        <ActivityGrid>
          <InfiniteScroll
            dataLength={activityState.activityResults.length}
            next={fetchMoreActivity}
            hasMore={activityState.moreActivity}
            loader={[...Array(6)].map((e, i) => (
              <ActivityRowGhost key={i} />
            ))}
            style={{ display: "contents", overflow: "visible" }}
          >
            <ActivityGridRow className="title">
              <ActivityInfo className="title">Event</ActivityInfo>
              <ActivityInfo className="title">Item</ActivityInfo>
              <ActivityInfo className="title">Price</ActivityInfo>
              <ActivityInfo className="title">From</ActivityInfo>
              <ActivityInfo className="title">To</ActivityInfo>
              <ActivityInfo className="title">Time</ActivityInfo>
            </ActivityGridRow>
            {activityState.activityResults.map((event, index) => (
              <ActivityRow event={event} key={index} />
            ))}
          </InfiniteScroll>
        </ActivityGrid>
      ) : (
        <NoItems>
          <h1>No activity to display</h1>
          <p>Try updating your selected filters</p>
        </NoItems>
      )}
    </>
  );
};
