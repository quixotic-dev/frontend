import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileBalance } from "../../api/profile";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateBalance } from "../../store/balance";
import { updateOnboard } from "../../store/onboard";
import {
  Button,
  ButtonGrid,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalImage,
  ModalTitle,
  ModalTitleIcon,
  StyledModal,
} from "./styles";

export const OnboardModal = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: State) => state.onboard);
  const address = useSelector((state: State) => state.address);

  const [opacity, setOpacity] = useState(0);

  const toggleModal = async (e) => {
    updateOnboard(false, dispatch);
  };

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

      if (balances && balances.ETH == 0) {
        const displayed = window.localStorage.getItem("onboarding");
        if (displayed != "seen") {
          updateOnboard(true, dispatch);
          window.localStorage.setItem("onboarding", "seen");
        }
      }
    };

    if (address) {
      fetchWalletBalance();
    }
  }, [address]);

  return (
    <StyledModal
      isOpen={isVisible}
      afterOpen={afterOpen}
      beforeOpen={beforeClose}
      beforeClose={beforeClose}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      opacity={opacity}
      backgroundProps={{ opacity }}
    >
      <ModalContainer>
        <ModalTitle>
          Add Funds
          <ModalTitleIcon onClick={toggleModal}>
            <MdClose />
          </ModalTitleIcon>
        </ModalTitle>
        <ModalContent>
          <ModalImage>
            <Image
              src={`/opt.png`}
              alt=""
              layout="responsive"
              objectFit="cover"
              objectPosition="center"
              width={400}
              height={200}
              priority
            />
          </ModalImage>
          <ModalGridRow>
            <b>Bridge ETH to Optimism</b>
          </ModalGridRow>
          <ModalGridRow>
            Optimism&apos;s native token is also ETH, and bridging from L1 to
            Optimism takes 15 minutes
          </ModalGridRow>
          <ModalGridRow>
            Prefer high gas fees? You can always bridge your ETH back to L1
          </ModalGridRow>

          <ModalGridRow>
            <ButtonGrid>
              <a
                href={`https://app.optimism.io/bridge`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Bridge ETH</Button>
              </a>

              <a
                href={`https://global.transak.com/?apiKey=5d2e699e-180e-4db2-bcb8-2a02956ba91c&walletAddress=${address}&cryptoCurrencyCode=ETH&network=OPTIMISM`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="outline">Buy ETH with Card</Button>
              </a>
            </ButtonGrid>
          </ModalGridRow>
        </ModalContent>
      </ModalContainer>
    </StyledModal>
  );
};
