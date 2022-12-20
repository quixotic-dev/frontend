import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div`
  &.filtersVisible {
    position: fixed;

    @media (min-width: ${(props) => props.theme.small_width}) {
      position: initial;
    }
  }
`;

export const ContainerExtended = styled(Container)`
  max-width: none;
`;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 32px;
    margin-bottom: 30px;
  }
`;

export const TwoColGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: grid;
    grid-template-columns: 275px 1fr;
    grid-gap: 40px;
  }
`;

export const GridCol = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 30px;
  }
`;
