import Link from "next/link";
import {
  ContainerBackground,
  ContainerExtended,
  ExploreButton,
} from "./styles";

export const Explore = () => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <Link href="/explore">
          <a>
            <ExploreButton>Explore NFTs</ExploreButton>
          </a>
        </Link>
      </ContainerExtended>
    </ContainerBackground>
  );
};
