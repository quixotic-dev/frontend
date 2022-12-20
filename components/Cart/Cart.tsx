import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import {
  MdCheckCircle,
  MdError,
  MdRemoveCircle,
  MdVerified,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { fetchToken, refreshTokenOrders } from "../../api/token";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateLogin } from "../../store/login";
import { updateOnboard } from "../../store/onboard";
import {
  fillSeaportRewardsSellOrders,
  fillSeaportSellOrders,
} from "../../utils/exchange/sendSellOrder";
import { getRewardBreakdownMultipleOrders } from "../../utils/rewards/rewards";
import { switchNetwork } from "../../utils/wallet";
import {
  Button,
  ButtonText,
  LoadingRing,
  RewardsBadge,
  RewardsBreakdownGrid,
  RewardsBreakdownIcon,
  RewardsBreakdownRow,
  RewardsDescription,
  RewardsDescriptionIcon,
  RewardsEst,
  RewardsIcon,
  RewardsTitle,
} from "../Asset/AssetButtons/styles";
import { TokenImage } from "../Common/Images/TokenImage";
import { TextTruncater } from "../Common/styles";
import {
  CheckoutStatus,
  CollectionName,
  ContainerBackground,
  ContainerExtended,
  ItemRow,
  ItemSection,
  ItemsGrid,
  ItemStatus,
  ItemText,
  PriceContainer,
  PriceIcon,
  PriceSmall,
  Subtitle,
  Title,
  TokenImageContainer,
  TokenName,
  VerifiedIcon,
} from "./styles";

