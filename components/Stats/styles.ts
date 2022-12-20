import styled, { keyframes } from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  position: relative;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  grid-gap: 15px;
  flex-direction: column;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    text-align: left;
    flex-direction: row;
    font-size: 32px;
  }
`;

export const Subtitle = styled.div`
  margin-bottom: 20px;
  font-size: 14px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;

export const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin: auto -10px;
  }
`;

export const StatRow = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: grid;
    grid-template-columns: 20px 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    padding: 15px 10px;

    &:hover {
      background: ${(props) => props.theme.colors.lightGray};
    }
  }

  &.title {
    display: none;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: grid;
      position: sticky;
      top: 70px;
      z-index: 1;
      background: ${(props) => props.theme.colors.background};
      padding: 30px 10px;
    }

    &:hover {
      background: ${(props) => props.theme.colors.background};
    }
  }
`;

export const StatRowSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 15px;

  &.subsection {
    grid-gap: 12px;
  }

  &.mobile-row {
    width: 150px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: contents;
    }
  }

  &.vertical {
    margin: 5px 0 10px 30px;
    flex-direction: column;
    align-items: start;
  }

  &.hidden {
    display: none;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: contents;
    }
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: contents;
  }
`;

export const MobileLabel = styled.div`
  font-size: 13px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: none;
  }
`;

export const ExpandButton = styled.div`
  display: flex;
  z-index: 1;
  padding: 20px 20px 20px 60px;
  margin: -20px -20px -20px -60px;
  font-size: 15px;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: none;
  }
`;

export const StatImage = styled.div`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 5px;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.lightGray};

  @media (min-width: ${(props) => props.theme.medium_width}) {
    width: 50px;
    height: 50px;
    margin-right: 8px;
  }
`;

export const CollectionName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
  font-weight: 600;
`;

export const VerifiedIcon = styled.div`
  position: absolute;
  left: 31px;
  bottom: -7px;
  font-size: 15px;
  align-items: center;
  color: ${(props) => props.theme.colors.network};

  @media (min-width: ${(props) => props.theme.medium_width}) {
    left: 40px;
    bottom: -9px;
    font-size: 18px;
  }
`;

export const StatTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  margin: auto 0;
`;

export const StatText = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  grid-gap: 3px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
  width: fit-content;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 15px;
  }

  &.web {
    display: none;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: flex;
    }
  }

  &.title {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
  }

  &.link {
    &:hover {
      cursor: pointer;
    }
  }

  &.rank {
    width: 20px;
  }

  &.pos {
    color: green;
  }

  &.neg {
    color: red;
  }

  &.price {
    margin-left: auto;

    @media (min-width: ${(props) => props.theme.small_width}) {
      margin-left: 0;
    }
  }

  &.inactive {
    color: ${(props) => props.theme.colors.accent};
  }
`;

export const PriceSmall = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.accent};

  &.volume {
    margin-left: auto;

    @media (min-width: ${(props) => props.theme.small_width}) {
      margin-left: 0;
    }
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-left: 0;
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
`;
