import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";
import { AssetCard } from "../../AssetCard/AssetCard";
import { SectionTitle, Subtitle, Title } from "../styles";
import { CardGrid, ContainerBackground, ContainerExtended } from "./styles";

export const EndingSoon = ({ tokens }) => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <SectionTitle>
          <Link href="/explore?tab=1">
            <a>
              <Title>Ending Soon</Title>
            </a>
          </Link>
          <Link href="/explore?tab=1&sort=expiration_timestamp%3Aasc">
            <a>
              <Subtitle>
                View All <MdOutlineArrowForward />
              </Subtitle>
            </a>
          </Link>
        </SectionTitle>

        <CardGrid>
          {tokens.map((token, index) => (
            <AssetCard token={token} key={index} />
          ))}
        </CardGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
