import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgWebsite } from "react-icons/cg";
import {
  FaCheck,
  FaDiscord,
  FaEthereum,
  FaMinus,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { usePalette } from "react-palette";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ModalProvider } from "styled-react-modal";
import { fetchGreenlistSignature } from "../../api/launchpad";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { mintNFT, premintNFT } from "../../utils/launchpad/launchpad";
import { getProvider, switchNetwork } from "../../utils/wallet";
import {
  ButtonGrid,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  PurchaseTotal,
  StepDescription,
  StepNumber,
  StepText,
  StepTitle,
  StyledModal,
  TransactionRow,
  TransactionStatus,
} from "../Asset/AssetButtons/styles";
import { CollectionImage } from "../Common/Images/CollectionImage";
import { ModalBackground } from "../Common/StyledModal/styles";
import { MintButton } from "./MintButton";
import {
  AssetDetails,
  Button,
  CollectionDescription,
  CollectionImageContainer,
  CollectionLink,
  CollectionLinksGrid,
  CollectionName,
  ContainerBackground,
  ContainerExtended,
  Detail,
  DetailLabel,
  DetailsGrid,
  DetailText,
  MintAmountButton,
  MintAmountGrid,
  MintButtonGrid,
  MintProgress,
  MintProgressText,
  PercentMinted,
  PercentMintedFilled,
  PriceIcon,
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleBadge,
  SectionTitleText,
  TwoColGrid,
} from "./styles";

