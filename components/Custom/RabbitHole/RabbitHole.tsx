import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose, MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ModalProvider } from "styled-react-modal";
import { State } from "../../../store";
import { updateLogin } from "../../../store/login";
import { mintNFT } from "../../../utils/onboard/onboard";
import { getProvider, switchNetwork } from "../../../utils/wallet";
import {
  AssetCollection,
  AssetGrid,
  Button,
  ButtonGrid,
  LoadingRing,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  StepDescription,
  StepNumber,
  StepText,
  StepTitle,
  StyledModal,
  TokenImageContainer,
  TransactionRow,
  TransactionStatus,
  VerifiedIcon,
} from "../../Asset/AssetButtons/styles";
import { AssetInfo, AssetName } from "../../AssetCard/styles";
import { ModalBackground } from "../../Common/StyledModal/styles";
import {
  BridgeContainer,
  Chip,
  ChipContainer,
  ChipGrid,
  ChipIcon,
  ContainerBackground,
  ContainerExtended,
  MintButton,
  MintButtonGrid,
  NFTContainer,
  Subtitle,
  Title,
  TitleGrid,
} from "./styles";

export const RabbitHole = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: State) => state.address);

  const [selectedChip, setSelectedChip] = useState(-1);

  const [step, setStep] = useState(0);
  const [txHash, setTxHash] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  async function toggleModal() {
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

  const handleClickMint = async () => {
    toggleModal();
    await switchNetwork();

    const tx = await mintNFT(
      selectedChip,
      "0x74A002D13f5F8AF7f9A971f006B9a46c9b31DaBD"
    );
    if (tx) {
      setTxHash(tx);
      setStep(1);
    } else {
      setOpacity(0);
      setIsOpen(false);
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
        setStep(2);

        return toast.success("NFT successfully minted");
      }
    }

    if (step == 1) {
      const interval = setInterval(() => {
        fetchActivity(interval);
      }, 1000);
    }
  }, [step]);

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ContainerBackground>
        <ContainerExtended>
          <BridgeContainer>
            <TitleGrid>
              <Title>Mint your free RabbitHole L2 Explorer NFT</Title>
              <Subtitle>
                Let&apos;s mint your RabbitHole L2 Explorer NFT on Quix to get
                your RabbitHole L2 Credential! Each NFT represents 1 of 3 skills
                you&apos;re most interested in: NFTs, DeFi, or DAOs (or the
                character you like best).
              </Subtitle>
            </TitleGrid>

            <ChipContainer>
              Choose yours to mint free:
              <ChipGrid>
                <Chip
                  className={selectedChip == 0 ? "selected" : null}
                  onClick={() => setSelectedChip(0)}
                >
                  <ChipIcon>🖼</ChipIcon>NFTs
                </Chip>
                <Chip
                  className={selectedChip == 1 ? "selected" : null}
                  onClick={() => setSelectedChip(1)}
                >
                  <ChipIcon>💸</ChipIcon>DeFi
                </Chip>
                <Chip
                  className={selectedChip == 2 ? "selected" : null}
                  onClick={() => setSelectedChip(2)}
                >
                  <ChipIcon>🏛</ChipIcon>DAOs
                </Chip>
              </ChipGrid>
            </ChipContainer>

            <NFTContainer>
              <Image
                src={`/rabbithole/${selectedChip}.gif`}
                alt=""
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                priority
                className={null}
              />

              <Image
                src={`/rabbithole/profile.png`}
                alt=""
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                priority
                className={selectedChip >= 0 ? "hidden" : null}
              />
            </NFTContainer>

            <MintButtonGrid>
              {address ? (
                selectedChip >= 0 ? (
                  <MintButton onClick={() => handleClickMint()}>
                    Mint NFT
                  </MintButton>
                ) : (
                  <MintButton className="disabled">Select Interest</MintButton>
                )
              ) : (
                <MintButton
                  onClick={() => {
                    updateLogin(true, dispatch);
                  }}
                >
                  Connect Wallet
                </MintButton>
              )}

              <Link href="/collection/rabbithole">
                <a>
                  <MintButton className="secondary">View Collection</MintButton>
                </a>
              </Link>
            </MintButtonGrid>
          </BridgeContainer>
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
            <ModalGridRow>
              <AssetGrid>
                <TokenImageContainer>
                  <Image
                    src={`/rabbithole/${selectedChip}.gif`}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    priority
                  />
                </TokenImageContainer>
                <AssetInfo>
                  <AssetCollection>
                    RabbitHole L2 Explorer
                    <VerifiedIcon>
                      <MdVerified />
                    </VerifiedIcon>
                  </AssetCollection>
                  <AssetName>
                    {selectedChip == 0
                      ? "NFT Explorer"
                      : selectedChip == 1
                      ? "DeFi Explorer"
                      : selectedChip == 2 && "DAO Explorer"}
                  </AssetName>
                </AssetInfo>
              </AssetGrid>
            </ModalGridRow>

            {step == 0 && (
              <>
                <ModalGridRow className="wallet">
                  <StepNumber>
                    <LoadingRing />1
                  </StepNumber>
                  <StepText>
                    <StepTitle>Complete mint</StepTitle>
                    <StepDescription>
                      Confirm the transaction in your wallet to mint your NFT
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

            {(step == 1 || step == 2) && (
              <>
                <ModalGridRow>
                  <div>
                    Ready to explore more of the ecosystem? Visit{" "}
                    <a
                      href="https://www.optimism.io/apps/all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      optimism.io/apps/all
                    </a>
                  </div>
                </ModalGridRow>
                <ModalGridRow>
                  <TransactionRow>
                    Status
                    {step == 1 && (
                      <TransactionStatus>
                        <LoadingRing className="small" />
                        Processing
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
                    Transaction ID
                    <TransactionStatus>
                      {txHash.slice(0, 6)}...{txHash.slice(-4)}
                    </TransactionStatus>
                  </TransactionRow>
                </ModalGridRow>
                <ButtonGrid className="offer">
                  {step == 1 && <Button className="muted">View NFT</Button>}
                  {step == 2 && (
                    <Link href={`/collection/rabbithole`}>
                      <a>
                        <Button>View NFT</Button>
                      </a>
                    </Link>
                  )}
                  <Link href="/explore">
                    <a>
                      <Button className="outline">Explore Collections</Button>
                    </a>
                  </Link>
                </ButtonGrid>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </StyledModal>
    </ModalProvider>
  );
};
