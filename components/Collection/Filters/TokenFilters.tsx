import { useSelector } from "react-redux";
import { State } from "../../../store";
import {
  AttributeFilter,
  AvailabilityFilter,
  ChainFilter,
  CurrencyFilter,
  IntersectAttributesFilter,
  PriceFilter,
  TokenSortFilter,
} from "../../Common/Filters/Filters";
import {
  FiltersButton,
  FiltersGrid,
  FiltersSection,
  SaveFiltersButton,
} from "../../Common/Filters/styles";

export const TokenFilters = ({
  collection,
  filters,
  setFilters,
  filtersUI,
  setFiltersUI,
  attributeFilters,
}) => {
  const banner = useSelector((state: State) => state.banner);

  return (
    <>
      <FiltersButton
        onClick={() => setFiltersUI({ ...filtersUI, filtersVisible: true })}
      >
        Filters
      </FiltersButton>
      <FiltersSection
        className={
          filtersUI.filtersVisible
            ? banner
              ? "visible bannerVisible"
              : "visible"
            : banner
            ? "bannerVisible"
            : null
        }
      >
        <FiltersGrid>
          <TokenSortFilter
            filters={filters}
            setFilters={setFilters}
            filtersUI={filtersUI}
            setFiltersUI={setFiltersUI}
            collection={collection}
          />

          <AvailabilityFilter
            filters={filters}
            setFilters={setFilters}
            filtersUI={filtersUI}
            setFiltersUI={setFiltersUI}
          />

          {collection.blockchain.startsWith("eth") && (
            <ChainFilter
              filters={filters}
              setFilters={setFilters}
              filtersUI={filtersUI}
              setFiltersUI={setFiltersUI}
            />
          )}

          <PriceFilter
            filters={filters}
            setFilters={setFilters}
            filtersUI={filtersUI}
            setFiltersUI={setFiltersUI}
          />

          <CurrencyFilter
            filters={filters}
            setFilters={setFilters}
            filtersUI={filtersUI}
            setFiltersUI={setFiltersUI}
          />

          {attributeFilters.map((attribute, index) => (
            <AttributeFilter
              attribute={attribute}
              supply={collection.supply}
              filters={filters}
              setFilters={setFilters}
              key={index}
            />
          ))}

          {attributeFilters.length > 0 && (
            <IntersectAttributesFilter
              filters={filters}
              setFilters={setFilters}
              filtersUI={filtersUI}
              setFiltersUI={setFiltersUI}
            />
          )}
        </FiltersGrid>

        <SaveFiltersButton
          onClick={() => setFiltersUI({ ...filtersUI, filtersVisible: false })}
        >
          Save
        </SaveFiltersButton>
      </FiltersSection>
    </>
  );
};
