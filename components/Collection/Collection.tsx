import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import {
  BsFillGrid3X3GapFill,
  BsFillGridFill,
  BsFillQuestionCircleFill,
  BsStars,
} from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord, FaEthereum, FaHistory, FaTwitter } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoGrid } from "react-icons/io5";
import { MdAdd, MdClose, MdVerified } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactMarkdown from "react-markdown";
import { usePalette } from "react-palette";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { ModalProvider } from "styled-react-modal";
import {
  fetchCollectionAttributes,
  fetchCollectionFilteredActivity,
  fetchCollectionFilteredTokens,
} from "../../api/collection";
import { updateProfileFollow } from "../../api/discover";
import { fetchMoreByURL } from "../../api/general";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateGridLayout } from "../../store/gridLayout";
import { updateLogin } from "../../store/login";
import { updateProfile } from "../../store/profile";
import { PriceImage } from "../Asset/AssetButtons/styles";
import { AssetCard } from "../AssetCard/AssetCard";
import { AssetCardGhost } from "../AssetCard/AssetCardGhost";
import { CardGrid } from "../AssetCard/styles";
import {
  updateAttributes,
  updateChains,
  updateEventTypes,
  updatePriceFilter,
  updateSearchQuery,
} from "../Common/Filters/FilterUtils";
import {
  ActiveFilterButton,
  ActiveFiltersGrid,
  SortDropdown,
  SortDropdownChevron,
  SortDropdownContainer,
} from "../Common/Filters/styles";
import { CollectionImage } from "../Common/Images/CollectionImage";
import { Menu, MenuIcon, MenuItem } from "../Common/Menu/styles";
import { ModalBackground } from "../Common/StyledModal/styles";
import { NoItems } from "../Common/styles";
import {
  activityIconRegistry,
  chainIconRegistry,
  chainRegistry,
} from "../Common/Utils";
import { FollowButton } from "../Profile/styles";
import { CollectionActivity } from "./CollectionActivity";
import { ActivityFilters } from "./Filters/ActivityFilters";
import { TokenFilters } from "./Filters/TokenFilters";
import {
  BottomColumn,
  BottomGrid,
  CollectionCoverImage,
  CollectionDescription,
  CollectionImageContainer,
  CollectionInfo,
  CollectionLink,
  CollectionLinksGrid,
  CollectionName,
  ContainerBackground,
  ContainerExtended,
  ExpandDescription,
  MenuGrid,
  SearchInput,
  SearchInputContainer,
  SizeToggle,
  SizeToggleContainer,
  Stat,
  StatIcon,
  StatsGrid,
  StatText,
  TopGrid,
  VerifiedIcon,
} from "./styles";
import { SweepButton } from "./SweepButton/SweepButton";

