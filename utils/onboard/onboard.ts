import { ethers } from "ethers";
import { toast } from "react-toastify";
import { assertOptimism } from "../exchange/exchange";
import { getSigner } from "../wallet";
import { onboardABI } from "./onboardABI";

export const mintNFT = async (selectedChip, address) => {
  await assertOptimism();

  const signer = await getSigner();
  const contract = new ethers.Contract(address, onboardABI, signer);

  try {
    const txn = await contract.mintToken(selectedChip);
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
      error.data.message.includes("You can only mint one")
    ) {
      toast.warning("You can only mint one NFT from this collection");
    } else {
      toast.error("Error minting NFT");
    }
    return null;
  }
};
