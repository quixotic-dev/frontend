import { ethers } from "ethers";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { RiArrowRightDownLine, RiErrorWarningFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { queueRefreshToken, refreshTokenOrders } from "../../../api/token";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { CollectionImage } from "../../Common/Images/CollectionImage";
import { PriceIcon, TextTruncater } from "../../Common/styles";
import { BridgeButton } from "../AssetButtons/BridgeButton";
import { BuySellOrderButton } from "../AssetButtons/BuySellOrderButton";
import { CancelSellOrderButton } from "../AssetButtons/CancelSellOrderButton";
import { LowerPriceButton } from "../AssetButtons/LowerPriceButton";
import { OfferButton } from "../AssetButtons/OfferButton";
import { SellButton } from "../AssetButtons/SellButton";
import { TransferButton } from "../AssetButtons/TransferButton";
import { TwoColGrid } from "../styles";
import { AssetMenu } from "./AssetMenu";
import { Erc1155Owners } from "./Erc1155Owners";
import {
  AssetButtons,
  AssetDetails,
  AssetName,
  AssetNameText,
  AssetOwner,
  CollectionCardMini,
  CollectionImageContainer,
  CollectionInfo,
  CollectionName,
  EndDate,
  MediaPlaceholder,
  Price,
  PriceLabel,
  PriceSmall,
  SaleInfo,
  TopRowGrid,
  VerifiedIcon,
} from "./styles";

export const AssetHero = ({
  token,
  setToken,
  quantityOwned,
  setQuantityOwned,
  quantityListed,
  setQuantityListed,
}) => {
  console.log(token);
  const address = useSelector((state: State) => state.address);
  const showUSD = useSelector((state: State) => state.showUSD);

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);

  const username =
    token.owner && (token.owner.username || token.owner.reverse_ens);

  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  const refreshToken = async () => {
    if (!tokenRefreshed) {
      toast.success("We're updating this item, check back in a minute.");
      setTokenRefreshed(true);

      // TODO: use network
      queueRefreshToken(token.contract_address, token.token_id);
    }
  };

  const refreshOrders = async () => {
    const updatedToken = await refreshTokenOrders(
      token.contract_address,
      token.token_id
    );
    if (updatedToken) {
      setToken(updatedToken);
    }
  };

  return (
    <>
      <TwoColGrid>
        <MediaPlaceholder>
          <AssetMedia
            token={token}
            lightboxIsOpen={lightboxIsOpen}
            setLightboxIsOpen={setLightboxIsOpen}
          />
        </MediaPlaceholder>
        <AssetDetails>
          <TopRowGrid>
            <Link
              href={
                token.collection.slug
                  ? `/collection/${token.collection.slug}`
                  : `/collection/${
                      token.network != siteConfig.NETWORK ? "eth/" : ""
                    }${token.contract_address}`
              }
            >
              <a>
                <CollectionCardMini>
                  <CollectionImageContainer>
                    <CollectionImage collection={token.collection} />
                  </CollectionImageContainer>
                  <CollectionInfo>
                    <CollectionName>
                      <TextTruncater>{token.collection.name}</TextTruncater>
                      {token.collection.delisted ? (
                        <VerifiedIcon className="warning">
                          <RiErrorWarningFill />
                        </VerifiedIcon>
                      ) : token.collection.is_spam ? (
                        <VerifiedIcon className="warning">
                          <BsFillQuestionCircleFill />
                        </VerifiedIcon>
                      ) : (
                        token.collection.verified && (
                          <VerifiedIcon>
                            <MdVerified />
                          </VerifiedIcon>
                        )
                      )}
                    </CollectionName>
                  </CollectionInfo>
                </CollectionCardMini>
              </a>
            </Link>

            <AssetMenu
              token={token}
              refreshToken={refreshToken}
              tokenRefreshed={tokenRefreshed}
              setLightboxIsOpen={setLightboxIsOpen}
            />
          </TopRowGrid>
          <AssetName>
            <AssetNameText>{token.name}</AssetNameText>
            {token.pending_owner &&
            token.owner &&
            (token.owner.address ==
              "0x8DD330DdE8D9898d43b4dc840Da27A07dF91b3c9" ||
              token.owner.address ==
                "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D") ? (
              <AssetOwner>
                <div>
                  Owned by{" "}
                  <Link href={`/${token.pending_owner.address}`} passHref>
                    <a>
                      {address === token.pending_owner.address ? (
                        "you (pending)"
                      ) : (
                        <>
                          {token.pending_owner.address.slice(0, 6)}...
                          {token.pending_owner.address.slice(-4)} (pending)
                        </>
                      )}
                    </a>
                  </Link>{" "}
                </div>
              </AssetOwner>
            ) : (
              !!token.owner &&
              token.collection.contract_type == "ERC-721" && (
                <AssetOwner>
                  <div>
                    Owned by{" "}
                    <Link
                      href={`/${username ? username : token.owner.address}`}
                      passHref
                    >
                      <a>
                        {address === token.owner.address ? (
                          "you"
                        ) : (
                          <>
                            {username ? (
                              username
                            ) : (
                              <>
                                {token.owner.address.slice(0, 6)}...
                                {token.owner.address.slice(-4)}
                              </>
                            )}
                          </>
                        )}
                      </a>
                    </Link>
                  </div>
                </AssetOwner>
              )
            )}

            {token.collection.contract_type == "ERC-1155" && (
              <Erc1155Owners token={token} quantityOwned={quantityOwned} />
            )}
          </AssetName>

          {token.sell_order && (
            <SaleInfo>
              <PriceLabel>Price</PriceLabel>
              <Price>
                <PriceIcon className="large">
                  <Image
                    src={`/payment_tokens/${token.sell_order.payment_token.symbol}.png`}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    width={50}
                    height={50}
                    priority
                  />
                </PriceIcon>
                {Number(
                  ethers.utils.formatEther(
                    ethers.utils.parseUnits(
                      token.sell_order.price.toString(),
                      "gwei"
                    )
                  )
                )}
                {showUSD && !!token.sell_order.usd_price && (
                  <PriceSmall>
                    (
                    {token.sell_order.usd_price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    )
                  </PriceSmall>
                )}
              </Price>
              <EndDate>
                <FaRegClock />
                Sale ends{" "}
                {new Date(token.sell_order.expiration).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </EndDate>
            </SaleInfo>
          )}

          {token.buy_order && !token.sell_order && (
            <SaleInfo>
              <PriceLabel>Best Offer</PriceLabel>
              <Price>
                <PriceIcon className="large">
                  <Image
                    src={`/payment_tokens/${token.buy_order.payment_token.symbol}.png`}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    width={50}
                    height={50}
                    priority
                  />
                </PriceIcon>
                {Number(
                  ethers.utils.formatEther(
                    ethers.utils.parseUnits(
                      token.buy_order.price.toString(),
                      "gwei"
                    )
                  )
                )}
                {showUSD && !!token.buy_order.usd_price && (
                  <PriceSmall>
                    (
                    {token.buy_order.usd_price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    )
                  </PriceSmall>
                )}
              </Price>
            </SaleInfo>
          )}

          <AssetButtons>
            {!token.pending_deposit &&
              siteConfig.NETWORK != token.network &&
              ((!!token.owner && token.owner.address == address) ||
                (!!token.pending_owner &&
                  token.pending_owner.address == address)) && (
                <BridgeButton token={token} />
              )}
            {token.collection.contract_type == "ERC-721" &&
              token.network == siteConfig.NETWORK && (
                <>
                  {!!token.owner && address === token.owner.address ? (
                    <>
                      {!token.sell_order &&
                        !token.collection.delisted &&
                        !token.collection.non_transferable && (
                          <SellButton
                            token={token}
                            setToken={setToken}
                            setQuantityListed={setQuantityListed}
                          />
                        )}

                      {token.sell_order && (
                        <>
                          <CancelSellOrderButton
                            token={token}
                            setToken={setToken}
                            sell_order={token.sell_order}
                            setQuantityListed={setQuantityListed}
                          />
                          {token.sell_order.contract_version == 6 && (
                            <LowerPriceButton
                              token={token}
                              setToken={setToken}
                              sell_order={token.sell_order}
                            />
                          )}
                        </>
                      )}

                      {!token.collection.non_transferable && (
                        <TransferButton
                          token={token}
                          setToken={setToken}
                          quantityOwned={quantityOwned}
                          setQuantityOwned={setQuantityOwned}
                          quantityListed={quantityListed}
                          setQuantityListed={setQuantityListed}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {!!token.sell_order && (
                        <BuySellOrderButton
                          token={token}
                          setToken={setToken}
                          sell_order={token.sell_order}
                          setQuantityOwned={setQuantityOwned}
                          setQuantityListed={setQuantityListed}
                        />
                      )}

                      {!token.collection.delisted && (
                        <OfferButton token={token} setToken={setToken} />
                      )}
                    </>
                  )}

                  {token.bridged &&
                    !!token.owner &&
                    address === token.owner.address && (
                      <BridgeButton token={token} />
                    )}
                </>
              )}

            {token.collection.contract_type == "ERC-1155" && (
              <>
                {quantityOwned > 0 ? (
                  <>
                    {!token.collection.delisted &&
                      !token.collection.non_transferable &&
                      (quantityListed == 0 ? (
                        <SellButton
                          token={token}
                          setToken={setToken}
                          setQuantityListed={setQuantityListed}
                        />
                      ) : (
                        <CancelSellOrderButton
                          token={token}
                          setToken={setToken}
                          sell_order={token.sell_orders.find(
                            (e) => e.seller.address === address
                          )}
                          setQuantityListed={setQuantityListed}
                        />
                      ))}

                    {!token.collection.non_transferable && (
                      <TransferButton
                        token={token}
                        setToken={setToken}
                        quantityOwned={quantityOwned}
                        setQuantityOwned={setQuantityOwned}
                        quantityListed={quantityListed}
                        setQuantityListed={setQuantityListed}
                      />
                    )}
                  </>
                ) : (
                  !!token.sell_order && (
                    <BuySellOrderButton
                      token={token}
                      setToken={setToken}
                      sell_order={token.sell_order}
                      setQuantityOwned={setQuantityOwned}
                      setQuantityListed={setQuantityListed}
                    />
                  )
                )}

                {!token.collection.delisted && (
                  <OfferButton token={token} setToken={setToken} />
                )}
              </>
            )}
          </AssetButtons>
        </AssetDetails>
      </TwoColGrid>
    </>
  );
};

export const AssetMedia = dynamic<{
  token;
  lightboxIsOpen;
  setLightboxIsOpen;
}>(() => import("./AssetMedia").then((module) => module.AssetMedia), {
  ssr: false,
});
