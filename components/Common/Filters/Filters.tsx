import Image from "next/image";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { BsIntersect, BsUnion } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdClose, MdVerified } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { PriceImage } from "../../Asset/AssetButtons/styles";
import { CollectionImage } from "../Images/CollectionImage";
import { TextTruncater } from "../styles";
import {
  activityIconRegistry,
  chainRegistry,
  eligiblePaymentTokens,
} from "../Utils";
import {
  fetchMoreCollectionFilters,
  updateActivitySort,
  updateAttributeIntersect,
  updateAttributes,
  updateAvailability,
  updateChains,
  updateCollections,
  updateEventTypes,
  updatePaymentTokenFilter,
  updatePriceFilter,
  updateTokenSort,
} from "./FilterUtils";
import {
  ActiveFilterButton,
  AttrbiuteContainer,
  AttributeRarity,
  CollectionCheckbox,
  CollectionImageContainer,
  Filter,
  FilterAttribute,
  FilterAttributeName,
  FilterCheckbox,
  FilterGrid,
  FilterIcon,
  FilterInput,
  FilterInputContainer,
  FilterLabel,
  FilterMultiSelect,
  FilterPriceGrid,
  FilterSelect,
  SortDropdown,
  SortDropdownChevron,
  SortDropdownContainer,
  VerifiedIcon,
} from "./styles";

export const ActiveCollectionButton = ({ collection, filters, setFilters }) => {
  return (
    <ActiveFilterButton
      onClick={() =>
        updateCollections(false, collection.address, filters, setFilters)
      }
    >
      <CollectionImageContainer>
        <CollectionImage collection={collection} />
      </CollectionImageContainer>
      {collection.name}
      <MdClose />
    </ActiveFilterButton>
  );
};

export const TokenSortFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
  collection = null,
  profile = null,
}) => {
  return (
    <Filter>
      <FilterLabel
        className="first"
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            sortCollapsed: !filtersUI.sortCollapsed,
          })
        }
      >
        Sort
        {filtersUI.sortCollapsed ? <FiChevronRight /> : <FiChevronDown />}
      </FilterLabel>
      {!filtersUI.sortCollapsed && (
        <FilterGrid>
          <SortDropdownContainer>
            <SortDropdown
              name="duration"
              id="duration"
              onChange={(e) =>
                updateTokenSort(e.target.value, filters, setFilters)
              }
              defaultValue={filters.tokenSort}
            >
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="highest_offer:desc">Highest Offer</option>
              {profile && <option value="rank:asc">Rarity Rank</option>}
              {collection && collection.ranking_enabled && (
                <>
                  <option value="rank:asc">Rarity: Rare to Common</option>
                  <option value="rank:desc">Rarity: Common to Rare</option>
                </>
              )}
              <option value="expiration_timestamp:asc">Ending: Soonest</option>
              <option value="expiration_timestamp:desc">Ending: Latest</option>
              {profile && (
                <>
                  <option value="id:desc">Minted: Newest</option>
                  <option value="id:asc">Minted: Oldest</option>
                </>
              )}
              {collection && (
                <>
                  <option value="token_id:desc">Minted: Newest</option>
                  <option value="token_id:asc">Minted: Oldest</option>
                </>
              )}
              <option value="listed_timestamp:desc">Listed: Newest</option>
              <option value="listed_timestamp:asc">Listed: Oldest</option>
            </SortDropdown>
            <SortDropdownChevron>
              <FiChevronDown />
            </SortDropdownChevron>
          </SortDropdownContainer>
        </FilterGrid>
      )}
    </Filter>
  );
};

export const ActivitySortFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
}) => {
  return (
    <Filter>
      <FilterLabel
        className="first"
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            sortCollapsed: !filtersUI.sortCollapsed,
          })
        }
      >
        Sort
        {filtersUI.sortCollapsed ? <FiChevronRight /> : <FiChevronDown />}
      </FilterLabel>
      {!filtersUI.sortCollapsed && (
        <FilterGrid>
          <SortDropdownContainer>
            <SortDropdown
              name="duration"
              id="duration"
              onChange={(e) =>
                updateActivitySort(e.target.value, filters, setFilters)
              }
              defaultValue={filters.activitySort}
            >
              <option value="timestamp:desc">Most Recent</option>
              <option value="timestamp:asc">Oldest</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
            </SortDropdown>
            <SortDropdownChevron>
              <FiChevronDown />
            </SortDropdownChevron>
          </SortDropdownContainer>
        </FilterGrid>
      )}
    </Filter>
  );
};