export const Cart = ({ collectionAddress = null }) => {
  const dispatch = useDispatch();
  const address = useSelector((state: State) => state.address);
  const balances = useSelector((state: State) => state.balance);
  const showUSD = useSelector((state: State) => state.showUSD);

  const [tokens, setTokens] = useState(null);
  const [step, setStep] = useState(0);
  const [itemsRemoved, setItemsRemoved] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const total =
    tokens &&
    tokens.reduce((sum, token) => {
      return sum + (token.sell_order ? token.sell_order.price : 0);
    }, 0);

  const usdTotal =
    tokens &&
    tokens.reduce((sum, token) => {
      return (
        sum +
        (token.sell_order && token.sell_order.usd_price
          ? token.sell_order.usd_price
          : 0)
      );
    }, 0);

  const removeFromCart = (e, token, local = true) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    let cart_ids;
    if (collectionAddress) {
      cart_ids = JSON.parse(
        localStorage.getItem(`${collectionAddress}_cart_token_ids`) || "[]"
      );
    } else {
      cart_ids = JSON.parse(
        localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
      );
    }

    cart_ids = cart_ids.filter(
      (e) => e !== token.contract_address + ":" + token.token_id
    );

    if (collectionAddress) {
      localStorage.setItem(
        `${collectionAddress}_cart_token_ids`,
        JSON.stringify(cart_ids)
      );
    } else {
      localStorage.setItem(
        `${siteConfig.CHAIN_ID}_cart_token_ids`,
        JSON.stringify(cart_ids)
      );
    }

    if (local) {
      setTokens(tokens.filter((e) => e !== token));
    }

    window.dispatchEvent(new Event("cart"));
  };

  const handleSubmit = async (e) => {
    setItemsRemoved(false);

    if (balances) {
      if (balances.ETH == 0) {
        setStep(0);
        return updateOnboard(true, dispatch);
      } else if (balances.ETH < ethers.utils.formatUnits(total, "gwei")) {
        setStep(0);
        return toast.error(
          "You don't have enough ETH to complete this transaction"
        );
      }
    }

    setStep(1);

    // Make sure all sell orders are still valid
    for (const token of tokens) {
      const updatedToken = await refreshTokenOrders(
        token.contract_address,
        token.token_id
      );

      if (
        !updatedToken.sell_order ||
        updatedToken.sell_order.price != token.sell_order.price
      ) {
        removeFromCart(null, token);
        setItemsRemoved(true);
        return setStep(0);
      }
    }

    await switchNetwork();

    const sellOrders = tokens.map((token) => token.sell_order.id);
    let tx;
    if (siteConfig.NETWORK == "opt-mainnet") {
      tx = await fillSeaportRewardsSellOrders(sellOrders);
    } else {
      tx = await fillSeaportSellOrders(sellOrders);
    }

    if (tx) {
      setTxHash(tx.hash);
      setStep(2);
    } else {
      setStep(0);
    }
  };

  useEffect(() => {
    const fetchTokens = async () => {
      let cart_ids;
      if (collectionAddress) {
        cart_ids = JSON.parse(
          localStorage.getItem(`${collectionAddress}_cart_token_ids`) || "[]"
        );
      } else {
        cart_ids = JSON.parse(
          localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
        );
      }

      cart_ids = new Set(cart_ids);

      let promises = [];
      for (const id of cart_ids) {
        const tokenId = id.split(":");
        const tokenPromise = fetchToken(tokenId[0], tokenId[1]);
        promises.push(tokenPromise);
      }

      const res = await Promise.all(promises).then((values) =>
        values.filter((v) => v)
      );
      setTokens(res);
    };

    fetchTokens();
  }, []);

  // Estimate rewards
  const [rewardsEligible, setRewardsEligible] = useState(false);
  const [rewards, setRewards] = useState(null);
  const [rewardsTotal, setRewardsTotal] = useState(null);
  const [rewardsExpanded, setRewardsExpanded] = useState(false);
  useEffect(() => {
    async function fetchRewards(orderIds: []) {
      setRewards(null);
      const rewards = await getRewardBreakdownMultipleOrders(orderIds, address);
      setRewards(rewards);
      setRewardsTotal(
        rewards.length > 0
          ? rewards
              .map((r) => ethers.utils.formatEther(r[1].toString()))
              .reduce((sum, a) => sum + Number(a), 0)
          : 0
      );
    }

    if (siteConfig.NETWORK == "opt-mainnet" && address && tokens) {
      setRewardsEligible(true);
      const sellOrders = tokens
        .filter((token) => token.sell_order)
        .map((token) => token.sell_order.id);

      fetchRewards(sellOrders);
    }
  }, [address, tokens]);

  return (
    <>
      <ContainerBackground>
        <ContainerExtended>
          <Title>
            {collectionAddress ? <b>Sweep Collection</b> : <b>Quix Cart</b>}
          </Title>

          {tokens ? (
            tokens.length > 0 ? (
              <>
                <Subtitle>
                  {tokens.length} item{tokens.length != 1 && "s"}
                </Subtitle>

                <ItemsGrid>
                  {tokens.map((token, index) => {
                    return (
                      <CartRow
                        key={index}
                        token={token}
                        step={step}
                        removeFromCart={removeFromCart}
                      />
                    );
                  })}

                  {rewardsEligible && (
                    <div>
                      <ItemRow className="rewards">
                        <RewardsTitle>
                          OP Rewards <RewardsBadge>NEW</RewardsBadge>
                        </RewardsTitle>

                        <ItemSection className="rewards">
                          {rewards && (rewardsTotal || rewardsTotal == 0) ? (
                            <RewardsIcon>
                              <RewardsEst>est.</RewardsEst>
                              <PriceIcon className="rewards">
                                <Image
                                  src={`/payment_tokens/OP.png`}
                                  alt=""
                                  layout="responsive"
                                  objectFit="contain"
                                  objectPosition="center"
                                  width={50}
                                  height={50}
                                  priority
                                />
                              </PriceIcon>
                              {rewardsTotal > 1
                                ? rewardsTotal.toFixed(2)
                                : rewardsTotal.toFixed(3)}{" "}
                              OP
                            </RewardsIcon>
                          ) : (
                            <LoadingRing className="small" />
                          )}
                        </ItemSection>
                      </ItemRow>
                      {rewards && rewardsExpanded ? (
                        <RewardsDescription
                          className={rewardsTotal > 0 ? "link grid" : "grid"}
                          onClick={() =>
                            rewardsTotal > 0 && setRewardsExpanded(false)
                          }
                        >
                          {rewards
                            .filter((r) => r[1].toString() > 0)
                            .map((r, i) => (
                              <RewardsBreakdownGrid key={i}>
                                {r[0] == "BASELINE" ? (
                                  <RewardsBreakdownRow>
                                    <RewardsBreakdownIcon>
                                      <Image
                                        src={`/opt_favicon.png`}
                                        alt=""
                                        layout="responsive"
                                        objectFit="contain"
                                        objectPosition="center"
                                        width={50}
                                        height={50}
                                        priority
                                      />
                                    </RewardsBreakdownIcon>
                                    Quix OP Reward
                                  </RewardsBreakdownRow>
                                ) : r[0] == "OPOG" ? (
                                  <RewardsBreakdownRow>
                                    <RewardsBreakdownIcon>
                                      <Image
                                        src={`/opog.png`}
                                        alt=""
                                        layout="responsive"
                                        objectFit="contain"
                                        objectPosition="center"
                                        width={50}
                                        height={50}
                                        priority
                                      />
                                    </RewardsBreakdownIcon>
                                    OP OG Bonus
                                  </RewardsBreakdownRow>
                                ) : (
                                  <RewardsBreakdownRow>
                                    <RewardsBreakdownIcon>
                                      <BsStars />
                                    </RewardsBreakdownIcon>
                                    Collection Boost
                                  </RewardsBreakdownRow>
                                )}
                                <div>
                                  {Number(
                                    ethers.utils.formatEther(r[1].toString())
                                  ).toFixed(4)}{" "}
                                  OP
                                </div>
                              </RewardsBreakdownGrid>
                            ))}
                        </RewardsDescription>
                      ) : (
                        <RewardsDescription
                          className={rewardsTotal > 0 ? "link" : null}
                          onClick={() =>
                            rewardsTotal > 0 && setRewardsExpanded(true)
                          }
                        >
                          Earn $OP when buying NFTs on Quix
                          {!!rewardsTotal && rewardsTotal > 0 && (
                            <RewardsDescriptionIcon>
                              <FiChevronRight />
                            </RewardsDescriptionIcon>
                          )}
                        </RewardsDescription>
                      )}
                    </div>
                  )}

                  <ItemRow className="total">
                    Total
                    <PriceContainer>
                      <ItemSection className="total">
                        <PriceIcon>
                          <FaEthereum />
                        </PriceIcon>
                        {ethers.utils.formatEther(
                          ethers.utils.parseUnits(total.toString(), "gwei")
                        )}
                      </ItemSection>
                      <PriceSmall>
                        {showUSD &&
                          usdTotal > 0 &&
                          usdTotal.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                      </PriceSmall>
                    </PriceContainer>
                  </ItemRow>
                </ItemsGrid>
                {address ? (
                  step == 2 ? (
                    <a
                      href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>
                        <ButtonText>View Transaction</ButtonText>
                      </Button>
                    </a>
                  ) : (
                    <Button
                      className={step == 1 ? "no-click" : null}
                      onClick={step != 1 ? handleSubmit : null}
                    >
                      <ButtonText>
                        {step == 1 ? (
                          <LoadingRing className="small" />
                        ) : (
                          <FaWallet />
                        )}
                        Checkout
                      </ButtonText>
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() => {
                      updateLogin(true, dispatch);
                    }}
                  >
                    <ButtonText>
                      <FaWallet />
                      Checkout
                    </ButtonText>
                  </Button>
                )}
                {itemsRemoved && (
                  <CheckoutStatus>
                    Your cart was updated to reflect the latest availability
                  </CheckoutStatus>
                )}
              </>
            ) : (
              <>
                <Subtitle>No items in cart</Subtitle>
                <Link href="/explore">
                  <a>
                    <Button
                      style={{
                        marginTop: "40px",
                      }}
                    >
                      <ButtonText>Explore NFTs</ButtonText>
                    </Button>
                  </a>
                </Link>
              </>
            )
          ) : (
            <Subtitle>Fetching items...</Subtitle>
          )}
        </ContainerExtended>
      </ContainerBackground>
    </>
  );
};

