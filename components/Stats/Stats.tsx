import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import {
  FaChevronCircleDown,
  FaChevronCircleRight,
  FaEthereum,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { fetchMoreByURL } from "../../api/general";
import { fetchMarketplaceStats } from "../../api/stats";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { CollectionImage } from "../Common/Images/CollectionImage";
import { TextTruncater } from "../Common/styles";
import { Toggle, ToggleSection } from "../Home/Trending/styles";
import {
  CollectionName,
  ContainerBackground,
  ContainerExtended,
  ExpandButton,
  LoadingRing,
  MobileLabel,
  PriceSmall,
  StatImage,
  StatRow,
  StatRowSection,
  StatsGrid,
  StatText,
  StatTextContainer,
  Subtitle,
  Title,
  VerifiedIcon,
} from "./styles";

export const Stats = ({ collections, setCollections }) => {
  const [sortState, setSortState] = useState({
    sort: "volume",
    reverse: false,
    range: "30d",
  });
  const [sortUpdating, setSortUpdating] = useState(false);

  const [moreCollections, setMoreCollections] = useState(
    collections && collections.next ? true : false
  );

  const [collectionResults, setCollectionResults] = useState(
    collections ? collections.results : []
  );

  async function fetchMoreCollections() {
    const collectionsRes = await fetchMoreByURL(collections.next);

    if (!collectionsRes.next) {
      setMoreCollections(false);
    }

    setCollections(collectionsRes);
    setCollectionResults(collectionResults.concat(collectionsRes.results));
  }

  const updateSort = (newSort) => {
    if (newSort == sortState.sort) {
      setSortState({
        ...sortState,
        reverse: !sortState.reverse,
      });
    } else {
      setSortState({ ...sortState, sort: newSort, reverse: false });
    }
  };

  const updateRange = (newRange) => {
    if (newRange != sortState.range) {
      setSortState({
        ...sortState,
        range: newRange,
      });
    }
  };

  useEffect(() => {
    const fetchCollections = async () => {
      setSortUpdating(true);

      let sortString;
      if (sortState.reverse) {
        sortString = sortState.sort + ":asc";
      } else {
        sortString = sortState.sort + ":desc";
      }

      const collections = await fetchMarketplaceStats(
        sortString,
        sortState.range
      );

      if (collections) {
        if (!collections.next) {
          setMoreCollections(false);
        }

        setCollections(collections);
        setCollectionResults(collections.results);
        setSortUpdating(false);
      }
    };

    if (sortState.sort) {
      fetchCollections();
    }
  }, [sortState]);

  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>
          Top Collections
          <Toggle className="stats">
            <ToggleSection
              className={sortState.range == "24h" ? "active stats" : "stats"}
              onClick={(e) => updateRange("24h")}
            >
              1 day
            </ToggleSection>
            <ToggleSection
              className={sortState.range == "7d" ? "active stats" : "stats"}
              onClick={(e) => updateRange("7d")}
            >
              7 day
            </ToggleSection>
            <ToggleSection
              className={sortState.range == "30d" ? "active stats" : "stats"}
              onClick={(e) => updateRange("30d")}
            >
              30 day
            </ToggleSection>
            <ToggleSection
              className={sortState.range == "all" ? "active stats" : "stats"}
              onClick={(e) => updateRange("all")}
            >
              All time
            </ToggleSection>
          </Toggle>
        </Title>
        <Subtitle></Subtitle>

        <StatsGrid>
          <StatRow className="title">
            <StatText className="title">#</StatText>
            <StatText className="title">Collection</StatText>
            <StatText
              className={
                sortState.sort == "volume"
                  ? "title link"
                  : "inactive title link"
              }
              onClick={() => updateSort("volume")}
            >
              Volume
              {sortState.sort == "volume" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )}
            </StatText>
            <StatText
              className={
                sortState.sort == "volume_24h"
                  ? "title web link"
                  : "inactive title web link"
              }
              onClick={() => updateSort("volume_24h")}
            >
              24h %
              {sortState.sort == "volume_24h" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )}
            </StatText>
            <StatText
              className={
                sortState.sort == "volume_7d"
                  ? "title web link"
                  : "inactive title web link"
              }
              onClick={() => updateSort("volume_7d")}
            >
              7d %
              {sortState.sort == "volume_7d" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )}
            </StatText>
            <StatText
              className={
                sortState.sort == "floor" ? "title link" : "inactive title link"
              }
              onClick={() => updateSort("floor")}
            >
              Floor
              {sortState.sort == "floor" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )}
            </StatText>
            <StatText
              className={
                sortState.sort == "sales"
                  ? "title web link"
                  : "inactive title web link"
              }
              onClick={() => updateSort("sales")}
            >
              Sales
              {sortState.sort == "sales" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )}
            </StatText>
            <StatText
              className={
                sortState.sort == "items"
                  ? "title web link"
                  : "inactive title web link"
              }
              onClick={() => updateSort("items")}
            >
              Items
              {sortState.sort == "items" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )}
            </StatText>
            <StatText
              className={
                sortState.sort == "listed" ? "title web" : "inactive title web"
              }
              // onClick={() => updateSort("listed")}
            >
              Listed
              {/* {sortState.sort == "listed" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )} */}
            </StatText>
            <StatText
              className={
                sortState.sort == "owners"
                  ? "title web link"
                  : "inactive title web link"
              }
              onClick={() => updateSort("owners")}
            >
              Owners
              {sortState.sort == "owners" ? (
                sortState.reverse ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <BsChevronExpand />
              )}
            </StatText>
          </StatRow>
          {sortUpdating ? (
            <LoadingRing />
          ) : (
            <InfiniteScroll
              dataLength={collectionResults.length}
              next={fetchMoreCollections}
              hasMore={moreCollections}
              loader={<LoadingRing />}
              style={{ overflow: "visible" }}
            >
              {collectionResults.map((collection, index) => (
                <StatCollectionRow
                  collection={collection}
                  index={index}
                  key={index}
                />
              ))}
            </InfiniteScroll>
          )}
        </StatsGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};