export const PriceFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
}) => {
  return (
    <Filter>
      <FilterLabel
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            priceCollapsed: !filtersUI.priceCollapsed,
          })
        }
      >
        Price
        {filtersUI.priceCollapsed ? <FiChevronRight /> : <FiChevronDown />}
      </FilterLabel>
      {!filtersUI.priceCollapsed && (
        <FilterGrid>
          <FilterPriceGrid>
            <FilterInputContainer>
              <DebounceInput
                element={FilterInput}
                minLength={1}
                debounceTimeout={300}
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) =>
                  updatePriceFilter(
                    e.target.value,
                    filters.maxPrice,
                    filters.paymentToken,
                    filters,
                    setFilters
                  )
                }
              />
            </FilterInputContainer>
            <FilterInputContainer>
              <DebounceInput
                element={FilterInput}
                minLength={1}
                debounceTimeout={300}
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) =>
                  updatePriceFilter(
                    filters.minPrice,
                    e.target.value,
                    filters.paymentToken,
                    filters,
                    setFilters
                  )
                }
              />
            </FilterInputContainer>
          </FilterPriceGrid>
        </FilterGrid>
      )}
    </Filter>
  );
};

export const CurrencyFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
}) => {
  return (
    <Filter>
      <FilterLabel
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            paymentTokenCollapsed: !filtersUI.paymentTokenCollapsed,
          })
        }
      >
        Currency
        {filtersUI.paymentTokenCollapsed ? (
          <FiChevronRight />
        ) : (
          <FiChevronDown />
        )}
      </FilterLabel>
      {!filtersUI.paymentTokenCollapsed && (
        <FilterGrid>
          <FilterSelect
            className={
              filters.paymentToken == "all" ? "active currency" : "currency"
            }
            onClick={() => updatePaymentTokenFilter("all", filters, setFilters)}
          >
            All
          </FilterSelect>
          {eligiblePaymentTokens.map((paymentToken, index) => (
            <FilterSelect
              className={
                filters.paymentToken == paymentToken
                  ? "active currency"
                  : "currency"
              }
              onClick={() =>
                updatePaymentTokenFilter(paymentToken, filters, setFilters)
              }
              key={index}
            >
              <PriceImage>
                <Image
                  src={`/payment_tokens/${paymentToken}.png`}
                  alt=""
                  layout="responsive"
                  objectFit="contain"
                  objectPosition="center"
                  width={50}
                  height={50}
                  priority
                />
              </PriceImage>
              {paymentToken}
            </FilterSelect>
          ))}
        </FilterGrid>
      )}
    </Filter>
  );
};

export const ChainFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
}) => {
  return (
    <Filter>
      <FilterLabel
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            chainsCollapsed: !filtersUI.chainsCollapsed,
          })
        }
      >
        Chain
        {filtersUI.chainsCollapsed ? <FiChevronRight /> : <FiChevronDown />}
      </FilterLabel>
      {!filtersUI.chainsCollapsed && (
        <FilterGrid>
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={filters.chains.filter((e) => e == "opt").length > 0}
                onChange={(e) =>
                  updateChains(e.target.checked, "opt", filters, setFilters)
                }
              />
              <span className="event">
                <PriceImage>
                  <Image
                    src={`/payment_tokens/OP.png`}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    width={50}
                    height={50}
                    priority
                  />
                </PriceImage>{" "}
                {chainRegistry["opt"]}
              </span>
            </label>
          </FilterMultiSelect>
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={filters.chains.filter((e) => e == "eth").length > 0}
                onChange={(e) =>
                  updateChains(e.target.checked, "eth", filters, setFilters)
                }
              />
              <span className="event">
                <PriceImage>
                  <Image
                    src={`/payment_tokens/ETH.png`}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    width={50}
                    height={50}
                    priority
                  />
                </PriceImage>{" "}
                {chainRegistry["eth"]}
              </span>
            </label>
          </FilterMultiSelect>
        </FilterGrid>
      )}
    </Filter>
  );
};

