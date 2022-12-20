import styled from "styled-components";
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

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;
  padding: 25px;
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
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  margin-top: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr;
  }
`;

export const Button = styled.div`
  position: relative;
  font-weight: 800;
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  padding: 12px;
  border-radius: 52px;
  transition: all 0.2s;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 12px 30px;
  }

  &.outline {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.background};
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ButtonText = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  width: fit-content;
  margin: auto;
`;

export const ModalImage = styled.div`
  margin: 0 -25px;
`;