export const Launchpad = ({ collection, hostedCollection }) => {
  const address = useSelector((state: State) => state.address);
  const { data } = usePalette(collection.image_url);

  const [step, setStep] = useState(0);
  const [txHash, setTxHash] = useState("");
  const [tokenId, setTokenId] = useState();

  const [premintCollapsed, setPremintCollapsed] = useState(true);
  const [mintCollapsed, setMintCollapsed] = useState(true);

  const [greenlistAccess, setGreenlistAccess] = useState(false);

  const [mintAmount, setMintAmount] = useState(1);

  const increaseMintAmount = () => {
    setMintAmount(
      Math.min(
        mintAmount + 1,
        hostedCollection.premint_enabled
          ? hostedCollection.max_per_premint
          : hostedCollection.max_per_mint
      )
    );
  };

  const decreaseMintAmount = () => {
    setMintAmount(Math.max(mintAmount - 1, 1));
  };

  const handleClickMint = async () => {
    if (!hostedCollection.mint_enabled && !hostedCollection.premint_enabled) {
      return toast.error("Minting is not available");
    }

    setStep(1);

    await switchNetwork();

    let tx;
    if (hostedCollection.mint_enabled) {
      tx = await mintNFT(
        hostedCollection.mint_price,
        mintAmount,
        collection.address
      );
    } else if (hostedCollection.premint_enabled) {
      tx = await premintNFT(
        hostedCollection.premint_price,
        mintAmount,
        collection.address
      );
    }

    if (tx) {
      setTxHash(tx);
      setStep(2);
    } else {
      setStep(0);
    }
  };

  useEffect(() => {
    async function fetchActivity(interval) {
      const provider = await getProvider();
      const txReceipt = await provider.getTransaction(txHash);

      if (txReceipt && txReceipt.blockNumber) {
        // setTokenId(activity.token.token_id);
        clearInterval(interval);
        setStep(3);

        return toast.success("NFT successfully minted");
      }
    }

    if (step == 2) {
      const interval = setInterval(() => {
        fetchActivity(interval);
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
    const checkGreenlistStatus = async () => {
      const signature = await fetchGreenlistSignature(
        collection.address,
        address
      );

      if (signature) {
        setGreenlistAccess(true);
      } else {
        setGreenlistAccess(false);
      }
    };

    if (
      hostedCollection.premint_enabled &&
      !hostedCollection.mint_enabled &&
      address
    ) {
      checkGreenlistStatus();
    }
  }, [
    hostedCollection.premint_enabled,
    hostedCollection.mint_enabled,
    address,
  ]);

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ContainerBackground>
        <ContainerExtended>
          <TwoColGrid>
            <AssetDetails>
              <CollectionImageContainer>
                <CollectionImage collection={collection} />
              </CollectionImageContainer>
            </AssetDetails>
            <AssetDetails>
              <CollectionName>{collection.name}</CollectionName>

              <CollectionLinksGrid>
                <CollectionLink>
                  <div>
                    Price:{" "}
                    {hostedCollection.mint_price > 0 && (
                      <b>
                        {ethers.utils.parseUnits(
                          String(hostedCollection.mint_price),
                          "gwei"
                        )}{" "}
                        <PriceIcon>
                          <FaEthereum />
                        </PriceIcon>
                      </b>
                    )}
                    {hostedCollection.mint_price == 0 && <b>Free</b>}
                  </div>
                </CollectionLink>
                <CollectionLink>
                  <div>
                    Supply:{" "}
                    <b>{hostedCollection.max_supply.toLocaleString()}</b>
                  </div>
                </CollectionLink>

                {collection.site_link && (
                  <a
                    href={collection.site_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CollectionLink className="link">
                      <CgWebsite />
                    </CollectionLink>
                  </a>
                )}
                {collection.twitter_link && (
                  <a
                    href={collection.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CollectionLink className="link">
                      <FaTwitter />
                    </CollectionLink>
                  </a>
                )}
                {collection.discord_link && (
                  <a
                    href={collection.discord_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CollectionLink className="link">
                      <FaDiscord />
                    </CollectionLink>
                  </a>
                )}

                <a
                  href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/address/${collection.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CollectionLink className="etherscan">
                    <Image
                      src="/etherscan.svg"
                      alt=""
                      layout="responsive"
                      objectFit="contain"
                      objectPosition="center"
                      width={50}
                      height={50}
                      priority
                    />
                  </CollectionLink>
                </a>
              </CollectionLinksGrid>

              {collection.description && (
                <CollectionDescription>
                  <ReactMarkdown
                    allowedElements={["br", "strong", "em", "a"]}
                    unwrapDisallowed={true}
                    linkTarget="_blank"
                  >
                    {collection.description}
                  </ReactMarkdown>
                </CollectionDescription>
              )}

              <MintButtonGrid>
                <MintButton
                  collection={collection}
                  hostedCollection={hostedCollection}
                  greenlistAccess={greenlistAccess}
                  address={address}
                  toggleModal={toggleModal}
                />

                <Link
                  href={
                    collection.slug
                      ? `/collection/${collection.slug}`
                      : `/collection/${collection.address}`
                  }
                >
                  <a>
                    <Button
                      className="outline"
                      color={data.lightVibrant ? data.lightVibrant : null}
                    >
                      View Collection
                    </Button>
                  </a>
                </Link>
              </MintButtonGrid>
            </AssetDetails>
          </TwoColGrid>
          <TwoColGrid>
            <AssetDetails>
              <MintProgress>
                <MintProgressText>
                  <div>Total minted</div>
                  <div>
                    {collection.supply} / {hostedCollection.max_supply} (
                    {(
                      (collection.supply / hostedCollection.max_supply) *
                      100
                    ).toFixed(0)}
                    %)
                  </div>
                </MintProgressText>

                <PercentMinted
                  color={data.lightVibrant ? data.lightVibrant : null}
                >
                  <PercentMintedFilled
                    percentFilled={
                      (collection.supply / hostedCollection.max_supply) * 100 +
                      "%"
                    }
                    color={data.lightVibrant ? data.lightVibrant : null}
                  ></PercentMintedFilled>
                </PercentMinted>
              </MintProgress>

              {hostedCollection.premint && (
                <Section>
                  <SectionTitle
                    onClick={() => setPremintCollapsed(!premintCollapsed)}
                  >
                    Allowlist mint
                    <SectionTitleBadge
                      className={
                        hostedCollection.premint_enabled &&
                        !hostedCollection.mint_enabled
                          ? "active"
                          : null
                      }
                      color={data.lightVibrant ? data.lightVibrant : null}
                    >
                      {hostedCollection.premint_enabled &&
                      !hostedCollection.mint_enabled
                        ? "Active"
                        : "Inactive"}
                    </SectionTitleBadge>
                    <SectionTitleText>
                      {premintCollapsed ? (
                        <FiChevronRight />
                      ) : (
                        <FiChevronDown />
                      )}
                    </SectionTitleText>
                  </SectionTitle>
                  {!premintCollapsed && (
                    <SectionContent>
                      <DetailsGrid>
                        <Detail>
                          <DetailLabel>Price</DetailLabel>
                          <DetailText>
                            {hostedCollection.premint_price > 0 && (
                              <>
                                {ethers.utils.parseUnits(
                                  String(hostedCollection.premint_price),
                                  "gwei"
                                )}{" "}
                                <PriceIcon>
                                  <FaEthereum />
                                </PriceIcon>
                              </>
                            )}
                            {hostedCollection.premint_price == 0 && <>Free</>}
                          </DetailText>
                        </Detail>
                        <Detail>
                          <DetailLabel>Eligible addresses</DetailLabel>
                          <DetailText>
                            {hostedCollection.greenlist_count.toLocaleString()}
                          </DetailText>
                        </Detail>
                        <Detail>
                          <DetailLabel>Max tokens per address</DetailLabel>
                          <DetailText>
                            {hostedCollection.max_per_premint}
                          </DetailText>
                        </Detail>
                      </DetailsGrid>
                    </SectionContent>
                  )}
                </Section>
              )}

              <Section>
                <SectionTitle onClick={() => setMintCollapsed(!mintCollapsed)}>
                  Public mint
                  <SectionTitleBadge
                    className={hostedCollection.mint_enabled ? "active" : null}
                    color={data.lightVibrant ? data.lightVibrant : null}
                  >
                    {hostedCollection.mint_enabled ? "Active" : "Inactive"}
                  </SectionTitleBadge>
                  <SectionTitleText>
                    {mintCollapsed ? <FiChevronRight /> : <FiChevronDown />}
                  </SectionTitleText>
                </SectionTitle>
                {!mintCollapsed && (
                  <SectionContent>
                    <DetailsGrid>
                      <Detail>
                        <DetailLabel>Price</DetailLabel>
                        <DetailText>
                          {hostedCollection.mint_price > 0 && (
                            <>
                              {ethers.utils.parseUnits(
                                String(hostedCollection.mint_price),
                                "gwei"
                              )}{" "}
                              <PriceIcon>
                                <FaEthereum />
                              </PriceIcon>
                            </>
                          )}
                          {hostedCollection.mint_price == 0 && <>Free</>}
                        </DetailText>
                      </Detail>
                      <Detail>
                        <DetailLabel>Max tokens per address</DetailLabel>
                        <DetailText>{hostedCollection.max_per_mint}</DetailText>
                      </Detail>
                    </DetailsGrid>
                  </SectionContent>
                )}
              </Section>
            </AssetDetails>
            <AssetDetails></AssetDetails>
          </TwoColGrid>
        </ContainerExtended>
      </ContainerBackground>

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
            Mint NFT
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          <ModalContent>
            {step == 0 && (
              <>
                <ModalGridRow>
                  <MintAmountGrid>
                    <MintAmountButton onClick={() => decreaseMintAmount()}>
                      <FaMinus />
                    </MintAmountButton>
                    <div>{mintAmount}</div>
                    <MintAmountButton onClick={() => increaseMintAmount()}>
                      <FaPlus />
                    </MintAmountButton>
                  </MintAmountGrid>
                </ModalGridRow>

                <ModalGridRow>
                  <TransactionRow>
                    Total
                    <PurchaseTotal>
                      {hostedCollection.premint_enabled ? (
                        hostedCollection.premint_price * mintAmount == 0 ? (
                          "Free"
                        ) : (
                          <>
                            <FaEthereum />{" "}
                            {hostedCollection.premint_price * mintAmount}
                          </>
                        )
                      ) : hostedCollection.mint_price * mintAmount == 0 ? (
                        "Free"
                      ) : (
                        <>
                          <FaEthereum />{" "}
                          {hostedCollection.mint_price * mintAmount}
                        </>
                      )}
                    </PurchaseTotal>
                  </TransactionRow>
                </ModalGridRow>
                <Button onClick={handleClickMint}>
                  Mint NFT{mintAmount > 1 && "s"}
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
                    <StepTitle>Complete mint</StepTitle>
                    <StepDescription>
                      Confirm the transaction in your wallet to mint your NFT
                      {mintAmount > 1 && "s"}
                    </StepDescription>
                  </StepText>
                </ModalGridRow>
                <ButtonGrid className="offer">
                  <Button onClick={toggleModal} className="outline">
                    Cancel
                  </Button>
                </ButtonGrid>
              </>
            )}

            {(step == 2 || step == 3) && (
              <>
                <ModalGridRow>
                  Your mint transaction is in progress, and your NFT will be
                  viewable in your wallet shortly.
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
                <ButtonGrid className="offer">
                  {step == 2 && <Button className="muted">View NFTs</Button>}
                  {step == 3 && (
                    <Link
                      href={`/profile?collections=collection%3D${collection.address}`}
                    >
                      <a>
                        <Button>View NFTs</Button>
                      </a>
                    </Link>
                  )}
                  <a
                    href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="outline">View Transaction</Button>
                  </a>
                </ButtonGrid>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </StyledModal>
    </ModalProvider>
  );
};
