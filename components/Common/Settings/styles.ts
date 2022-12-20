import styled, { keyframes } from "styled-components";
import { Container } from "../Container/styles";

export const ContainerExtended = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 250px 1fr;
    grid-gap: 25px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 300px 1fr;
    grid-gap: 50px;
  }
`;

export const Title = styled.div`
  margin-bottom: 12px;
  margin-left: 8px;
  font-weight: 600;
  font-size: 18px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 20px;
  }
`;

export const EditorMenu = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 10px;
  }
`;

export const EditorMenuRow = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  font-size: 15px;
  font-weight: 400;
  padding: 0 8px;
  border-radius: 6px;
  height: 40px;

  &.active {
    font-weight: 600;
    background: ${(props) => props.theme.colors.networkLight};
    color: ${(props) => props.theme.colors.network};
  }

  &:hover {
    cursor: pointer;
  }
`;

export const EditorGrid = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 100%;
    max-width: 750px;
    margin: 0 auto auto;
    grid-gap: 25px;
    padding: 30px 40px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
    border-radius: 18px;
    background: ${(props) => props.theme.colors.secondary};
  }
`;

export const EditorTitle = styled.div`
  font-size: 22px;
  font-weight: 800;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 24px;
  }
`;

export const EditorDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const EditorRow = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
`;

export const EditorRowText = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`;

export const EditorRowLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
`;

export const EditorRowDescription = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.colors.accent};

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`;

export const EditorInputContainer = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;

  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};

  &.dropdown {
    padding: 0 10px;
  }

  &.price {
    grid-gap: 5px;
  }
`;

export const URLInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};
`;

export const EditorInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  outline: none;
  width: 100%;
  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.gray};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.lightGray};
    cursor: not-allowed;
  }

  &.hidden {
    display: none;
  }

  &:invalid {
    border: 1px solid red;
    color: red;
  }

  &.price {
    padding: 0;
    border: none;
    border-radius: 0;
    width: 100%;
  }

  &.collection-threshold {
    width: fit-content;
    max-width: 75px;
  }
`;

export const EditorTextArea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  outline: none;
  resize: none;
  height: 110px;
  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.gray};
  }

  &.src {
    height: 250px;
    cursor: pointer;
  }
`;

export const EditorLabel = styled.label`
  width: 100%;
  height: 100%;
  line-height: 120px;

  &:hover {
    cursor: pointer;
  }
`;

export const EditorDropdown = styled.select`
  border: none;
  background: ${(props) => props.theme.colors.lightGray};
  font-size: 14px;
  width: 100%;
  padding: 10px 0;
  color: ${(props) => props.theme.colors.primary};
  -webkit-appearance: none;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const SaveButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 20px 20px;
  margin: 0 -20px -40px;
  background: ${(props) => props.theme.colors.secondary};
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0 0 18px 18px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: calc(100% + 80px);
    padding: 20px 40px;
    margin: 0 -40px -30px;
  }
`;

export const SaveButton = styled.div`
  font-weight: 600;
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 52px;
  padding: 10px 30px;
  transition: all 0.2s;
  width: 100%;
  text-align: center;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &.error {
    background: ${(props) => props.theme.colors.networkLight};
    border: 1px solid ${(props) => props.theme.colors.networkLight};
    color: ${(props) => props.theme.colors.network};

    &:hover {
      box-shadow: none;
      cursor: default;
    }
  }

  &.disabled {
    background: ${(props) => props.theme.colors.lightGray};
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      box-shadow: none;
      cursor: default;
    }
  }
`;

export const ImageUpload = styled.div`
  display: flex;
  text-align: center;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  background: ${(props) => props.theme.colors.lightGray};
  border-radius: 6px;
  padding: 10px;

  &.profile {
    width: fit-content;
  }

  &.upload {
    padding: 0;
  }

  #image-upload {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  #cover-image-upload {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`;

export const UploadedImage = styled.div`
  position: relative;
  border-radius: 6px;
  width: 100px;
  height: 100px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);

  img {
    border-radius: 6px;
    overflow: hidden;
    background: ${(props) => props.theme.colors.ghost};
  }

  &.cover {
    height: 100px;
    width: 100%;
  }
`;

export const DeleteImage = styled.div`
  position: absolute;
  display: flex;
  right: -6px;
  top: -6px;
  width: 25px;
  height: 25px;
  font-size: 0.8em;
  align-items: center;
  justify-content: space-between;
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100%;

  &::after {
    content: "✕";
    font-size: 0.7rem;
    width: 100%;
    color: white;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const DisplayThemeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 20px;
  }
`;

export const DisplayTheme = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  grid-gap: 10px;
  text-align: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  transition: all 0.2s;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 15px;
    grid-gap: 15px;
  }

  &.selected {
    border: 1px solid ${(props) => props.theme.colors.accent};
  }

  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.accent};
  }
`;

export const DisplayThemeImage = styled.div`
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  position: relative;
`;

export const DisplayThemeName = styled.div`
  font-weight: 500;
  font-size: 13px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
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

const LoadingRingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingRing = styled.div`
  border: 3px solid ${(props) => props.theme.colors.lightGray};
  border-top: 3px solid ${(props) => props.theme.colors.primary};
  border-left: 3px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${LoadingRingKeyframes} 2s linear infinite;
  margin: 40px auto;

  &.small {
    border-width: 2px;
    width: 16px;
    height: 16px;
    margin: auto;
  }

  &.small-absolute {
    position: absolute;
    left: calc(50% - 78px);
    bottom: 12px;
    border-width: 2px;
    width: 15px;
    height: 15px;
    margin: auto;
  }
`;

export const GenerateButton = styled.div`
  font-size: 14px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  width: fit-content;
  padding: 10px 20px;
  border-radius: 52px;
  font-weight: 600;
  flex-shrink: 0;

  &.muted {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    background: ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.darkGray};

    &:hover {
      cursor: default;
    }
  }

  &:hover {
    cursor: pointer;
  }

  &.metadata {
    border-radius: 6px;
  }
`;

export const GreenlistGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};
`;

export const GreenlistUploadContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const MetadataButtonGrid = styled.div`
  display: flex;
  grid-gap: 10px;
  width: 100%;
`;
