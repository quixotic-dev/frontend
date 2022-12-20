import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
  fetchGreenlistSignature,
  fetchLaunchpadContractData,
  postLaunchpadCollection,
} from "../../api/launchpad";
import { assertOptimism } from "../exchange/exchange";
import { getSigner } from "../wallet";
import { launchpadABI } from "./launchpadABI";

export const deployLaunchpadContract = async ({
  name,
  symbol,
  supply,
  premintPrice,
  premintMax,
  mintPrice,
  mintMax,
  reserveTokens,
}) => {
  try {
    await assertOptimism();
  } catch (error) {
    return null;
  }

  let data = {
    name,
    symbol,
    maxTokens: Number(supply),
    publicMint: {
      priceInWei: Number(ethers.utils.parseUnits(mintPrice, "ether")),
      maxMintPerAddr: Number(mintMax),
    },
  };

  if (premintPrice && premintMax) {
    data["greenList"] = {
      priceInWei: Number(ethers.utils.parseUnits(premintPrice, "ether")),
      maxMintPerAddress: Number(premintMax),
      maxGreenListSupply: Number(supply),
    };
  }

  if (reserveTokens) {
    data["reserveTokens"] = true;
  }

  const contractData = await fetchLaunchpadContractData(data);

  if (contractData) {
    try {
      const signer = await getSigner();
      const factory = new ethers.ContractFactory(
        contractData.abi,
        contractData.bytecode,
        signer
      );
      const contract = await factory.deploy();

      if (contract && !!contract.address) {
        postLaunchpadCollection(
          contract.address,
          contractData.src,
          name,
          supply,
          premintPrice,
          premintMax,
          mintPrice,
          mintMax,
          reserveTokens
        );
        return contract;
      } else {
        return null;
      }
    } catch (error) {
      if (error.message && error.message.includes("User denied")) {
        toast.info("Transaction cancelled by user");
      } else {
        toast.error(
          "Error deploying the smart contract, please try again in a few minutes"
        );
      }
      return null;
    }
  } else {
    toast.error(
      "Error creating the smart contract, please refresh the page and try again."
    );
    return null;
  }
};

export const mintNFT = async (price, quantity, collectionAddress) => {
  await assertOptimism();

  const signer = await getSigner();
  const contract = new ethers.Contract(collectionAddress, launchpadABI, signer);
  const overrides = { value: price * quantity };

  try {
    const txn = await contract.mintToken(quantity, overrides);
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
    } else if (
      error.data.message &&
      error.data.message.includes("exceed max supply")
    ) {
      toast.error("This collection is sold out");
    } else if (
      error.data &&
      error.data.message.includes("Exceeded max token")
    ) {
      toast.warning("Maximum tokens already minted");
    } else {
      toast.error("Error minting NFT");
    }
    return null;
  }
};

export const premintNFT = async (price, quantity, collectionAddress) => {
  await assertOptimism();

  const signer = await getSigner();
  const contract = new ethers.Contract(collectionAddress, launchpadABI, signer);
  const overrides = { value: price * quantity };

  const signature = await fetchGreenlistSignature(
    collectionAddress,
    await signer.getAddress()
  );

  if (!signature) {
    toast.error("Address is not in the allowlist");
    return null;
  }

  try {
    const txn = await contract.greenListMintToken(
      quantity,
      signature.signature,
      overrides
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
    } else if (
      error.data &&
      error.data.message.includes("Exceeded max token")
    ) {
      toast.warning("Maximum tokens already minted");
    } else if (error.message && error.message.includes("gas too low")) {
      toast.error("Transaction failed, not enough gas");
    } else if (
      error.data.message &&
      error.data.message.includes("exceed max supply")
    ) {
      toast.error("This collection is sold out");
    } else {
      toast.error("Error minting NFT");
    }
    return null;
  }
};

export const flipPremintState = async (collection) => {
  await assertOptimism();
  const signer = await getSigner();
  const contract = new ethers.Contract(collection, launchpadABI, signer);

  try {
    const txn = await contract.flipGreenListSaleState();
    return txn.hash;
  } catch (error) {
    toast.error("There was an error changing the contract state");
    return null;
  }
};

export const flipMintState = async (collection) => {
  await assertOptimism();
  const signer = await getSigner();
  const contract = new ethers.Contract(collection, launchpadABI, signer);

  try {
    const txn = await contract.flipSaleState();
    return txn.hash;
  } catch (error) {
    toast.error("There was an error changing the contract state");
    return null;
  }
};

export const updateMetadataUri = async (
  collection,
  uri,
  includeToken,
  includeExtension
) => {
  await assertOptimism();
  const signer = await getSigner();
  const contract = new ethers.Contract(collection, launchpadABI, signer);

  try {
    const txn = await contract.setBaseURI(
      uri,
      includeToken,
      includeExtension ? ".json" : ""
    );
    return txn.hash;
  } catch (error) {
    toast.error("There was an error updating the contract base URI");
    return null;
  }
};

export const reserveTokens = async (quantity, recipient, collectionAddress) => {
  await assertOptimism();

  const signer = await getSigner();
  const contract = new ethers.Contract(collectionAddress, launchpadABI, signer);

  try {
    const txn = await contract.reserveTokens(quantity, recipient);
    return txn.hash;
  } catch (error) {
    toast.error("Error minting reserve NFTs");
    return;
  }
};
