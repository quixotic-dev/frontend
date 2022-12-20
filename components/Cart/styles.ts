import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  max-width: 600px;
`;

export const Title = styled.div`
  font-size: 26px;
  /* font-weight: 800; */
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.div`
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 30px;
    font-size: 18px;
  }
`;

export const ItemsGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 0 -12px;
  border-radius: 8px;
  grid-gap: 20px;

  &.total {
    font-size: 16px;
    font-weight: 800;
    border-top: 1px solid ${(props) => props.theme.colors.gray};
    padding: 20px 0;
    margin: 10px 0;
    border-radius: 0;

    &:hover {
      background: none;
    }
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    &:hover {
      background: ${(props) => props.theme.colors.lightGray};
    }
  }

  &.rewards {
    font-size: 16px;
    font-weight: 800;
    padding: 12px 0 5px;
    margin: 0;

    &:hover {
      background: none;
    }
  }
`;

export const ItemSection = styled.div`
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

  &.price {
    font-size: 15px;
    margin-left: auto;
  }

  &.total {
    font-size: 16px;
    font-weight: 800;
    margin-left: auto;
  }

  &.rewards {
    position: relative;
  }
`;

export const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
`;

export const ItemStatus = styled.div`
  display: flex;
  font-size: 18px;
  padding: 12px;
  margin: -12px -12px -12px -4px;
`;

export const TokenImageContainer = styled.div`
  display: block;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.gray};
  flex-shrink: 0;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PriceIcon = styled.div`
  display: flex;
  font-size: 13px;

  &.weth {
    color: #ed1e79;
  }

  &.rewards {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-top: 1px;
  }
`;

export const CollectionName = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  grid-gap: 3px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.accent};
`;

export const PriceSmall = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.accent};
  margin-top: 3px;
  margin-left: auto;
`;

export const TokenName = styled.div`
  font-weight: 600;
`;

export const VerifiedIcon = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.network};
`;

export const CheckoutStatus = styled.div`
  font-size: 15px;
  margin-top: 15px;
  text-align: center;
  color: ${(props) => props.theme.colors.accent};
`;
