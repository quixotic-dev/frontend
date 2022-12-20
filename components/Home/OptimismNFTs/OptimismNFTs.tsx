import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";
import { CollectionCardLarge } from "../../CollectionCard/CollectionCardLarge";
import { SectionTitle, Subtitle, Title } from "../styles";
import {
  CardContainer,
  CardGrid,
  ContainerBackground,
  ContainerExtended,
} from "./styles";

export const OptimismNFTs = ({ collections }) => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <SectionTitle>
          <Title>OP OG Collection</Title>
        </SectionTitle>

        <CardGrid>
          {collections.map((collection) => (
            <CardContainer key={collection.address}>
              <CollectionCardLarge
                collection={collection}
                settingsLink={false}
              />
            </CardContainer>
          ))}
        </CardGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
