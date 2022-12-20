import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../../api/general";
import { fetchTokenActivity } from "../../../api/token";
import { AssetActivityRow } from "../../Common/Activity/AssetActivityRow";
import {
  ActivityGrid,
  ActivityGridRow,
  ActivityInfo,
} from "../../Common/Activity/styles";
import { LoadingRing } from "../AssetHero/styles";
import {
  Section,
  SectionContent,
  SectionNoData,
  SectionTitle,
  SectionTitleText,
} from "../styles";

export const AssetActivity = ({ token }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activityState, setActivityState] = useState({
    activity: null,
    moreResults: false,
    results: [],
    resultsUpdating: true,
  });

  useEffect(() => {
    const fetchActivity = async () => {
      setActivityState({
        ...activityState,
        resultsUpdating: true,
      });

      // TODO: include network
      const activity = await fetchTokenActivity(
        token.contract_address,
        token.token_id
      );

      if (activity) {
        setActivityState({
          ...activityState,
          activity: activity,
          moreResults: activity.next ? true : false,
          results: activity.results,
          resultsUpdating: false,
        });
      }
    };

    fetchActivity();
  }, []);

  async function fetchMoreActivity() {
    const activity = await fetchMoreByURL(activityState.activity.next);

    setActivityState({
      ...activityState,
      activity: activity,
      moreResults: activity.next ? true : false,
      results: activityState.results.concat(activity.results),
    });
  }

  return (
    <Section>
      <SectionTitle onClick={() => setCollapsed(!collapsed)}>
        <SectionTitleText>
          <FaHistory />
          Activity
        </SectionTitleText>
        {collapsed ? <FiChevronRight /> : <FiChevronDown />}
      </SectionTitle>
      {!collapsed && (
        <SectionContent className="asset-activity">
          {activityState.results.length > 0 ? (
            <InfiniteScroll
              dataLength={activityState.results.length}
              next={fetchMoreActivity}
              hasMore={activityState.moreResults}
              loader={<LoadingRing />}
              style={{ overflow: "visible" }}
            >
              <ActivityGrid className="asset-activity">
                <ActivityGridRow className="title asset-activity">
                  <ActivityInfo className="title">Event</ActivityInfo>
                  <ActivityInfo className="title">Price</ActivityInfo>
                  <ActivityInfo className="title">From</ActivityInfo>
                  <ActivityInfo className="title">To</ActivityInfo>
                  <ActivityInfo className="title">Time</ActivityInfo>
                </ActivityGridRow>

                {activityState.results.map((event, index) => (
                  <AssetActivityRow token={token} event={event} key={index} />
                ))}
              </ActivityGrid>
            </InfiniteScroll>
          ) : activityState.resultsUpdating ? (
            <LoadingRing />
          ) : (
            <SectionNoData>No item activity</SectionNoData>
          )}
        </SectionContent>
      )}
    </Section>
  );
};
