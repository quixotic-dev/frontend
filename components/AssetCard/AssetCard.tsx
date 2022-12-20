import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { FaEthereum, FaRegClock } from "react-icons/fa";
import {
  MdAddShoppingCart,
  MdRemoveShoppingCart,
  MdVerified,
} from "react-icons/md";
import { RiArrowRightDownLine, RiHeartFill, RiHeartLine } from "react-icons/ri";
import { TbBuildingBridge } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import ReactTooltip from "react-tooltip";
import { likeToken, unlikeToken } from "../../api/token";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateLogin } from "../../store/login";
import { updateProfile } from "../../store/profile";
import { TokenImageForCard } from "../Common/Images/TokenImage";
import { PriceIcon } from "../Common/styles";
import { expirationFormatter } from "../Common/Utils";
import {
  AssetInfo,
  AssetInfoLabel,
  AssetInfoText,
  AssetName,
  AssetTime,
  AssetTimeText,
  Card,
  CardContent,
  CardSection,
  CartContainer,
  CartContainerGrid,
  CollectionIcon,
  CollectionName,
  HeroContainer,
  HeroSection,
  Icon,
  LikeContainer,
  Network,
  Rank,
  TextContainer,
  TokenImageContainer,
  USDPrice,
} from "./styles";

export const AssetCard = ({
  token,
  profile = null,
  hideToken = null,
  showToken = null,
  featureToken = null,
  unfeatureToken = null,
  showCollection = true,
}) => {
  const dispatch = useDispatch();
  const address = useSelector((state: State) => state.address);
  const showUSD = useSelector((state: State) => state.showUSD);
  const current_user = useSelector((state: State) => state.profile);

  const [tokenLiked, setTokenLiked] = useState(false);

  const updateLikeStatus = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!address) {
      return updateLogin(true, dispatch);
    }

    if (tokenLiked) {
      setTokenLiked(false);
      const res = await unlikeToken(
        token.contract_address,
        token.token_id,
        address
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setTokenLiked(true);
      }
    } else {
      setTokenLiked(true);
      const res = await likeToken(
        token.contract_address,
        token.token_id,
        address
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setTokenLiked(false);
      }
    }
  };

  useEffect(() => {
    if (current_user && current_user.likes) {
      const likes = new Set(
        current_user.likes.map(function (like) {
          return `${like["token"]["collection"]["address"]}:${like["token"]["token_id"]}`;
        })
      );
      setTokenLiked(likes.has(`${token.contract_address}:${token.token_id}`));
    }
  }, [current_user]);

  const username =
    token.owner && (token.owner.username || token.owner.reverse_ens);

  const [showAddToCart, setShowAddToCart] = useState(false);
  const [showHideToken, setShowHideToken] = useState(false);
  const [showFeatureToken, setShowFeatureToken] = useState(false);

  const [isInCart, setIsInCart] = useState(
    typeof window !== "undefined" &&
      JSON.parse(
        localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
      ).indexOf(token.contract_address + ":" + token.token_id) > -1
  );

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let cart_ids = JSON.parse(
      localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
    );
    cart_ids.push(token.contract_address + ":" + token.token_id);
    localStorage.setItem(
      `${siteConfig.CHAIN_ID}_cart_token_ids`,
      JSON.stringify(cart_ids)
    );
    setIsInCart(true);
    window.dispatchEvent(new Event("cart"));
  };

  const removeFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let cart_ids = JSON.parse(
      localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
    );
    cart_ids = cart_ids.filter(
      (e) => e !== token.contract_address + ":" + token.token_id
    );
    localStorage.setItem(
      `${siteConfig.CHAIN_ID}_cart_token_ids`,
      JSON.stringify(cart_ids)
    );
    setIsInCart(false);
    window.dispatchEvent(new Event("cart"));
  };

  return (
    <Card>
      <Link
        href={`/asset/${token.network != siteConfig.NETWORK ? "eth/" : ""}${
          token.contract_address
        }/${token.token_id}`}
        passHref
      >
        <a>
          <TokenImageContainer
            className={
              !token.image && !token.collection.image_url
                ? "no-image"
                : token.collection.display_theme == 0
                ? "padded"
                : null
            }
            backgroundColor={
              token.background_color ? `#${token.background_color}` : null
            }
          >
            <TokenImageForCard token={token} />
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
          </TokenImageContainer>
          <CardContent>
            <HeroContainer>
              <HeroSection>
                {showCollection && (
                  <CollectionName>
                    <Link
                      href={`/collection/${
                        token.collection.slug
                          ? token.collection.slug
                          : token.contract_address
                      }`}
                    >
                      <a>
                        <TextContainer>{token.collection.name}</TextContainer>
                        {token.collection.verified && (
                          <CollectionIcon>
                            <MdVerified />
                          </CollectionIcon>
                        )}
                      </a>
                    </Link>
                  </CollectionName>
                )}
                <AssetName>
                  <TextContainer>{token.name}</TextContainer>
                </AssetName>
              </HeroSection>

              <LikeContainer
                onClick={updateLikeStatus}
                onMouseOver={(e) => e.stopPropagation()}
                className={tokenLiked ? "active" : null}
                data-tip={tokenLiked ? "Unfavorite" : "Favorite"}
              >
                {tokenLiked ? <RiHeartFill /> : <RiHeartLine />}
              </LikeContainer>
            </HeroContainer>

            {/* Show listed price > best offer > owner */}
            {((token.sell_order &&
              (profile ? token.sell_order.seller.address == profile : true)) ||
              !!token.highest_offer) && (
              <CardSection>
                <AssetInfo>
                  {token.sell_order &&
                  (profile
                    ? token.sell_order.seller.address == profile
                    : true) ? (
                    <>
                      <AssetInfoLabel>Price</AssetInfoLabel>
                      <AssetInfoText>
                        <PriceIcon>
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
                        {Math.round(
                          Number(
                            ethers.utils.formatEther(
                              ethers.utils.parseUnits(
                                token.sell_order.price.toString(),
                                "gwei"
                              )
                            )
                          ) * 10000
                        ) / 10000}

                        {showUSD && !!token.sell_order.usd_price && (
                          <USDPrice>
                            (
                            {token.sell_order.usd_price.toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "USD",
                              }
                            )}
                            )
                          </USDPrice>
                        )}
                      </AssetInfoText>
                    </>
                  ) : (
                    !!token.highest_offer && (
                      <>
                        <AssetInfoLabel>Best Offer</AssetInfoLabel>
                        <AssetInfoText>
                          <PriceIcon>
                            <Image
                              src={`/payment_tokens/${token.highest_offer_payment_token.symbol}.png`}
                              alt=""
                              layout="responsive"
                              objectFit="contain"
                              objectPosition="center"
                              width={50}
                              height={50}
                              priority
                            />
                          </PriceIcon>
                          {ethers.utils.formatEther(
                            ethers.utils.parseUnits(
                              token.highest_offer.toString(),
                              "gwei"
                            )
                          )}
                        </AssetInfoText>
                      </>
                    )
                  )}
                </AssetInfo>
                {/* Show expiration (if within a week) > last sale price > best offer (if listed for sale) > owner*/}
                {token.sell_order &&
                  new Date(token.sell_order.expiration).getTime() <=
                    new Date().getTime() + 7 * 24 * 60 * 60 * 1000 && (
                    <AssetTime>
                      <AssetInfoText className="time">
                        <Icon className="detail">
                          <FaRegClock />
                        </Icon>
                        <AssetTimeText>
                          <TimeAgo
                            date={token.sell_order.expiration}
                            formatter={expirationFormatter}
                          />
                        </AssetTimeText>
                      </AssetInfoText>
                    </AssetTime>
                  )}
              </CardSection>
            )}

            {/* Show expiration (if within a week) > last sale price > best offer (if listed for sale) > owner*/}
            <CardSection
              className={
                showAddToCart || showHideToken || showFeatureToken || isInCart
                  ? "detail cart"
                  : "detail"
              }
              onClick={isInCart ? removeFromCart : null}
            >
              {profile &&
              profile == address &&
              (showHideToken || showFeatureToken) ? (
                showHideToken ? (
                  <AssetInfo className="detail">
                    <AssetInfoText className="detail cart">
                      {hideToken ? "Hide" : "Show"}
                    </AssetInfoText>
                  </AssetInfo>
                ) : (
                  <AssetInfo className="detail">
                    <AssetInfoText className="detail cart">
                      {featureToken ? "Feature" : "Unfeature"}
                    </AssetInfoText>
                  </AssetInfo>
                )
              ) : token.sell_order &&
                token.sell_order.payment_token.symbol == "ETH" &&
                token.sell_order.contract_version == 6 &&
                token.collection.contract_type == "ERC-721" &&
                (showAddToCart || isInCart) ? (
                <AssetInfo className="detail">
                  <AssetInfoText className="detail cart">
                    {isInCart ? "Remove from cart" : "Add to cart"}
                  </AssetInfoText>
                </AssetInfo>
              ) : !!token.last_sale_price ? (
                <AssetInfo className="detail">
                  <AssetInfoLabel className="detail">Last</AssetInfoLabel>
                  <AssetInfoText className="detail">
                    <PriceIcon className="small">
                      <Image
                        src={`/payment_tokens/${
                          token.last_sale_payment_token
                            ? token.last_sale_payment_token.symbol
                            : "ETH"
                        }.png`}
                        alt=""
                        layout="responsive"
                        objectFit="contain"
                        objectPosition="center"
                        width={50}
                        height={50}
                      />
                    </PriceIcon>
                    {ethers.utils.formatEther(
                      ethers.utils.parseUnits(
                        token.last_sale_price.toString(),
                        "gwei"
                      )
                    )}
                  </AssetInfoText>
                </AssetInfo>
              ) : token.sell_order && !!token.highest_offer ? (
                <AssetInfo className="detail">
                  <AssetInfoLabel className="detail">Best Offer</AssetInfoLabel>
                  <AssetInfoText className="detail">
                    <PriceIcon className="small">
                      <Image
                        src={`/payment_tokens/${
                          token.highest_offer_payment_token
                            ? token.highest_offer_payment_token.symbol
                            : "WETH"
                        }.png`}
                        alt=""
                        layout="responsive"
                        objectFit="contain"
                        objectPosition="center"
                        width={50}
                        height={50}
                      />
                    </PriceIcon>
                    {ethers.utils.formatEther(
                      ethers.utils.parseUnits(
                        token.highest_offer.toString(),
                        "gwei"
                      )
                    )}
                  </AssetInfoText>
                </AssetInfo>
              ) : token.owner ? (
                <AssetInfo className="detail">
                  <AssetInfoLabel className="detail">Owned by</AssetInfoLabel>
                  <AssetInfoText className="detail">
                    {address === token.owner.address ? (
                      "you"
                    ) : (
                      <>
                        {username ? username : token.owner.address.slice(0, 6)}
                      </>
                    )}
                  </AssetInfoText>
                </AssetInfo>
              ) : (
                token.collection.contract_type == "ERC-1155" &&
                !!token.unique_owners && (
                  <AssetInfo className="detail">
                    <AssetInfoLabel className="detail">Owned by</AssetInfoLabel>
                    <AssetInfoText className="detail">
                      {token.unique_owners > 999
                        ? Math.floor((token.unique_owners / 1000) * 10) / 10 +
                          "K"
                        : token.unique_owners}{" "}
                      user{token.unique_owners != 1 && "s"}
                    </AssetInfoText>
                  </AssetInfo>
                )
              )}

              {profile && profile == address ? (
                <CartContainerGrid>
                  {/* <CartContainer
                    onMouseOver={() => setShowFeatureToken(true)}
                    onMouseLeave={() => setShowFeatureToken(false)}
                    onClick={(e) =>
                      featureToken ? featureToken(e, token) : null
                    }
                  >
                    {featureToken && <BiStar />}
                  </CartContainer> */}
                  <CartContainer
                    onMouseOver={() => setShowHideToken(true)}
                    onMouseLeave={() => setShowHideToken(false)}
                    onClick={(e) =>
                      hideToken ? hideToken(e, token) : showToken(e, token)
                    }
                  >
                    {hideToken ? <BiHide /> : <BiShow />}
                  </CartContainer>
                </CartContainerGrid>
              ) : (
                token.sell_order &&
                token.sell_order.payment_token.symbol == "ETH" &&
                token.sell_order.contract_version == 6 &&
                token.collection.contract_type == "ERC-721" && (
                  <CartContainer
                    onMouseOver={() => setShowAddToCart(true)}
                    onMouseLeave={() => setShowAddToCart(false)}
                    onClick={isInCart ? removeFromCart : addToCart}
                  >
                    {isInCart ? (
                      <MdRemoveShoppingCart />
                    ) : (
                      <MdAddShoppingCart />
                    )}
                  </CartContainer>
                )
              )}
            </CardSection>
          </CardContent>
        </a>
      </Link>
    </Card>
  );
};
