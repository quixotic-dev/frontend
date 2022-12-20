import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)``;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

export const Subtitle = styled.div`
  margin-bottom: 20px;
  max-width: 700px;
  color: ${(props) => props.theme.colors.accent};

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 40px;
  }
`;

export const NoItemsButton = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  background: ${(props) => props.theme.colors.network};
  color: ${(props) => props.theme.colors.networkLight};
  border-radius: 52px;
  padding: 12px 20px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: fit-content;
    padding: 12px 30px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
  }

  &.no-click {
    cursor: default;
  }
`;
