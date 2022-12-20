import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { refreshTokenOrders } from "../../../api/token";
import { siteConfig } from "../../../shared/config";
import { sendCancelSeaportBuyOrder } from "../../../utils/exchange/sendBuyOrder";
import { switchNetwork } from "../../../utils/wallet";
import {
  Button,
  ButtonGrid,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  StyledModal,
  TransactionRow,
  TransactionStatus,
} from "./styles";

export const CancelOfferButton = ({ token, setToken, buy_order }) => {
  const [step, setStep] = useState(0);
  const [txHash, setTxHash] = useState("");

  async function handleSubmit(e) {
    setStep(1);

    await switchNetwork();

    let tx;
    if (buy_order.contract_version == 6) {
      tx = await sendCancelSeaportBuyOrder(buy_order.id);
    } else {
      return;
    }

    if (tx) {
      setTxHash(tx.hash);
      setStep(2);
    } else {
      setStep(0);
    }
  }

  useEffect(() => {
    async function updateToken(interval) {
      const updatedToken = await refreshTokenOrders(
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
        setOpacity(0);
        setIsOpen(false);
        setStep(0);

        return toast.success("Offer successfully cancelled");
      }
    }

    if (step == 2) {
      const interval = setInterval(() => {
        updateToken(interval);
      }, 1000);
    }
  }, [step]);

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
    if (new Date(buy_order.expiration) < new Date()) {
      updateToken();
    }

    async function updateToken() {
      const updatedToken = await refreshTokenOrders(
        token.contract_address,
        token.token_id
      );
      if (updatedToken) {
        setToken(updatedToken);
      }
    }
  }, []);

  return (
    <div>
      <Button className="tiny" onClick={toggleModal}>
        Cancel
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
            Cancel Offer
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          <ModalContent>
            {step == 0 && (
              <>
                <div>
                  <b>Are you sure you want to cancel this offer?</b>
                </div>
                Canceling this offer requires a transaction to finalize.
                <ButtonGrid>
                  <Button className="small outline" onClick={toggleModal}>
                    Nevermind
                  </Button>
                  <Button className="small" onClick={handleSubmit}>
                    Cancel Offer
                  </Button>
                </ButtonGrid>
              </>
            )}
            {step == 1 && (
              <>
                <ModalGridRow>
                  Confirm the transaction in your wallet to cancel the offer
                </ModalGridRow>
                <ModalGridRow>
                  <TransactionRow>
                    Status
                    <TransactionStatus>
                      <LoadingRing className="small" />
                      Pending
                    </TransactionStatus>
                  </TransactionRow>
                  <TransactionRow>
                    Transaction ID
                    <TransactionStatus>—</TransactionStatus>
                  </TransactionRow>
                </ModalGridRow>

                <Button onClick={toggleModal} className="outline">
                  Nevermind
                </Button>
              </>
            )}
            {(step == 2 || step == 3) && (
              <>
                <ModalGridRow>
                  Your transaction to cancel the offer will be finalized shortly
                </ModalGridRow>
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
