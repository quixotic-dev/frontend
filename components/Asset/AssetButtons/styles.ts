import styled, { keyframes } from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${(props) => props.theme.colors.secondary};
  opacity: ${(props) => props.opacity};
  transition: all 0.2s ease-in-out;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 425px;
    height: auto;
    max-height: 90%;
    border-radius: 18px;
  }
`;

export const Button = styled.div`
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

  &.small {
    padding: 12px;
  }

  &.tiny {
    padding: 5px 15px;
    width: fit-content;
    font-weight: 600;
    font-size: 13px;
  }

  &.switchLeft {
    border-radius: 6px 0 0 6px;
    padding: 8px;
    font-weight: 600;

    &.outline {
      border: 1px solid ${(props) => props.theme.colors.gray};
    }
  }

  &.switchRight {
    border-radius: 0 6px 6px 0;
    padding: 8px;
    font-weight: 600;

    &.outline {
      border: 1px solid ${(props) => props.theme.colors.gray};
    }
  }

  &.muted {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    background: ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.accent};
    box-shadow: none;

    &:hover {
      cursor: default;
      box-shadow: none;
    }
  }

  &.outline {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.lightGray};
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

export const ButtonText = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  width: fit-content;
  margin: auto;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;
  padding: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 30px;
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  font-weight: 700;
`;

export const ModalSubtitle = styled.div`
  text-align: center;
  font-size: 15px;
  margin-top: -10px;

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const ModalTitleIcon = styled.div`
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  font-size: 15px;
`;

export const ModalGridRow = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;

  &.wallet {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 30px;
    align-items: center;
  }

  &.rewards {
    grid-gap: 5px;
  }
`;

export const TextInputLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
`;

export const TextInputContainer = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 6px;
  padding: 0 10px;
  z-index: 1;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};

  &:focus {
    outline: none;
  }
`;

export const Dropdown = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  margin-top: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  &.offer {
    @media (min-width: ${(props) => props.theme.small_width}) {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
  }

  &.switch {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0;
    margin-top: 5px;
  }
`;

export const TransactionRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 600;
`;

export const TransactionStatus = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 7px;
  font-size: 15px;
  font-weight: 400;
`;

export const RewardsTitle = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  font-size: 14px;
`;

export const RewardsBadge = styled.div`
  background: ${(props) => props.theme.colors.network};
  color: ${(props) => props.theme.colors.networkLight};
  padding: 1px 3px;
  border-radius: 5px;
  font-size: 11px;
`;

export const RewardsDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: 5px;
  margin-top: 2px;

  &.link {
    &:hover {
      cursor: pointer;
    }
  }

  &.grid {
    flex-direction: column;
    align-items: start;
    grid-gap: 3px;
  }
`;

export const RewardsBreakdownGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const RewardsBreakdownRow = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
`;

export const RewardsBreakdownIcon = styled.div`
  width: 12px;
  height: 12px;
  color: ${(props) => props.theme.colors.network};

  img {
    border-radius: 100%;
    overflow: hidden;
  }
`;

export const RewardsDescriptionIcon = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 600;
`;

export const RewardsIcon = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 3px;
`;

export const RewardsEst = styled.div`
  color: ${(props) => props.theme.colors.darkGray};
  margin-right: 2px;
  font-weight: 400;
  font-size: 13px;
`;

export const PurchaseTotal = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 3px;

  &.status {
    grid-gap: 10px;
  }
`;

export const SmallText = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.colors.accent};

  &.error {
    color: #ff0420;
  }

  &.warning {
    color: #ffa500;
  }
`;

export const FeeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};

  &.royalty {
    font-size: 13px;
    margin-top: 2px;
  }
`;

export const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  grid-gap: 10px;
`;

export const PriceInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  grid-gap: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 6px;
  padding: 0 8px;
  font-size: 14px;

  &.link {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const PriceImage = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const PriceDropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.background};
  left: 0;
  top: 40px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  z-index: 2;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  &.visible {
    opacity: 1;
  }
`;

export const PriceDropdownRow = styled.div`
  display: flex;
  grid-gap: 6px;
  align-items: center;
  padding: 10px 8px;

  &:hover {
    background: ${(props) => props.theme.colors.lightGray};
    cursor: pointer;
  }

  &.selected {
    background: ${(props) => props.theme.colors.lightGray};
  }
`;

export const DropDownChevron = styled.div`
  display: flex;
  font-size: 12px;
  margin-left: auto;
  color: ${(props) => props.theme.colors.accent};
`;

export const AssetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 15px;
  align-items: center;
`;

export const TokenImageContainer = styled.div`
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.gray};
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  flex-shrink: 0;

  &.no-image {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    color: ${(props) => props.theme.colors.accent};
  }
`;

export const AssetInfo = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 3px;
`;

export const AssetCollection = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  font-size: 14px;
`;

export const AssetName = styled.div`
  font-weight: 800;
  font-size: 16px;
`;

export const VerifiedIcon = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.network};
`;

const LoadingRingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: 3px solid ${(props) => props.theme.colors.gray};
  border-top: 3px solid ${(props) => props.theme.colors.network};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${LoadingRingKeyframes} 2s linear infinite;
  margin: auto;

  &.small {
    position: relative;
    border: 2px solid ${(props) => props.theme.colors.secondary};
    border-top: 2px solid ${(props) => props.theme.colors.primary};
    width: 17px;
    height: 17px;
  }
`;

export const Ring = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border: 3px solid ${(props) => props.theme.colors.gray};
  border-radius: 50%;
  width: 50px;
  height: 50px;

  &.success {
    border: 3px solid ${(props) => props.theme.colors.primary};
  }
`;

export const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  font-weight: 600;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin: auto;
  position: relative;

  &.border {
    border: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

export const StepText = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
`;

export const StepTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const StepDescription = styled.div`
  font-size: 14px;
`;

export const Uniswap = styled.iframe`
  border: 0;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
  max-width: 600px;
  min-height: 560px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    min-height: 501px;
  }
`;
