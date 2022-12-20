import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import {
  FaHistory,
  FaImages,
  FaRegHeart,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoGrid } from "react-icons/io5";
import { MdAdd, MdContentCopy, MdOutlineFeaturedVideo } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { usePalette } from "react-palette";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfileFollow } from "../../api/discover";
import { fetchMoreByURL } from "../../api/general";
import {
  fetchProfileCollections,
  fetchProfileFilteredActivity,
  fetchProfileFilteredTokens,
} from "../../api/profile";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateLogin } from "../../store/login";
import { updateProfile } from "../../store/profile";

import { ProfileImage } from "../Common/Images/ProfileImage";
import { Menu, MenuIcon, MenuItem } from "../Common/Menu/styles";
import { TextTruncater } from "../Common/styles";
import { ActivityFilters } from "./Filters/ActivityFilters";
import { TokenFilters } from "./Filters/TokenFilters";
import { ProfileActivity } from "./ProfileActivity";
import { ProfileCreated } from "./ProfileCreated";
import { ProfileErc1155Tokens } from "./ProfileErc1155Tokens";
import { ProfileFeaturedTokens } from "./ProfileFeaturedTokens";
import { ProfileHiddenTokens } from "./ProfileHiddenTokens";
import { ProfileLikedTokens } from "./ProfileLikedTokens";
import { ProfileTokens } from "./ProfileTokens";
import {
  CardSection,
  ContainerBackground,
  ContainerExtended,
  ENSBadge,
  FollowButton,
  ProfileBadge,
  ProfileBadgeGrid,
  ProfileBadgeIcon,
  ProfileBio,
  ProfileCoverImage,
  ProfileEditButton,
  ProfileImageContainer,
  ProfileImageEditIcon,
  ProfileSection,
  BottomGrid,
  TopGrid,
  ProfileTextContainer,
  ProfileUsername,
  TwoColGrid,
  UsernameContainer,
} from "./styles";

