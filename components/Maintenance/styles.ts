import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  max-width: 800px;
  margin: auto;
  margin-top: 15vh;
`;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

export const Subtitle = styled.div`
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.accent};
  font-size: 15px;
  line-height: 1.5;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 40px;
    font-size: 18px;
  }
`;

export const ImageContainer = styled.div`
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
`;
