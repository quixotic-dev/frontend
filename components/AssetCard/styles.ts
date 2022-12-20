import styled, { keyframes } from "styled-components";

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  &.large {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 15px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .infinite-scroll-component__outerdiv {
    display: contents;
  }
`;

export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  /* overflow: hidden; */
  transition: all 0.2s;
  color: ${(props) => props.theme.colors.primary};

  a {
    display: contents;
    color: ${(props) => props.theme.colors.primary};
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 20px rgba(0, 0, 0, 0.1),
      -5px -5px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &.bridge {
    &:hover {
      cursor: default;
    }
  }

  &.ghost {
    &:hover {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 15px rgba(0, 0, 0, 0.05), -5px -5px 15px rgba(0, 0, 0, 0.05);
      cursor: default;
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 15px;
  border-top: 1px solid ${(props) => props.theme.colors.gray}99;
  background: ${(props) => props.theme.colors.secondary};
  padding: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 12px;
  }
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  grid-gap: 5px;
  /* border-top: 1px solid ${(props) => props.theme.colors.lightGray}; */
  padding: 0 10px 10px;
  transition: background 0.2s;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 0 12px 10px;
  }

  &.ghost {
    border-top: none;
    flex-direction: column;
    grid-gap: 0;
    align-items: start;
    padding: 10px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      padding: 12px;
    }
  }

  &.detail {
    grid-gap: 10px;
    margin-top: auto;
    border-top: 1px solid ${(props) => props.theme.colors.lightGray};
    /* background: ${(props) => props.theme.colors.primary}; */
    color: ${(props) => props.theme.colors.primary};
    padding: 10px;
    box-shadow: inset 0 10px 10px -3px rgb(0 0 0 / 3%);

    @media (min-width: ${(props) => props.theme.small_width}) {
      padding: 10px 12px;
    }
  }

  &.cart {
    background: ${(props) => props.theme.colors.network};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const CollectionName = styled.div`
  position: relative;
  display: flex;
  grid-gap: 3px;
  align-items: center;
  font-size: 12px;
  margin-bottom: 3px;

  &.ghost {
    height: 12px;
    background: ${(props) => props.theme.colors.lightGray};
    width: 50%;
    border-radius: 3px;
    margin-bottom: 8px;
  }

  a {
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      color: ${(props) => props.theme.colors.network};
    }
  }
`;

export const TextContainer = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
`;

export const CollectionIcon = styled.div`
  display: flex;
  align-items: center;
  width: 16px;
  height: 16px;
  color: ${(props) => props.theme.colors.network};
`;

const GhostKeyframes = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

interface TokenImageContainerProps {
  backgroundColor: string;
}

export const TokenImageContainer = styled.div<TokenImageContainerProps>`
  position: relative;
  background: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.secondary};
  aspect-ratio: 1;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  flex-shrink: 0;

  img {
    border-radius: 12px 12px 0 0;
  }

  &.padded {
    margin: 10px;
    border-radius: 0;

    img {
      border-radius: 0;
    }
  }

  &.ghost {
    background: ${(props) => props.theme.colors.lightGray};

    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background: ${(props) =>
        `linear-gradient(90deg, ${props.theme.colors.gray}99, ${props.theme.colors.lightGray})`};
      animation: ${GhostKeyframes} 4s linear infinite alternate;
      background-size: 400% 400%;
    }
  }

  &.no-image {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;
    color: ${(props) => props.theme.colors.accent};
  }
`;

export const AssetName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 15px;
  font-weight: 700;

  &.ghost {
    height: 18px;
    background: ${(props) => props.theme.colors.lightGray};
    width: 90%;
    border-radius: 5px;
  }
`;

export const AssetInfo = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  grid-gap: 2px;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 4px;
  }

  &.detail {
    flex-direction: row;
    grid-gap: 4px;
  }
`;

export const AssetInfoLabel = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.accent};

  &.detail {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const AssetInfoText = styled.div`
  display: flex;
  grid-gap: 2px;
  align-items: center;
  font-size: 15px;
  font-weight: 800;

  &.detail {
    font-size: 12px;
    font-weight: 600;
  }

  &.cart {
    margin: auto;
  }

  &.time {
    font-size: 11px;
    font-weight: 500;
    grid-gap: 4px;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;

  &.detail {
    font-size: 10px;
    margin-top: 1px;
  }
`;

export const Rank = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 1;
  background: rgb(0, 0, 0, 0.25);
  color: white;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

export const Network = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 1;
  background: rgb(0, 0, 0, 0.25);
  color: white;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

export const AssetTime = styled.div`
  height: fit-content;
  padding: 5px;
  margin-right: -10px;
  background: ${(props) => props.theme.colors.networkLight};
  color: ${(props) => props.theme.colors.network};
  border-radius: 6px 0 0 6px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-right: -12px;
    padding: 6px 8px;
  }
`;

export const AssetTimeText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

export const CartContainerGrid = styled.div`
  display: flex;
  grid-gap: 8px;
`;

export const CartContainer = styled.div`
  display: flex;
  font-size: 14px;
  padding: 12px;
  margin: -12px;
`;

export const LikeContainer = styled.div`
  display: flex;
  grid-gap: 3px;
  font-size: 16px;
  padding: 12px;
  margin: -12px -12px -12px;

  &.active {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const USDPrice = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.accent};
    margin-left: 4px;
  }
`;
