import { getSigner } from "./wallet";

const createUpdateProfileMessage = () => {
  const timestamp = Date.now();
  const message = `Sign this message to update your settings. It won't cost you any Ether. Timestamp: ${timestamp}`;
  return message;
};

export const createProfileUploadSignature = async () => {
  const signer = await getSigner();
  const message = createUpdateProfileMessage();
  const signature = await signer.signMessage(message);
  return { message, signature };
};

const createCollectionDetailsMessage = () => {
  const timestamp = Date.now();
  const message = `Sign this message to update the collection settings. It won't cost you any Ether. Timestamp: ${timestamp}`;
  return message;
};

export const createCollectionDetailsSignature = async () => {
  const signer = await getSigner();
  const message = createCollectionDetailsMessage();
  const signature = await signer.signMessage(message);
  return { message, signature };
};
