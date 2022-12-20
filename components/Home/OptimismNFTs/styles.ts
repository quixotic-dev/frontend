import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 50px 40px;
  }
`;

export const CardContainer = styled.div``;

export const CardGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
  }
`;
