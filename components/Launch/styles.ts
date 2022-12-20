import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)``;

export const Title = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 8px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 48px;
    margin-bottom: 10px;
  }
`;

export const Subtitle = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: 40px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 60px;
    font-size: 22px;
  }
`;

export const SectionTitle = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-weight: 800;
    font-size: 22px;
    margin-bottom: 30px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 24px;
  }
`;

export const SectionSubtitle = styled.span`
  color: ${(props) => props.theme.colors.accent};
  font-weight: 500;
`;

export const SectionGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 50px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-gap: 75px;
  }
`;

export const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .infinite-scroll-component__outerdiv {
    display: contents;
  }
`;
