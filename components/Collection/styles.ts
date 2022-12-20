import styled, { keyframes } from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div`
  &.filtersVisible {
    position: fixed;

    @media (min-width: ${(props) => props.theme.small_width}) {
      position: initial;
    }
  }
`;

export const ContainerExtended = styled(Container)`
  max-width: none;
`;

interface CollectionCoverImageProps {
  color: string;
}

export const CollectionCoverImage = styled.div<CollectionCoverImageProps>`
  position: relative;
  background: ${(props) =>
    `linear-gradient(-135deg, ${props.color}, ${props.color}40)`};
  opacity: 0.33;
  height: 200px;
  width: 100vw;

  &.fullOpacity {
    opacity: 1;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    height: 250px;
  }
`;

export const CollectionImageContainer = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.secondary};
  width: 175px;
  height: 175px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  border: 4px solid ${(props) => props.theme.colors.secondary};

  img {
    border-radius: 12px;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 250px;
    height: 250px;
    border: 6px solid ${(props) => props.theme.colors.secondary};
  }
`;

export const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  grid-column: 1 / -1;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 12px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    order: 3;
  }
`;

export const CollectionName = styled.div`
  font-size: 18px;
  font-weight: 800;
  overflow-wrap: anywhere;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 24px;
  }

  .tooltip {
    z-index: 9999;
  }
`;

export const VerifiedIcon = styled.div`
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  font-size: 18px;
  margin-top: 3px;
  color: ${(props) => props.theme.colors.network};

  &.warning {
    color: ${(props) => props.theme.colors.darkGray};
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 22px;
    margin-top: 5px;
  }
`;

export const CollectionDescription = styled.div`
  font-size: 14px;
  word-break: break-word;
  color: ${(props) => props.theme.colors.accent};
  max-width: 650px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const ExpandDescription = styled.span`
  padding: 5px;
  margin: -5px;

  .bold {
    /* font-weight: 500; */
    color: ${(props) => props.theme.colors.network};
  }

  &:hover {
    cursor: pointer;
  }
`;

export const CollectionLinksGrid = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
  margin-top: 5px;
`;

export const CollectionLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;

  &.etherscan {
    display: block;
    width: 16px;
    height: 16px;
  }
`;

export const StatsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 10px;
  z-index: 1;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
    padding: 20px 10px;
    border-radius: 16px;
    background: ${(props) => props.theme.colors.secondary};
    order: 2;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const Stat = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  flex-direction: column;
  font-size: 13px;
  font-weight: 500;
  grid-gap: 5px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 14px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    align-items: center;
  }

  &.small {
    display: none;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: flex;
    }
  }

  &.large {
    display: none;

    @media (min-width: ${(props) => props.theme.max_width}) {
      display: flex;
    }
  }

  &.clickable {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const StatText = styled.div`
  display: flex;
  grid-gap: 2px;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 3px;
    font-size: 18px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    font-size: 20px;
  }
`;

export const StatIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 16px;
  }
`;

export const TopGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  margin-top: -160px;
  margin-bottom: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 25px;
    margin-top: -247px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 25px 40px;
    align-items: end;
    margin-bottom: 20px;
  }

  &.no-margin {
    margin-top: 0;
    margin-bottom: 0;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      margin-bottom: 15px;
    }
  }
`;

export const BottomGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 40px;
  }
`;

export const BottomColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 25px;
  }
`;

const LoadingRingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingRing = styled.div`
  border: 4px solid ${(props) => props.theme.colors.lightGray};
  border-top: 4px solid ${(props) => props.theme.colors.network};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 20px auto;
  margin-top: 60px;
  animation: ${LoadingRingKeyframes} 2s linear infinite;

  &.square {
    margin: 60px auto;
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;
  flex-grow: 1;
  grid-gap: 10px;
  font-size: 14px;
  align-items: center;
  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  padding: 10px;

  &.search {
    margin-bottom: 20px;
  }

  &.item-search {
    padding: 10px 12px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      padding: 12px 12px;
    }
  }
`;

export const SearchInput = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.lightGray};
  padding: 0;
  font-size: 14px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const ActivityChart = styled.div`
  position: relative;
  width: 99%;
  height: 225px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  font-size: 18px;
  font-weight: 700;
  padding: 10px 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 18px;
  }
`;

export const SectionContent = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.gray};
  padding: 20px 0;

  &.chart {
    position: relative;
    width: 99%;
    height: 250px;
  }
`;

export const MenuGrid = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export const SizeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 40px;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.lightGray};
`;

export const SizeToggle = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 0 12px;
  border-radius: 12px 0 0 12px;
  height: 100%;
  color: ${(props) => props.theme.colors.accent};
  transition: all 0.2s;

  &.right {
    border-radius: 0 12px 12px 0;
  }

  &.active {
    background: ${(props) => props.theme.colors.gray};
    color: ${(props) => props.theme.colors.primary};
  }

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }
`;
