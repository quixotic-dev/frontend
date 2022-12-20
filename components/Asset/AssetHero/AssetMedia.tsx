import "@google/model-viewer";
import { FaEthereum } from "react-icons/fa";
import { TbBuildingBridge } from "react-icons/tb";
import ReactTooltip from "react-tooltip";
import { siteConfig } from "../../../shared/config";
import { TokenMedia } from "../../Common/Images/TokenImage";
import { AssetMediaModal } from "./AssetMediaModal";
import { AssetMediaContainer, Network, Rank } from "./styles";

export const AssetMedia = ({ token, lightboxIsOpen, setLightboxIsOpen }) => {
  return (
    <>
      <AssetMediaContainer
        className={
          !token.animation_url && !token.image && !token.collection.image_url
            ? "no-image"
            : token.collection.display_theme == 0
            ? "padded link"
            : "link"
        }
        backgroundColor={
          token.background_color ? `#${token.background_color}` : null
        }
        onClick={() =>
          token.collection.image_url && !token.animation_url
            ? setLightboxIsOpen(true)
            : null
        }
      >
        <TokenMedia token={token} />
        {token.network != siteConfig.NETWORK && (
          <>
            <Network data-tip data-for="network">
              <FaEthereum />
            </Network>
            <ReactTooltip
              id="network"
              type="info"
              effect="solid"
              className="tooltip"
              backgroundColor="#1C1C1D"
            >
              <b>Blockchain: Ethereum</b>
            </ReactTooltip>
          </>
        )}
        {token.bridged && (
          <>
            <Network data-tip data-for="bridge">
              <TbBuildingBridge />
            </Network>
            <ReactTooltip
              id="bridge"
              type="info"
              effect="solid"
              className="tooltip"
              backgroundColor="#1C1C1D"
            >
              <b>Bridged from Ethereum</b>
            </ReactTooltip>
          </>
        )}
        {token.collection.ranking_enabled && token.rank && (
          <>
            <Rank data-tip data-for="rank">
              #{token.rank}
            </Rank>
            <ReactTooltip
              id="rank"
              type="info"
              effect="solid"
              className="tooltip"
              backgroundColor="#1C1C1D"
            >
              <b>Quix Rarity Rank</b>
            </ReactTooltip>
          </>
        )}
      </AssetMediaContainer>
      <AssetMediaModal
        token={token}
        lightboxIsOpen={lightboxIsOpen}
        setLightboxIsOpen={setLightboxIsOpen}
      />
    </>
  );
};
