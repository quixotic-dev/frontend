import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div`
  background: linear-gradient(#007aff00, #007aff20, #007aff00);
`;

export const ContainerExtended = styled(Container)`
  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 40px;
  }
`;

export const TitleSection = styled.div`
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 30px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin: 10px 0 40px;
  }
`;

export const Title = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 42px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 54px;
  }
`;

export const AboutDescription = styled.div`
  color: ${(props) => props.theme.colors.accent};
  text-align: center;
  font-size: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 18px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 20px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Card = styled.div`
  height: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    min-width: auto;

    &:hover {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 20px rgba(0, 0, 0, 0.1), -5px -5px 20px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`;
