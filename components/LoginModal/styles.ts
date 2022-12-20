import styled, { keyframes } from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  position: relative;
  width: 90%;
  max-width: 350px;
  height: 360px;
  overflow: auto;
  background: ${(props) => props.theme.colors.secondary};
  opacity: ${(props) => props.opacity};
  border-radius: 18px;
  z-index: 9999;
  margin-top: -12%;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 360px;
    height: 360px;
    max-height: 90%;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  grid-gap: 15px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 30px;
  text-align: center;
  height: 100%;
`;

export const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 6px;
  width: 100%;

  &.wallets {
    grid-gap: 10px;
  }
`;

export const LargeText = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

export const SmallText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};
`;

export const Button = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 52px;
  padding: 10px 20px;
  width: 100%;
  transition: all 0.2s;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const LoginButton = styled(Button)`
  /* padding: 5px 20px; */
  height: 48px;
  padding: 0 15px;
  font-weight: 600;
  font-size: 15px;
`;

export const ButtonLogo = styled.div`
  height: 35px;
  width: 35px;
  position: relative;

  &.coinbase {
    height: 30px;
    width: 30px;
  }
`;

export const LoginButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const CancelButton = styled(Button)`
  margin-top: 20px;
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
  animation: ${LoadingRingKeyframes} 2s linear infinite;
`;