export const AvailabilityFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
}) => {
  return (
    <Filter>
      <FilterLabel
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            availabilityCollapsed: !filtersUI.availabilityCollapsed,
          })
        }
      >
        Availability
        {filtersUI.availabilityCollapsed ? (
          <FiChevronRight />
        ) : (
          <FiChevronDown />
        )}
      </FilterLabel>
      {!filtersUI.availabilityCollapsed && (
        <FilterGrid>
          <FilterSelect
            className={
              filters.availability == "all" || filters.availability == ""
                ? "active"
                : null
            }
            onClick={() => updateAvailability("all", filters, setFilters)}
          >
            All
            {/* <ItemCount>
              {collection.supply > 999
                ? Math.floor((collection.supply / 1000) * 10) / 10 + "K"
                : collection.supply}
            </ItemCount> */}
          </FilterSelect>
          <FilterSelect
            className={filters.availability == "forSale" ? "active" : null}
            onClick={() => updateAvailability("forSale", filters, setFilters)}
          >
            Buy Now
          </FilterSelect>
          <FilterSelect
            className={filters.availability == "hasOffers" ? "active" : null}
            onClick={() => updateAvailability("hasOffers", filters, setFilters)}
          >
            Has Offers
          </FilterSelect>
          <FilterSelect
            className={filters.availability == "notListed" ? "active" : null}
            onClick={() => updateAvailability("notListed", filters, setFilters)}
          >
            Not Listed
          </FilterSelect>
        </FilterGrid>
      )}
    </Filter>
  );
};

export const EventTypesFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
}) => {
  return (
    <Filter>
      <FilterLabel
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            eventTypeCollapsed: !filtersUI.eventTypeCollapsed,
          })
        }
      >
        Event Type
        {filtersUI.eventTypeCollapsed ? <FiChevronRight /> : <FiChevronDown />}
      </FilterLabel>
      {!filtersUI.eventTypeCollapsed && (
        <FilterGrid className="small">
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "Sale").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "Sale",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">{activityIconRegistry["Sale"]} Sale</span>
            </label>
          </FilterMultiSelect>
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "Transfer").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "Transfer",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">
                {activityIconRegistry["Transfer"]} Transfer
              </span>
            </label>
          </FilterMultiSelect>
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "List").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "List",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">{activityIconRegistry["List"]} List</span>
            </label>
          </FilterMultiSelect>
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "Offer").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "Offer",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">
                {activityIconRegistry["Offer"]} Offer
              </span>
            </label>
          </FilterMultiSelect>
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "Mint").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "Mint",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">{activityIconRegistry["Mint"]} Mint</span>
            </label>
          </FilterMultiSelect>
          {/* <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "Airdrop").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "Airdrop",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">
                {activityIconRegistry["Airdrop"]} Airdrop
              </span>
            </label>
          </FilterMultiSelect> */}
          {/* <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "Burn").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "Burn",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">{activityIconRegistry["Burn"]} Burn</span>
            </label>
          </FilterMultiSelect> */}
          <FilterMultiSelect>
            <label>
              <input
                type="checkbox"
                checked={
                  filters.eventTypes.filter((e) => e == "Bridge").length > 0
                }
                onChange={(e) =>
                  updateEventTypes(
                    e.target.checked,
                    "Bridge",
                    filters,
                    setFilters
                  )
                }
              />
              <span className="event">
                {activityIconRegistry["Bridge"]} Bridge
              </span>
            </label>
          </FilterMultiSelect>
        </FilterGrid>
      )}
    </Filter>
  );
};

