import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers } from "ethers";
import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchToken } from "../../../api/token";
import { State } from "../../../store";
import {
  isApprovedForAll,
  setApprovalForAll,
} from "../../../utils/exchange/exchange";
import { createSeaportSellOrder } from "../../../utils/exchange/sendSellOrder";
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
  PriceGrid,
  PriceImage,
  PriceInputContainer,
  Ring,
  StepDescription,
  StepNumber,
  StepText,
  StepTitle,
  StyledModal,
  TextInput,
  TextInputContainer,
  TextInputLabel,
  TokenImageContainer,
  VerifiedIcon,
} from "./styles";

export const LowerPriceButton = ({ token, setToken, sell_order }) => {
  const address = useSelector((state: State) => state.address);

  const curr_price = Number(
    ethers.utils.formatEther(
      ethers.utils.parseUnits(sell_order.price.toString(), "gwei")
    )
  );

  const [step, setStep] = useState(0);
  const [txComplete, setTxComplete] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [price, setPrice] = useState("");

  const validatePrice = () => {
    return (
      price != "" &&
      !isNaN(Number(price)) &&
      Number(price) < curr_price &&
      (sell_order.payment_token.symbol == "OP"
        ? Number(price) >= 1 && Number(price) <= 10000000
        : Number(price) >= 0.0001 && Number(price) <= 10000)
    );
  };

  const updatePrice = (event) => {
    if (
      event.target.value == "." ||
      event.target.value == "" ||
      !isNaN(event.target.value)
    ) {
      setPrice(event.target.value);
    }
  };

  async function handleSubmitSellOrder(e) {
    if (validatePrice()) {
      await switchNetwork();

      setStep(1);

      let formattedPrice;
      try {
        formattedPrice = ethers.utils.parseUnits(price, "ether");
      } catch (error) {
        toast.error(
          "Error creating listing, please ensure you've entered a valid price"
        );
        return setStep(0);
      }

      if (!isApproved) {
        let approvalStatus = await isApprovedForAll(
          address,
          token.contract_address,
          6
        );

        setIsApproved(approvalStatus);

        if (!approvalStatus) {
          const approval = await setApprovalForAll(token.contract_address, 6);
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
            6
          );

          setIsApproved(approvalStatus);
          count += 1;
        }
      }

      setPendingApproval(false);

      const duration =
        Math.floor(new Date(sell_order.expiration).getTime() / 1000) -
        Math.floor(new Date().getTime() / 1000);

      let sellOrder = null;
      if (token.collection.contract_type == "ERC-721") {
        sellOrder = await createSeaportSellOrder({
          seller: address,
          contractAddress: token.contract_address,
          tokenId: token.token_id,
          duration,
          price: formattedPrice,
          collectionRoyaltyPerMille: token.collection.royalty_per_mille,
          collectionRoyaltyPayoutAddress: token.collection.payout_address,
          paymentToken: sell_order.payment_token,
          nftItemType: ItemType.ERC721,
        });
      } else if (token.collection.contract_type == "ERC-1155") {
        sellOrder = await createSeaportSellOrder({
          seller: address,
          contractAddress: token.contract_address,
          tokenId: token.token_id,
          duration,
          price: formattedPrice,
          collectionRoyaltyPerMille: token.collection.royalty_per_mille,
          collectionRoyaltyPayoutAddress: token.collection.payout_address,
          paymentToken: sell_order.payment_token,
          nftItemType: ItemType.ERC1155,
        });
      }

      if (sellOrder) {
        setToken(await fetchToken(token.contract_address, token.token_id));

        setTxComplete(true);
        setOpacity(0);
        setIsOpen(false);
        setStep(0);

        toast.success("Price successfully lowered");
      } else {
        setStep(0);
      }
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  async function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
    setStep(0);
    setTxComplete(false);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    setOpacity(0);
  }

  return (
    <div>
      <Button className="outline" onClick={toggleModal}>
        <ButtonText>Lower Price</ButtonText>
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
            Lower Price
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
                  <TextInputLabel htmlFor="price">Price</TextInputLabel>
                  <PriceGrid>
                    <PriceInputContainer>
                      <PriceImage>
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
                      </PriceImage>
                      {sell_order.payment_token.symbol}
                    </PriceInputContainer>

                    <TextInputContainer>
                      <TextInput
                        id="price"
                        name="price"
                        placeholder="Amount"
                        value={price}
                        onChange={updatePrice}
                      />
                    </TextInputContainer>
                  </PriceGrid>
                </ModalGridRow>

                <Button
                  onClick={handleSubmitSellOrder}
                  className={!validatePrice() ? "muted disabled" : null}
                >
                  Lower Price
                </Button>
              </>
            )}

            {step == 1 && (
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
                    <StepTitle>Confirm listing</StepTitle>
                    <StepDescription>
                      Sign this message to finalize your listing
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <Button onClick={toggleModal} className="outline">
                  Cancel
                </Button>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </StyledModal>
    </div>
  );
};