const CartRow = ({ token, step, removeFromCart }) => {
  const address = useSelector((state: State) => state.address);
  const showUSD = useSelector((state: State) => state.showUSD);
  const [showRemove, setShowRemove] = useState(false);
  const [txComplete, setTxComplete] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    async function updateToken(token, interval) {
      const updatedToken = await fetchToken(
        token.contract_address,
        token.token_id
      );

      // Note: if the order is cancelled or sold to someone else, it will still be marked as complete
      if (
        updatedToken &&
        updatedToken.sell_orders &&
        updatedToken.sell_orders.filter((e) => e.id == token.sell_order.id)
          .length == 0
      ) {
        if (
          updatedToken.collection.contract_type == "ERC-1155" ||
          (updatedToken.owner && updatedToken.owner.address == address)
        ) {
          setPurchased(true);
        }
        setTxComplete(true);
        removeFromCart(null, token, false);
        return clearInterval(interval);
      }
    }

    if (step == 2) {
      const interval = setInterval(() => {
        updateToken(token, interval);
      }, 2000);
    }
  }, [step]);

  return (
    <Link href={`/asset/${token.contract_address}/${token.token_id}`} passHref>
      <a>
        <ItemRow
          onMouseOver={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
        >
          <ItemSection className="item">
            <TokenImageContainer>
              <TokenImage token={token} />
            </TokenImageContainer>
            <ItemText>
              <CollectionName>
                <TextTruncater>{token.collection.name}</TextTruncater>
                {token.collection.verified && (
                  <VerifiedIcon>
                    <MdVerified />
                  </VerifiedIcon>
                )}
              </CollectionName>
              <TokenName>
                <TextTruncater>{token.name}</TextTruncater>
              </TokenName>
            </ItemText>
          </ItemSection>

          <ItemSection>
            <PriceContainer>
              <ItemSection className="price">
                <PriceIcon>
                  <FaEthereum />
                </PriceIcon>
                {token.sell_order
                  ? ethers.utils.formatEther(
                      ethers.utils.parseUnits(
                        token.sell_order.price.toString(),
                        "gwei"
                      )
                    )
                  : "—"}
              </ItemSection>
              <PriceSmall>
                {showUSD &&
                  token.sell_order &&
                  !!token.sell_order.usd_price &&
                  token.sell_order.usd_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
              </PriceSmall>
            </PriceContainer>

            {step == 2 ? (
              <ItemStatus>
                {txComplete && !purchased ? (
                  <>
                    <MdError data-tip data-for="purchase-error" />
                    <ReactTooltip
                      id="purchase-error"
                      type="info"
                      effect="solid"
                      className="tooltip"
                      backgroundColor="#1C1C1D"
                    >
                      There was an error fulfilling this NFT.
                      <br /> Your payment was refunded in the same transaction.
                    </ReactTooltip>
                  </>
                ) : purchased ? (
                  <MdCheckCircle />
                ) : (
                  <LoadingRing className="small" />
                )}
              </ItemStatus>
            ) : (
              showRemove && (
                <ItemStatus
                  onClick={(e) => {
                    removeFromCart(e, token);
                  }}
                >
                  <MdRemoveCircle />
                </ItemStatus>
              )
            )}
          </ItemSection>
        </ItemRow>
      </a>
    </Link>
  );
};
