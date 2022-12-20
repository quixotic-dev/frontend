import styled, { keyframes } from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerExtended = styled(Container)``;

export const Editor = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 80%;
    max-width: 650px;
    margin: auto;
  }
`;

export const EditorTitleContainer = styled.div`
  border-radius: 16px;
  background: ${(props) =>
    `linear-gradient(-45deg, ${props.theme.colors.network}B0, ${props.theme.colors.network}E6)`};
  color: ${(props) => props.theme.colors.secondary};
  padding: 30px 25px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 50px 40px;
    margin-bottom: 10px;
  }
`;

export const EditorTitle = styled.div`
  font-size: 22px;
  font-weight: 800;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 32px;
  }
`;

export const EditorDescription = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  font-size: 13px;
  margin-top: 15px;

  a {
    width: fit-content;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 14px;
    margin-top: 25px;
  }
`;

export const GuideButton = styled.div`
  width: fit-content;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  padding: 5px 12px;
  font-weight: 600;
  border-radius: 52px;
  color: ${(props) => props.theme.colors.secondary};
  margin-left: 2px;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.network};
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 8px 15px;
  }
`;

const LoadingRingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: 3px solid transparent;
  border-top: 3px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${LoadingRingKeyframes} 2s linear infinite;
  margin: auto;

  &.small {
    position: absolute;
    left: calc(50% - 90px);
    bottom: -1px;
    border-width: 2px;
    width: 14px;
    height: 14px;
  }
`;

export const Toggle = styled.div`
  position: relative;
  width: 35px;
  height: 20px;
  cursor: pointer;
  background: ${(props) => props.theme.colors.primary};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background: ${(props) => props.theme.colors.secondary};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  &.checked {
    background: green;

    &:before {
      -webkit-transform: translateX(15px);
      -ms-transform: translateX(15px);
      transform: translateX(15px);
    }
  }
`;
