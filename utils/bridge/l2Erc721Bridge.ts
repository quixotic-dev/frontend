import * as sdk from "@eth-optimism/sdk";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { siteConfig } from "../../shared/config";
import { assertOptimism } from "../exchange/exchange";
import { assertNetwork, getSigner } from "../wallet";
import { l2Erc721BridgeABI } from "./l2Erc721BridgeABI";

// https://github.com/ethereum-optimism/optimism-tutorial/tree/main/cross-dom-comm
export const getWithdrawalStatus = async (bridge_txn) => {
  if (siteConfig.NETWORK == "opt-goerli") {
    await assertNetwork("0x5", "Ethereum Goerli");
  } else {
    await assertNetwork("0x1", "Ethereum");
  }

  const signer = await getSigner();

  let crossChainMessenger;
  if (siteConfig.NETWORK == "opt-goerli") {
    crossChainMessenger = new sdk.CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: signer,
      l2SignerOrProvider: new ethers.providers.JsonRpcProvider(
        "https://goerli.optimism.io"
      ),
    });
  } else {
    crossChainMessenger = new sdk.CrossChainMessenger({
      l1ChainId: 1,
      l2ChainId: 10,
      l1SignerOrProvider: signer,
      l2SignerOrProvider: new ethers.providers.JsonRpcProvider(
        "https://mainnet.optimism.io"
      ),
    });
  }

  try {
    const status = await crossChainMessenger.getMessageStatus(bridge_txn);
    return status;
  } catch (error) {
    console.log(error);
    toast.info("You must withdraw the token from Optimism first");
  }
};

export const finalizeWithdrawal = async (bridge_txn) => {
  if (siteConfig.NETWORK == "opt-goerli") {
    await assertNetwork("0x5", "Ethereum Goerli");
  } else {
    await assertNetwork("0x1", "Ethereum");
  }

  const signer = await getSigner();

  let crossChainMessenger;
  if (siteConfig.NETWORK == "opt-goerli") {
    crossChainMessenger = new sdk.CrossChainMessenger({
      l1ChainId: 5,
      l2ChainId: 420,
      l1SignerOrProvider: signer,
      l2SignerOrProvider: new ethers.providers.JsonRpcProvider(
        "https://goerli.optimism.io"
      ),
    });
  } else {
    crossChainMessenger = new sdk.CrossChainMessenger({
      l1ChainId: 1,
      l2ChainId: 10,
      l1SignerOrProvider: signer,
      l2SignerOrProvider: new ethers.providers.JsonRpcProvider(
        "https://mainnet.optimism.io"
      ),
    });
  }

  try {
    const txn = await crossChainMessenger.finalizeMessage(bridge_txn);
    return txn.hash;
  } catch (error) {
    console.log(error);
    toast.error("Error finalizing withdrawal");
    return null;
  }
};

export const withdrawL2NFT = async (
  l1TokenAddress,
  l2TokenAddress,
  tokenId
) => {
  await assertOptimism();

  const signer = await getSigner();
  const contract = new ethers.Contract(
    siteConfig.L2_BRIDGE_ADDRESS,
    l2Erc721BridgeABI,
    signer
  );

  try {
    const txn = await contract.bridgeERC721(
      l2TokenAddress,
      l1TokenAddress,
      parseInt(tokenId),
      0,
      0x0
    );
    return txn.hash;
  } catch (error) {
    if (error.message && error.message.includes("User denied")) {
      toast.info("Transaction cancelled by user");
    } else if (
      error.data &&
      error.data.message.includes("Sale must be active")
    ) {
      toast.warning("The sale is not active");
    } else if (error.message && error.message.includes("gas too low")) {
      toast.error("Transaction failed, not enough gas");
    } else {
      toast.error(error);
    }
    return null;
  }
};
