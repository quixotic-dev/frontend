import styled, { keyframes } from "styled-components";

const GhostKeyframes = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const ActivityGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin: 0 -12px;
  }

  &.asset-activity {
    padding: 20px;
    margin: 0;

    @media (min-width: ${(props) => props.theme.small_width}) {
      grid-gap: 5px;
      padding: 0 20px 20px;
    }
  }

  .infinite-scroll-component__outerdiv {
    display: contents;
  }
`;

export const ActivityGridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.03),
    -5px -5px 15px rgba(0, 0, 0, 0.03);

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
    grid-gap: 25px;
    padding: 12px;
    box-shadow: none;
    background: ${(props) => props.theme.colors.background};

    &:hover {
      background: ${(props) => props.theme.colors.lightGray};
    }
  }

  a {
    display: flex;
  }

  &:hover {
    cursor: pointer;
  }

  &.asset-activity {
    @media (min-width: ${(props) => props.theme.small_width}) {
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
      box-shadow: none;
      margin: 0 -12px;
    }

    @media (min-width: ${(props) => props.theme.medium_width}) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    &.title {
      display: none;

      @media (min-width: ${(props) => props.theme.small_width}) {
        display: grid;
        top: 0;
        padding-top: 0;
        margin-top: 0;
      }
    }

    &:hover {
      cursor: default;
    }
  }

  &.title {
    display: none;
    position: sticky;
    top: 70px;
    background: ${(props) => props.theme.colors.background};
    z-index: 1;

    &:hover {
      background: ${(props) => props.theme.colors.background};
      cursor: default;
    }

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: grid;
      padding: 0 12px 12px;
      padding-top: 20px;
      margin-top: -20px;
    }
  }

  &.ghost {
    &:hover {
      cursor: default;
    }
  }
`;

export const ActivityGridMobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 10px;

  &.bottom {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: contents;

    &.bottom {
      display: contents;
    }
  }
`;

export const ActivityInfo = styled.div`
  display: flex;
  grid-gap: 3px;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 14px;
  }

  a {
    color: ${(props) => props.theme.colors.network};
  }

  &.item {
    grid-gap: 10px;
  }

  &.asset-activity {
    @media (min-width: ${(props) => props.theme.small_width}) {
      display: none;
    }
  }

  &.date {
    color: ${(props) => props.theme.colors.network};
  }

  &.type {
    grid-gap: 5px;
  }

  &.price {
    font-size: 14px;
    margin-left: auto;

    @media (min-width: ${(props) => props.theme.small_width}) {
      margin-left: 0;
    }
  }

  &.title {
    font-size: 14px;
    font-weight: 800;

    &.date {
      width: fit-content;
      margin-left: auto;
    }

    @media (min-width: ${(props) => props.theme.medium_width}) {
      font-size: 15px;
    }
  }

  &.mobile {
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.accent};

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: none;
    }
  }

  &.ghost {
    position: relative;
    overflow: hidden;
    background: ${(props) => props.theme.colors.gray};
    width: 55px;
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
`;

export const DateContainer = styled.div`
  margin-left: auto;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-left: 0;
  }
`;

export const ActivityInfoText = styled.div`
  display: flex;
  grid-gap: 5px;
  align-items: center;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.primary};
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    color: ${(props) => props.theme.colors.primary};
    background: none;
    padding: 0;
    border-radius: 0;
    margin-left: 0;
    font-size: inherit;
  }
`;

export const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
`;

export const TokenImageContainer = styled.div`
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.lightGray};

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
`;

export const ActivityIcon = styled.div`
  display: flex;
  align-items: center;

  &.dutchAuction {
    font-size: 16px;
  }
`;

export const ProfileGrid = styled.div`
  display: flex;
  grid-gap: 8px;
  align-items: center;
`;

export const ProfileIcon = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    flex-shrink: 0;
    overflow: hidden;
    background: ${(props) => props.theme.colors.lightGray};
  }
`;

export const CollectionName = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  grid-gap: 3px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.accent};

  &.ghost {
    position: relative;
    overflow: hidden;
    background: ${(props) => props.theme.colors.gray};
    width: 60px;
    height: 10px;
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

  a {
    display: contents;
    color: ${(props) => props.theme.colors.accent};

    &:hover {
      color: ${(props) => props.theme.colors.network};
    }
  }
`;

export const PriceSmall = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.accent};
  margin-top: 2px;

  margin-left: auto;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-left: 0;
  }
`;

export const TokenName = styled.div`
  font-weight: 600;

  &.ghost {
    position: relative;
    overflow: hidden;
    background: ${(props) => props.theme.colors.gray};
    width: 120px;
    height: 12px;
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
`;

export const VerifiedIcon = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.network};
`;

export const ActivityState = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${(props) => props.theme.colors.network};
`;
