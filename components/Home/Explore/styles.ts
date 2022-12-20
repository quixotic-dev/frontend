import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  padding: 0 20px 40px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 20px 40px 60px;
  }
`;

export const ExploreButton = styled.div`
  width: fit-content;
  margin: auto;
  padding: 12px 30px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  background: ${(props) => props.theme.colors.network};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 52px;
  transition: all 0.2s;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 15px 50px;
    margin: 30px 0;
    margin: auto;
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