export const IntersectAttributesFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
}) => {
  return (
    <Filter>
      <FilterLabel
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            intersectAttributesCollapsed:
              !filtersUI.intersectAttributesCollapsed,
          })
        }
      >
        Attribute Filter Method
        {filtersUI.intersectAttributesCollapsed ? (
          <FiChevronRight />
        ) : (
          <FiChevronDown />
        )}
      </FilterLabel>
      {!filtersUI.intersectAttributesCollapsed && (
        <FilterGrid className="small">
          <FilterSelect
            className={
              filters.intersectAttributes ? "currency" : "active currency"
            }
            onClick={() => updateAttributeIntersect(false, filters, setFilters)}
          >
            <FilterIcon>
              <BsUnion />
            </FilterIcon>
            Union
          </FilterSelect>
          <FilterSelect
            className={
              filters.intersectAttributes ? "active currency" : "currency"
            }
            onClick={() => updateAttributeIntersect(true, filters, setFilters)}
          >
            <FilterIcon>
              <BsIntersect />
            </FilterIcon>
            Intersect
          </FilterSelect>
        </FilterGrid>
      )}
    </Filter>
  );
};

export const AttributeFilter = ({ attribute, supply, filters, setFilters }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [query, setQuery] = useState("");

  return (
    <Filter>
      <FilterLabel onClick={() => setCollapsed(!collapsed)}>
        {attribute.trait_type}
        {collapsed ? <FiChevronRight /> : <FiChevronDown />}
      </FilterLabel>
      {!collapsed && (
        <>
          <FilterInputContainer className="search">
            <FaSearch />
            <FilterInput
              placeholder=""
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </FilterInputContainer>
          <FilterGrid>
            {attribute.value
              .filter((e) => e[0].toLowerCase().includes(query.toLowerCase()))
              .map((value, index) => (
                <FilterAttribute key={index}>
                  <FilterCheckbox
                    type="checkbox"
                    checked={
                      filters.attributes.filter(
                        (e) =>
                          e.trait_type === attribute.trait_type &&
                          e.value === value[0]
                      ).length > 0
                    }
                    onChange={(e) =>
                      updateAttributes(
                        e.target.checked,
                        {
                          trait_type: attribute.trait_type,
                          value: value[0],
                        },
                        filters,
                        setFilters
                      )
                    }
                  />
                  <AttrbiuteContainer>
                    <TextTruncater>
                      {value[0] == "" ? "None" : value[0]}
                    </TextTruncater>
                    <AttributeRarity>
                      {Math.round(value[1] * supply).toLocaleString()} (
                      {(value[1] * 100).toFixed(1)}%)
                    </AttributeRarity>
                  </AttrbiuteContainer>
                </FilterAttribute>
              ))}
          </FilterGrid>
        </>
      )}
    </Filter>
  );
};

export const CollectionFilter = ({
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
  collectionFilters,
  setCollectionFilters,
}) => {
  return (
    <Filter>
      <FilterLabel
        onClick={() =>
          setFiltersUI({
            ...filtersUI,
            collectionsCollapsed: !filtersUI.collectionsCollapsed,
          })
        }
      >
        Collection
        {filtersUI.collectionsCollapsed ? (
          <FiChevronRight />
        ) : (
          <FiChevronDown />
        )}
      </FilterLabel>
      {!filtersUI.collectionsCollapsed && (
        <InfiniteScroll
          dataLength={collectionFilters.collectionResults.length}
          next={() =>
            fetchMoreCollectionFilters(collectionFilters, setCollectionFilters)
          }
          hasMore={collectionFilters.moreCollections}
          loader={<></>}
          scrollableTarget="scrollableDiv"
        >
          <FilterGrid className="collections" id="scrollableDiv">
            {collectionFilters.collectionResults.map((collection, index) => (
              <FilterAttribute key={index}>
                <CollectionCheckbox
                  type="checkbox"
                  image={collection.image_url}
                  checked={
                    filters.collections.filter((e) => e == collection.address)
                      .length > 0
                  }
                  onChange={(e) =>
                    updateCollections(
                      e.target.checked,
                      collection.address,
                      filters,
                      setFilters
                    )
                  }
                />
                <FilterAttributeName>
                  <TextTruncater>{collection.name}</TextTruncater>
                  {collection.verified && (
                    <VerifiedIcon>
                      <MdVerified />
                    </VerifiedIcon>
                  )}
                </FilterAttributeName>
              </FilterAttribute>
            ))}
          </FilterGrid>
        </InfiniteScroll>
      )}
    </Filter>
  );
};
