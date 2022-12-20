import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCalendarDay, FaCheck, FaChevronDown, FaTag } from "react-icons/fa";
import { MdArrowBack, MdClose, MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProfileBalance } from "../../../api/profile";
import { fetchToken, refreshToken } from "../../../api/token";
import { State } from "../../../store";
import { updateBalance } from "../../../store/balance";
import { updateLogin } from "../../../store/login";
import {
  approveERC20,
  erc20IsApproved,
} from "../../../utils/exchange/exchange";
import { createSeaportBuyOrder } from "../../../utils/exchange/sendBuyOrder";
import { switchNetwork } from "../../../utils/wallet";
import { TokenImage } from "../../Common/Images/TokenImage";
import {
  AssetCollection,
  AssetGrid,
  AssetInfo,
  AssetName,
  Button,
  ButtonGrid,
  ButtonText,
  Dropdown,
  DropDownChevron,
  FeeRow,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalSubtitle,
  ModalTitle,
  ModalTitleIcon,
  PriceDropdown,
  PriceDropdownRow,
  PriceGrid,
  PriceImage,
  PriceInputContainer,
  Ring,
  SmallText,
  StepDescription,
  StepNumber,
  StepText,
  StepTitle,
  StyledModal,
  TextInput,
  TextInputContainer,
  TextInputLabel,
  TokenImageContainer,
  Uniswap,
  VerifiedIcon,
} from "./styles";

