import styled, { keyframes } from "styled-components";

const GhostKeyframes = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 20px;
  }

  .infinite-scroll-component__outerdiv {
    display: contents;
  }
`;

export const Card = styled.div`
  height: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    min-width: auto;

    &:hover {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 20px rgba(0, 0, 0, 0.1), -5px -5px 20px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`;

export const CardContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  grid-gap: 10px;
  padding: 12px;

  &.large {
    grid-gap: 8px;
    padding: 0;
  }
`;

export const CardContentContainer = styled.div`
  padding: 9px 16px 12px 12px;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 3px;
  padding: 3px 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 5px;
  }

  &.large {
    padding: 0;
  }
`;

interface CollectionCoverImageProps {
  color: string;
}

export const CollectionCoverImage = styled.div<CollectionCoverImageProps>`
  position: relative;
  background: ${(props) =>
    `linear-gradient(-135deg, ${props.color}, ${props.color}40)`};
  opacity: 0.33;
  height: 85px;
  width: 100%;

  &.fullOpacity {
    opacity: 1;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    height: 115px;
  }
`;

export const CollectionImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: ${(props) => props.theme.colors.lightGray};
  border: 1px solid ${(props) => props.theme.colors.gray};
  width: 100px;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 110px;
    height: 110px;
  }

  &.ghost {
    background: ${(props) => props.theme.colors.lightGray};
    border: none;

    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background: ${(props) =>
        `linear-gradient(90deg, ${props.theme.colors.gray}99, ${props.theme.colors.gray}77)`};
      animation: ${GhostKeyframes} 4s linear infinite alternate;
      background-size: 400% 400%;
    }
  }

  &.large {
    border: 4px solid ${(props) => props.theme.colors.secondary};
    margin-top: -45px;

    img {
      border-radius: 4px;
    }
  }
`;

export const CollectionName = styled.div`
  display: flex;
  grid-gap: 5px;
  align-items: center;
  font-size: 15px;
  font-weight: 700;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 17px;
  }

  &.ghost {
    position: relative;
    overflow: hidden;
    background: ${(props) => props.theme.colors.lightGray};
    width: 120px;
    height: 25px;
    border-radius: 4px;
    margin-bottom: 5px;

    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background: ${(props) =>
        `linear-gradient(90deg, ${props.theme.colors.gray}99, ${props.theme.colors.gray}77)`};
      animation: ${GhostKeyframes} 4s linear infinite alternate;
      background-size: 400% 400%;
    }
  }
`;

export const CollectioNameText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

export const CollectionDescription = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: auto;
  word-break: break-word;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 13px;
  }

  &.ghost {
    position: relative;
    overflow: hidden;
    background: ${(props) => props.theme.colors.lightGray};
    width: 85%;
    height: 15px;
    border-radius: 4px;

    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background: ${(props) =>
        `linear-gradient(90deg, ${props.theme.colors.gray}99, ${props.theme.colors.gray}77)`};
      animation: ${GhostKeyframes} 4s linear infinite alternate;
      background-size: 400% 400%;
    }
  }

  &.large {
    min-height: 30px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      min-height: 33px;
    }
  }
`;

export const VerifiedIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  color: ${(props) => props.theme.colors.network};
`;

export const CollectionStats = styled.div`
  display: flex;
  grid-gap: 20px;
  margin-top: 3px;

  &.large {
    margin-top: 12px;
    justify-content: space-around;
    align-items: start;
    margin-left: 4px;
  }
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;

  grid-gap: 3px;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};

  &.web-only {
    display: none;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      display: flex;
    }
  }

  &.large {
    align-items: center;
  }
`;

export const StatText = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 1px;
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 14px;
  }

  &.ghost {
    position: relative;
    overflow: hidden;
    background: ${(props) => props.theme.colors.lightGray};
    width: 45px;
    height: 12px;
    border-radius: 4px;
    margin-bottom: 5px;

    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background: ${(props) =>
        `linear-gradient(90deg, ${props.theme.colors.gray}99, ${props.theme.colors.gray}77)`};
      animation: ${GhostKeyframes} 4s linear infinite alternate;
      background-size: 400% 400%;
    }
  }

  &.mini {
    width: 35px;
    height: 8px;
  }
`;

export const StatIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;

  &.chevron {
    font-size: 17px;
    margin-right: -4px;
    margin-left: -4px;
  }
`;
