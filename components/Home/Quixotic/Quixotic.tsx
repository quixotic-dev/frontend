import { BsLightningChargeFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import { siteConfig } from "../../../shared/config";
import {
  AboutDescription,
  AboutGrid,
  AboutItem,
  AboutItemGrid,
  AboutTitle,
  AboutTitleGrid,
  ContainerBackground,
  ContainerExtended,
  ItemDescription,
  ItemIcon,
  ItemTitle,
} from "./styles";

export const Quixotic = () => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <AboutGrid>
          <AboutTitleGrid>
            <AboutTitle>
              This is
              <br />
              <span className="large">Quix</span>
            </AboutTitle>
            <AboutDescription>Built for layer 2</AboutDescription>
          </AboutTitleGrid>
          <AboutItemGrid>
            <AboutItem>
              <ItemIcon>
                <FaEthereum />
              </ItemIcon>
              <ItemTitle>Scalable</ItemTitle>
              <ItemDescription>
                Experience the next chapter of Ethereum on Quix, the largest NFT
                marketplace on Optimism
              </ItemDescription>
            </AboutItem>
            <AboutItem>
              <ItemIcon>
                <BsLightningChargeFill />
              </ItemIcon>
              <ItemTitle>Fast</ItemTitle>
              <ItemDescription>
                Transact in seconds and save up to 100x on gas fees with the
                Ethereum you know and love
              </ItemDescription>
            </AboutItem>
            <AboutItem>
              <ItemIcon>
                <IoLockClosed />
              </ItemIcon>
              <ItemTitle>Secure</ItemTitle>
              <ItemDescription>
                Inherit the security of Ethereum, the most decentralized smart
                contract platform in the world
              </ItemDescription>
            </AboutItem>
          </AboutItemGrid>
        </AboutGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
