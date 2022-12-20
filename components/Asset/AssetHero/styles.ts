import styled, { keyframes } from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 80%;
  overflow: visible;
  opacity: ${(props) => props.opacity};
  transition: all 0.2s ease-in-out;

  @media (min-width: ${(props) => props.theme.small_width}) {
    max-width: 67%;
    max-height: 67%;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    max-width: 750px;
  }
`;

export const AssetDetails = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;

interface AssetMediaProps {
  backgroundColor: string;
}

const GhostKeyframes = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const MediaPlaceholder = styled.div`
  border-radius: 12px;
  aspect-ratio: 1;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.colors.gray}99, ${props.theme.colors.gray}77)`};
  animation: ${GhostKeyframes} 4s linear infinite alternate;
  background-size: 400% 400%;
`;

export const AssetMediaContainer = styled.div<AssetMediaProps>`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  background: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.secondary};

  &.padded {
    img {
      padding: 15px !important;
    }
  }

  &.no-image {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    color: ${(props) => props.theme.colors.accent};
  }

  &.lightbox {
    background: none;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }

  model-viewer {
    width: 100%;
    height: 100%;
  }

  &.link {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const AssetMenuContainer = styled.div`
  position: relative;
`;

export const AssetMenuButtonGrid = styled.div`
  display: flex;
  position: relative;
  background: ${(props) => props.theme.colors.networkLight};
  border-radius: 52px 0 0 52px;
  padding: 0 5px;
  height: 100%;
  transition: all 0.5s;
  margin-right: -20px;

  @media (min-width: 650px) {
    border-radius: 52px;
    margin-right: 0;
  }

  a {
    display: flex;
  }

  &.hidden {
    margin-right: -130px;
    width: 150px;

    @media (min-width: 650px) {
      margin-right: 0;
      width: fit-content;
    }
  }
`;

export const AssetMenuButton = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  padding: 10px;
  color: ${(props) => props.theme.colors.network};

  &.last {
    border-right: none;
  }

  &.expand-button {
    @media (min-width: 650px) {
      display: none;
    }
  }

  &.refresh {
    font-size: 18px;
  }

  &.hidden {
    display: none;

    @media (min-width: 650px) {
      display: flex;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

export const LikeCount = styled.div`
  display: none;
  font-size: 15px;
  color: ${(props) => props.theme.colors.network};

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: block;
  }
`;

export const AssetMenuDropdown = styled.div`
  position: absolute;
  top: 50px;
  width: 200px;
  right: 10px;
  border-radius: 6px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(0, 0, 0, 0.1);
  z-index: 99;

  a {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    top: 50px;
    right: 10px;
  }
`;

export const AssetMenuDropdownRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  grid-gap: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  padding: 15px 12px;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }

  &.last {
    border-bottom: none;
  }
`;

export const ShareMenuContainer = styled.div`
  display: flex;
  padding-bottom: 15px;
  margin-bottom: -15px;
`;

export const AssetName = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`;

export const AssetNameText = styled.div`
  font-size: 24px;
  font-weight: 800;
  word-break: break-word;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 28px;
  }
`;

export const AssetOwner = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
  font-size: 14px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 20px;
  }

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const AssetOwnerItem = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;

  &.link {
    padding: 3px;
    margin: -3px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const AssetButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 1fr 1fr;
    width: fit-content;
  }
`;

export const CollectionCardMini = styled.div`
  display: flex;
  padding: 3px 8px 3px 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 52px;
  align-items: center;
  width: fit-content;
  transition: all 0.2s;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 20px rgba(0, 0, 0, 0.1),
      -5px -5px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

export const CollectionInfo = styled.div`
  font-size: 11px;
  padding-left: 8px;
  padding-right: 3px;
  color: ${(props) => props.theme.colors.accent};
`;

export const CollectionImageContainer = styled.div`
  display: block;
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 52px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.lightGray};
  border: 1px solid ${(props) => props.theme.colors.gray};
  flex-shrink: 0;

  img {
    border-radius: 52px;
  }
`;

export const CollectionName = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  font-size: 14px;
  font-weight: 800;
  margin-top: 1px;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
    margin-top: 0;
  }
`;

export const EndDate = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  font-size: 15px;
  margin-left: 3px;
  margin-top: 5px;
  color: ${(props) => props.theme.colors.accent};
`;

export const SaleInfo = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  font-size: 14px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  font-size: 24px;
  font-weight: 800;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 28px;
  }
`;

export const PriceSmall = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.accent};
  margin-top: 8px;
  margin-left: 5px;
`;

export const PriceLabel = styled.div``;

export const TopRowGrid = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 10px;
`;

export const VerifiedIcon = styled.div`
  display: flex;
  font-size: 13px;
  margin-top: 1px;
  color: ${(props) => props.theme.colors.network};

  &.warning {
    margin-top: 0;
    color: ${(props) => props.theme.colors.darkGray};
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;

const LoadingRingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingRing = styled.div`
  border: 3px solid ${(props) => props.theme.colors.lightGray};
  border-top: 3px solid ${(props) => props.theme.colors.network};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 60px auto 80px;
  animation: ${LoadingRingKeyframes} 2s linear infinite;

  &.medium {
    width: 30px;
    height: 30px;
    margin: 20px auto 0;
  }
`;

export const OwnerGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OwnerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 20px;
  padding: 10px 30px;
  margin: 0 -30px;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }
`;

export const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 12px;
`;

export const OwnerImage = styled.div`
  display: block;
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 52px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.gray};
  background: ${(props) => props.theme.colors.lightGray};
  flex-shrink: 0;
`;

export const OwnerInfoText = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 1px;
`;

export const OwnerName = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

export const OwnerAddress = styled.div`
  font-size: 13px;
`;

export const OwnerItemCount = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};
  flex-shrink: 0;
`;

export const Rank = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 1;
  background: rgb(0, 0, 0, 0.25);
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
`;

export const Network = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  z-index: 1;
  background: rgb(0, 0, 0, 0.25);
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  aspect-ratio: 1;
  align-items: center;
`;
