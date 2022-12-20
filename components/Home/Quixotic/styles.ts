import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  color: white;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.network};
  }
`;

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  background: ${(props) => props.theme.colors.heroBackground};
  border-radius: 12px;
  padding: 30px 20px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: auto 2fr;
    padding: 30px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-gap: 60px;
  }
`;

export const AboutTitleGrid = styled.div`
  margin: auto 0;
`;

export const AboutTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 28px;
    text-align: left;
    margin-bottom: 20px;
  }

  .large {
    font-size: 36px;
    line-height: 36px;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      font-size: 36px;
      line-height: 36px;
    }

    @media (min-width: ${(props) => props.theme.max_width}) {
      font-size: 48px;
      line-height: 48px;
    }
  }
`;

export const AboutDescription = styled.div`
  color: ${(props) => props.theme.colors.network};
  background: ${(props) => props.theme.colors.secondary};
  padding: 8px 15px;
  border-radius: 8px;
  width: fit-content;
  font-size: 18px;
  font-weight: 600;
  margin: auto;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    padding: 8px 20px;
    margin: 0;
  }
`;

export const AboutItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  text-align: center;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-gap: 20px;
  }
`;

export const AboutItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  grid-gap: 10px;
  border-radius: 10px;
  padding: 30px 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.colors.secondary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 40px 15px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    padding: 40px 20px;
  }
`;

export const ItemIcon = styled.div`
  font-size: 35px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ItemTitle = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.network};
`;

export const ItemDescription = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 13px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    font-size: 14px;
  }
`;
