import { CardContainer } from "../FeaturedCollections/styles";
import { MirrorCard } from "./MirrorCard";
import {
  AboutDescription,
  CardGrid,
  ContainerBackground,
  ContainerExtended,
  Title,
  TitleSection,
} from "./styles";

export const Mirror = ({ collections }) => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <TitleSection>
          <Title style={{ color: "#007aff" }}>Mirror Writing NFTs</Title>
          <AboutDescription>
            Explore and collect the best writing in web3
          </AboutDescription>
        </TitleSection>
        <CardGrid>
          {collections.slice(0, 4).map((collection) => (
            <CardContainer key={collection.address}>
              <MirrorCard collection={collection} />
            </CardContainer>
          ))}
        </CardGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
