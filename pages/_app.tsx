import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Maintenance } from "../components/Maintenance/Maintenance";
import { siteConfig } from "../shared/config";
import { darkTheme, GlobalStyle, lightTheme } from "../shared/theme";
import { State, wrapper } from "../store";
import { initMixpanel, setMixpanelProfile } from "../utils/mixpanel";
import {
  connectCoinbaseWallet,
  connectMetaMaskIfActive,
  connectWalletConnect,
  getAddress,
  getWallet,
} from "../utils/wallet";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  // Dark mode
  const [theme, setTheme] = useState("light");
  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };
  const toggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  let address, wallet;
  if (typeof window !== "undefined") {
    address = getAddress();
    wallet = getWallet();
  }

  useEffect(() => {
    if (!!address) {
      if (wallet == "metamask") {
        connectMetaMaskIfActive(dispatch);
      } else if (wallet == "walletconnect") {
        connectWalletConnect(dispatch);
      } else if (wallet == "coinbase") {
        connectCoinbaseWallet(dispatch);
      } else if (typeof window.ethereum !== "undefined") {
        connectMetaMaskIfActive(dispatch);
      }
    }

    initMixpanel();
    setMixpanelProfile(address);
  }, []);

  const banner = useSelector((state: State) => state.banner);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>

      {process.env.NEXT_PUBLIC_MAINTENANCE_MODE == "true" ? (
        <Maintenance />
      ) : (
        <>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            closeOnClick
            limit={2}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            style={{ zIndex: 99999 }}
          />
          <NextNProgress
            color="#ff0420"
            startPosition={0.15}
            height={2}
            options={{ showSpinner: false }}
          />
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className={banner ? "main banner" : "main"}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
