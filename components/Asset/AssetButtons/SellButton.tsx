import { ItemType } from "@opensea/seaport-js/lib/constants";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaCalendarDay,
  FaCheck,
  FaChevronDown,
  FaWallet,
} from "react-icons/fa";
import { MdClose, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchErc1155TokenOwnedQuantity,
  fetchToken,
  refreshToken,
} from "../../../api/token";
import { State } from "../../../store";
import {
  isApprovedForAll,
  setApprovalForAll,
} from "../../../utils/exchange/exchange";
import { createSeaportSellOrder } from "../../../utils/exchange/sendSellOrder";
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
  ButtonText,
  Dropdown,
  DropDownChevron,
  FeeRow,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  PriceDropdown,
  PriceDropdownRow,
  PriceGrid,
  PriceImage,
  PriceInputContainer,
  PurchaseTotal,
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
  TransactionRow,
  VerifiedIcon,
} from "./styles";

export const SellButton = ({
  token,
  setToken,
  setQuantityListed,
  tiny = false,
}) => {
  const address = useSelector((state: State) => state.address);

  const [step, setStep] = useState(0);
  const [txComplete, setTxComplete] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [price, setPrice] = useState("");

  const eligiblePaymentTokens = token.collection.payment_tokens.filter(
    (e) => e.symbol != "WETH"
  );

  const [paymentToken, setPaymentToken] = useState(
    eligiblePaymentTokens.find((e) => e.symbol == "ETH")
  );

  const [floorPrice, setFloorPrice] = useState(null);

  useEffect(() => {
    setFloorPrice(
      token.collection.floor_price[paymentToken.symbol]
        ? Math.round(
            Number(
              ethers.utils.formatEther(
                ethers.utils.parseUnits(
                  token.collection.floor_price[paymentToken.symbol].toString(),
                  "gwei"
                )
              )
            ) * 10000
          ) / 10000
        : null
    );
  }, [paymentToken]);

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  let localDateTime = new Date(currentDateTime);
  localDateTime.setMinutes(
    localDateTime.getMinutes() - localDateTime.getTimezoneOffset() + 1
  );
  const [startDate, setStartDate] = useState(
    localDateTime.toJSON().split("T")[0]
  );
  const [startTime, setStartTime] = useState(
    localDateTime.toJSON().split("T")[1].slice(0, 5)
  );

  const validatePrice = () => {
    return (
      price != "" &&
      !isNaN(Number(price)) &&
      (paymentToken.symbol == "OP"
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

  // Note: must update this value if you change the default selected duration
  let date = new Date();
  date.setMonth(date.getMonth() + 3);
  const [fixedPriceDuration, setFixedPriceDuration] = useState(
    Math.floor(date.getTime() / 1000) - Math.floor(new Date().getTime() / 1000)
  );

  // Note: must update this value if you change the default selected duration
  date = new Date();
  date.setDate(date.getDate() + 7);
  const [auctionDuration, setAuctionDuration] = useState(
    Math.floor(date.getTime() / 1000) - Math.floor(new Date().getTime() / 1000)
  );

  const setDuration = (set) => (e) => {
    e = e.target.value;
    const time = e[e.length - 1];
    const currDate = new Date();

    if (time == "m") {
      currDate.setMonth(currDate.getMonth() + Number(e.slice(0, -1)));
      set(
        Math.floor(currDate.getTime() / 1000) -
          Math.floor(new Date().getTime() / 1000)
      );
    } else if (time == "w") {
      currDate.setDate(currDate.getDate() + Number(e.slice(0, -1) * 7));
      set(
        Math.floor(currDate.getTime() / 1000) -
          Math.floor(new Date().getTime() / 1000)
      );
    } else if (time == "d") {
      currDate.setDate(currDate.getDate() + Number(e.slice(0, -1)));
      set(
        Math.floor(currDate.getTime() / 1000) -
          Math.floor(new Date().getTime() / 1000)
      );
    }
  };

  async function handleSubmitSellOrder(e, skipWarning) {
    let contractVersion = 6;

    if (validatePrice()) {
      await switchNetwork();

      setStep(1);

      if (
        floorPrice &&
        (Number(price) - floorPrice) / floorPrice < -0.25 &&
        !skipWarning
      ) {
        return;
      } else {
        setStep(2);
      }

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
          contractVersion
        );

        setIsApproved(approvalStatus);

        if (!approvalStatus) {
          const approval = await setApprovalForAll(
            token.contract_address,
            contractVersion
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
            contractVersion
          );

          setIsApproved(approvalStatus);
          count += 1;
        }
      }

      setPendingApproval(false);

      let sellOrder = null;
      if (token.collection.contract_type == "ERC-721") {
        sellOrder = await createSeaportSellOrder({
          seller: address,
          contractAddress: token.contract_address,
          tokenId: token.token_id,
          duration: fixedPriceDuration,
          price: formattedPrice,
          collectionRoyaltyPerMille: token.collection.royalty_per_mille,
          collectionRoyaltyPayoutAddress: token.collection.payout_address,
          paymentToken,
          nftItemType: ItemType.ERC721,
        });
      } else if (token.collection.contract_type == "ERC-1155") {
        sellOrder = await createSeaportSellOrder({
          seller: address,
          contractAddress: token.contract_address,
          tokenId: token.token_id,
          duration: fixedPriceDuration,
          price: formattedPrice,
          collectionRoyaltyPerMille: token.collection.royalty_per_mille,
          collectionRoyaltyPayoutAddress: token.collection.payout_address,
          paymentToken,
          nftItemType: ItemType.ERC1155,
        });
      }

      if (sellOrder) {
        setToken(await fetchToken(token.contract_address, token.token_id));

        if (token.collection.contract_type == "ERC-1155") {
          const updateQuantity = await fetchErc1155TokenOwnedQuantity(
            token.contract_address,
            token.token_id,
            address
          );
          setQuantityListed(updateQuantity.listed);
        }

        setTxComplete(true);
        setOpacity(0);
        setIsOpen(false);
        setStep(0);

        toast.success("Listing successfully created");
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

  return (
    <div>
      <Button className={tiny ? "tiny" : null} onClick={toggleModal}>
        <ButtonText>
          <FaWallet />
          Sell NFT
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
            List NFT for Sale
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
                            className={showPriceDropdown ? "visible" : "hidden"}
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
                        placeholder="Amount"
                        value={price}
                        onChange={updatePrice}
                      />
                    </TextInputContainer>
                  </PriceGrid>

                  {floorPrice && (
                    <SmallText
                      className={
                        Number(price) > 0 && Number(price) < floorPrice
                          ? "warning"
                          : null
                      }
                    >
                      {Number(price) > 0 && Number(price) < floorPrice ? (
                        <>
                          Price is below floor price of {floorPrice}{" "}
                          {paymentToken.symbol}
                        </>
                      ) : (
                        <>
                          Floor price: {floorPrice} {paymentToken.symbol}
                        </>
                      )}
                    </SmallText>
                  )}
                </ModalGridRow>

                <ModalGridRow>
                  <TextInputLabel htmlFor="duration">Duration</TextInputLabel>
                  <TextInputContainer>
                    <FaCalendarDay />
                    <Dropdown
                      name="duration"
                      id="duration"
                      onChange={setDuration(setFixedPriceDuration)}
                    >
                      <option value="1d">1 Day</option>
                      <option value="3d">3 Days</option>
                      <option value="1w">1 Week</option>
                      <option value="2w">2 Weeks</option>
                      <option value="1m">1 Month</option>
                      <option value="3m" selected>
                        3 Months
                      </option>
                      <option value="6m">6 Months</option>
                    </Dropdown>
                  </TextInputContainer>
                </ModalGridRow>

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

                <Button
                  onClick={handleSubmitSellOrder}
                  className={!validatePrice() ? "muted disabled" : null}
                >
                  List Item
                </Button>
              </>
            )}

            {step == 1 && (
              <>
                <ModalGridRow>
                  This listing is significantly below the collection floor
                  price. Are you sure you want to continue?
                </ModalGridRow>

                <ModalGridRow>
                  <TransactionRow>
                    Floor Price
                    <PurchaseTotal>
                      <PriceIcon>
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
                      </PriceIcon>
                      {floorPrice} {paymentToken.symbol}
                    </PurchaseTotal>
                  </TransactionRow>
                  <TransactionRow>
                    Listing Price
                    <PurchaseTotal>
                      <PriceIcon>
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
                      </PriceIcon>
                      {Number(price)} {paymentToken.symbol}
                    </PurchaseTotal>
                  </TransactionRow>
                  <TransactionRow>
                    Difference
                    <PurchaseTotal>
                      {Math.round(
                        ((Number(price) - floorPrice) / floorPrice) * -100
                      )}
                      % below
                    </PurchaseTotal>
                  </TransactionRow>
                </ModalGridRow>
                <ButtonGrid className="offer">
                  <Button onClick={toggleModal} className="outline">
                    Nevermind
                  </Button>
                  <Button onClick={(e) => handleSubmitSellOrder(e, true)}>
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
