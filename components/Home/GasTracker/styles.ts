import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  padding: 0 20px 40px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 20px 40px 40px;
  }
`;

export const GasContainer = styled.div`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

export const GasTitle = styled.div`
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 64px;
    margin-bottom: 15px;
  }
`;

export const GasSubtitle = styled.div`
  font-size: 16px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 20px;
  }
`;
