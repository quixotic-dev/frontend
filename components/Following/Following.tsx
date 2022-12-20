import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../api/general";
import { LoadingRing } from "../Collection/styles";
import { CollectionCard } from "../CollectionCard/CollectionCard";
import { CollectionsGrid } from "../CollectionCard/styles";
import { NoItems } from "../Common/styles";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { ProfilesGrid } from "../ProfileCard/styles";
import {
  ContainerBackground,
  ContainerExtended,
  SearchGrid,
  SectionTitle,
  Title,
} from "./styles";

export const Following = ({ followedProfiles, followedCollections }) => {
  const [followedProfilesState, setFollowedProfilesState] = useState({
    profiles: followedProfiles,
    more: followedProfiles.next ? true : false,
    results: followedProfiles.results,
  });

  const [followedCollectionsState, setFollowedCollectionsState] = useState({
    collections: followedCollections,
    more: followedCollections.next ? true : false,
    results: followedCollections.results,
  });

  async function fetchMoreProfiles() {
    const res = await fetchMoreByURL(followedProfilesState.profiles.next);

    setFollowedProfilesState({
      ...followedProfilesState,
      profiles: res,
      more: res.next ? true : false,
      results: followedProfilesState.results.concat(res.results),
    });
  }

  async function fetchMoreCollections() {
    const res = await fetchMoreByURL(followedCollectionsState.collections.next);

    setFollowedCollectionsState({
      ...followedCollectionsState,
      collections: res,
      more: res.next ? true : false,
      results: followedCollectionsState.results.concat(res.results),
    });
  }

  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>Following</Title>

        {followedProfiles.results.length > 0 ||
        followedCollections.results.length > 0 ? (
          <SearchGrid>
            {followedCollectionsState.results.length > 0 && (
              <div>
                <SectionTitle>Collections</SectionTitle>
                <CollectionsGrid>
                  <InfiniteScroll
                    dataLength={followedCollectionsState.results.length}
                    next={fetchMoreCollections}
                    hasMore={followedCollectionsState.more}
                    loader={<LoadingRing />}
                    // loader={[...Array(6)].map((e, i) => (
                    //   <AssetCardGhost key={i} />
                    // ))}
                    style={{ display: "contents", overflow: "visible" }}
                  >
                    {followedCollectionsState.results.map(
                      (collection, index) => (
                        <CollectionCard
                          collection={collection}
                          settingsLink={false}
                          key={index}
                        />
                      )
                    )}
                  </InfiniteScroll>
                </CollectionsGrid>
              </div>
            )}

            {followedProfilesState.results.length > 0 && (
              <div>
                <SectionTitle>Profiles</SectionTitle>
                <ProfilesGrid>
                  <InfiniteScroll
                    dataLength={followedProfilesState.results.length}
                    next={fetchMoreProfiles}
                    hasMore={followedProfilesState.more}
                    loader={<LoadingRing />}
                    // loader={[...Array(6)].map((e, i) => (
                    //   <AssetCardGhost key={i} />
                    // ))}
                    style={{ display: "contents", overflow: "visible" }}
                  >
                    {followedProfilesState.results.map((profile, index) => (
                      <ProfileCard profile={profile} key={index} />
                    ))}
                  </InfiniteScroll>
                </ProfilesGrid>
              </div>
            )}
          </SearchGrid>
        ) : (
          <NoItems>
            <h1>Nothing to display</h1>
          </NoItems>
        )}
      </ContainerExtended>
    </ContainerBackground>
  );
};
