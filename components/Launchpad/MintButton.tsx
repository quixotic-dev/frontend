import { FaWallet } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateLogin } from "../../store/login";
import { Button, ButtonText } from "./styles";

export const MintButton = ({
  collection,
  hostedCollection,
  greenlistAccess,
  address,
  toggleModal,
}) => {
  const dispatch = useDispatch();

  if (collection.supply == hostedCollection.max_supply) {
    return (
      <Button className="muted disabled">
        <ButtonText>Sold Out</ButtonText>
      </Button>
    );
  }

  if (hostedCollection.mint_enabled) {
    if (address) {
      return (
        <Button onClick={toggleModal}>
          <ButtonText>
            <FaWallet /> Mint NFT
          </ButtonText>
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            updateLogin(true, dispatch);
          }}
        >
          <ButtonText>
            <FaWallet /> Connect Wallet
          </ButtonText>
        </Button>
      );
    }
  }

  if (hostedCollection.premint_enabled) {
    if (address) {
      if (greenlistAccess) {
        return (
          <Button onClick={toggleModal}>
            <ButtonText>
              <FaWallet /> Mint NFT
            </ButtonText>
          </Button>
        );
      } else {
        return (
          <Button className="muted disabled">
            <ButtonText>Not in Allowlist</ButtonText>
          </Button>
        );
      }
    } else {
      return (
        <Button
          onClick={() => {
            updateLogin(true, dispatch);
          }}
        >
          <ButtonText>
            <FaWallet /> Connect Wallet
          </ButtonText>
        </Button>
      );
    }
  }

  return (
    <Button className="muted disabled">
      <ButtonText>Mint Not Active</ButtonText>
    </Button>
  );
};