export const OfferButton = ({ token, setToken }) => {
  const dispatch = useDispatch();
  const address = useSelector((state: State) => state.address);
  const balances = useSelector((state: State) => state.balance);

  const [step, setStep] = useState(0);
  const [txComplete, setTxComplete] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [price, setPrice] = useState("");

  const eligiblePaymentTokens = token.collection.payment_tokens.filter(
    (e) => e.symbol != "ETH"
  );

  const [paymentToken, setPaymentToken] = useState(
    eligiblePaymentTokens.find((e) => e.symbol == "WETH")
  );
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const validatePrice = () => {
    return (
      price != "" &&
      !isNaN(Number(price)) &&
      (paymentToken.symbol == "OP"
        ? Number(price) >= 1 && Number(price) <= 10000000
        : Number(price) >= 0.0001 && Number(price) <= 10000) &&
      Number(price) <= Number(balances[paymentToken.symbol]) &&
      (token.minimum_offer
        ? Number(price) >= token.minimum_offer[paymentToken.symbol]
        : true)
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

  // Note: must update this value if you change the default selected duration
  let date = new Date();
  date.setDate(date.getDate() + 7);
  const [offerDuration, setOfferDuration] = useState(
    Math.floor(date.getTime() / 1000) - Math.floor(new Date().getTime() / 1000)
  );

  const setDuration = (e) => {
    const time = e[e.length - 1];
    const currDate = new Date();

    if (time == "m") {
      currDate.setMonth(currDate.getMonth() + Number(e.slice(0, -1)));
      setOfferDuration(
        Math.floor(currDate.getTime() / 1000) -
          Math.floor(new Date().getTime() / 1000)
      );
    } else if (time == "w") {
      currDate.setDate(currDate.getDate() + Number(e.slice(0, -1) * 7));
      setOfferDuration(
        Math.floor(currDate.getTime() / 1000) -
          Math.floor(new Date().getTime() / 1000)
      );
    } else if (time == "d") {
      currDate.setDate(currDate.getDate() + Number(e.slice(0, -1)));
      setOfferDuration(
        Math.floor(currDate.getTime() / 1000) -
          Math.floor(new Date().getTime() / 1000)
      );
    }
  };

  const [showUniswap, setShowUniswap] = useState(false);

  const convertETH = async () => {
    await switchNetwork();
    setShowUniswap(true);
  };

  async function handleSubmit(e) {
    const contractVersion = 6;

    if (validatePrice()) {
      await switchNetwork();

      setStep(1);

      let formattedPrice;
      try {
        formattedPrice = ethers.utils.parseUnits(price, "ether");
      } catch (error) {
        toast.error(
          "Error creating offer, please ensure you've entered a valid price"
        );
        return setStep(0);
      }

      if (!isApproved) {
        let approvalStatus = await erc20IsApproved(
          address,
          paymentToken.address,
          contractVersion
        );

        setIsApproved(approvalStatus);

        if (!approvalStatus) {
          const approval = await approveERC20(
            paymentToken.address,
            contractVersion
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
            paymentToken.address,
            contractVersion
          );

          setIsApproved(approvalStatus);
          count += 1;
        }
      }

      let buyOrder = null;
      if (token.collection.contract_type == "ERC-721") {
        buyOrder = await createSeaportBuyOrder({
          buyer: address,
          contractAddress: token.contract_address,
          tokenId: token.token_id,
          duration: offerDuration,
          price: formattedPrice,
          collectionRoyaltyPerMille: token.collection.royalty_per_mille,
          collectionRoyaltyPayoutAddress: token.collection.payout_address,
          paymentToken,
          nftItemType: ItemType.ERC721,
        });
      } else if (token.collection.contract_type == "ERC-1155") {
        buyOrder = await createSeaportBuyOrder({
          buyer: address,
          contractAddress: token.contract_address,
          tokenId: token.token_id,
          duration: offerDuration,
          price: formattedPrice,
          collectionRoyaltyPerMille: token.collection.royalty_per_mille,
          collectionRoyaltyPayoutAddress: token.collection.payout_address,
          paymentToken,
          nftItemType: ItemType.ERC1155,
        });
      }

      if (buyOrder) {
        setToken(await fetchToken(token.contract_address, token.token_id));

        setTxComplete(true);
        setOpacity(0);
        setIsOpen(false);
        setStep(0);

        toast.success("Offer submitted");
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
    setShowUniswap(false);
    setShowPriceDropdown(false);

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
    const fetchWalletBalance = async () => {
      const balances = await fetchProfileBalance(address);
      updateBalance(balances, dispatch);
    };

    if (!showUniswap && address) {
      fetchWalletBalance();
    }
  }, [showUniswap]);

  return (
    <div>
      <Button
        className="outline"
        onClick={(e) => {
          address ? toggleModal(e) : updateLogin(true, dispatch);
        }}
      >
        <ButtonText>
          <FaTag />
          Make Offer
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
        <ModalContainer onClick={() => setShowPriceDropdown(false)}>
          <ModalTitle>
            {showUniswap ? (
              <>
                <ModalTitleIcon onClick={() => setShowUniswap(false)}>
                  <MdArrowBack />
                </ModalTitleIcon>
                Deposit {paymentToken.symbol}
              </>
            ) : (
              "Make an offer"
            )}

            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          {showUniswap ? (
            <>
              <ModalSubtitle>
                Convert between ETH and {paymentToken.symbol}
              </ModalSubtitle>
              <ModalContent>
                <Uniswap
                  src={`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${paymentToken.address}`}
                  height="100%"
                  width="100%"
                />
              </ModalContent>
            </>
          ) : (
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

              {step == 0 && (
                <>
                  <ModalGridRow>
                    <TextInputLabel htmlFor="price">
                      Offer Amount
                    </TextInputLabel>

                    <PriceGrid>
                      <PriceInputContainer
                        className={
                          eligiblePaymentTokens.length > 1 ? "link" : null
                        }
                        onClick={(e) => {
                          setShowPriceDropdown(!showPriceDropdown);
                          e.stopPropagation();
                        }}
                      >
                        <PriceImage>
                          <Image
                            src={`/payment_tokens/${paymentToken.symbol}.png`}
                            alt=""
                            layout="responsive"
                            objectFit="contain"
                            objectPosition="center"
                            width={50}
                            height={50}
                            priority
                          />
                        </PriceImage>
                        {paymentToken.symbol}
                        {eligiblePaymentTokens.length > 1 && (
                          <>
                            <DropDownChevron>
                              <FaChevronDown />
                            </DropDownChevron>
                            <PriceDropdown
                              className={
                                showPriceDropdown ? "visible" : "hidden"
                              }
                            >
                              {eligiblePaymentTokens
                                .filter((e) => e.symbol != paymentToken.symbol)
                                .map((token, index) => (
                                  <PriceDropdownRow
                                    key={index}
                                    onClick={() => {
                                      setPaymentToken(token);
                                    }}
                                  >
                                    <PriceImage>
                                      <Image
                                        src={`/payment_tokens/${token.symbol}.png`}
                                        alt=""
                                        layout="responsive"
                                        objectFit="contain"
                                        objectPosition="center"
                                        width={50}
                                        height={50}
                                        priority
                                      />
                                    </PriceImage>
                                    {token.symbol}
                                  </PriceDropdownRow>
                                ))}
                            </PriceDropdown>
                          </>
                        )}
                      </PriceInputContainer>

                      <TextInputContainer>
                        <TextInput
                          id="price"
                          name="price"
                          placeholder="Offer amount"
                          value={price}
                          onChange={updatePrice}
                        />
                      </TextInputContainer>
                    </PriceGrid>

                    {token.minimum_offer &&
                    Number(price) <
                      Number(token.minimum_offer[paymentToken.symbol]) ? (
                      <SmallText
                        className={
                          Number(price) > 0 &&
                          Number(price) <
                            Number(token.minimum_offer[paymentToken.symbol])
                            ? "error"
                            : null
                        }
                      >
                        Minimum offer:{" "}
                        {Math.round(
                          token.minimum_offer[paymentToken.symbol] * 1000
                        ) / 1000}{" "}
                        {paymentToken.symbol}
                      </SmallText>
                    ) : (
                      balances && (
                        <SmallText
                          className={
                            Number(price) >
                            Number(balances[paymentToken.symbol])
                              ? "error"
                              : null
                          }
                        >
                          Balance:{" "}
                          {Math.round(balances[paymentToken.symbol] * 1000) /
                            1000}{" "}
                          {paymentToken.symbol}
                        </SmallText>
                      )
                    )}
                  </ModalGridRow>
                  <ModalGridRow>
                    <TextInputLabel htmlFor="duration">
                      Offer Expiration
                    </TextInputLabel>
                    <TextInputContainer>
                      <FaCalendarDay />
                      <Dropdown
                        name="duration"
                        id="duration"
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option value="1d">1 Day</option>
                        <option value="3d">3 Days</option>
                        <option value="1w" selected>
                          1 Week
                        </option>
                        <option value="1m">1 Month</option>
                      </Dropdown>
                    </TextInputContainer>
                  </ModalGridRow>
                  <ButtonGrid className="offer">
                    <Button
                      onClick={handleSubmit}
                      className={!validatePrice() ? "muted disabled" : null}
                    >
                      Make Offer
                    </Button>
                    <Button className="outline" onClick={convertETH}>
                      Convert ETH
                    </Button>
                  </ButtonGrid>
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
                    <StepText>
                      <StepTitle>
                        Approve {paymentToken.symbol} access
                      </StepTitle>
                      <StepDescription>
                        Complete this one-time transaction to make offers with{" "}
                        {paymentToken.symbol}
                      </StepDescription>
                    </StepText>
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
                      <StepTitle>Confirm offer</StepTitle>
                      <StepDescription>
                        Sign this message to finalize your offer of{" "}
                        {Number(price)} {paymentToken.symbol}
                      </StepDescription>
                    </StepText>
                  </ModalGridRow>
                  <Button onClick={toggleModal} className="outline">
                    Cancel
                  </Button>
                </>
              )}
            </ModalContent>
          )}
        </ModalContainer>
      </StyledModal>
    </div>
  );
};
