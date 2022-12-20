import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  MdClose,
  MdOutlineAccountBalanceWallet,
  MdVerified,
} from "react-icons/md";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { lookupEns } from "../../../api/profile";
import { fetchErc1155TokenOwnedQuantity, fetchToken } from "../../../api/token";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import {
  safeTransferFromErc1155,
  safeTransferFromErc721,
} from "../../../utils/exchange/exchange";
import { switchNetwork } from "../../../utils/wallet";
import { TokenImage } from "../../Common/Images/TokenImage";
import {
  AssetCollection,
  AssetGrid,
  AssetInfo,
  AssetName,
  Button,
  ButtonText,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  SmallText,
  StyledModal,
  TextInput,
  TextInputContainer,
  TextInputLabel,
  TokenImageContainer,
  TransactionRow,
  TransactionStatus,
  VerifiedIcon,
} from "./styles";

export const TransferButton = ({
  token,
  setToken,
  quantityOwned,
  setQuantityOwned,
  quantityListed,
  setQuantityListed,
  tiny = false,
}) => {
  const address = useSelector((state: State) => state.address);

  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [transferAddress, setTransferAddress] = useState("");
  const [addressForEns, setAddressForEns] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleChange = async (e) => {
    const modifiedAddress = e.target.value.replace(/[^a-z0-9.]/gi, "");
    setTransferAddress(modifiedAddress);

    if (
      modifiedAddress.endsWith(".eth") ||
      modifiedAddress.endsWith(".xyz") ||
      modifiedAddress.endsWith(".id")
    ) {
      const addrRes = await lookupEns(modifiedAddress);
      if (addrRes && addrRes.address) {
        setAddressForEns(addrRes.address);
      }
    } else {
      setAddressForEns("");
    }
  };

  const updateQuantity = async (e) => {
    const num = e.target.value;
    if ((!isNaN(num) && num <= quantityOwned - quantityListed) || num == "") {
      setQuantity(num);
    }
  };

  async function handleSubmit() {
    await switchNetwork();

    setStep(1);

    let transfer;
    if (token.collection.contract_type == "ERC-721") {
      transfer = await safeTransferFromErc721({
        from: address,
        to: addressForEns ? addressForEns : transferAddress,
        contract_address: token.contract_address,
        token_id: token.token_id,
      });
    } else if (token.collection.contract_type == "ERC-1155") {
      transfer = await safeTransferFromErc1155({
        from: address,
        to: addressForEns ? addressForEns : transferAddress,
        contract_address: token.contract_address,
        token_id: token.token_id,
        quantity: Number(quantity),
      });
    }

    if (transfer) {
      setTxHash(transfer.hash);
      setStep(2);
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

      if (token.collection.contract_type == "ERC-721") {
        if (updatedToken.owner.address != address) {
          clearInterval(interval);
          setToken(updatedToken);
          setStep(3);

          return toast.success("NFT successfully transferred");
        }
      } else if (token.collection.contract_type == "ERC-1155") {
        const updateQuantity = await fetchErc1155TokenOwnedQuantity(
          token.contract_address,
          token.token_id,
          address
        );

        if (updateQuantity.quantity == quantityOwned - quantity) {
          clearInterval(interval);
          setToken(updatedToken);
          setQuantityOwned(updateQuantity.quantity);
          setQuantityListed(updateQuantity.listed);
          setStep(3);

          return toast.success("NFT successfully transferred");
        }
      }
    }

    if (step == 2) {
      const interval = setInterval(() => {
        updateToken(interval);
      }, 1000);
    }
  }, [step]);

  return (
    <div>
      <Button
        className={tiny ? "tiny outline" : "outline"}
        onClick={toggleModal}
      >
        <ButtonText>
          <RiArrowLeftRightLine />
          Transfer NFT
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
            Transfer NFT
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
                {token.collection.contract_type == "ERC-1155" && (
                  <ModalGridRow>
                    <TextInputLabel htmlFor="quantity">Quantity</TextInputLabel>
                    <TextInputContainer>
                      <MdOutlineAccountBalanceWallet />
                      <TextInput
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={updateQuantity}
                      />
                    </TextInputContainer>
                  </ModalGridRow>
                )}

                <ModalGridRow>
                  <TextInputLabel htmlFor="transferAddress">
                    Wallet address
                  </TextInputLabel>
                  <TextInputContainer>
                    <MdOutlineAccountBalanceWallet />
                    <TextInput
                      id="transferAddress"
                      name="transferAddress"
                      value={transferAddress}
                      onChange={handleChange}
                      placeholder="Enter a wallet address or ENS"
                    />
                  </TextInputContainer>
                  <SmallText>{addressForEns}</SmallText>
                </ModalGridRow>

                {((token.collection.contract_type == "ERC-721" &&
                  token.sell_order) ||
                  (token.collection.contract_type == "ERC-1155" &&
                    quantityListed > 0)) && (
                  <ModalGridRow>
                    <SmallText>
                      <b>Note:</b> If this item is transferred back to your
                      wallet before the active listing expires, the sell order
                      can still be fulfilled. We recommend first cancelling the
                      listing.
                    </SmallText>
                  </ModalGridRow>
                )}

                <Button
                  onClick={handleSubmit}
                  className={
                    ethers.utils.isAddress(
                      addressForEns ? addressForEns : transferAddress
                    )
                      ? null
                      : "muted disabled"
                  }
                >
                  Transfer Item
                </Button>
              </>
            )}

            {step == 1 && (
              <>
                <ModalGridRow>
                  <div>
                    Confirm the transaction in your wallet to transfer the NFT
                    to{" "}
                    <b>
                      {addressForEns
                        ? transferAddress
                        : transferAddress.slice(0, 6) + "..."}
                    </b>
                  </div>
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
                  <div>
                    Your transaction to transfer the NFT to{" "}
                    <b>
                      {addressForEns
                        ? transferAddress
                        : transferAddress.slice(0, 6) + "..."}
                    </b>{" "}
                    will be finalized shortly
                  </div>
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
