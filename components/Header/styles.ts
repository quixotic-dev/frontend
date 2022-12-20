import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.header`
  position: fixed;
  width: 100%;
  z-index: 9999;
  transition: box-shadow 0.2s;
  background: ${(props) => props.theme.colors.background};

  &.scrolled {
    border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }
`;

export const ContainerExtended = styled(Container)`
  height: 70px;
  padding: 0 20px;
  max-width: none;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 15px 40px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  grid-gap: 15px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-gap: 30px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-gap: 60px;
  }

  a {
    @media (min-width: ${(props) => props.theme.small_width}) {
      height: 100%;
    }
  }
`;

export const Logo = styled.div`
  position: relative;
  width: 65px;
  height: 40px;
  margin: auto auto auto 0;
  flex-shrink: 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    height: 100%;
  }

  &.large {
    width: 125px;
  }

  &.badge {
    margin-top: 10px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      margin-top: 5px;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

export const LogoBadge = styled.div`
  position: absolute;
  right: 0;
  top: -8px;
  font-size: 11px;
  font-weight: 500;
  background: ${(props) => props.theme.colors.network};
  color: ${(props) => props.theme.colors.networkLight};
  padding: 0.5px 4px;
  border-radius: 4px;

  &.opt {
    right: -10px;
  }
`;

export const CenterNav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const RightNav = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: flex;
    align-items: center;
    grid-gap: 15px;
    flex-shrink: 0;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-gap: 22px;
  }
`;

export const NavElement = styled.div`
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;

  &.active {
    font-weight: 600;

    a {
      color: ${(props) => props.theme.colors.primary};
      border-bottom: 3px solid ${(props) => props.theme.colors.network};
      padding-bottom: 22px;
    }
  }

  &.cart {
    position: relative;
  }

  &.launchpad {
    display: none;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      display: block;
    }
  }
`;

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};

  &:hover {
    cursor: pointer;
  }
`;

export const MobileNavSection = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 20px;
  margin: auto 0 auto auto;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: none;
  }
`;

export const CartCount = styled.div`
  position: absolute;
  right: -7px;
  bottom: -4px;
  font-size: 12px;
  font-weight: 600;

  &.two {
    right: -14px;
  }

  &.three {
    right: -21px;
  }
`;
