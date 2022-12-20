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

export const FeaturedCollections = ({ collections }) => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <SectionTitle>
          <Link href="/explore">
            <a>
              <Title>Featured Projects</Title>
            </a>
          </Link>
          <Link href="/explore">
            <a>
              <Subtitle>
                View All <MdOutlineArrowForward />
              </Subtitle>
            </a>
          </Link>
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
