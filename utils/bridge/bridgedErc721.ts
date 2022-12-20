import { ethers } from "ethers";
import { toast } from "react-toastify";
import { getSigner, switchNetworkTo } from "../wallet";
import { bridgedErc721ABI } from "./bridgedErc721ABI";

// Used to mint a testnet NFT. For demo purposes only
export const mintStandardNFT = async (collectionAddress) => {
  await switchNetworkTo("0x5");

  const signer = await getSigner();
  const contract = new ethers.Contract(
    collectionAddress,
    bridgedErc721ABI,
    signer
  );

  try {
    const txn = await contract.mint();
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
      toast.error("Error minting NFT");
    }
    return null;
  }
};
