import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  padding: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 20px 40px 40px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }

  div:nth-child(9) {
    @media (min-width: 676px) {
      display: none;
    }

    @media (min-width: ${(props) => props.theme.medium_width}) {
      display: flex;
    }
  }

  div:nth-child(10) {
    @media (min-width: 514px) {
      display: none;
    }

    @media (min-width: ${(props) => props.theme.medium_width}) {
      display: flex;
    }
  }
`;
