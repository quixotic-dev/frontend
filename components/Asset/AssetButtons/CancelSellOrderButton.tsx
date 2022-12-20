import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchErc1155TokenOwnedQuantity,
  refreshTokenOrders,
} from "../../../api/token";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { cancelSeaportOrder } from "../../../utils/exchange/sendSellOrder";
import { switchNetwork } from "../../../utils/wallet";
import {
  Button,
  ButtonGrid,
  ButtonText,
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

export const CancelSellOrderButton = ({
  token,
  setToken,
  sell_order,
  setQuantityListed,
  tiny = false,
}) => {
  const address = useSelector((state: State) => state.address);
  const [step, setStep] = useState(0);
  const [txHash, setTxHash] = useState("");

  async function handleSubmit(e) {
    setStep(1);

    await switchNetwork();

    let tx;
    if (sell_order.contract_version == 6) {
      tx = await cancelSeaportOrder(
        token.contract_address,
        token.token_id,
        address
      );
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
          setQuantityListed(updateQuantity.listed);
        }

        clearInterval(interval);
        setToken(updatedToken);
        setOpacity(0);
        setIsOpen(false);
        setStep(0);

        return toast.success("Listing successfully cancelled");
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
    if (new Date(sell_order.expiration) < new Date()) {
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
      <Button onClick={toggleModal} className={tiny ? "tiny" : null}>
        <ButtonText>Cancel Listing</ButtonText>
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
            Cancel Listing
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          <ModalContent>
            {step == 0 && (
              <>
                <div>
                  <b>Are you sure you want to cancel this listing?</b>
                </div>
                Canceling this listing will remove the sale from Quix and
                requires a transaction to finalize.
                <ButtonGrid>
                  <Button className="small outline" onClick={toggleModal}>
                    Nevermind
                  </Button>
                  <Button className="small" onClick={handleSubmit}>
                    Cancel Listing
                  </Button>
                </ButtonGrid>
              </>
            )}
            {step == 1 && (
              <>
                <ModalGridRow>
                  Confirm the transaction in your wallet to cancel the listing
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
                  Your transaction to cancel the listing will be finalized
                  shortly
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
