import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div`
  background: ${(props) =>
    `linear-gradient(${props.theme.colors.networkLight}00, ${props.theme.colors.networkLight}, ${props.theme.colors.networkLight}00)`};
`;

export const ContainerExtended = styled(Container)`
  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 60px 40px;
    margin-bottom: 20px;
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
  font-size: 34px;
  font-weight: 600;
  margin-bottom: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 48px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 56px;
  }
`;

export const AboutDescription = styled.div`
  color: ${(props) => props.theme.colors.accent};
  text-align: center;
  font-size: 16px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 18px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 22px;
  }
`;
