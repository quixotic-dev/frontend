import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../api/general";
import { siteConfig } from "../../shared/config";
import { CollectionCardGhost } from "../CollectionCard/CollectionCardGhost";
import { CollectionCardLarge } from "../CollectionCard/CollectionCardLarge";
import { CollectionsGrid } from "../CollectionCard/styles";
import {
  ContainerBackground,
  ContainerExtended,
  Subtitle,
  Title,
} from "./styles";

export const Collections = ({ profile, collections, setCollections }) => {
  const handle = profile
    ? profile.username
      ? profile.username
      : profile.reverse_ens
      ? profile.reverse_ens
      : profile.address
    : "";

  const [moreCollections, setMoreCollections] = useState(
    collections.next ? true : false
  );

  const [collectionResults, setCollectionResults] = useState(
    collections.results
  );

  async function fetchMoreCollections() {
    const moreCollections = await fetchMoreByURL(collections.next);

    if (!moreCollections.next) {
      setMoreCollections(false);
    }

    setCollections(moreCollections);
    setCollectionResults(collectionResults.concat(moreCollections.results));
  }

  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>{handle} Collections</Title>
        <Subtitle>
          {collectionResults.length > 0 ? (
            <>Explore NFT collections by {handle} on Quix</>
          ) : (
            <>No collections found</>
          )}
        </Subtitle>

        <CollectionsGrid>
          <InfiniteScroll
            dataLength={collectionResults.length}
            next={fetchMoreCollections}
            hasMore={moreCollections}
            loader={[...Array(6)].map((e, i) => (
              <CollectionCardGhost key={i} />
            ))}
            style={{ display: "contents", overflow: "visible" }}
          >
            {collectionResults.map((collection) => (
              <CollectionCardLarge
                key={collection.address}
                collection={collection}
                settingsLink={false}
              />
            ))}
          </InfiniteScroll>
        </CollectionsGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
