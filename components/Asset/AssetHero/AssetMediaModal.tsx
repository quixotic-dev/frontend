import "@google/model-viewer";
import { useState } from "react";
import { TokenMedia } from "../../Common/Images/TokenImage";
import { AssetMediaContainer, StyledModal } from "./styles";

export const AssetMediaModal = ({
  token,
  lightboxIsOpen,
  setLightboxIsOpen,
}) => {
  const [opacity, setOpacity] = useState(0);

  async function toggleModal(e) {
    setOpacity(0);
    setLightboxIsOpen(!lightboxIsOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    setOpacity(0);
  }

  return (
    <StyledModal
      isOpen={lightboxIsOpen}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      opacity={opacity}
      backgroundProps={{ opacity }}
      onClick={toggleModal}
    >
      <AssetMediaContainer
        className="lightbox"
        backgroundColor={
          token.background_color ? `#${token.background_color}` : null
        }
      >
        <TokenMedia token={token} />
      </AssetMediaContainer>
    </StyledModal>
  );
};
