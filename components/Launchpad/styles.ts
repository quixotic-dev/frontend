import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  max-width: 650px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    max-width: 690px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    max-width: ${(props) => props.theme.max_width};
  }
`;

export const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: start;
  position: relative;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 1fr 1.2fr;
    grid-gap: 100px;
  }
`;

export const CollectionImageContainer = styled.div`
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  background: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.colors.lightGray};
`;

export const AssetDetails = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  overflow-wrap: anywhere;
`;

export const CollectionName = styled.div`
  font-size: 28px;
  font-weight: 800;
  word-break: break-word;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 36px;
  }
`;

export const CollectionDescription = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.accent};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;

export const PriceIcon = styled.div`
  display: flex;
  font-size: 13px;
`;

export const ButtonText = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  width: fit-content;
  margin: auto;
`;

interface PercentMintedProps {
  color: string;
}

export const PercentMinted = styled.div<PercentMintedProps>`
  height: 12px;
  width: 100%;
  border: 1px solid
    ${(props) => (props.color ? props.color : props.theme.colors.primary)};
  border-radius: 52px;
  overflow: hidden;
`;

interface PercentMintedFilledProps {
  percentFilled: string;
  color: string;
}

export const PercentMintedFilled = styled.div<PercentMintedFilledProps>`
  width: ${(props) => props.percentFilled};
  height: 100%;
  background: ${(props) =>
    props.color ? props.color : props.theme.colors.primary};
`;

export const MintProgress = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  margin: 30px 0 15px;
`;

export const MintProgressText = styled.div`
  display: flex;
  grid-gap: 10px;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
`;

export const MintButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin-top: 10px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 1fr 1fr;
    width: fit-content;
  }
`;

export const CollectionLinksGrid = styled.div`
  display: flex;
  grid-gap: 15px;
  flex-wrap: wrap;
`;

export const CollectionLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 14px;
  border-radius: 52px;
  flex-shrink: 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }

  &.link {
    font-size: 18px;
  }

  &.etherscan {
    display: block;
    width: 15px;
    height: 15px;
    margin-top: 1px;
  }
`;

export const Section = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray}99;
  border-radius: 12px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  font-size: 16px;
  font-weight: 600;
  padding: 15px;

  &:hover {
    cursor: pointer;
  }
`;

interface SectionTitleBadgeProps {
  color: string;
}

export const SectionTitleBadge = styled.div<SectionTitleBadgeProps>`
  font-size: 12px;
  margin-left: 8px;
  font-weight: 500;
  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};
  padding: 2px 8px;
  border-radius: 5px;

  &.active {
    background: ${(props) =>
      props.color ? props.color : props.theme.colors.primary};
    color: ${(props) =>
      props.color ? props.theme.colors.primary : props.theme.colors.secondary};
  }
`;

export const SectionTitleText = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  /* grid-gap: 5px; */
  font-weight: 500;
  /* font-size: 16px; */
`;

export const SectionContent = styled.div`
  /* border-top: 1px solid ${(props) => props.theme.colors.gray}; */
  padding: 5px 15px 15px;
`;

export const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 20px;
  font-size: 14px;

  overflow: hidden;
  word-break: break-all;
`;

export const DetailLabel = styled.div`
  flex-shrink: 0;
  font-weight: 500;
`;

export const DetailText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${(props) => props.theme.colors.accent};

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const MintAmountGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 4fr 1fr;
  width: fit-content;
  grid-gap: 20px;
  margin: 0 auto;
  text-align: center;
  margin: 20px auto;
  font-size: 26px;
  font-weight: 600;
`;

export const MintAmountButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 12px;
  border-radius: 52px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 5px 5px 15px rgba(0, 0, 0, 0.025),
    -5px -5px 15px rgba(0, 0, 0, 0.025);

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

interface ButtonProps {
  color: string;
}

export const Button = styled.div<ButtonProps>`
  position: relative;
  font-weight: 800;
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  padding: 10px 12px;
  border-radius: 52px;
  transition: all 0.2s;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 10px 30px;
  }

  &.muted {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    background: ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.darkGray};
    box-shadow: none;

    &:hover {
      cursor: default;
      box-shadow: none;
    }
  }

  &.outline {
    background: ${(props) =>
      props.color ? props.color : props.theme.colors.background};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid
      ${(props) => (props.color ? props.color : props.theme.colors.lightGray)};
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
  }

  &.disabled {
    cursor: not-allowed;
    box-shadow: none;
  }

  &.no-click {
    cursor: default;
  }

  &.warning {
    background: #ff0420;
    color: white;
    border: 1px solid #ff0420;
  }
`;
