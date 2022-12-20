import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { siteConfig } from "../../shared/config";
import {
  finalizeWithdrawal,
  getWithdrawalStatus,
  withdrawL2NFT,
} from "../../utils/bridge/l2Erc721Bridge";
import {
  getProvider,
  switchNetwork,
  switchNetworkTo,
} from "../../utils/wallet";
import {
  Button,
  ButtonGrid,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  Ring,
  StepDescription,
  StepNumber,
  StepText,
  StepTitle,
  StyledModal,
} from "../Asset/AssetButtons/styles";
import { BridgeButton, Warning } from "./styles";

export const WithdrawModal = ({
  l1Address,
  l2Address,
  tokenId,
  bridgeTxn = null,
  timestamp = null,
}) => {
  const [step, setStep] = useState(bridgeTxn ? 2 : 0);
  const [initHash, setInitHash] = useState("");
  const [finalizeHash, setFinializeHash] = useState("");
  const [checkingState, setCheckingState] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  let returnTime;
  if (timestamp && siteConfig.NETWORK == "opt-goerli") {
    returnTime = new Date(timestamp).setTime(
      new Date(timestamp).getTime() + 5 * 60 * 1000
    );
  } else if (timestamp) {
    returnTime = new Date(timestamp).setTime(
      new Date(timestamp).getTime() + 7 * 24 * 60 * 60 * 1000
    );
  }

  async function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    setOpacity(0);
  }

  const withdrawNFT = async () => {
    if (step != 0) {
      return;
    }

    await switchNetwork();

    const tx = await withdrawL2NFT(l1Address, l2Address, tokenId);

    if (tx) {
      setInitHash(tx);
      setStep(1);
    } else {
      setOpacity(0);
      setIsOpen(false);
      setStep(0);
      return;
    }
  };

  useEffect(() => {
    async function fetchTxStatus(interval) {
      const provider = await getProvider();
      const txReceipt = await provider.getTransaction(initHash);

      if (txReceipt && txReceipt.blockNumber) {
        clearInterval(interval);
        setStep(2);
      }
    }

    if (step == 1 && initHash) {
      const interval = setInterval(() => {
        fetchTxStatus(interval);
      }, 500);
    }
  }, [step]);

  const finalizeTx = async () => {
    if (siteConfig.NETWORK == "opt-goerli") {
      await switchNetworkTo("0x5");
    } else {
      await switchNetworkTo("0x1");
    }

    setStep(4);

    const tx = await finalizeWithdrawal(bridgeTxn);

    if (tx) {
      setFinializeHash(tx);
      setStep(5);
    } else {
      setOpacity(0);
      setIsOpen(false);
      setStep(3);
      return;
    }
  };

  useEffect(() => {
    async function fetchTxStatus(interval) {
      const provider = await getProvider();
      const txReceipt = await provider.getTransaction(finalizeHash);

      if (txReceipt && txReceipt.blockNumber) {
        clearInterval(interval);
        setStep(6);
      }
    }

    if (step == 5 && finalizeHash) {
      const interval = setInterval(() => {
        fetchTxStatus(interval);
      }, 500);
    }
  }, [step]);

  // 0 = Default state
  // 2 = sdk.MessageStatus.STATE_ROOT_NOT_PUBLISHED
  // 3 = sdk.MessageStatus.IN_CHALLENGE_PERIOD
  // 4 = sdk.MessageStatus.READY_FOR_RELAY
  // 5 = Finalized
  useEffect(() => {
    async function getStatus() {
      setCheckingState(true);
      setCorrectNetwork(false);
      if (siteConfig.NETWORK == "opt-goerli") {
        await switchNetworkTo("0x5");
      } else {
        await switchNetworkTo("0x1");
      }
      setCorrectNetwork(true);
      const status = await getWithdrawalStatus(bridgeTxn);
      if (status) {
        if (status == 4) {
          setStep(3);
        } else if (status == 5) {
          setStep(6);
        }
        setCheckingState(false);
      } else {
        setOpacity(0);
        setIsOpen(false);
        setStep(2);
        setCheckingState(false);
        return;
      }
    }

    if (isOpen && bridgeTxn) {
      getStatus();
    }
  }, [isOpen]);

  return (
    <div>
      <BridgeButton
        onClick={(e) => {
          toggleModal(e);
          withdrawNFT();
        }}
        className={step == 0 ? "dark" : "dark"}
      >
        {step < 2 ? "Withdraw to Ethereum" : "Finalize Withdrawal"}
      </BridgeButton>

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
            Withdraw NFT
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          <ModalContent>
            {step == 0 && (
              <>
                <ModalGridRow>
                  <Warning>
                    Once initiated, you must return to this page after{" "}
                    {siteConfig.NETWORK == "opt-goerli"
                      ? "5 minutes"
                      : "7 days"}{" "}
                    to finalize the withdrawal on Ethereum
                  </Warning>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <LoadingRing />1
                  </StepNumber>
                  <StepText>
                    <StepTitle>Initiate withdrawal</StepTitle>
                    <StepDescription>
                      Confirm the transaction in your wallet to initiate the
                      withdrawal process
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring />2
                  </StepNumber>
                  <StepText>
                    <StepTitle>Finalize withdrawal</StepTitle>
                    <StepDescription>
                      Return to this page in{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "5 minutes"
                        : "7 days"}{" "}
                      to finalize your withdrawal to{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Ethereum Goerli"
                        : "Ethereum"}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>

                <Button onClick={toggleModal} className="outline">
                  Cancel
                </Button>
              </>
            )}

            {step == 1 && (
              <>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <LoadingRing />1
                  </StepNumber>
                  <StepText>
                    <StepTitle>Initiate withdrawal</StepTitle>
                    <StepDescription>
                      Initiating withdrawal from{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Optimism Goerli"
                        : "Optimism"}{" "}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring />2
                  </StepNumber>
                  <StepText>
                    <StepTitle>Finalize withdrawal</StepTitle>
                    <StepDescription>
                      Return to this page in{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "5 minutes"
                        : "7 days"}{" "}
                      to finalize your withdrawal to{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Ethereum Goerli"
                        : "Ethereum"}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>

                <a
                  href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/tx/${initHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="dark">View Transaction</Button>
                </a>
              </>
            )}

            {step == 2 && (
              <>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring className="success" />
                    <FaCheck />
                  </StepNumber>
                  <StepText>
                    <StepTitle>Initiate withdrawal</StepTitle>
                    <StepDescription>
                      Your withdrawal from{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Optimism Goerli"
                        : "Optimism"}{" "}
                      has been initiated
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    {checkingState ? <LoadingRing /> : <Ring />}2
                  </StepNumber>
                  <StepText>
                    <StepTitle>Finalize withdrawal</StepTitle>
                    <StepDescription>
                      {checkingState ? (
                        correctNetwork ? (
                          <>Fetching withdrawal status...</>
                        ) : (
                          <>
                            Please switch to the{" "}
                            {siteConfig.NETWORK == "opt-goerli"
                              ? "Ethereum Goerli"
                              : "Ethereum"}{" "}
                            network
                          </>
                        )
                      ) : returnTime ? (
                        <>
                          Return after{" "}
                          <b>
                            {new Date(returnTime).toLocaleString([], {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </b>{" "}
                          to finalize your withdrawal to{" "}
                          {siteConfig.NETWORK == "opt-goerli"
                            ? "Ethereum Goerli"
                            : "Ethereum"}
                        </>
                      ) : (
                        <>
                          Return to this page in{" "}
                          {siteConfig.NETWORK == "opt-goerli"
                            ? "5 minutes"
                            : "7 days"}{" "}
                          to finalize your withdrawal to{" "}
                          {siteConfig.NETWORK == "opt-goerli"
                            ? "Ethereum Goerli"
                            : "Ethereum"}
                        </>
                      )}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>

                {initHash ? (
                  <a
                    href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/tx/${initHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="dark">View Transaction</Button>
                  </a>
                ) : (
                  <Button onClick={toggleModal} className="outline">
                    Close
                  </Button>
                )}
              </>
            )}

            {step == 3 && (
              <>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring className="success" />
                    <FaCheck />
                  </StepNumber>
                  <StepText>
                    <StepTitle>Initiate withdrawal</StepTitle>
                    <StepDescription>
                      Your withdrawal from{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Optimism Goerli"
                        : "Optimism"}{" "}
                      has been initiated
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring />2
                  </StepNumber>
                  <StepText>
                    <StepTitle>Finalize withdrawal</StepTitle>
                    <StepDescription>
                      Complete a transaction to finalize your withdrawal to{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Ethereum Goerli"
                        : "Ethereum"}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>

                <Button onClick={finalizeTx}>Finalize Withdrawal</Button>
              </>
            )}

            {step == 4 && (
              <>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring className="success" />
                    <FaCheck />
                  </StepNumber>
                  <StepText>
                    <StepTitle>Initiate withdrawal</StepTitle>
                    <StepDescription>
                      Your withdrawal from{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Optimism Goerli"
                        : "Optimism"}{" "}
                      has been initiated
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <LoadingRing />2
                  </StepNumber>
                  <StepText>
                    <StepTitle>Finalize withdrawal</StepTitle>
                    <StepDescription>
                      Complete a transaction to finalize your withdrawal to{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Ethereum Goerli"
                        : "Ethereum"}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>

                <Button className="muted disabled">Finalize Withdrawal</Button>
              </>
            )}

            {step == 5 && (
              <>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring className="success" />
                    <FaCheck />
                  </StepNumber>
                  <StepText>
                    <StepTitle>Initiate withdrawal</StepTitle>
                    <StepDescription>
                      Your withdrawal from{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Optimism Goerli"
                        : "Optimism"}{" "}
                      has been initiated
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <LoadingRing />2
                  </StepNumber>
                  <StepText>
                    <StepTitle>Finalize withdrawal</StepTitle>
                    <StepDescription>
                      Finalizing your withdrawal to{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Ethereum Goerli"
                        : "Ethereum"}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>

                <ButtonGrid className="offer">
                  <Button className="muted disabled">View NFT</Button>
                  <a
                    href={`${siteConfig.L1_BLOCK_EXPLORER_URL}/tx/${finalizeHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="outline">View Transaction</Button>
                  </a>
                </ButtonGrid>
              </>
            )}

            {step == 6 && (
              <>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring className="success" />
                    <FaCheck />
                  </StepNumber>
                  <StepText>
                    <StepTitle>Initiate withdrawal</StepTitle>
                    <StepDescription>
                      Your withdrawal from{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Optimism Goerli"
                        : "Optimism"}{" "}
                      has been initiated
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <Ring className="success" />
                    <FaCheck />
                  </StepNumber>
                  <StepText>
                    <StepTitle>Finalize withdrawal</StepTitle>
                    <StepDescription>
                      Your withdrawal to{" "}
                      {siteConfig.NETWORK == "opt-goerli"
                        ? "Ethereum Goerli"
                        : "Ethereum"}{" "}
                      has been finalized
                    </StepDescription>
                  </StepText>
                </ModalGridRow>

                <ButtonGrid className="offer">
                  <Link href={`/asset/eth/${l1Address}/${tokenId}`}>
                    <a>
                      <Button>View NFT</Button>
                    </a>
                  </Link>
                  {finalizeHash && (
                    <a
                      href={`${siteConfig.L1_BLOCK_EXPLORER_URL}/tx/${finalizeHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="outline">View Transaction</Button>
                    </a>
                  )}
                </ButtonGrid>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </StyledModal>
    </div>
  );
};
