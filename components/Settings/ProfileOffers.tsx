import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../api/general";
import {
  fetchCollectionThresholds,
  fetchProfileCollections,
  updateCollectionThresholds,
} from "../../api/settings";
import { LoadingRing } from "../Collection/styles";
import { CollectionImage } from "../Common/Images/CollectionImage";
import {
  EditorDescription,
  EditorGrid,
  EditorInput,
  EditorInputContainer,
  EditorRow,
  EditorRowText,
  EditorTitle,
  SaveButton,
  SaveButtonContainer,
} from "../Common/Settings/styles";
import { TextTruncater } from "../Common/styles";
import {
  CollectionFloor,
  CollectionGrid,
  CollectionImageContainer,
  CollectionInfo,
  CollectionName,
  CollectionRow,
  CollectionText,
  CollectionThreshold,
} from "./styles";

export const ProfileOffers = ({ profile }) => {
  const [buttonText, setButtonText] = useState("Save Changes");
  const [collectionsState, setCollectionsState] = useState({
    collections: null,
    moreCollections: false,
    collectionResults: [],
  });
  const [thresholds, setThresholds] = useState(null);
  const [thresholdsToUpdate, setThresholdsToUpdate] = useState({});

  async function fetchMoreCollections() {
    const moreCollections = await fetchMoreByURL(
      collectionsState.collections.next
    );

    setCollectionsState({
      ...collectionsState,
      collections: moreCollections,
      moreCollections: moreCollections.next ? true : false,
      collectionResults: collectionsState.collectionResults.concat(
        moreCollections.results
      ),
    });
  }

  useEffect(() => {
    setButtonText("Save Changes");
    const fetchCollections = async () => {
      const collectionsPromise = fetchProfileCollections(profile.address);
      const thresholdsPromise = fetchCollectionThresholds(profile.address);

      const [collections, thresholds] = await Promise.all([
        collectionsPromise,
        thresholdsPromise,
      ]);

      setCollectionsState({
        ...collectionsState,
        collections: collections,
        moreCollections: collections.next ? true : false,
        collectionResults: collections.results,
      });

      setThresholds(thresholds);
    };

    fetchCollections();
  }, [profile]);

  const handleClickSave = async () => {
    setButtonText("Saving Changes...");

    const status = await updateCollectionThresholds(
      profile.address,
      thresholdsToUpdate
    );

    if (status < 400) {
      setButtonText("Saved!");
    } else {
      setButtonText("Save Changes");
    }
  };

  return (
    <EditorGrid className="collection-threshold">
      <EditorRowText>
        <EditorTitle>Minimum Offers</EditorTitle>
        <EditorDescription>
          Set a minimum offer for each collection. Offers below the threshold
          will be ignored.
        </EditorDescription>
      </EditorRowText>
      <InfiniteScroll
        dataLength={collectionsState.collectionResults.length}
        next={fetchMoreCollections}
        hasMore={collectionsState.moreCollections}
        loader={<LoadingRing />}
        scrollableTarget="scrollableDiv"
      >
        <CollectionGrid>
          {thresholds && collectionsState.collections ? (
            collectionsState.collectionResults.map((collection, index) => (
              <Collection
                collection={collection}
                thresholds={thresholds}
                thresholdsToUpdate={thresholdsToUpdate}
                setThresholdsToUpdate={setThresholdsToUpdate}
                setButtonText={setButtonText}
                key={index}
              />
            ))
          ) : (
            <LoadingRing />
          )}
        </CollectionGrid>
      </InfiniteScroll>

      <SaveButtonContainer>
        <SaveButton onClick={handleClickSave}>{buttonText}</SaveButton>
      </SaveButtonContainer>
    </EditorGrid>
  );
};

const Collection = ({
  collection,
  thresholds,
  thresholdsToUpdate,
  setThresholdsToUpdate,
  setButtonText,
}) => {
  const [threshold, setThreshold] = useState(
    thresholds && thresholds[collection.address]
      ? ethers.utils.formatEther(
          ethers.utils.parseUnits(
            thresholds[collection.address].toString(),
            "gwei"
          )
        )
      : ""
  );

  const updateThreshold = (event) => {
    if (event.target.value == ".") {
      setThreshold(event.target.value);
    } else if (event.target.value == "") {
      setThreshold(event.target.value);
      let newThresholds = thresholdsToUpdate;
      newThresholds[collection.address] = Number(
        ethers.utils.formatUnits(ethers.utils.parseEther("0"), "gwei")
      );
      setThresholdsToUpdate(newThresholds);
      setButtonText("Save Changes");
    } else if (!isNaN(event.target.value)) {
      if (
        Number(event.target.value) == 0 ||
        (Number(event.target.value) >= 0.0001 &&
          Number(event.target.value) <= 500)
      ) {
        setThreshold(event.target.value);
        let newThresholds = thresholdsToUpdate;
        newThresholds[collection.address] = Number(
          ethers.utils.formatUnits(
            ethers.utils.parseEther(event.target.value),
            "gwei"
          )
        );
        setThresholdsToUpdate(newThresholds);
        setButtonText("Save Changes");
      }
    }
  };

  return (
    <EditorRow>
      <CollectionRow>
        <Link
          href={
            collection.slug
              ? `/collection/${collection.slug}`
              : `/collection/${collection.address}`
          }
          passHref
        >
          <a>
            <CollectionInfo>
              <CollectionImageContainer>
                <CollectionImage collection={collection} />
              </CollectionImageContainer>
              <CollectionText>
                <CollectionName>
                  <TextTruncater>{collection.name}</TextTruncater>
                </CollectionName>
                {/* <CollectionFloor>
                  Floor: <FaEthereum />
                  {ethers.utils.formatEther(
                    ethers.utils.parseUnits(collection.floor.toString(), "gwei")
                  )}
                </CollectionFloor> */}
              </CollectionText>
            </CollectionInfo>
          </a>
        </Link>
        <CollectionThreshold>
          <EditorInputContainer className="price">
            <FaEthereum />
            <EditorInput
              className="price collection-threshold"
              type="text"
              value={threshold}
              placeholder="0"
              onChange={updateThreshold}
            />
          </EditorInputContainer>
        </CollectionThreshold>
      </CollectionRow>
    </EditorRow>
  );
};
