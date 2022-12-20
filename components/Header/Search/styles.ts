import styled, { keyframes } from "styled-components";

export const PageOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 70px;
  left: 0;
  opacity: 0;
  pointer-events: none;

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const MobileSearchButton = styled.div`
  display: none;

  &.mobile {
    display: flex;
    align-items: center;
    font-size: 22px;
    position: relative;
    /* transform: scaleY(5deg); */

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: none;
    }
  }
`;

export const SearchContainer = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: flex;
    position: relative;
    align-items: center;
    grid-gap: 10px;
    background: ${(props) => props.theme.colors.lightGray};
    border-radius: 52px;
    padding: 0 15px;
    width: 100%;
    max-width: 600px;
    margin: auto;
    font-size: 15px;
  }

  &.mobile {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    height: 70px;
    background: ${(props) => props.theme.colors.background};
    align-items: center;
    grid-gap: 10px;
    padding: 0 15px;
    z-index: 1;
    width: 100%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s;

    &.bannerVisible {
      margin-top: 50px;
    }

    &.scrolled {
      box-shadow: none;
    }

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: none;
    }
  }
`;

export const SearchInput = styled.input`
  border: none;
  font-size: 14px;
  width: 100%;
  background: none;
  padding: 12px 0;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 15px;
  }

  &:focus {
    outline: none;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  width: calc(100% - 20px);
  margin: auto;
  border-radius: 16px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  transition: opacity 0.2s;
  opacity: 0;
  pointer-events: none;
  z-index: 3;

  @media (min-width: ${(props) => props.theme.small_width}) {
    top: 46px;
    width: 100%;
    /* min-width: 360px; */
  }

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const ResultsTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding: 15px 20px 5px;
  color: ${(props) => props.theme.colors.accent};

  &.tall {
    padding: 15px 20px;
  }
`;

export const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const ResultsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 15px;
  font-size: 15px;
  padding: 10px 20px;
  font-weight: 600;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }

  &.helper {
    display: block;
    font-weight: 400;
    font-size: 14px;
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ResultsPrimaryInfo = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
`;

export const ResultsCount = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};
  flex-shrink: 0;
`;

export const ResultsImage = styled.div`
  display: block;
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.lightGray};
  flex-shrink: 0;
`;

export const ResultName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

export const Divider = styled.div`
  border-bottom: 0.5px solid ${(props) => props.theme.colors.gray};
`;

export const ClearSearchIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;

  &:hover {
    cursor: pointer;
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
  animation: ${LoadingRingKeyframes} 2s linear infinite;
`;

export const VerifiedIcon = styled.div`
  display: flex;
  font-size: 15px;
  margin-top: 1px;
  color: ${(props) => props.theme.colors.network};
`;
