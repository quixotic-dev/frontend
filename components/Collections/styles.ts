import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)``;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.div`
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 30px;
  }
`;
