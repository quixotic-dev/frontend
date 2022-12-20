import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)``;

export const CardContainer = styled.div``;

export const CardGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  }
`;

export const TrendingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-gap: 80px;
  }
`;

export const TrendingGridColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &.col-two {
    display: none;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: flex;
    }
  }

  &.col-three {
    display: none;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      display: flex;
    }
  }
`;

export const TrendingCard = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15px 50px 2fr 1fr;
  grid-gap: 15px;
  border-radius: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    &:hover {
      transition: all 0.2s;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 15px rgba(0, 0, 0, 0.05), -5px -5px 15px rgba(0, 0, 0, 0.05);
      padding: 10px 12px;
      margin: -10px -12px;
    }
  }
`;

export const CollectionRank = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => props.theme.colors.primary};
`;

export const CollectionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 3px;
  flex-shrink: 0;

  &.right {
    align-items: end;
  }
`;

export const CollectionTextLarge = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  color: ${(props) => props.theme.colors.primary};
`;

export const CollectionTextSmall = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};

  &.pos {
    color: green;
  }

  &.neg {
    color: red;
  }
`;

export const CollectionImageContainer = styled.div`
  position: relative;
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.gray};

  img {
    border-radius: 12px;
  }
`;

export const VerifiedIcon = styled.div`
  position: absolute;
  right: -8px;
  bottom: -8px;
  font-size: 16px;
  align-items: center;
  color: ${(props) => props.theme.colors.network};
`;

export const PriceContainer = styled.div`
  display: flex;
  margin-left: 3px;
`;

export const PriceIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;

  &.chevron {
    font-size: 17px;
    margin-right: -4px;
    margin-left: -4px;
  }

  &.large {
    font-size: 13px;
    margin-right: 2px;
  }
`;

export const ButtonContainer = styled.div`
  width: fit-content;
  margin: 25px auto 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin: 40px auto 0;
  }
`;

export const ViewAllButton = styled.div`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  padding: 10px 40px;
  border-radius: 52px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
    padding: 12px 50px;
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const Toggle = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.lightGray};
  padding: 4px;
  border-radius: 12px;
  width: fit-content;

  &.stats {
    padding: 5px;
    margin: auto;

    @media (min-width: ${(props) => props.theme.small_width}) {
      margin: 0;
    }
  }
`;

export const ToggleSection = styled.div`
  padding: 4px 8px;
  border-radius: 9px;
  font-weight: 500;
  font-size: 14px;
  width: fit-content;
  color: ${(props) => props.theme.colors.accent};
  transition: all 0.2s;
  flex-shrink: 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
    padding: 6px 12px;
  }

  &.stats {
    padding: 6px 10px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      padding: 8px 12px;
    }
  }

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }

  &.active {
    background: ${(props) => props.theme.colors.gray};
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      cursor: default;
    }
  }

  &.web-only {
    display: none;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: block;
    }
  }
`;
