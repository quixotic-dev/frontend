import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { fetchToken } from "../../api/token";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import {
  depositL1NFT,
  isL1BridgeApprovedForAll,
  setL1BridgeApprovalForAll,
} from "../../utils/bridge/l1ERC721Bridge";
import { switchNetworkTo } from "../../utils/wallet";
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
  TransactionRow,
  TransactionStatus,
} from "../Asset/AssetButtons/styles";
import { BridgeButton } from "./styles";

export const DepositModal = ({ l1Address, l2Address, tokenId }) => {
  const address = useSelector((state: State) => state.address);

  const [step, setStep] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [txComplete, setTxComplete] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [timestamp, setTimestamp] = useState(null);

  async function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
    // setStep(0);
    // setTxComplete(false);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    setOpacity(0);
  }

  const depositNFT = async () => {
    if (step != 0) {
      return;
    }

    //TODO: Verify l2Address exists or deploy new contract using factory
    if (siteConfig.NETWORK == "opt-goerli") {
      await switchNetworkTo("0x5");
    } else {
      await switchNetworkTo("0x1");
    }

    if (!isApproved) {
      let approvalStatus = await isL1BridgeApprovedForAll(address, l1Address);

      setIsApproved(approvalStatus);

      if (!approvalStatus) {
        const approval = await setL1BridgeApprovalForAll(l1Address);
        if (!approval) {
          setOpacity(0);
          setIsOpen(false);
          setStep(0);
          setTxComplete(false);
          return;
        }
      }

      setPendingApproval(true);

      let count = 0;
      while (!approvalStatus && count < 30) {
        if (count > 0) {
          await new Promise((r) => setTimeout(r, 2000));
        }
        approvalStatus = await isL1BridgeApprovedForAll(address, l1Address);
        setIsApproved(approvalStatus);
        count += 1;
      }
    }

    setPendingApproval(false);

    const tx = await depositL1NFT(l1Address, l2Address, tokenId);

    if (tx) {
      setTxHash(tx);
      if (siteConfig.NETWORK == "opt-goerli") {
        setTimestamp(new Date().setTime(new Date().getTime() + 5 * 60 * 1000));
      } else {
        setTimestamp(new Date().setTime(new Date().getTime() + 15 * 60 * 1000));
      }
      setStep(1);
    } else {
      setOpacity(0);
      setIsOpen(false);
      setStep(0);
      setTxComplete(false);
      return;
    }
  };

  useEffect(() => {
    async function fetchL2Token(interval) {
      const token = await fetchToken(l2Address, tokenId);
      if (token && token.owner && token.owner.address == address) {
        clearInterval(interval);
        setStep(2);
      }
    }

    if (step == 1) {
      const interval = setInterval(() => {
        fetchL2Token(interval);
      }, 5000);
    }
  });

  return (
    <div>
      <BridgeButton
        onClick={(e) => {
          toggleModal(e);
          depositNFT();
        }}
      >
        Bridge to Optimism
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
            Bridge NFT
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          <ModalContent>
            {step == 0 && (
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
                        Confirm this one-time transaction to bridge items from
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
                    <StepTitle>Initiate bridge process</StepTitle>
                    <StepDescription>
                      Confirm the transaction in your wallet to initiate the
                      bridge process
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <Button onClick={toggleModal} className="outline">
                  Cancel
                </Button>
              </>
            )}

            {(step == 1 || step == 2) && (
              <>
                Your bridge transaction is processing. Please allow up to{" "}
                {siteConfig.NETWORK == "opt-goerli"
                  ? "5 minutes"
                  : "15 minutes"}{" "}
                for the transfer to finalize.
                <ModalGridRow>
                  <TransactionRow>
                    Status
                    {step == 1 && (
                      <TransactionStatus>
                        <LoadingRing className="small" />
                        Bridging
                      </TransactionStatus>
                    )}
                    {step == 2 && (
                      <TransactionStatus>
                        <FaCheck />
                        Complete
                      </TransactionStatus>
                    )}
                  </TransactionRow>
                  <TransactionRow>
                    Est. Completion
                    <TransactionStatus>
                      {new Date(timestamp).toLocaleString([], {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TransactionStatus>
                  </TransactionRow>
                  <TransactionRow>
                    Transaction ID
                    <a
                      href={`${siteConfig.L1_BLOCK_EXPLORER_URL}/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TransactionStatus>
                        {txHash.slice(0, 6)}...{txHash.slice(-4)}
                      </TransactionStatus>
                    </a>
                  </TransactionRow>
                </ModalGridRow>
                <ButtonGrid className="offer">
                  {step == 1 && (
                    <>
                      <Button className="muted disabled">View NFT</Button>
                      <a
                        href={`${siteConfig.L1_BLOCK_EXPLORER_URL}/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="outline">View Transaction</Button>
                      </a>
                    </>
                  )}
                  {step == 2 && tokenId && (
                    <>
                      <Link href={`/asset/${l2Address}/${tokenId}`}>
                        <a>
                          <Button>View NFT</Button>
                        </a>
                      </Link>
                      <a
                        href={`https://twitter.com/intent/tweet?text=I%20just%20bridged%20an%20NFT%20to%20@optimismFND%20https://qx.app/asset/${l2Address}/${tokenId}%20via%20@qx_app`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="outline">Share on Twitter</Button>
                      </a>
                    </>
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
