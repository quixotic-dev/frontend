import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateLogin } from "../../store/login";
import {
  connectCoinbaseWallet,
  connectMetaMask,
  connectWalletConnect,
} from "../../utils/wallet";
import {
  ButtonLogo,
  CancelButton,
  ContentContainer,
  LargeText,
  LoadingRing,
  LoginButton,
  LoginButtonContent,
  ModalSection,
  SmallText,
  StyledModal,
} from "./styles";

export const LoginModal = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: State) => state.login);
  const router = useRouter();

  const [clickedMetamask, setClickedMetamask] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const toggleModal = async (e) => {
    updateLogin(!isVisible, dispatch);
  };

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function afterClose() {
    document.body.style.overflow = "unset";
  }

  function beforeClose() {
    setOpacity(0);
  }

  const loginWithMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      router.push(`https://metamask.app.link/dapp/${siteConfig.WEBSITE_URL}`);
    } else {
      setClickedMetamask(true);
      try {
        await connectMetaMask(dispatch);
        updateLogin(!isVisible, dispatch);
      } catch {
        console.log("MetaMask connection failed");
      }
      setClickedMetamask(false);
    }
  };

  const loginWithWalletConnect = async () => {
    await connectWalletConnect(dispatch);
    updateLogin(!isVisible, dispatch);
  };

  const loginWithCoinbase = async () => {
    await connectCoinbaseWallet(dispatch);
    updateLogin(!isVisible, dispatch);
  };

  return (
    <StyledModal
      isOpen={isVisible}
      afterOpen={afterOpen}
      afterClose={afterClose}
      beforeOpen={beforeClose}
      beforeClose={beforeClose}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      opacity={opacity}
      backgroundProps={{ opacity }}
    >
      <ContentContainer>
        {!clickedMetamask ? (
          <>
            <ModalSection>
              <LargeText>Welcome to Quix</LargeText>
              <SmallText>Connect your wallet to get started</SmallText>
            </ModalSection>

            <ModalSection className="wallets">
              <LoginButton onClick={loginWithMetaMask}>
                <LoginButtonContent>
                  MetaMask
                  <ButtonLogo>
                    <Image
                      src="/login/metamask.svg"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </ButtonLogo>
                </LoginButtonContent>
              </LoginButton>
              <LoginButton onClick={loginWithWalletConnect}>
                <LoginButtonContent>
                  WalletConnect
                  <ButtonLogo>
                    <Image
                      src="/login/walletconnect.svg"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </ButtonLogo>
                </LoginButtonContent>
              </LoginButton>
              <LoginButton onClick={loginWithCoinbase}>
                <LoginButtonContent>
                  Coinbase Wallet
                  <ButtonLogo className="coinbase">
                    <Image
                      src="/login/coinbase.svg"
                      alt=""
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </ButtonLogo>
                </LoginButtonContent>
              </LoginButton>
            </ModalSection>

            <SmallText>
              By connecting your wallet, you agree to our{" "}
              <span onClick={toggleModal}>
                <Link href="/terms">
                  <a>terms of use</a>
                </Link>
              </span>{" "}
              and{" "}
              <span onClick={toggleModal}>
                <Link href="/privacy">
                  <a>privacy policy</a>
                </Link>
              </span>
            </SmallText>
          </>
        ) : (
          <>
            <LargeText>Sign the message to connect your wallet</LargeText>
            <LoadingRing />
            <div>
              <SmallText>
                We use this signature to verify that you own this wallet
              </SmallText>
              <CancelButton onClick={() => setClickedMetamask(false)}>
                Cancel
              </CancelButton>
            </div>
          </>
        )}
      </ContentContainer>
    </StyledModal>
  );
};
