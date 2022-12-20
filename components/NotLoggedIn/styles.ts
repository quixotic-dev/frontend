import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  text-align: center;
  margin-top: 10%;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 42px;
    margin-bottom: 20px;
  }
`;

export const Subtitle = styled.div`
  margin-bottom: 20px;
  line-height: 22px;
  font-size: 14px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 40px;
    font-size: 18px;
    line-height: 24px;
  }
`;

export const NoItemsButton = styled.div`
  margin: 30px auto;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 52px;
  padding: 12px 20px;
  text-align: center;
  font-weight: 600;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: fit-content;
    padding: 12px 40px;
  }

  &:hover {
    cursor: pointer;
  }

  &.no-click {
    cursor: default;
  }
`;
