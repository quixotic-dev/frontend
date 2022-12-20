import { ethers } from "ethers";
import { toast } from "react-toastify";
import { siteConfig } from "../../shared/config";
import { erc1155ABI } from "../abi/erc1155ABI";
import { erc20ABI } from "../abi/erc20ABI";
import { erc721ABI } from "../abi/erc721ABI";
import { getNetwork, getSigner } from "../wallet";

const EXCHANGE_CONTRACT_V6 = siteConfig.EXCHANGE_V6;

export const assertOptimism = async () => {
  const network = await getNetwork();
  if ("0x" + network.chainId.toString(16) !== siteConfig.CHAIN_ID) {
    toast.error(`Please connect to the ${siteConfig.CHAIN_NAME} network`);
    throw new Error(`Must be on the ${siteConfig.CHAIN_NAME} network`);
  }
};

export const createContract = async (address, abi) => {
  const signer = await getSigner();
  return new ethers.Contract(address, abi, signer);
};

export const isApprovedForAll = async (
  sellerAddress,
  tokenAddress,
  contractVersion
) => {
  await assertOptimism();

  let exchangeContractAddress;
  if (contractVersion == 6) {
    exchangeContractAddress = EXCHANGE_CONTRACT_V6;
  } else {
    return false;
  }

  const contract = await createContract(tokenAddress, erc721ABI);
  const isApproved = await contract.isApprovedForAll(
    sellerAddress,
    exchangeContractAddress
  );
  return isApproved;
};

export const setApprovalForAll = async (tokenAddress, contractVersion) => {
  await assertOptimism();
  const signer = await getSigner();
  const isApproved = await isApprovedForAll(
    await signer.getAddress(),
    tokenAddress,
    contractVersion
  );

  if (!isApproved) {
    let exchangeContractAddress;
    if (contractVersion == 6) {
      exchangeContractAddress = EXCHANGE_CONTRACT_V6;
    } else {
      console.log("Could not find contract version");
      return null;
    }

    const contract = await createContract(tokenAddress, erc721ABI);

    try {
      const approval = await contract.setApprovalForAll(
        exchangeContractAddress,
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

export const approveERC20 = async (paymentTokenAddress, contractVersion) => {
  await assertOptimism();

  let exchangeContractAddress;
  if (contractVersion == 6) {
    exchangeContractAddress = EXCHANGE_CONTRACT_V6;
  } else {
    console.log("Could not find contract version");
    return null;
  }

  const signer = await getSigner();
  const isApproved = await erc20IsApproved(
    await signer.getAddress(),
    paymentTokenAddress,
    contractVersion
  );

  let limit = "25000000000000000000"; // 25 ETH
  if (paymentTokenAddress == "0x4200000000000000000000000000000000000042") {
    limit = "25000000000000000000000"; // 25K OP
  }

  if (!isApproved) {
    const erc20Contract = await createContract(paymentTokenAddress, erc20ABI);

    try {
      const approval = await erc20Contract.approve(
        exchangeContractAddress,
        ethers.BigNumber.from(limit)
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

export const erc20IsApproved = async (
  buyerAddress,
  paymentTokenAddress,
  contractVersion
) => {
  await assertOptimism();

  let exchangeContractAddress;
  if (contractVersion == 6) {
    exchangeContractAddress = EXCHANGE_CONTRACT_V6;
  } else {
    return false;
  }

  const erc20Contract = await createContract(paymentTokenAddress, erc20ABI);
  const allowance = await erc20Contract.allowance(
    buyerAddress,
    exchangeContractAddress
  );
  return allowance._hex > 0xffffffffffffff;
};

export const safeTransferFromErc721 = async ({
  from,
  to,
  contract_address,
  token_id,
}) => {
  await assertOptimism();
  const contract = await createContract(contract_address, erc721ABI);

  try {
    const transfer = await contract.safeTransferFrom(from, to, token_id);
    return transfer;
  } catch (error) {
    if (error.message && error.message.includes("User denied")) {
      toast.info("Transaction cancelled by user");
    } else {
      toast.error("There was an error completing this transaction");
    }
    return null;
  }
};

export const safeTransferFromErc1155 = async ({
  from,
  to,
  contract_address,
  token_id,
  quantity,
}) => {
  await assertOptimism();
  const contract = await createContract(contract_address, erc1155ABI);

  try {
    const transfer = await contract.safeTransferFrom(
      from,
      to,
      token_id,
      quantity,
      0
    );
    return transfer;
  } catch (error) {
    if (error.message && error.message.includes("User denied")) {
      toast.info("Transaction cancelled by user");
    } else {
      toast.error("There was an error completing this transaction");
    }
    return null;
  }
};
