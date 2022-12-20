import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3";
import { fetchProfile } from "../api/profile";
import { siteConfig } from "../shared/config";
import { State } from "../store";
import { UPDATE_ADDRESS_ACTION } from "../store/address";
import { UPDATE_BALANCE_ACTION } from "../store/balance";
import { updateProfile } from "../store/profile";

declare global {
  interface Window {
    ethereum?: unknown;
  }
}

let wallet;
let provider;
let batchProvider;

export const getProvider = async () => {
  return provider;
};

export const getBatchProvider = async () => {
  return batchProvider;
};

export const getSigner = async () => {
  if (provider) {
    const signer = await provider.getSigner();
    return signer;
  }
};

export const getNetwork = async () => {
  if (provider) {
    const network = await provider.getNetwork();
    return network;
  }
};

export const isMetaMaskConnected = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  batchProvider = new Web3(window.ethereum as any);
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
};

export const connectMetaMask = async (dispatch) => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // const metamaskProvider = (window.ethereum as any).providers.find(
      //   (provider) => provider.isMetaMask
      // );
      const metamaskProvider = window.ethereum as any;
      await metamaskProvider.request({ method: "eth_requestAccounts" });

      wallet = metamaskProvider;
      provider = new ethers.providers.Web3Provider(metamaskProvider, "any");
      batchProvider = new Web3(metamaskProvider);
      setWallet("metamask");

      return connectWallet(dispatch);
    } catch (error) {}
  } else {
    console.log("No MetaMask connection found");
  }
};

export const connectMetaMaskIfActive = async (dispatch) => {
  const isMMActive = await isMetaMaskConnected();
  if (isMMActive) {
    return await connectMetaMask(dispatch);
  } else {
  }
};

export const connectWalletConnect = async (dispatch) => {
  try {
    const walletConnectProvider = new WalletConnectProvider({
      rpc: {
        0xa: "https://mainnet.optimism.io/",
        0x1a4: "https://goerli.optimism.io/",
        0xa4b1: "https://arb1.arbitrum.io/rpc",
        0x66eed: "https://goerli-rollup.arbitrum.io/rpc",
      },
      chainId: Number(siteConfig.CHAIN_ID),
      qrcodeModalOptions: {
        mobileLinks: ["rainbow", "metamask", "tokenpocket", "trust", "imtoken"],
      },
    });
    await walletConnectProvider.enable();
    await walletConnectProvider.updateRpcUrl(Number(siteConfig.CHAIN_ID)); // https://github.com/WalletConnect/walletconnect-monorepo/issues/522

    wallet = walletConnectProvider;
    provider = new ethers.providers.Web3Provider(walletConnectProvider, "any");
    batchProvider = new Web3(wallet);
    setWallet("walletconnect");

    return connectWallet(dispatch);
  } catch (error) {}
};

export const connectCoinbaseWallet = async (dispatch) => {
  const APP_NAME = "Quix";
  // const APP_LOGO_URL = "https://example.com/logo.png";
  const DEFAULT_ETH_JSONRPC_URL = siteConfig.RPC_URL;
  const DEFAULT_CHAIN_ID = parseInt(siteConfig.CHAIN_ID, 16);

  try {
    const coinbaseWalletProvider = new CoinbaseWalletSDK({
      appName: APP_NAME,
      // appLogoUrl: APP_LOGO_URL,
      darkMode: false,
    });
    const coinbaseWallet = coinbaseWalletProvider.makeWeb3Provider(
      DEFAULT_ETH_JSONRPC_URL,
      DEFAULT_CHAIN_ID
    );
    await coinbaseWallet.request({ method: "eth_requestAccounts" });

    wallet = coinbaseWallet;
    provider = new ethers.providers.Web3Provider(coinbaseWallet, "any");
    batchProvider = new Web3(wallet);
    setWallet("coinbase");

    return connectWallet(dispatch);
  } catch (error) {}
};

export const connectWallet = async (dispatch) => {
  if (provider) {
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address, dispatch);

    const profile = await fetchProfile(address);
    updateProfile(profile, dispatch);

    if (wallet) {
      wallet.on("accountsChanged", (accounts) => {
        return connectWallet(dispatch);
      });
      wallet.on("chainChanged", (chainId) => {
        return connectWallet(dispatch);
      });
    }

    return address;
  }
};

export const disconnectWallet = async (dispatch) => {
  try {
    wallet.disconnect();
  } catch (error) {}

  await dispatch({
    type: UPDATE_ADDRESS_ACTION,
    address: null,
  });

  await dispatch({
    type: UPDATE_BALANCE_ACTION,
    balance: null,
  });

  localStorage.removeItem("address");
  localStorage.removeItem("wallet");

  updateProfile(null, dispatch);
};

export const switchNetwork = async () => {
  const network = await getNetwork();
  if ("0x" + network.chainId.toString(16) !== siteConfig.CHAIN_ID) {
    try {
      await wallet.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: siteConfig.CHAIN_ID }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to the wallet.
      if (switchError.code === 4902) {
        try {
          await wallet.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: siteConfig.CHAIN_ID,
                rpcUrls: [siteConfig.RPC_URL],
                chainName: siteConfig.CHAIN_NAME,
                nativeCurrency: {
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: [siteConfig.L2_BLOCK_EXPLORER_URL],
              },
            ],
          });
        } catch (error) {}
      }
    }
  }
};

export const switchNetworkTo = async (chainId) => {
  const network = await getNetwork();
  if ("0x" + network.chainId.toString(16) !== chainId) {
    try {
      await wallet.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to the wallet.
      if (switchError.code === 4902) {
        try {
          await wallet.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: siteConfig.CHAIN_ID,
                rpcUrls: [siteConfig.RPC_URL],
                chainName: siteConfig.CHAIN_NAME,
                nativeCurrency: {
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: [siteConfig.L2_BLOCK_EXPLORER_URL],
              },
            ],
          });
        } catch (error) {}
      }
    }
  }
};

const setAddress = async (address, dispatch) => {
  dispatch({
    type: UPDATE_ADDRESS_ACTION,
    address: address,
  });
  localStorage.setItem("address", address);
};

export const getAddress = () => {
  const address = useSelector((state: State) => state.address);
  if (address) {
    return address;
  } else {
    const storedAddress = localStorage.getItem("address");
    return storedAddress;
  }
};

const setWallet = async (wallet) => {
  localStorage.setItem("wallet", wallet);
};

export const getWallet = () => {
  return localStorage.getItem("wallet");
};

export const assertNetwork = async (chainId, networkName = "") => {
  const network = await getNetwork();
  if ("0x" + network.chainId.toString(16) !== chainId) {
    toast.error(`Please connect to the ${networkName} network`);
    throw new Error(`Must be on chain ${networkName} network`);
  }
};
