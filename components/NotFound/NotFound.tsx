import Link from "next/link";
import {
  ContainerBackground,
  ContainerExtended,
  NoItemsButton,
  Subtitle,
  Title,
} from "./styles";

export const NotFound = () => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>404 Not Found</Title>
        <Subtitle>We couldn&apos;t find the page you were looking for</Subtitle>
        <Link href="/">
          <a>
            <NoItemsButton>Back to home</NoItemsButton>
          </a>
        </Link>
      </ContainerExtended>
    </ContainerBackground>
  );
};
