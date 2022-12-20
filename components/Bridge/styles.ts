import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)``;

export const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;
  max-width: 500px;
  margin: auto;
  border-radius: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    max-width: 800px;
    padding: 30px 40px;
    grid-gap: 30px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }
`;

export const BridgeGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  width: 100%;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: grid;
    grid-template-columns: 1fr 30px 1fr;
  }
`;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 800;
  align-items: start;
  width: 100%;
  text-align: center;
`;

export const Warning = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  grid-gap: 10px;
  color: ${(props) => props.theme.colors.network};
  background: ${(props) => props.theme.colors.networkLight};
  width: 100%;
  padding: 10px 12px;
  border-radius: 5px;
  font-size: 13px;
  margin-top: -5px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    text-align: left;
    grid-gap: 10px;
    font-size: 14px;
  }
`;

export const WarningIcon = styled.div`
  display: flex;
  flex-shrink: 0;
`;

export const InfoIcon = styled.div`
  display: flex;
  font-size: 14px;
`;

export const Subtitle = styled.div`
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.accent};
  font-size: 15px;
  line-height: 22px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 22px;
  }
`;

export const Arrow = styled.div`
  margin: auto;
  font-size: 18px;

  &.right {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    &.right {
      display: block;
    }
    &.down {
      display: none;
    }
  }
`;

export const TokenSection = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-gap: 18px;
  padding: 20px;
  background: ${(props) => props.theme.colors.lightGray};
  border-radius: 12px;
  width: 100%;
`;

export const TokenSectionBackground = styled.img`
  opacity: 0.2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(6px);
  transform: scale(1.25);
  overflow: hidden;
`;

export const TextInputGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
`;

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 6px;
  font-size: 13px;
  color: ${(props) => props.theme.colors.accent};
`;

export const TextInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};

  &:focus {
    outline: none;
  }
`;

export const AssetCardContainer = styled.div`
  margin: auto;
  width: 225px;
`;

export const NetworkContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  grid-gap: 10px;
  font-size: 14px;
  width: fit-content;
  padding: 10px;
  margin: 0 auto;
`;

export const Network = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  transition: all 0.2s;
  padding: 6px;
  margin: -6px;
  border-radius: 8px;

  &.dropdown {
    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.colors.secondary};
    }
  }
`;

export const NetworkLabel = styled.div`
  color: ${(props) => props.theme.colors.accent};
`;

export const NetworkName = styled.div`
  font-weight: 500;
`;

export const NetworkImage = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const NetworkDropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  background: ${(props) => props.theme.colors.secondary};
  left: 0;
  top: 40px;
  width: 250px;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.visible {
    opacity: 1;
  }
`;

export const NetworkDropdownRow = styled.div`
  display: flex;
  grid-gap: 8px;
  align-items: center;
  padding: 8px;
  border-radius: 6px;

  &:hover {
    background: ${(props) => props.theme.colors.lightGray};
    cursor: pointer;
  }

  &.selected {
    background: ${(props) => props.theme.colors.lightGray};
  }
`;
export const BridgeButtonContainer = styled.div`
  width: 100%;
`;

export const BridgeButton = styled.div`
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.network};
  border: 1px solid ${(props) => props.theme.colors.network};
  padding: 10px 20px;
  width: 100%;
  border-radius: 52px;
  transition: all 0.2s;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 12px 30px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
  }

  &.disabled {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    background: ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.darkGray};
    box-shadow: none;

    &:hover {
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  &.dark {
    color: ${(props) => props.theme.colors.secondary};
    background: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export const BridgeButtonContentGrid = styled.div`
  display: flex;
  grid-gap: 10px;
  width: fit-content;
  margin: auto;
`;

export const ContractRequest = styled.div`
  text-align: center;
  margin-top: 15px;
  font-weight: 500;
  font-size: 15px;
`;

export const TokenInfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;

export const TokenInfoRow = styled.div`
  display: flex;
  grid-gap: 20px;
  justify-content: space-between;
`;

export const TokenInfo = styled.div`
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${(props) => props.theme.colors.accent};

  a {
    color: ${(props) => props.theme.colors.network};
  }

  &.title {
    font-weight: 500;
    flex-shrink: 0;
  }

  &.withdrawal {
    display: flex;
    align-items: center;
    grid-gap: 3px;
  }
`;
