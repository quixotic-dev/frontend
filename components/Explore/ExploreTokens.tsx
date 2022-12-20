import { MdClose } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { fetchMoreByURL } from "../../api/general";
import { State } from "../../store";
import { AssetCard } from "../AssetCard/AssetCard";
import { AssetCardGhost } from "../AssetCard/AssetCardGhost";
import { CardGrid } from "../AssetCard/styles";
import { ActiveCollectionButton } from "../Common/Filters/Filters";
import { updatePriceFilter } from "../Common/Filters/FilterUtils";
import {
  ActiveFilterButton,
  ActiveFiltersGrid,
} from "../Common/Filters/styles";
import { NoItems } from "../Common/styles";
import { TokenFilters } from "./Filters/TokenFilters";
import { GridCol, TwoColGrid } from "./styles";

export const ExploreTokens = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
  pageState,
  setPageState,
  collectionFilters,
  setCollectionFilters,
}) => {
  const gridLayout = useSelector((state: State) => state.gridLayout);

  async function fetchMoreTokens() {
    const moreTokens = await fetchMoreByURL(pageState.tokens.next);

    setPageState({
      ...pageState,
      tokens: moreTokens,
      moreTokens: moreTokens.next ? true : false,
      tokenResults: pageState.tokenResults.concat(moreTokens.results),
    });
  }

  return (
    <TwoColGrid>
      <TokenFilters
        filters={filters}
        setFilters={setFilters}
        filtersUI={filtersUI}
        setFiltersUI={setFiltersUI}
        collectionFilters={collectionFilters}
        setCollectionFilters={setCollectionFilters}
      />

      <GridCol>
        {(filters.collections.length > 0 ||
          filters.minPrice ||
          filters.maxPrice) && (
          <ActiveFiltersGrid>
            {!pageState.tokensUpdating && (
              <>
                {pageState.tokens.count.toLocaleString()} item
                {pageState.tokens.count != 1 && "s"}
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
        )}

        {!!pageState.tokensUpdating ? (
          <CardGrid className={gridLayout == 0 ? "large" : null}>
            {[...Array(18)].map((e, i) => (
              <AssetCardGhost key={i} />
            ))}
          </CardGrid>
        ) : (
          <>
            {!!pageState.tokenResults && pageState.tokenResults.length > 0 ? (
              <CardGrid className={gridLayout == 0 ? "large" : null}>
                <InfiniteScroll
                  dataLength={pageState.tokenResults.length}
                  next={fetchMoreTokens}
                  hasMore={pageState.moreTokens}
                  loader={[...Array(6)].map((e, i) => (
                    <AssetCardGhost key={i} />
                  ))}
                  style={{ display: "contents", overflow: "visible" }}
                >
                  {pageState.tokenResults.map((token, index) => (
                    <AssetCard token={token} key={index} />
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
      </GridCol>
    </TwoColGrid>
  );
};
