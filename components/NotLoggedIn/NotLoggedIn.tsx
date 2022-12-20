import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateLogin } from "../../store/login";
import {
  ContainerBackground,
  ContainerExtended,
  Title,
  Subtitle,
  NoItemsButton,
} from "./styles";

export const NotLoggedIn = () => {
  const dispatch = useDispatch();

  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>Connect Wallet</Title>
        <Subtitle>Please connect your wallet to view this page</Subtitle>
        <NoItemsButton
          onClick={() => {
            updateLogin(true, dispatch);
          }}
        >
          Connect
        </NoItemsButton>
      </ContainerExtended>
    </ContainerBackground>
  );
};
