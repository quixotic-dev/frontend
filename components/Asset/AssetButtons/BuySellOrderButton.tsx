import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaCheck, FaWallet } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { MdClose, MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchErc1155TokenOwnedQuantity,
  fetchToken,
  refreshToken,
} from "../../../api/token";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { updateLogin } from "../../../store/login";
import { updateOnboard } from "../../../store/onboard";
import {
  approveERC20,
  erc20IsApproved,
} from "../../../utils/exchange/exchange";
import {
  fillSeaportRewardsSellOrder,
  fillSeaportSellOrder,
} from "../../../utils/exchange/sendSellOrder";
import { getRewardBreakdown } from "../../../utils/rewards/rewards";
import { switchNetwork } from "../../../utils/wallet";
import { TokenImage } from "../../Common/Images/TokenImage";
import { PriceIcon } from "../../Common/styles";
import {
  AssetCollection,
  AssetGrid,
  AssetInfo,
  AssetName,
  Button,
  ButtonText,
  FeeRow,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  PurchaseTotal,
  RewardsBadge,
  RewardsBreakdownGrid,
  RewardsBreakdownIcon,
  RewardsBreakdownRow,
  RewardsDescription,
  RewardsDescriptionIcon,
  RewardsEst,
  RewardsIcon,
  RewardsTitle,
  Ring,
  StepDescription,
  StepNumber,
  StepText,
  StepTitle,
  StyledModal,
  TokenImageContainer,
  TransactionRow,
  TransactionStatus,
  VerifiedIcon,
} from "./styles";