const StatCollectionRow = ({ collection, index }) => {
  const showUSD = useSelector((state: State) => state.showUSD);

  const [expanded, setExpanded] = useState(false);

  const updateExpandedState = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <>
      <Link
        href={
          collection.slug
            ? `/collection/${collection.slug}`
            : `/collection/${
                collection.blockchain != siteConfig.NETWORK ? "eth/" : ""
              }${collection.address}`
        }
        key={collection.address}
      >
        <a>
          <StatRow>
            <StatRowSection>
              <StatRowSection className="subsection">
                <StatText className="rank">{index + 1}</StatText>
                <StatText>
                  <StatImage>
                    <CollectionImage collection={collection} />
                    {collection.verified && (
                      <VerifiedIcon>
                        <MdVerified />
                      </VerifiedIcon>
                    )}
                  </StatImage>
                  <CollectionName>{collection.name}</CollectionName>
                </StatText>
              </StatRowSection>
              <StatRowSection className="subsection">
                <StatTextContainer>
                  <StatText className="price">
                    <FaEthereum />
                    {!!collection.volume
                      ? Math.round(
                          parseFloat(
                            ethers.utils.formatEther(
                              ethers.utils.parseUnits(
                                collection.volume.toString(),
                                "gwei"
                              )
                            )
                          ) * 100
                        ) / 100
                      : "0.00"}
                  </StatText>
                  <PriceSmall className="volume">
                    {showUSD &&
                      !!collection.eth_to_usd &&
                      !!collection.volume &&
                      Number(
                        ethers.utils.formatEther(
                          ethers.utils.parseUnits(
                            (
                              collection.volume * collection.eth_to_usd
                            ).toString(),
                            "gwei"
                          )
                        )
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                  </PriceSmall>
                </StatTextContainer>
                <ExpandButton onClick={updateExpandedState}>
                  {expanded ? (
                    <FaChevronCircleDown />
                  ) : (
                    <FaChevronCircleRight />
                  )}
                </ExpandButton>
              </StatRowSection>
            </StatRowSection>
            <StatRowSection className={expanded ? "vertical" : "hidden"}>
              <StatRowSection className="subsection mobile-row">
                <MobileLabel>24h %</MobileLabel>
                <StatText
                  className={
                    !!collection.volume_change_24h
                      ? collection.volume_change_24h > 0
                        ? "pos"
                        : collection.volume_change_24h < 0
                        ? "neg"
                        : null
                      : null
                  }
                >
                  <TextTruncater>
                    {!!collection.volume_change_24h
                      ? (
                          Math.round(collection.volume_change_24h * 100 * 100) /
                          100
                        ).toLocaleString() + "%"
                      : "—"}
                  </TextTruncater>
                </StatText>
              </StatRowSection>
              <StatRowSection className="subsection mobile-row">
                <MobileLabel>7d %</MobileLabel>
                <StatText
                  className={
                    collection.volume_change_7d
                      ? collection.volume_change_7d > 0
                        ? "pos"
                        : collection.volume_change_7d < 0
                        ? "neg"
                        : null
                      : null
                  }
                >
                  <TextTruncater>
                    {!!collection.volume_change_7d
                      ? (
                          Math.round(collection.volume_change_7d * 100 * 100) /
                          100
                        ).toLocaleString() + "%"
                      : "—"}
                  </TextTruncater>
                </StatText>
              </StatRowSection>
              <StatRowSection className="subsection mobile-row">
                <MobileLabel>Floor</MobileLabel>
                <StatTextContainer>
                  <StatText>
                    {!!collection.floor ? (
                      <>
                        <FaEthereum />
                        {Math.ceil(
                          parseFloat(
                            ethers.utils.formatEther(
                              ethers.utils.parseUnits(
                                collection.floor.toString(),
                                "gwei"
                              )
                            )
                          ) * 10000
                        ) / 10000}
                      </>
                    ) : (
                      "—"
                    )}
                  </StatText>
                  <PriceSmall>
                    {showUSD && !!collection.eth_to_usd && !!collection.floor && (
                      <>
                        {Number(
                          ethers.utils.formatEther(
                            ethers.utils.parseUnits(
                              (
                                collection.floor * collection.eth_to_usd
                              ).toString(),
                              "gwei"
                            )
                          )
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </>
                    )}
                  </PriceSmall>
                </StatTextContainer>
              </StatRowSection>
              <StatRowSection className="subsection mobile-row">
                <MobileLabel>Sales</MobileLabel>
                <StatText>
                  {collection.sales ? collection.sales.toLocaleString() : "0"}
                </StatText>
              </StatRowSection>
              <StatRowSection className="subsection mobile-row">
                <MobileLabel>Items</MobileLabel>
                <StatText>
                  {collection.supply ? collection.supply.toLocaleString() : "—"}
                </StatText>
              </StatRowSection>
              <StatRowSection className="subsection mobile-row">
                <MobileLabel>Listed</MobileLabel>
                <StatText>
                  {collection.listed && collection.supply
                    ? (collection.listed / collection.supply).toLocaleString(
                        undefined,
                        {
                          style: "percent",
                          minimumFractionDigits: 1,
                        }
                      )
                    : "—"}
                </StatText>
              </StatRowSection>
              <StatRowSection className="subsection mobile-row">
                <MobileLabel>Owners</MobileLabel>
                <StatText>
                  {collection.owners ? collection.owners.toLocaleString() : "—"}
                </StatText>
              </StatRowSection>
            </StatRowSection>
          </StatRow>
        </a>
      </Link>
    </>
  );
};