export const Collection = ({
  collection,
  attributesParam,
  intersectAttributesParam,
  sortParam,
  activitySortParam,
  availabilityParam,
  minPriceParam,
  maxPriceParam,
  paymentTokenParam,
  eventTypesParam,
  chainsParam,
  searchQueryParam,
  tab,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const current_user = useSelector((state: State) => state.profile);
  const gridLayout = useSelector((state: State) => state.gridLayout);

  const { data } = usePalette(collection.image_url);

  const [stats, setStats] = useState([]);
  const [chartHistory, setChartHistory] = useState("60");
  const [selectedTab, setSelectedTab] = useState(tab);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [collectionFollowed, setCollectionFollowed] = useState(false);

  const [filtersUI, setFiltersUI] = useState({
    filtersVisible: false,
    sortCollapsed: false,
    availabilityCollapsed: false,
    eventTypesCollapsed: false,
    priceCollapsed: false,
    paymentTokenCollapsed: false,
    collectionsCollapsed: false,
    chainsCollapsed: false,
    intersectAttributesCollapsed: true,
  });

  const [filters, setFilters] = useState({
    tokenSort: sortParam,
    activitySort: activitySortParam,
    availability: availabilityParam,
    eventTypes: eventTypesParam,
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
    paymentToken: paymentTokenParam,
    attributes: attributesParam,
    chains: chainsParam,
    searchQuery: searchQueryParam,
    intersectAttributes: intersectAttributesParam,
  });

  const [tokensState, setTokensState] = useState({
    tokens: null,
    moreTokens: false,
    tokenResults: null,
    tokensUpdating: true,
  });

  const [activityState, setActivityState] = useState({
    activity: null,
    moreActivity: false,
    activityResults: [],
    activityUpdating: true,
  });

  async function fetchMoreTokens() {
    const moreTokens = await fetchMoreByURL(tokensState.tokens.next);

    setTokensState({
      ...tokensState,
      tokens: moreTokens,
      moreTokens: moreTokens.next ? true : false,
      tokenResults: tokensState.tokenResults.concat(moreTokens.results),
    });
  }

  const updateTokens = async () => {
    setTokensState({
      ...tokensState,
      tokensUpdating: true,
    });

    const updatedTokens = await fetchCollectionFilteredTokens(
      collection.address,
      filters.attributes,
      filters.intersectAttributes,
      filters.availability,
      filters.tokenSort,
      filters.minPrice,
      filters.maxPrice,
      filters.paymentToken,
      filters.chains,
      filters.searchQuery
    );

    if (updatedTokens) {
      setTokensState({
        ...tokensState,
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

    const updatedActivity = await fetchCollectionFilteredActivity(
      collection.address,
      filters.activitySort,
      filters.eventTypes,
      filters.attributes,
      filters.intersectAttributes,
      filters.minPrice,
      filters.maxPrice,
      filters.paymentToken,
      filters.chains
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

  const floorPrice = async () => {
    setFilters({
      ...filters,
      attributes: [],
      availability: "forSale",
      tokenSort: "price:asc",
      minPrice: "",
      maxPrice: "",
      paymentToken: "all",
      searchQuery: "",
    });

    setFilters({
      ...filters,
      attributes: [],
      minPrice: "",
      maxPrice: "",
      paymentToken: "all",
    });

    router.query.availability = "forSale";
    router.query.sort = "price:asc";
    router.query.attributes = null;
    router.query.price = null;
    router.query.currency = null;
    router.query.query = null;
    router.push(router, undefined, { shallow: true, scroll: false });

    updateSelectedTab(0);
  };

  const updateSelectedTab = (tab) => {
    setSelectedTab(tab);
    router.query.tab = tab;
    router.push(router, undefined, { shallow: true, scroll: false });
  };

  useEffect(() => {
    updateTokens();
  }, [filters]);

  useEffect(() => {
    updateActivity();
  }, [filters]);

  const [attributeFilters, setAttributeFilters] = useState([]);
  useEffect(() => {
    const fetchAttributes = async () => {
      const attributesRes = await fetchCollectionAttributes(collection.address);
      if (attributesRes) setAttributeFilters(attributesRes.attributes);
    };

    fetchAttributes();
  }, []);

  const updateFollowStatus = async (e) => {
    if (!current_user) {
      return updateLogin(true, dispatch);
    }

    if (collectionFollowed) {
      setCollectionFollowed(false);
      const res = await updateProfileFollow(
        current_user.address,
        collection.address,
        "unfollow",
        "collection"
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setCollectionFollowed(true);
      }
    } else {
      setCollectionFollowed(true);
      const res = await updateProfileFollow(
        current_user.address,
        collection.address,
        "follow",
        "collection"
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setCollectionFollowed(false);
      }
    }
  };

  const changeGridLayout = (mode) => {
    window.localStorage.setItem("gridLayout", String(mode));
    updateGridLayout(mode, dispatch);
  };

  useEffect(() => {
    if (current_user && current_user.followed_collections) {
      setCollectionFollowed(
        current_user.followed_collections.includes(collection.address)
      );
    }
  }, [current_user]);

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ContainerBackground
        className={filtersUI.filtersVisible ? "filtersVisible" : null}
      >
        {!collection.delisted && !collection.is_spam && (
          <CollectionCoverImage
            color={
              data.vibrant && !collection.cover_image ? data.vibrant : "#bbbbbb"
            }
            className={collection.cover_image ? "fullOpacity" : null}
          >
            {collection.cover_image && (
              <Image
                src={collection.cover_image}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
              />
            )}
          </CollectionCoverImage>
        )}

        <ContainerExtended>
          <TopGrid
            className={
              collection.delisted || collection.is_spam ? "no-margin" : null
            }
          >
            {!collection.delisted && !collection.is_spam && (
              <CollectionImageContainer>
                <CollectionImage collection={collection} />
              </CollectionImageContainer>
            )}

            <CollectionInfo>
              <CollectionName>
                {collection.name}
                {collection.delisted ? (
                  <>
                    {" "}
                    <VerifiedIcon
                      className="warning"
                      data-tip="This collection has been delisted"
                    >
                      <RiErrorWarningFill />
                    </VerifiedIcon>
                    <ReactTooltip
                      place="top"
                      effect="solid"
                      backgroundColor="#1C1C1D"
                      className="tooltip"
                    />
                  </>
                ) : collection.is_spam ? (
                  <>
                    {" "}
                    <VerifiedIcon
                      className="warning"
                      data-tip="This collection has been flagged"
                    >
                      <BsFillQuestionCircleFill />
                    </VerifiedIcon>
                    <ReactTooltip
                      place="top"
                      effect="solid"
                      backgroundColor="#1C1C1D"
                      className="tooltip"
                    />
                  </>
                ) : (
                  <>
                    {collection.verified && (
                      <>
                        {" "}
                        <VerifiedIcon>
                          <MdVerified />
                        </VerifiedIcon>
                      </>
                    )}
                    {collection.rewardscampaign &&
                      collection.rewardscampaign.is_boost_active && (
                        <>
                          {" "}
                          <VerifiedIcon
                            className="boost"
                            data-tip
                            data-for="boost"
                          >
                            <BsStars />
                          </VerifiedIcon>
                          <ReactTooltip
                            id="boost"
                            place="top"
                            effect="solid"
                            backgroundColor="#1C1C1D"
                            className="tooltip"
                          >
                            Receive an extra{" "}
                            {collection.rewardscampaign.boost_per_mille / 10}%
                            in OP rewards
                          </ReactTooltip>
                        </>
                      )}
                  </>
                )}
              </CollectionName>

              {!collection.delisted && !collection.is_spam && (
                <>
                  {collection.description && (
                    <CollectionDescription>
                      <ReactMarkdown
                        allowedElements={["br", "strong", "em", "a"]}
                        unwrapDisallowed={true}
                        linkTarget="_blank"
                      >
                        {descriptionExpanded
                          ? collection.description
                          : collection.description.slice(0, 175)}
                      </ReactMarkdown>

                      {collection.description.length > 175 &&
                        (!descriptionExpanded ? (
                          <ExpandDescription
                            onClick={() => setDescriptionExpanded(true)}
                          >
                            ... <span className="bold"> more</span>
                          </ExpandDescription>
                        ) : (
                          <></>
                        ))}
                    </CollectionDescription>
                  )}

                  <CollectionLinksGrid>
                    {collection.site_link && (
                      <a
                        href={collection.site_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CollectionLink>
                          <CgWebsite />
                        </CollectionLink>
                      </a>
                    )}
                    {collection.twitter_link && (
                      <a
                        href={collection.twitter_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CollectionLink>
                          <FaTwitter />
                        </CollectionLink>
                      </a>
                    )}
                    {collection.discord_link && (
                      <a
                        href={collection.discord_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CollectionLink>
                          <FaDiscord />
                        </CollectionLink>
                      </a>
                    )}

                    <a
                      href={`${
                        collection.blockchain != siteConfig.NETWORK
                          ? siteConfig.L1_BLOCK_EXPLORER_URL
                          : siteConfig.L2_BLOCK_EXPLORER_URL
                      }/address/${collection.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CollectionLink className="etherscan">
                        <Image
                          src="/etherscan.svg"
                          alt=""
                          layout="responsive"
                          objectFit="contain"
                          objectPosition="center"
                          width={50}
                          height={50}
                          priority
                        />
                      </CollectionLink>
                    </a>

                    {/* {current_user &&
                      (collectionFollowed ? (
                        <FollowButton
                          className="collection"
                          onClick={updateFollowStatus}
                        >
                          Unfollow
                        </FollowButton>
                      ) : (
                        <FollowButton
                          className="follow collection"
                          onClick={updateFollowStatus}
                        >
                          <MdAdd />
                          Follow
                        </FollowButton>
                      ))} */}
                  </CollectionLinksGrid>
                </>
              )}
            </CollectionInfo>

            {!collection.delisted && !collection.is_spam && (
              <StatsGrid>
                <Stat>
                  <StatText>
                    {collection.supply > 999999
                      ? Math.floor((collection.supply / 1000000) * 100) / 100 +
                        "M"
                      : collection.supply > 999
                      ? Math.floor((collection.supply / 1000) * 10) / 10 + "K"
                      : collection.supply}
                  </StatText>
                  items
                </Stat>
                <Stat>
                  <StatText>
                    {collection.owners > 999999
                      ? Math.floor((collection.owners / 1000000) * 100) / 100 +
                        "M"
                      : collection.owners > 999
                      ? Math.floor((collection.owners / 1000) * 10) / 10 + "K"
                      : collection.owners}
                  </StatText>
                  owners
                </Stat>
                <Stat className="small clickable" onClick={floorPrice}>
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
                  listed
                </Stat>
                <Stat className="large">
                  <StatText>
                    {collection.sales > 999
                      ? Math.floor((collection.sales / 1000) * 10) / 10 + "K"
                      : collection.sales}
                  </StatText>
                  sales
                </Stat>
                <Stat className="clickable" onClick={floorPrice}>
                  <StatText>
                    {!!collection.floor ? (
                      <>
                        <StatIcon>
                          <FaEthereum />
                        </StatIcon>
                        {Math.round(
                          parseFloat(
                            ethers.utils.formatEther(
                              ethers.utils.parseUnits(
                                collection.floor.toString(),
                                "gwei"
                              )
                            )
                          ) * 100000
                        ) / 100000}
                      </>
                    ) : (
                      "—"
                    )}
                  </StatText>
                  floor price
                </Stat>
                <Stat>
                  <StatText>
                    <StatIcon>
                      <FaEthereum />
                    </StatIcon>
                    {!!collection.volume
                      ? parseFloat(
                          ethers.utils.formatEther(
                            ethers.utils.parseUnits(
                              collection.volume.toString(),
                              "gwei"
                            )
                          )
                        ).toFixed(
                          collection.volume >= 100000000000
                            ? 0
                            : collection.volume >= 10000000000
                            ? 1
                            : 2
                        )
                      : "0.00"}
                  </StatText>
                  volume
                </Stat>
              </StatsGrid>
            )}
          </TopGrid>

          <Menu className="collection">
            <MenuItem
              className={selectedTab == 0 ? "selected" : null}
              onClick={() => updateSelectedTab(0)}
            >
              <MenuIcon>
                <IoGrid />
              </MenuIcon>
              Items
            </MenuItem>
            <MenuItem
              className={selectedTab == 1 ? "selected" : ""}
              onClick={() => updateSelectedTab(1)}
            >
              <MenuIcon>
                <FaHistory />
              </MenuIcon>
              Activity
            </MenuItem>
          </Menu>

          <BottomGrid>
            <BottomColumn
              className={
                collection.delisted || collection.is_spam ? "no-margin" : null
              }
            >
              {selectedTab == 0 && (
                <TokenFilters
                  collection={collection}
                  filters={filters}
                  setFilters={setFilters}
                  filtersUI={filtersUI}
                  setFiltersUI={setFiltersUI}
                  attributeFilters={attributeFilters}
                />
              )}

              {selectedTab == 1 && (
                <ActivityFilters
                  collection={collection}
                  filters={filters}
                  setFilters={setFilters}
                  filtersUI={filtersUI}
                  setFiltersUI={setFiltersUI}
                  attributeFilters={attributeFilters}
                />
              )}
            </BottomColumn>

            <BottomColumn
              className={
                collection.delisted || collection.is_spam ? "no-margin" : null
              }
            >
              {selectedTab == 0 && (
                <>
                  {filters.attributes.length > 0 ||
                  filters.chains.length > 0 ||
                  filters.minPrice ||
                  filters.maxPrice ? (
                    <ActiveFiltersGrid>
                      {!tokensState.tokensUpdating && tokensState.tokens && (
                        <>
                          {tokensState.tokens.count.toLocaleString()} item
                          {tokensState.tokens.count != 1 && "s"}
                        </>
                      )}

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
                              (filters.paymentToken != "all"
                                ? filters.paymentToken
                                : "")
                            : filters.minPrice
                            ? "> " +
                              filters.minPrice +
                              " " +
                              (filters.paymentToken != "all"
                                ? filters.paymentToken
                                : "")
                            : "< " +
                              filters.maxPrice +
                              " " +
                              (filters.paymentToken != "all"
                                ? filters.paymentToken
                                : "")}
                          <MdClose />
                        </ActiveFilterButton>
                      )}

                      {filters.chains.map((chain, index) => (
                        <ActiveFilterButton
                          key={index}
                          onClick={() =>
                            updateChains(false, chain, filters, setFilters)
                          }
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

                      {filters.attributes.map((attribute, index) => (
                        <ActiveFilterButton
                          key={index}
                          onClick={() =>
                            updateAttributes(
                              false,
                              {
                                trait_type: attribute.trait_type,
                                value: attribute.value,
                              },
                              filters,
                              setFilters
                            )
                          }
                        >
                          {attribute.trait_type}:{" "}
                          {attribute.value == "" ? "None" : attribute.value}
                          <MdClose />
                        </ActiveFilterButton>
                      ))}
                    </ActiveFiltersGrid>
                  ) : (
                    <MenuGrid>
                      {collection.contract_type == "ERC-721" && (
                        <SweepButton
                          collectionAddress={collection.address}
                          tokensState={tokensState}
                        />
                      )}
                      <SearchInputContainer className="item-search">
                        <GoSearch />
                        <DebounceInput
                          element={SearchInput}
                          minLength={1}
                          debounceTimeout={500}
                          placeholder="Search items"
                          value={filters.searchQuery}
                          onChange={(e) =>
                            updateSearchQuery(
                              e.target.value,
                              filters,
                              setFilters
                            )
                          }
                        />
                      </SearchInputContainer>
                      <SizeToggleContainer>
                        <SizeToggle
                          onClick={(e) => changeGridLayout(0)}
                          className={gridLayout == 0 ? "active" : null}
                        >
                          <BsFillGridFill />
                        </SizeToggle>
                        <SizeToggle
                          onClick={(e) => changeGridLayout(1)}
                          className={gridLayout == 1 ? "active right" : "right"}
                        >
                          <BsFillGrid3X3GapFill />
                        </SizeToggle>
                      </SizeToggleContainer>
                    </MenuGrid>
                  )}
                </>
              )}

              {selectedTab == 1 && (
                <>
                  {(stats.length > 1 ||
                    filters.attributes.length > 0 ||
                    filters.eventTypes.length > 0 ||
                    filters.chains.length > 0 ||
                    filters.minPrice ||
                    filters.maxPrice) && (
                    <ActiveFiltersGrid>
                      {stats.length > 1 && (
                        <SortDropdownContainer className="chart">
                          <SortDropdown
                            name="duration"
                            id="duration"
                            onChange={(e) => setChartHistory(e.target.value)}
                            className="chart"
                            defaultValue={chartHistory}
                          >
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="60">Last 60 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="all">All time</option>
                          </SortDropdown>
                          <SortDropdownChevron>
                            <FiChevronDown />
                          </SortDropdownChevron>
                        </SortDropdownContainer>
                      )}

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
                          onClick={() =>
                            updateChains(false, chain, filters, setFilters)
                          }
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
                              (filters.paymentToken != "all"
                                ? filters.paymentToken
                                : "")
                            : filters.minPrice
                            ? "> " +
                              filters.minPrice +
                              " " +
                              (filters.paymentToken != "all"
                                ? filters.paymentToken
                                : "")
                            : "< " +
                              filters.maxPrice +
                              " " +
                              (filters.paymentToken != "all"
                                ? filters.paymentToken
                                : "")}
                          <MdClose />
                        </ActiveFilterButton>
                      )}

                      {filters.attributes.map((attribute, index) => (
                        <ActiveFilterButton
                          key={index}
                          onClick={() =>
                            updateAttributes(
                              false,
                              {
                                trait_type: attribute.trait_type,
                                value: attribute.value,
                              },
                              filters,
                              setFilters
                            )
                          }
                        >
                          {attribute.trait_type}:{" "}
                          {attribute.value == "" ? "None" : attribute.value}
                          <MdClose />
                        </ActiveFilterButton>
                      ))}
                    </ActiveFiltersGrid>
                  )}
                </>
              )}

              {selectedTab == 0 && (
                <>
                  {!!tokensState.tokensUpdating ? (
                    <CardGrid className={gridLayout == 0 ? "large" : null}>
                      {[...Array(18)].map((e, i) => (
                        <AssetCardGhost key={i} />
                      ))}
                    </CardGrid>
                  ) : (
                    <>
                      {!!tokensState.tokenResults &&
                      tokensState.tokenResults.length > 0 ? (
                        <CardGrid className={gridLayout == 0 ? "large" : null}>
                          <InfiniteScroll
                            dataLength={tokensState.tokenResults.length}
                            next={fetchMoreTokens}
                            hasMore={tokensState.moreTokens}
                            loader={[...Array(6)].map((e, i) => (
                              <AssetCardGhost key={i} />
                            ))}
                            style={{ display: "contents", overflow: "visible" }}
                          >
                            {tokensState.tokenResults.map((token, index) => (
                              <AssetCard
                                token={token}
                                showCollection={false}
                                key={index}
                              />
                            ))}
                          </InfiniteScroll>
                        </CardGrid>
                      ) : (
                        <NoItems>
                          <h1>No items to display</h1>
                          <p>Try updating your selected filters</p>
                        </NoItems>
                      )}
                    </>
                  )}
                </>
              )}
              {selectedTab == 1 && (
                <CollectionActivity
                  collection={collection}
                  stats={stats}
                  setStats={setStats}
                  activityState={activityState}
                  setActivityState={setActivityState}
                  chartHistory={chartHistory}
                  colorData={data}
                />
              )}
            </BottomColumn>
          </BottomGrid>
        </ContainerExtended>
      </ContainerBackground>
    </ModalProvider>
  );
};
