import styled from "styled-components";

export const AccountSignInButton = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.network};
  border-radius: 52px;
  padding: 10px 20px;
  margin: -5px 0;
  transition: all 0.2s;
  text-align: center;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 16px;

    &:hover {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`;

export const AccountDropdownButton = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100px;
  overflow: hidden;
  transition: all 0.2s;
  background: ${(props) => props.theme.colors.gray};

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 40px;
    height: 40px;

    &:hover {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 15px rgba(0, 0, 0, 0.05), -5px -5px 15px rgba(0, 0, 0, 0.05);
      cursor: pointer;
    }
  }

  img {
    border-radius: 100px;
    overflow: hidden;
  }
`;

export const WalletInfo = styled.div`
  color: ${(props) => props.theme.colors.primary};
  border-top: 1px solid ${(props) => props.theme.colors.gray};
  padding: 10px 20px;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }

  &.fund {
    border-radius: 0 0 8px 8px;
    padding: 10px 20px;
    font-size: 14px;
    text-align: center;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};

    &:hover {
      box-shadow: none;
      cursor: pointer;
    }
  }
`;

export const WalletBalance = styled.div`
  font-size: 11px;
  font-weight: 400;
  margin-top: 3px;
`;

export const WalletAddress = styled.div`
  font-size: 14px;
`;

export const DropdownContainer = styled.div`
  display: block;
  position: fixed;
  width: 225px;
  margin-top: 7px;
  margin-left: -185px;
  z-index: 9999;
  background: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: opacity 0.3s;
  opacity: 0;
  pointer-events: none;

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const DropdownGrid = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const DropdownRow = styled.div`
  padding: 10px 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 10px 20px;
  }

  &.link {
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 15px rgba(0, 0, 0, 0.05), -5px -5px 15px rgba(0, 0, 0, 0.05);
    }
  }

  &.mobile-border {
    border-top: 1px solid ${(props) => props.theme.colors.gray};

    @media (min-width: ${(props) => props.theme.small_width}) {
      border-top: none;
    }
  }

  &.connect-button {
    padding: 12px 10px 20px;

    &:hover {
      box-shadow: none;
    }
  }
`;

export const RowContent = styled.span`
  display: flex;
  align-items: center;
  grid-gap: 12px;
  font-size: 14px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;

export const RowIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 1px;
`;

export const ToggleContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Toggle = styled.div`
  position: relative;
  width: 35px;
  height: 18px;
  cursor: pointer;
  background: ${(props) => props.theme.colors.primary};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 3px;
    bottom: 3px;
    background: ${(props) => props.theme.colors.secondary};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  &.checked {
    &:before {
      -webkit-transform: translateX(17px);
      -ms-transform: translateX(17px);
      transform: translateX(17px);
    }
  }
`;

export const WebButton = styled.div`
  display: none;
  padding: 8px;
  margin: -8px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: block;
  }
`;

export const MobileNav = styled.div`
  display: contents;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: none;
  }
`;

export const MobileButton = styled.div`
  padding: 8px;
  margin: -8px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: none;
  }
`;

export const MobileNavButtonBar = styled.div`
  width: 26px;
  height: 3px;
  background: ${(props) => props.theme.colors.primary};
  margin: 5px 0;
  border-radius: 52px;
  transition: 0.4s;

  &.bar1 {
    transform: rotate(-45deg) translate(-6px, 5px);
  }

  &.bar2 {
    opacity: 0;
  }

  &.bar3 {
    transform: rotate(45deg) translate(-6px, -5px);
  }
`;