export const Profile = ({ profile, tab }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const current_user = useSelector((state: State) => state.profile);
  const username =
    profile.username || profile.reverse_ens || profile.address.slice(0, 6);

  const { data } = usePalette(profile.profile_image);

  const [selectedTab, setSelectedTab] = useState(tab);
  const [paramsLoaded, setParamsLoaded] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [activityLoaded, setActivityLoaded] = useState(false);

  const [tokensState, setTokensState] = useState({
    tokens: null,
    moreTokens: false,
    tokenResults: [],
    tokensUpdating: true,
  });

  const [erc1155TokensState, setErc1155TokensState] = useState({
    tokens: null,
    moreTokens: false,
    tokenResults: [],
    tokensUpdating: true,
  });

  const [activityState, setActivityState] = useState({
    activity: null,
    moreActivity: false,
    activityResults: [],
    activityUpdating: true,
  });

  const [createdState, setCreatedState] = useState({
    collections: null,
    moreCollections: false,
    collectionResults: [],
    collectionsUpdating: true,
  });

  const [likedTokensState, setLikedTokensState] = useState({
    tokens: null,
    moreTokens: false,
    tokenResults: [],
    tokensUpdating: true,
  });

  const [hiddenTokensState, setHiddenTokensState] = useState({
    tokens: null,
    moreTokens: false,
    tokenResults: [],
    tokensUpdating: true,
  });

  const [filtersUI, setFiltersUI] = useState({
    filtersVisible: false,
    sortCollapsed: false,
    availabilityCollapsed: false,
    eventTypesCollapsed: false,
    priceCollapsed: false,
    paymentTokenCollapsed: false,
    collectionsCollapsed: false,
    chainsCollapsed: false,
  });

  const [filters, setFilters] = useState({
    tokenSort: "price:desc",
    activitySort: "timestamp:desc",
    availability: "all",
    eventTypes: [],
    minPrice: "",
    maxPrice: "",
    paymentToken: "all",
    collections: [],
    chains: [],
    searchQuery: "",
  });

  const [collectionFilters, setCollectionFilters] = useState({
    collections: null,
    moreCollections: false,
    collectionResults: [],
  });

  async function fetchMoreTokens() {
    if (tokensState.tokens && tokensState.tokens.next) {
      const moreTokens = await fetchMoreByURL(tokensState.tokens.next);

      setTokensState({
        ...tokensState,
        tokens: moreTokens,
        moreTokens: moreTokens.next ? true : false,
        tokenResults: tokensState.tokenResults.concat(moreTokens.results),
      });
    }
  }

  async function fetchMoreErc1155Tokens() {
    if (erc1155TokensState.tokens && erc1155TokensState.tokens.next) {
      const moreTokens = await fetchMoreByURL(erc1155TokensState.tokens.next);

      setErc1155TokensState({
        ...erc1155TokensState,
        tokens: moreTokens,
        moreTokens: moreTokens.next ? true : false,
        tokenResults: erc1155TokensState.tokenResults.concat(
          moreTokens.results
        ),
      });
    }
  }

  const updateTokens = async () => {
    setTokensState({
      ...tokensState,
      tokensUpdating: true,
    });

    const updatedTokens = await fetchProfileFilteredTokens(
      profile.address,
      filters.collections,
      filters.availability,
      filters.tokenSort,
      filters.minPrice,
      filters.maxPrice,
      filters.paymentToken,
      filters.chains,
      filters.searchQuery,
      true,
      false
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

  const updateErc1155Tokens = async () => {
    setErc1155TokensState({
      ...erc1155TokensState,
      tokensUpdating: true,
    });

    const updatedTokens = await fetchProfileFilteredTokens(
      profile.address,
      filters.collections,
      filters.availability,
      filters.tokenSort,
      filters.minPrice,
      filters.maxPrice,
      filters.paymentToken,
      filters.chains,
      filters.searchQuery,
      false,
      true
    );

    if (updatedTokens) {
      setErc1155TokensState({
        ...erc1155TokensState,
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

    const updatedActivity = await fetchProfileFilteredActivity(
      profile.address,
      filters.activitySort,
      filters.collections,
      filters.eventTypes,
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

  const updateSelectedTab = (tab) => {
    setSelectedTab(tab);
    router.query.tab = tab;
    router.push(router, undefined, { shallow: true, scroll: false });
  };

  const copyAddress = async (e) => {
    e.preventDefault();

    await navigator.clipboard.writeText(profile.address);
    setAddressCopied(true);

    toast.success("Copied address to clipboard");

    setTimeout(() => {
      setAddressCopied(false);
    }, 2000);
  };

  useEffect(() => {
    if (
      (router.query.availability ||
        router.query.sort ||
        router.query.price ||
        router.query.collections ||
        router.query.eventTypes ||
        router.query.chains ||
        router.query.query ||
        router.query.collection ||
        router.query.currency) &&
      !paramsLoaded
    ) {
      const availabilityParam = router.query.availability
        ? String(router.query.availability)
        : "all";
      const sortParam = router.query.sort
        ? String(router.query.sort)
        : "price:asc";
      const activitySortParam = router.query.activitySort
        ? String(router.query.activitySort)
        : "timestamp:desc";
      const priceArr = router.query.price
        ? String(router.query.price).split(":")
        : [];

      const chainsParam = router.query.chains
        ? String(router.query.chains)
            .split("&chain=")
            .map((event) => {
              if (event != "") {
                return event.replace("chain=", "");
              }
            })
            .filter(function (e) {
              return e !== undefined;
            })
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
      let collectionsParam = router.query.collections
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

      if (router.query.collection) {
        collectionsParam = [String(router.query.collection)];
      }

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
        : [];

      const searchQueryParam = router.query.query
        ? String(router.query.query)
        : "";

      setFilters({
        ...filters,
        collections: collectionsParam,
        availability: availabilityParam,
        eventTypes: eventTypesParam,
        tokenSort: sortParam,
        activitySort: activitySortParam,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
        paymentToken: paymentTokenParam,
        chains: chainsParam,
        searchQuery: searchQueryParam,
      });

      setParamsLoaded(true);
    }
  }, [router]);

  useEffect(() => {
    if (router.query.tab) {
      setSelectedTab(router.query.tab);
    } else {
      setSelectedTab(0);
    }
  }, [router]);

  useEffect(() => {
    if (selectedTab == 2 && !activityLoaded) {
      setActivityLoaded(true);
      updateActivity();
    }
  }, [selectedTab]);

  useEffect(() => {
    updateTokens();
    updateErc1155Tokens();

    if (activityLoaded) {
      updateActivity();
    }
  }, [filters, profile]);

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await fetchProfileCollections(profile.address);

      setCollectionFilters({
        ...collectionFilters,
        collections: collections,
        moreCollections: collections.next ? true : false,
        collectionResults: collections.results,
      });
    };

    fetchCollections();
  }, [profile]);

  const [profileFollowed, setProfileFollowed] = useState(false);

  const updateFollowStatus = async (e) => {
    if (!current_user) {
      return updateLogin(true, dispatch);
    }

    if (profileFollowed) {
      setProfileFollowed(false);
      const res = await updateProfileFollow(
        current_user.address,
        profile.address,
        "unfollow",
        "profile"
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setProfileFollowed(true);
      }
    } else {
      setProfileFollowed(true);
      const res = await updateProfileFollow(
        current_user.address,
        profile.address,
        "follow",
        "profile"
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setProfileFollowed(false);
      }
    }
  };

  useEffect(() => {
    if (current_user && current_user.followed_profiles) {
      setProfileFollowed(
        current_user.followed_profiles.includes(profile.address)
      );
    }
  }, [current_user]);

  return (
    <ContainerBackground>
      <ProfileCoverImage
        color={
          data.lightMuted && !profile.cover_image ? data.lightMuted : "#bbbbbb"
        }
        className={profile.cover_image ? "fullOpacity" : null}
      >
        {profile.cover_image && (
          <Image
            src={profile.cover_image}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        )}
      </ProfileCoverImage>

      <ContainerExtended>
        <TopGrid>
          <ProfileImageContainer>
            <ProfileImage profile={profile} />
            {current_user &&
              current_user.address == profile.address &&
              !profile.profile_image && (
                <Link href="/settings" passHref>
                  <a>
                    <ProfileImageEditIcon>
                      <BsPlus />
                    </ProfileImageEditIcon>
                  </a>
                </Link>
              )}
          </ProfileImageContainer>

          <ProfileTextContainer>
            <UsernameContainer>
              {username && <ProfileUsername>{username}</ProfileUsername>}
              {/* {current_user &&
                current_user.address != profile.address &&
                (profileFollowed ? (
                  <FollowButton onClick={updateFollowStatus}>
                    Unfollow
                  </FollowButton>
                ) : (
                  <FollowButton className="follow" onClick={updateFollowStatus}>
                    <MdAdd />
                    Follow
                  </FollowButton>
                ))} */}
            </UsernameContainer>

            <ProfileBadgeGrid>
              {profile.address && (
                <a
                  href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/address/${profile.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProfileBadge>
                    {profile.address.slice(0, 6)}
                    <ProfileBadgeIcon
                      onClick={
                        addressCopied ? (e) => e.preventDefault() : copyAddress
                      }
                    >
                      {addressCopied ? (
                        <RiCheckboxCircleFill />
                      ) : (
                        <MdContentCopy />
                      )}
                    </ProfileBadgeIcon>
                  </ProfileBadge>
                </a>
              )}
              {profile.reverse_ens && (
                <a
                  href={`https://etherscan.io/enslookup-search?search=${profile.reverse_ens}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProfileBadge>
                    <ENSBadge>ENS</ENSBadge>
                    <TextTruncater>{profile.reverse_ens}</TextTruncater>
                  </ProfileBadge>
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProfileBadge>
                    <FaTwitter />
                    {profile.twitter.replace("https://twitter.com/", "")}
                  </ProfileBadge>
                </a>
              )}
            </ProfileBadgeGrid>
            {profile.bio && <ProfileBio>{profile.bio}</ProfileBio>}
          </ProfileTextContainer>
        </TopGrid>

        <Menu className="profile">
          {/* {true && (
            <MenuItem
              className={selectedTab == 5 ? "selected" : null}
              onClick={() => updateSelectedTab(5)}
            >
              <MenuIcon>
                <FaStar />
              </MenuIcon>
              Featured
            </MenuItem>
          )} */}
          <MenuItem
            className={selectedTab == 0 ? "selected" : null}
            onClick={() => updateSelectedTab(0)}
          >
            <MenuIcon>
              <FaImages />
            </MenuIcon>
            NFTs
            {tokensState.tokens && tokensState.tokens.count > 0 && (
              <MenuIcon>{tokensState.tokens.count.toLocaleString()}</MenuIcon>
            )}
          </MenuItem>
          <MenuItem
            className={selectedTab == 6 ? "selected" : null}
            onClick={() => updateSelectedTab(6)}
          >
            <MenuIcon>
              <FaImages />
            </MenuIcon>
            ERC-1155 NFTs
            {erc1155TokensState.tokens &&
              erc1155TokensState.tokens.count > 0 && (
                <MenuIcon>
                  {erc1155TokensState.tokens.count.toLocaleString()}
                </MenuIcon>
              )}
          </MenuItem>
          <MenuItem
            className={selectedTab == 3 ? "selected" : null}
            onClick={() => updateSelectedTab(3)}
          >
            <MenuIcon>
              <IoGrid />
            </MenuIcon>
            Created
            {/* {createdState.collections && createdState.collections.count > 0 && (
              <MenuIcon>
                {createdState.collections.count.toLocaleString()}
              </MenuIcon>
            )} */}
          </MenuItem>
          <MenuItem
            className={selectedTab == 1 ? "selected" : null}
            onClick={() => updateSelectedTab(1)}
          >
            <MenuIcon>
              <FaRegHeart />
            </MenuIcon>
            Favorited
            {/* {likedTokensState.tokens && likedTokensState.tokens.count > 0 && (
              <MenuIcon>{likedTokensState.tokens.count}</MenuIcon>
            )} */}
          </MenuItem>
          {current_user && current_user.address == profile.address && (
            <MenuItem
              className={selectedTab == 4 ? "selected" : null}
              onClick={() => updateSelectedTab(4)}
            >
              <MenuIcon>
                <BiHide />
              </MenuIcon>
              Hidden
            </MenuItem>
          )}
          <MenuItem
            className={selectedTab == 2 ? "selected" : null}
            onClick={() => updateSelectedTab(2)}
          >
            <MenuIcon>
              <FaHistory />
            </MenuIcon>
            Activity
          </MenuItem>
          {current_user && current_user.address == profile.address && (
            <MenuItem className="edit">
              <Link href="/settings" passHref>
                <a>
                  <ProfileEditButton>
                    <MenuIcon>
                      <FiEdit />
                    </MenuIcon>
                    Edit
                  </ProfileEditButton>
                </a>
              </Link>
            </MenuItem>
          )}
        </Menu>
        <BottomGrid
          className={
            selectedTab == 0 || selectedTab == 2 || selectedTab == 6
              ? "two-column"
              : null
          }
        >
          {(selectedTab == 0 || selectedTab == 6) && (
            <TokenFilters
              filters={filters}
              setFilters={setFilters}
              filtersUI={filtersUI}
              setFiltersUI={setFiltersUI}
              collectionFilters={collectionFilters}
              setCollectionFilters={setCollectionFilters}
            />
          )}

          {selectedTab == 2 && (
            <ActivityFilters
              filters={filters}
              setFilters={setFilters}
              filtersUI={filtersUI}
              setFiltersUI={setFiltersUI}
              collectionFilters={collectionFilters}
              setCollectionFilters={setCollectionFilters}
            />
          )}

          <CardSection>
            {/* {selectedTab == 5 && (
              <ProfileFeaturedTokens
                profileAddress={profile.address}
                tokensState={hiddenTokensState}
                setTokensState={setHiddenTokensState}
                updateTokens={updateTokens}
              />
            )} */}

            {selectedTab == 0 && (
              <ProfileTokens
                tokensState={tokensState}
                setTokensState={setTokensState}
                fetchMoreTokens={fetchMoreTokens}
                profileAddress={profile.address}
                filters={filters}
                setFilters={setFilters}
                collectionFilters={collectionFilters}
              />
            )}
            {selectedTab == 6 && (
              <ProfileErc1155Tokens
                tokensState={erc1155TokensState}
                setTokensState={setErc1155TokensState}
                fetchMoreTokens={fetchMoreErc1155Tokens}
                profileAddress={profile.address}
                filters={filters}
                setFilters={setFilters}
                collectionFilters={collectionFilters}
              />
            )}
            {selectedTab == 1 && (
              <ProfileLikedTokens
                profileAddress={profile.address}
                tokensState={likedTokensState}
                setTokensState={setLikedTokensState}
              />
            )}
            {selectedTab == 2 && (
              <ProfileActivity
                address={profile.address}
                activityState={activityState}
                setActivityState={setActivityState}
                filters={filters}
                setFilters={setFilters}
                collectionFilters={collectionFilters}
              />
            )}
            {selectedTab == 3 && (
              <ProfileCreated
                profileAddress={profile.address}
                createdState={createdState}
                setCreatedState={setCreatedState}
              />
            )}
            {selectedTab == 4 && (
              <ProfileHiddenTokens
                profileAddress={profile.address}
                tokensState={hiddenTokensState}
                setTokensState={setHiddenTokensState}
                updateTokens={updateTokens}
              />
            )}
          </CardSection>
        </BottomGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
