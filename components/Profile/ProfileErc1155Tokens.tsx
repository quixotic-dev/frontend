import { DebounceInput } from "react-debounce-input";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { featureToken, hideToken } from "../../api/profile";
import { State } from "../../store";
import { updateGridLayout } from "../../store/gridLayout";
import { AssetCard } from "../AssetCard/AssetCard";
import { AssetCardGhost } from "../AssetCard/AssetCardGhost";
import { CardGrid } from "../AssetCard/styles";
import {
  SearchInput,
  SearchInputContainer,
  SizeToggle,
  SizeToggleContainer,
} from "../Collection/styles";
import { ActiveCollectionButton } from "../Common/Filters/Filters";
import {
  updatePriceFilter,
  updateSearchQuery,
} from "../Common/Filters/FilterUtils";
import {
  ActiveFilterButton,
  ActiveFiltersGrid,
} from "../Common/Filters/styles";
import { NoItems } from "../Common/styles";

export const ProfileErc1155Tokens = ({
  tokensState,
  setTokensState,
  filters,
  setFilters,
  fetchMoreTokens,
  collectionFilters,
  profileAddress,
}) => {
  const dispatch = useDispatch();

  const gridLayout = useSelector((state: State) => state.gridLayout);

  const hide = async (e, token) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await hideToken(
      profileAddress,
      token.contract_address,
      token.token_id
    );
    if (res) {
      setTokensState({
        ...tokensState,
        tokenResults: tokensState.tokenResults.filter((e) => e != token),
      });
    } else {
      return toast.error("Error hiding token from profile");
    }
  };

  const feature = async (e, token) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await featureToken(
      profileAddress,
      token.contract_address,
      token.token_id
    );
    if (res) {
      return;
      setTokensState({
        ...tokensState,
        tokenResults: tokensState.tokenResults.filter((e) => e != token),
      });
    } else {
      return toast.error("Error featuring token on profile");
    }
  };

  const changeGridLayout = (mode) => {
    window.localStorage.setItem("gridLayout", String(mode));
    updateGridLayout(mode, dispatch);
  };

  return (
    <>
      {filters.collections.length > 0 ||
      filters.minPrice ||
      filters.maxPrice ? (
        <ActiveFiltersGrid>
          {!tokensState.tokensUpdating && (
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
      ) : (
        <ActiveFiltersGrid>
          <SearchInputContainer className="item-search">
            <FaSearch />
            <DebounceInput
              element={SearchInput}
              minLength={1}
              debounceTimeout={500}
              placeholder="Search items"
              value={filters.searchQuery}
              onChange={(e) =>
                updateSearchQuery(e.target.value, filters, setFilters)
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
        </ActiveFiltersGrid>
      )}

      {!!tokensState.tokensUpdating ? (
        <CardGrid className={gridLayout == 0 ? "large" : null}>
          {[...Array(18)].map((e, i) => (
            <AssetCardGhost key={i} />
          ))}
        </CardGrid>
      ) : (
        <>
          {!!tokensState.tokenResults && tokensState.tokenResults.length > 0 ? (
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
                    profile={profileAddress}
                    hideToken={hide}
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
  );
};
