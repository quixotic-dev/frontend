import styled from "styled-components";

export const FiltersSection = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 70px;
  right: 0;
  bottom: 0;
  left: 0;
  height: calc(100vh - 70px);
  width: 100%;
  background: ${(props) => props.theme.colors.secondary};
  padding: 20px 20px 75px;
  z-index: 9999;
  overflow-y: auto;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: block;
    position: sticky;
    padding: 20px 0 0;
    top: 70px;
    bottom: auto;
    z-index: 1;
    background: transparent;
    margin-top: -20px;
    margin-bottom: -40px;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &.visible {
    display: flex;
  }

  &.bannerVisible {
    top: 120px;
    height: calc(100vh - 120px);
  }
`;

export const FiltersGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Filter = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  padding: 20px 0;

  &.first {
    padding: 0 0 20px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  margin: 0 0 20px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;

  &.collections {
    max-height: 350px;
    margin: 0;
    padding-bottom: 20px;
  }

  &.small {
    grid-template-columns: 1fr 1fr;
  }
`;

const FilterDefaults = styled.div`
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  background: ${(props) => props.theme.colors.lightGray};

  &:hover {
    background: ${(props) => props.theme.colors.gray};
    cursor: pointer;
  }

  &.active {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    cursor: default;
  }
`;

export const FilterSelect = styled(FilterDefaults)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.currency {
    justify-content: start;
    grid-gap: 5px;
  }
`;

export const FilterIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 3px;
`;

export const FilterMultiSelect = styled.div`
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) => props.theme.colors.lightGray};
    padding: 12px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.colors.gray};
    }

    &.event {
      justify-content: left;
      grid-gap: 6px;
    }
  }

  input {
    display: none;
  }

  input:checked + span {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const FilterPriceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  font-size: 14px;
`;

export const FilterInputContainer = styled(FilterDefaults)`
  display: flex;
  grid-gap: 10px;
  font-size: 14px;
  align-items: center;

  &.search {
    margin-bottom: 20px;
  }

  &.item-search {
    padding: 8px 10px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      padding: 10px 12px;
    }
  }
`;

export const FilterInput = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.primary};
  background: inherit;
  padding: 0;
  font-size: 14px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const FilterAttribute = styled.label`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  align-items: center;
  border-radius: 8px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

export const AttrbiuteContainer = styled.div`
  display: flex;
  grid-gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
`;

export const AttributeRarity = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.accent};
  flex-shrink: 0;
`;

export const FilterCheckbox = styled.input`
  margin: 0;
`;

interface CollectionImage {
  image: string;
}

export const CollectionCheckbox = styled.input<CollectionImage>`
  margin: 0;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  appearance: none;
  flex-shrink: 0;

  &:checked {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  &:after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background-image: ${(props) => `url(${props.image})`};
    background-size: cover;
  }
`;

export const FiltersButton = styled.div`
  position: fixed;
  bottom: 15px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  padding: 10px 60px;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.primary};
  border-radius: 52px;
  font-weight: 600;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(0, 0, 0, 0.1);
  z-index: 99;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: none;
  }
`;

export const SortDropdownContainer = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.lightGray};
  font-size: 15px;
  border-radius: 8px;
  width: 100%;

  &.chart {
    width: fit-content;
  }
`;

export const SortDropdown = styled.select`
  border: none;
  background: ${(props) => props.theme.colors.lightGray};
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.primary};
  -webkit-appearance: none;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.gray};
  }

  &:focus {
    outline: none;
  }

  &.chart {
    width: 135px;
    padding: 10px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      padding: 12px;
    }
  }
`;

export const SortDropdownChevron = styled.div`
  position: absolute;
  top: 57%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const SaveFiltersButton = styled.div`
  position: fixed;
  bottom: 15px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  padding: 10px 60px;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.primary};
  border-radius: 52px;
  font-weight: 600;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(0, 0, 0, 0.1);
  z-index: 99;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: none;
  }
`;

export const ItemCount = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const FilterAttributeName = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  font-size: 15px;
`;

export const VerifiedIcon = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.network};
`;

export const ActiveFiltersGrid = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  flex-wrap: wrap;
  font-size: 14px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;

export const ActiveFilterButton = styled(FilterDefaults)`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  padding: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 12px;
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.gray};
  }
`;

export const CollectionImageContainer = styled.div`
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  margin: -10px 0 -10px -5px;
  border-radius: 6px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.lightGray};
  flex-shrink: 0;
`;
