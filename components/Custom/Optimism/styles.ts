import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  padding: 30px 20px 40px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 40px;
  }
`;

export const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  max-width: 500px;
  margin: auto;
  border-radius: 12px;
  border: 1px solid white;

  @media (min-width: ${(props) => props.theme.small_width}) {
    max-width: 575px;
    padding: 30px 40px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }
`;

export const TitleGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 12px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 800;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;

export const ChipContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  font-size: 13px;
  color: ${(props) => props.theme.colors.accent};

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 12px;
    font-size: 14px;
  }
`;

export const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 6px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 5px;
  }
`;

export const Chip = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.accent};
  padding: 6px 8px;
  border-radius: 52px;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.lightGray};
    border: 1px solid ${(props) => props.theme.colors.darkGray};
    color: ${(props) => props.theme.colors.primary};
  }

  &.selected {
    color: ${(props) => props.theme.colors.network};
    border: 1px solid ${(props) => props.theme.colors.network};
    background: ${(props) => props.theme.colors.networkLight};
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export const ChipIcon = styled.div`
  margin-right: 6px;
`;

export const NFTContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.lightGray};

  .hidden {
    opacity: 0;
  }

  img {
    position: absolute;
    opacity: 1;
    transition: opacity 0.5s linear;
  }
`;

export const MintButtonGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
`;

export const MintButton = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.network};
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  border-radius: 52px;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;

    &.secondary {
      color: ${(props) => props.theme.colors.network};
      background: ${(props) => props.theme.colors.networkLight};
    }
  }

  &.secondary {
    color: ${(props) => props.theme.colors.network};
    background: none;
  }

  &.disabled {
    color: ${(props) => props.theme.colors.network};
    background: ${(props) => props.theme.colors.networkLight};

    &:hover {
      cursor: default;
    }
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 12px;
  }
`;
