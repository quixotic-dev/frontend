import styled from "styled-components";
import { BaseModalBackground } from "styled-react-modal";

export const ModalBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.2s ease-in-out;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
`;
