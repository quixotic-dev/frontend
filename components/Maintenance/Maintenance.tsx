import Image from "next/image";
import { siteConfig } from "../../shared/config";
import {
  ContainerBackground,
  ContainerExtended,
  ImageContainer,
  Subtitle,
  Title,
} from "./styles";

export const Maintenance = () => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <ImageContainer>
          <Image
            src={`/opt_banner_slim.png`}
            alt=""
            layout="responsive"
            objectFit="cover"
            objectPosition="bottom center"
            width={1200}
            height={400}
            priority
          />
        </ImageContainer>
        <Title>Maintenance Mode</Title>
        <Subtitle>
          Quix is currently undergoing maintenance. During this time our
          marketplace will be temporarily unavailable. We apologize for the
          inconvenience.
        </Subtitle>
      </ContainerExtended>
    </ContainerBackground>
  );
};
