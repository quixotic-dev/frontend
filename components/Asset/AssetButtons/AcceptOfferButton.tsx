import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchToken } from "../../../api/token";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import {
  isApprovedForAll,
  setApprovalForAll,
} from "../../../utils/exchange/exchange";
import { fillSeaportBuyOrder } from "../../../utils/exchange/sendBuyOrder";
import { switchNetwork } from "../../../utils/wallet";
import { TokenImage } from "../../Common/Images/TokenImage";
import { PriceIcon } from "../../Common/styles";
import {
  AssetCollection,
  AssetGrid,
  AssetInfo,
  AssetName,
  Button,
  ButtonGrid,
  FeeRow,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  PurchaseTotal,
  Ring,
  StepDescription,
  StepNumber,
  StepText,
  StepTitle,
  StyledModal,
  TextInputLabel,
  TokenImageContainer,
  TransactionRow,
  TransactionStatus,
  VerifiedIcon,
} from "./styles";

export const AcceptOfferButton = ({ token, setToken, buy_order }) => {
  const address = useSelector((state: State) => state.address);
  const formattedPrice = ethers.utils.formatEther(
    ethers.utils.parseUnits(buy_order.price.toString(), "gwei")
  );

  const [step, setStep] = useState(0);
  const [txComplete, setTxComplete] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [pendingApproval, setPendingApproval] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const floorPrice = token.collection.floor_price[
    buy_order.payment_token.symbol
  ]
    ? Math.round(
        Number(
          ethers.utils.formatEther(
            ethers.utils.parseUnits(
              token.collection.floor_price[
                buy_order.payment_token.symbol
              ].toString(),
              "gwei"
            )
          )
        ) * 10000
      ) / 10000
    : null;

  async function handleSubmit(e, skipWarning) {
    await switchNetwork();

    setStep(1);

    if (
      buy_order.floor_difference &&
      Number(buy_order.floor_difference) < -15 &&
      !skipWarning
    ) {
      return;
    } else {
      setStep(2);
    }

    if (!isApproved) {
      let approvalStatus = await isApprovedForAll(
        address,
        token.contract_address,
        buy_order.contract_version
      );

      setIsApproved(approvalStatus);

      if (!approvalStatus) {
        const approval = await setApprovalForAll(
          token.contract_address,
          buy_order.contract_version
        );
        if (!approval) {
          return setStep(0);
        }
      }

      setPendingApproval(true);

      let count = 0;
      while (!approvalStatus && count < 30) {
        if (count > 0) {
          await new Promise((r) => setTimeout(r, 2000));
        }

        approvalStatus = await isApprovedForAll(
          address,
          token.contract_address,
          buy_order.contract_version
        );

        setIsApproved(approvalStatus);
        count += 1;
      }
    }

    setPendingApproval(false);

    let order;
    if (buy_order.contract_version == 6) {
      order = await fillSeaportBuyOrder(buy_order.id);
    } else {
      return;
    }

    if (order) {
      setTxHash(order.hash);
      setStep(3);
    } else {
      setStep(0);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  async function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
    setStep(0);
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

      if (
        updatedToken &&
        updatedToken.buy_orders &&
        updatedToken.buy_orders.filter((e) => e.id == buy_order.id).length == 0
      ) {
        clearInterval(interval);
        setToken(updatedToken);
        setStep(4);

        return toast.success("Your sale is complete");
      }
    }

    if (step == 3) {
      const interval = setInterval(() => {
        updateToken(interval);
      }, 1000);
    }
  }, [step]);

  return (
    <div>
      <Button className="tiny" onClick={toggleModal}>
        Accept
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
            Accept Offer
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
                </AssetInfo>
              </AssetGrid>
            </ModalGridRow>

            {step == 0 && (
              <>
                <ModalGridRow>
                  <TextInputLabel>Fees</TextInputLabel>
                  <FeeRow>
                    <div>Marketplace Fee</div>
                    <div>2.5%</div>
                  </FeeRow>
                  {Boolean(token.collection.royalty_per_mille) && (
                    <FeeRow>
                      <div>Creator Royalty</div>
                      <div>{token.collection.royalty_per_mille / 10}%</div>
                    </FeeRow>
                  )}
                </ModalGridRow>
                <ModalGridRow>
                  <TransactionRow>
                    Total Earnings
                    <PurchaseTotal>
                      <PriceIcon>
                        <Image
                          src={`/payment_tokens/${buy_order.payment_token.symbol}.png`}
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
                        Number(formattedPrice) *
                          (1 -
                            (0.025 +
                              token.collection.royalty_per_mille / 1000)) *
                          10000
                      ) / 10000}{" "}
                      {buy_order.payment_token.symbol}
                    </PurchaseTotal>
                  </TransactionRow>
                </ModalGridRow>
                <Button onClick={handleSubmit}>Accept Offer</Button>
              </>
            )}

            {step == 1 && (
              <>
                <ModalGridRow>
                  This offer is significantly below the collection floor price.
                  Are you sure you want to continue?
                </ModalGridRow>

                <ModalGridRow>
                  {floorPrice && (
                    <TransactionRow>
                      Floor Price
                      <PurchaseTotal>
                        <PriceIcon>
                          <Image
                            src={`/payment_tokens/${buy_order.payment_token.symbol}.png`}
                            alt=""
                            layout="responsive"
                            objectFit="contain"
                            objectPosition="center"
                            width={50}
                            height={50}
                            priority
                          />
                        </PriceIcon>
                        {floorPrice} {buy_order.payment_token.symbol}
                      </PurchaseTotal>
                    </TransactionRow>
                  )}
                  <TransactionRow>
                    Offer Price
                    <PurchaseTotal>
                      <PriceIcon>
                        <Image
                          src={`/payment_tokens/${buy_order.payment_token.symbol}.png`}
                          alt=""
                          layout="responsive"
                          objectFit="contain"
                          objectPosition="center"
                          width={50}
                          height={50}
                          priority
                        />
                      </PriceIcon>
                      {Number(formattedPrice)} {buy_order.payment_token.symbol}
                    </PurchaseTotal>
                  </TransactionRow>
                  {floorPrice && (
                    <TransactionRow>
                      Difference
                      <PurchaseTotal>
                        {Math.round(
                          ((Number(formattedPrice) - floorPrice) / floorPrice) *
                            -100
                        )}
                        % below
                      </PurchaseTotal>
                    </TransactionRow>
                  )}
                </ModalGridRow>
                <ButtonGrid className="offer">
                  <Button onClick={toggleModal} className="outline">
                    Nevermind
                  </Button>
                  <Button onClick={(e) => handleSubmit(e, true)}>
                    Proceed Anyway
                  </Button>
                </ButtonGrid>
              </>
            )}

            {step == 2 && (
              <>
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
                  {pendingApproval ? (
                    <StepText>
                      <StepTitle>Approve collection</StepTitle>
                      <StepDescription>
                        Waiting for collection approval transaction to complete
                      </StepDescription>
                    </StepText>
                  ) : (
                    <StepText>
                      <StepTitle>Approve collection</StepTitle>
                      <StepDescription>
                        Confirm this one-time transaction to sell items from
                        this collection
                      </StepDescription>
                    </StepText>
                  )}
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    {isApproved && txComplete ? (
                      <>
                        <Ring className="success" />
                        <FaCheck />
                      </>
                    ) : (
                      <>
                        {isApproved ? (
                          <>
                            <LoadingRing />2
                          </>
                        ) : (
                          <>
                            <Ring />2
                          </>
                        )}
                      </>
                    )}
                  </StepNumber>
                  <StepText>
                    <StepTitle>Accept offer</StepTitle>
                    <StepDescription>
                      Confirm the transaction in your wallet to accept the offer
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <Button onClick={toggleModal} className="outline">
                  Cancel
                </Button>
              </>
            )}

            {(step == 3 || step == 4) && (
              <>
                <ModalGridRow>
                  <TransactionRow>
                    Status
                    {step == 3 && (
                      <TransactionStatus>
                        <LoadingRing className="small" />
                        Processing
                      </TransactionStatus>
                    )}
                    {step == 4 && (
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
