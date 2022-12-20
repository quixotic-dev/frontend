import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../api/general";
import { fetchProfileOwnedCollections } from "../../api/profile";
import { CollectionCardGhost } from "../CollectionCard/CollectionCardGhost";
import { CollectionCardLarge } from "../CollectionCard/CollectionCardLarge";
import { CollectionsGrid } from "../CollectionCard/styles";
import { NoItems } from "../Common/styles";

export const ProfileCreated = ({
  profileAddress,
  createdState,
  setCreatedState,
}) => {
  const fetchCreated = async () => {
    const collections = await fetchProfileOwnedCollections(profileAddress);

    setCreatedState({
      ...createdState,
      collections: collections,
      moreCollections: collections.next ? true : false,
      collectionResults: collections.results,
      collectionsUpdating: false,
    });
  };

  const fetchMoreCreated = async () => {
    if (createdState.collections && createdState.collections.next) {
      const moreCollections = await fetchMoreByURL(
        createdState.collections.next
      );

      setCreatedState({
        ...createdState,
        collections: moreCollections,
        moreCollections: moreCollections.next ? true : false,
        collectionResults: createdState.collectionResults.concat(
          moreCollections.results
        ),
      });
    }
  };

  useEffect(() => {
    if (!createdState.collections) {
      fetchCreated();
    }
  }, []);

  return (
    <>
      {!!createdState.collectionsUpdating ? (
        <CollectionsGrid>
          {[...Array(6)].map((e, i) => (
            <CollectionCardGhost key={i} />
          ))}
        </CollectionsGrid>
      ) : (
        <>
          {!!createdState.collectionResults &&
          createdState.collectionResults.length > 0 ? (
            <CollectionsGrid>
              <InfiniteScroll
                dataLength={createdState.collectionResults.length}
                next={fetchMoreCreated}
                hasMore={createdState.moreCollections}
                loader={[...Array(6)].map((e, i) => (
                  <CollectionCardGhost key={i} />
                ))}
                style={{ display: "contents", overflow: "visible" }}
              >
                {createdState.collectionResults.map((collection, index) => (
                  <CollectionCardLarge
                    collection={collection}
                    settingsLink={false}
                    key={index}
                  />
                ))}
              </InfiniteScroll>
            </CollectionsGrid>
          ) : (
            <NoItems>
              <h1>No collections to display</h1>
            </NoItems>
          )}
        </>
      )}
    </>
  );
};
