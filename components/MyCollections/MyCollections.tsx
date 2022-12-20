import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../api/general";
import { siteConfig } from "../../shared/config";
import { CollectionCardGhost } from "../CollectionCard/CollectionCardGhost";
import { CollectionCardLarge } from "../CollectionCard/CollectionCardLarge";
import { CollectionsGrid } from "../CollectionCard/styles";
import { NoItems } from "../Common/styles";
import {
  ContainerBackground,
  ContainerExtended,
  NoItemsButton,
  Subtitle,
  Title,
} from "./styles";

export const MyCollections = ({ collections, setCollections }) => {
  const [moreCollections, setMoreCollections] = useState(
    collections.next ? true : false
  );

  const [collectionResults, setCollectionResults] = useState(
    collections.results
  );

  async function fetchMoreCollections() {
    const collectionsRes = await fetchMoreByURL(collections.next);

    if (!collectionsRes.next) {
      setMoreCollections(false);
    }

    setCollections(collectionsRes);
    setCollectionResults(collectionResults.concat(collectionsRes.results));
  }

  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>Collections</Title>
        <Subtitle>
          {collectionResults.length > 0 ? (
            <>Manage your Optimism NFT collections on Quix</>
          ) : (
            <NoItems>
              <p>
                Get started by creating your first NFT collection on Optimism
              </p>
              <Link href="/launch">
                <a>
                  <NoItemsButton>Get Started</NoItemsButton>
                </a>
              </Link>
            </NoItems>
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
                settingsLink={true}
              />
            ))}
          </InfiniteScroll>
        </CollectionsGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
