import styled, { keyframes } from "styled-components";
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

export const NoItemsButton = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 52px;
  padding: 10px 30px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: fit-content;
  }

  &:hover {
    cursor: pointer;
  }

  &.no-click {
    cursor: default;
  }
`;

const LoadingRingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingRing = styled.div`
  border: 4px solid ${(props) => props.theme.colors.lightGray};
  border-top: 4px solid ${(props) => props.theme.colors.network};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 20px auto;
  margin-top: 60px;
  animation: ${LoadingRingKeyframes} 2s linear infinite;
`;
