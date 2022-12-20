import Link from "next/link";
import { AssetCard } from "../../AssetCard/AssetCard";
import { SectionTitle, Title } from "../styles";
import { CardGrid, ContainerBackground, ContainerExtended } from "./styles";

export const FeaturedAssets = ({ tokens }) => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <SectionTitle>
          <Link href="/explore?tab=1">
            <a>
              <Title>Trending NFTs</Title>
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
