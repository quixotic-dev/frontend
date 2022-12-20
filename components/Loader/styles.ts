import styled, { keyframes } from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerExtended = styled(Container)``;

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
  margin: 150px auto;
  animation: ${LoadingRingKeyframes} 2s linear infinite;
`;
