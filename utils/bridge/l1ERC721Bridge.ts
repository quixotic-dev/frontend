import { ethers } from "ethers";
import { toast } from "react-toastify";
import { siteConfig } from "../../shared/config";
import { erc721ABI } from "../abi/erc721ABI";
import { createContract } from "../exchange/exchange";
import { assertNetwork, getSigner } from "../wallet";
import { l1ERC721BridgeABI } from "./l1ERC721BridgeABI";

export const isL1BridgeApprovedForAll = async (
  sellerAddress,
  erc721Address
) => {
  if (siteConfig.NETWORK == "opt-goerli") {
    await assertNetwork("0x5", "Ethereum Goerli");
  } else {
    await assertNetwork("0x1", "Ethereum");
  }

  const contract = await createContract(erc721Address, erc721ABI);
  const isApproved = await contract.isApprovedForAll(
    sellerAddress,
    siteConfig.L1_BRIDGE_ADDRESS
  );
  return isApproved;
};

export const setL1BridgeApprovalForAll = async (erc721Address) => {
  if (siteConfig.NETWORK == "opt-goerli") {
    await assertNetwork("0x5", "Ethereum Goerli");
  } else {
    await assertNetwork("0x1", "Ethereum");
  }

  const signer = await getSigner();
  const isApproved = await isL1BridgeApprovedForAll(
    await signer.getAddress(),
    erc721Address
  );

  if (!isApproved) {
    const contract = await createContract(erc721Address, erc721ABI);

    try {
      const approval = await contract.setApprovalForAll(
        siteConfig.L1_BRIDGE_ADDRESS,
        true
      );
      return approval;
    } catch (error) {
      if (error.message && error.message.includes("User denied")) {
        toast.info("Transaction cancelled by user");
      } else {
        toast.error("There was an error completing this transaction");
      }
      return null;
    }
  }
};

export const depositL1NFT = async (l1TokenAddress, l2TokenAddress, tokenId) => {
  if (siteConfig.NETWORK == "opt-goerli") {
    await assertNetwork("0x5", "Ethereum Goerli");
  } else {
    await assertNetwork("0x1", "Ethereum");
  }

  const signer = await getSigner();
  const contract = new ethers.Contract(
    siteConfig.L1_BRIDGE_ADDRESS,
    l1ERC721BridgeABI,
    signer
  );

  await setL1BridgeApprovalForAll(l1TokenAddress);

  try {
    const txn = await contract.bridgeERC721(
      l1TokenAddress,
      l2TokenAddress,
      parseInt(tokenId),
      1_200_000,
      0x0
    );
    return txn.hash;
  } catch (error) {
    if (error.message && error.message.includes("User denied")) {
      toast.info("Transaction cancelled by user");
    }
    // console.log(error);
    return null;
  }
};