export const BuySellOrderButton = ({
  token,
  setToken,
  sell_order,
  setQuantityOwned,
  setQuantityListed,
  tiny = false,
}) => {
  const dispatch = useDispatch();
  const address = useSelector((state: State) => state.address);
  const balances = useSelector((state: State) => state.balance);
  const formattedPrice = ethers.utils.formatEther(
    ethers.utils.parseUnits(sell_order.price.toString(), "gwei")
  );

  const [step, setStep] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const handleSubmit = async (e) => {
    if (
      balances &&
      sell_order.payment_token.symbol == "ETH" &&
      balances[sell_order.payment_token.symbol] == 0
    ) {
      setIsOpen(false);
      return updateOnboard(true, dispatch);
    }

    setStep(1);

    await switchNetwork();

    // Check if there's approval (this should never run though)
    if (sell_order.payment_token.symbol != "ETH") {
      if (!isApproved) {
        let approvalStatus = await erc20IsApproved(
          address,
          sell_order.payment_token.address,
          sell_order.contract_version
        );

        setIsApproved(approvalStatus);

        if (!approvalStatus) {
          const approval = await approveERC20(
            sell_order.payment_token.address,
            sell_order.contract_version
          );
          if (!approval) {
            return setStep(0);
          }
        }

        let count = 0;
        while (!approvalStatus && count < 30) {
          if (count > 0) {
            await new Promise((r) => setTimeout(r, 2000));
          }

          approvalStatus = await erc20IsApproved(
            address,
            sell_order.payment_token.address,
            sell_order.contract_version
          );

          setIsApproved(approvalStatus);
          count += 1;
        }
      }
    }

    let tx;
    if (sell_order.contract_version == 6) {
      if (
        siteConfig.NETWORK == "opt-mainnet" &&
        sell_order.payment_token.symbol == "ETH" &&
        token.collection.contract_type == "ERC-721"
      ) {
        tx = await fillSeaportRewardsSellOrder(sell_order.id);
      } else {
        tx = await fillSeaportSellOrder(sell_order.id);
      }
    } else {
      return;
    }

    if (tx) {
      setTxHash(tx.hash);
      setStep(2);
    } else {
      setStep(0);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  async function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
    setStep(0);

    if (!isOpen) {
      const updatedToken = await refreshToken(
        token.contract_address,
        token.token_id
      );
      if (updatedToken) {
        setToken(updatedToken);
      }
    }
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    setOpacity(0);
  }

  useEffect(() => {
    async function updateToken(interval) {
      const updatedToken = await fetchToken(
        token.contract_address,
        token.token_id
      );

      // Note: if the order is cancelled or sold to someone else, it will still be marked as complete
      if (
        updatedToken &&
        updatedToken.sell_orders &&
        updatedToken.sell_orders.filter((e) => e.id == sell_order.id).length ==
          0
      ) {
        if (token.collection.contract_type == "ERC-1155") {
          const updateQuantity = await fetchErc1155TokenOwnedQuantity(
            token.contract_address,
            token.token_id,
            address
          );

          setQuantityOwned(updateQuantity.quantity);
          setQuantityListed(updateQuantity.listed);
        }

        clearInterval(interval);
        setToken(updatedToken);
        setStep(3);

        return toast.success("Your purchase is complete");
      }
    }

    if (step == 2) {
      const interval = setInterval(() => {
        updateToken(interval);
      }, 1000);
    }
  }, [step]);

  useEffect(() => {
    if (new Date(sell_order.expiration) < new Date()) {
      updateToken();
    }

    async function updateToken() {
      const updatedToken = await refreshToken(
        token.contract_address,
        token.token_id
      );
      if (updatedToken) {
        setToken(updatedToken);
      }
    }
  }, []);

  // Estimate rewards
  const [rewardsEligible, setRewardsEligible] = useState(false);
  const [rewards, setRewards] = useState(null);
  const [rewardsTotal, setRewardsTotal] = useState(null);
  const [rewardsExpanded, setRewardsExpanded] = useState(false);
  useEffect(() => {
    async function fetchRewards(orderId) {
      setRewards(null);
      const rewards = await getRewardBreakdown(orderId, address);
      setRewards(rewards);
      setRewardsTotal(
        rewards.length > 0
          ? rewards
              .map((r) => ethers.utils.formatEther(r[1].toString()))
              .reduce((sum, a) => sum + Number(a), 0)
          : 0
      );
    }

    if (
      siteConfig.NETWORK == "opt-mainnet" &&
      sell_order.payment_token.symbol == "ETH" &&
      sell_order.contract_version == 6 &&
      token.collection.contract_type == "ERC-721" &&
      address
    ) {
      setRewardsEligible(true);
      fetchRewards(sell_order.id);
    }
  }, [address]);

  return (
    <div>
      <Button
        className={tiny ? "tiny" : null}
        onClick={(e) => {
          address ? toggleModal(e) : updateLogin(true, dispatch);
        }}
      >
        <ButtonText>
          <FaWallet />
          Buy Now
        </ButtonText>
      </Button>

      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <ModalContainer>
          <ModalTitle>
            Checkout
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          <ModalContent>
            <ModalGridRow>
              <AssetGrid>
                <TokenImageContainer
                  className={!token.image ? "no-image" : null}
                >
                  {token.image ? (
                    <TokenImage token={token} useCollectionImage={false} />
                  ) : (
                    <>No Image</>
                  )}
                </TokenImageContainer>
                <AssetInfo>
                  <AssetCollection>
                    {token.collection.name}
                    {token.collection.verified && (
                      <VerifiedIcon>
                        <MdVerified />
                      </VerifiedIcon>
                    )}
                  </AssetCollection>
                  <AssetName>{token.name}</AssetName>
                  {Boolean(token.collection.royalty_per_mille) && (
                    <FeeRow className="royalty">
                      Creator fee: {token.collection.royalty_per_mille / 10}%
                    </FeeRow>
                  )}
                </AssetInfo>
              </AssetGrid>
            </ModalGridRow>

            {rewardsEligible && (
              <ModalGridRow className="rewards">
                <TransactionRow>
                  <RewardsTitle>
                    OP Rewards <RewardsBadge>NEW</RewardsBadge>
                  </RewardsTitle>
                  {rewards && (rewardsTotal || rewardsTotal == 0) ? (
                    <RewardsIcon>
                      <RewardsEst>est.</RewardsEst>
                      <PriceIcon>
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
                    <RewardsIcon>
                      <LoadingRing className="small" />
                    </RewardsIcon>
                  )}
                </TransactionRow>
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
                    onClick={() => rewardsTotal > 0 && setRewardsExpanded(true)}
                  >
                    Earn $OP when buying NFTs on Quix
                    {!!rewardsTotal && rewardsTotal > 0 && (
                      <RewardsDescriptionIcon>
                        <FiChevronRight />
                      </RewardsDescriptionIcon>
                    )}
                  </RewardsDescription>
                )}
              </ModalGridRow>
            )}

            {step == 0 && (
              <>
                <ModalGridRow>
                  <TransactionRow>
                    Total
                    <PurchaseTotal>
                      <PriceIcon>
                        <Image
                          src={`/payment_tokens/${sell_order.payment_token.symbol}.png`}
                          alt=""
                          layout="responsive"
                          objectFit="contain"
                          objectPosition="center"
                          width={50}
                          height={50}
                          priority
                        />
                      </PriceIcon>
                      {formattedPrice} {sell_order.payment_token.symbol}
                    </PurchaseTotal>
                  </TransactionRow>
                </ModalGridRow>
                <Button onClick={handleSubmit}>Purchase NFT</Button>
              </>
            )}

            {step == 1 && (
              <>
                {sell_order.payment_token.symbol != "ETH" && (
                  <ModalGridRow className="wallet">
                    <StepNumber>
                      {isApproved ? (
                        <>
                          <Ring className="success" />
                          <FaCheck />
                        </>
                      ) : (
                        <>
                          <LoadingRing />1
                        </>
                      )}
                    </StepNumber>
                    <StepText>
                      <StepTitle>
                        Approve {sell_order.payment_token.symbol} access
                      </StepTitle>
                      <StepDescription>
                        Complete this one-time transaction to purchase items
                        with {sell_order.payment_token.symbol}
                      </StepDescription>
                    </StepText>
                  </ModalGridRow>
                )}
                <ModalGridRow className="wallet">
                  <StepNumber>
                    {sell_order.payment_token.symbol != "ETH" ? (
                      !isApproved ? (
                        <>
                          <Ring />2
                        </>
                      ) : (
                        <>
                          <LoadingRing />2
                        </>
                      )
                    ) : (
                      <>
                        <LoadingRing />1
                      </>
                    )}
                  </StepNumber>
                  <StepText>
                    <StepTitle>Complete purchase</StepTitle>
                    <StepDescription>
                      Confirm the transaction in your wallet to purchase the NFT
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <Button onClick={toggleModal} className="outline">
                  Cancel
                </Button>
              </>
            )}

            {(step == 2 || step == 3) && (
              <>
                <ModalGridRow>
                  <TransactionRow>
                    Status
                    {step == 2 && (
                      <TransactionStatus>
                        <LoadingRing className="small" />
                        Processing
                      </TransactionStatus>
                    )}
                    {step == 3 && (
                      <TransactionStatus>
                        <FaCheck />
                        Complete
                      </TransactionStatus>
                    )}
                  </TransactionRow>
                  <TransactionRow>
                    Transaction ID
                    <TransactionStatus>
                      {txHash.slice(0, 6)}...{txHash.slice(-4)}
                    </TransactionStatus>
                  </TransactionRow>
                </ModalGridRow>
                <a
                  href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="outline">View Transaction</Button>
                </a>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </StyledModal>
    </div>
  );
};
