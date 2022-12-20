import { toast } from "react-toastify";

export const handleError = (error) => {
  console.log(error);
  if (error.data && error.data.message) {
    toast.error(`Error: ${error.data.message}`);
  } else if (error.message) {
    if (error.message.includes("User denied")) {
      toast.info("Transaction cancelled by user");
    } else if (
      error.message.includes("gas required exceeds allowance") ||
      error.message.includes("does not have the balances")
    ) {
      toast.error(
        "You don't have the required balance to complete this transaction"
      );
    } else {
      toast.error(`Error: ${error.message}`);
    }
  } else {
    toast.error(`Error: ${error}`);
  }
};
