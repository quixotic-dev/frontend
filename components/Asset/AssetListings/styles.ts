import styled from "styled-components";

export const BuyOrdersGrid = styled.div`
  display: grid;
  grid-template-columns:
    minmax(auto, auto) minmax(auto, auto) minmax(auto, auto)
    minmax(auto, auto);
  grid-gap: 20px;
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
  grid-gap: 5px;
  align-items: center;
  font-weight: 500;
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
      font-size: 16px;
    }
  }
`;
