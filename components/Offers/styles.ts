import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  /* max-width: none; */
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 40px;
  overflow: scroll;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 32px;
    margin-bottom: 25px;
  }
`;

export const BuyOrdersGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr 1fr 1fr 1fr 1fr 100px;
  grid-gap: 15px 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 250px 1fr 1fr 1fr 1fr 1fr 1fr 100px;
    grid-gap: 20px 30px;
  }
`;

export const BuyOrdersRow = styled.div`
  display: contents;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.secondary};

  &.title {
    padding: 0 0 5px;
  }
`;

export const BuyOrdersText = styled.div`
  display: flex;
  grid-gap: 3px;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  flex-shrink: 0;
  white-space: nowrap;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 15px;
  }

  a {
    color: ${(props) => props.theme.colors.network};
  }

  &.item {
    grid-gap: 10px;
  }

  &.title {
    font-size: 14px;
    font-weight: 800;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      font-size: 15px;
    }
  }

  &.button {
    margin-left: auto;
  }
`;
