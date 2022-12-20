import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { ModalProvider } from "styled-react-modal";
import {
  fetchErc1155TokenOwnedQuantity,
  fetchRelatedTokens,
} from "../../api/token";
import { State } from "../../store";
import { ModalBackground } from "../Common/StyledModal/styles";
import { AssetActivity } from "./AssetActivity/AssetActivity";
import { AssetAttributes } from "./AssetAttributes/AssetAttributes";
import { AssetDescription } from "./AssetDescription/AssetDescription";
import { AssetDetails } from "./AssetDetails/AssetDetails";
import { AssetHero } from "./AssetHero/AssetHero";
import { AssetListings } from "./AssetListings/AssetListings";
import { AssetOffers } from "./AssetOffers/AssetOffers";
import { AssetPriceHistory } from "./AssetPriceHistory/AssetPriceHistory";
import { MoreFromCollection } from "./MoreFromCollection/MoreFromCollection";
import {
  AssetDetailsGrid,
  ContainerBackground,
  ContainerExtended,
  TwoColGrid,
} from "./styles";

export const Asset = ({ token, setToken }) => {
  const address = useSelector((state: State) => state.address);
  const [relatedTokens, setRelatedTokens] = useState([]);

  useEffect(() => {
    const fetchMoreFromCollection = async () => {
      const tokens = await fetchRelatedTokens(
        token.collection.address,
        token.token_id
      );

      setRelatedTokens(tokens);
    };

    fetchMoreFromCollection();
  }, []);

  const [quantityOwned, setQuantityOwned] = useState(0);
  const [quantityListed, setQuantityListed] = useState(0);
  useEffect(() => {
    const fetchQuantityOwned = async () => {
      const res = await fetchErc1155TokenOwnedQuantity(
        token.collection.address,
        token.token_id,
        address
      );
      setQuantityOwned(res.quantity);
      setQuantityListed(res.listed);
    };

    if (address && token.collection.contract_type == "ERC-1155") {
      fetchQuantityOwned();
    }
  }, [address]);

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ContainerBackground>
        <ReactTooltip
          place="top"
          type="info"
          effect="solid"
          className="tooltip"
          backgroundColor="#1C1C1D"
        />
        <ContainerExtended>
          <AssetHero
            token={token}
            setToken={setToken}
            quantityOwned={quantityOwned}
            setQuantityOwned={setQuantityOwned}
            quantityListed={quantityListed}
            setQuantityListed={setQuantityListed}
          />
          <TwoColGrid>
            <AssetDetailsGrid>
              <AssetDescription token={token} />
              <AssetAttributes token={token} />
              <AssetDetails token={token} />
            </AssetDetailsGrid>

            <AssetDetailsGrid>
              <AssetPriceHistory token={token} />
              {token.collection.contract_type == "ERC-1155" && (
                <AssetListings
                  token={token}
                  setToken={setToken}
                  setQuantityOwned={setQuantityOwned}
                  setQuantityListed={setQuantityListed}
                />
              )}
              <AssetOffers
                token={token}
                setToken={setToken}
                quantityOwned={quantityOwned}
              />
            </AssetDetailsGrid>
          </TwoColGrid>

          <AssetActivity token={token} />
          <MoreFromCollection
            collectionName={token.collection.name}
            tokens={relatedTokens}
          />
        </ContainerExtended>
      </ContainerBackground>
    </ModalProvider>
  );
};
