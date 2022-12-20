import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { siteConfig } from "../../../shared/config";
import {
  Card,
  CardDescription,
  CardImageContainer,
  CardTextContainer,
  CardTitle,
  CarouselContainer,
  responsive,
} from "../../Common/Carousel/styles";
import { TextTruncater } from "../../Common/styles";
import {
  AboutDescription,
  ContainerBackground,
  ContainerExtended,
  Title,
  TitleSection,
} from "./styles";

export const Optimism = () => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <TitleSection>
          <Title>Built for layer 2</Title>
          <AboutDescription>
            Get started with the future of Ethereum
          </AboutDescription>
        </TitleSection>
        <CarouselContainer>
          <Carousel responsive={responsive} itemClass="carousel-item-class">
            <a
              href="https://app.optimism.io/get-started"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card>
                <CardImageContainer>
                  <Image
                    src="/optimism_gateway.webp"
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    width={400}
                    height={230}
                  />
                </CardImageContainer>
                <CardTextContainer>
                  <CardTitle>
                    <TextTruncater>Get started with Optimism</TextTruncater>
                  </CardTitle>
                  <CardDescription>Optimism</CardDescription>
                </CardTextContainer>
              </Card>
            </a>

            <a
              href="https://app.hop.exchange/#/send?token=ETH&sourceNetwork=ethereum&destNetwork=optimism"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card>
                <CardImageContainer>
                  <Image
                    src="/hop.jpeg"
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    width={400}
                    height={230}
                  />
                </CardImageContainer>
                <CardTextContainer>
                  <CardTitle>
                    <TextTruncater>Bridge ETH to Optimism</TextTruncater>
                  </CardTitle>
                  <CardDescription>Hop Exchange</CardDescription>
                </CardTextContainer>
              </Card>
            </a>

            <a
              href="https://newsletter.banklesshq.com/p/optimism-and-nfts-?s=r"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card>
                <CardImageContainer>
                  <Image
                    src="/bankless.png"
                    alt=""
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center"
                    width={400}
                    height={230}
                  />
                </CardImageContainer>
                <CardTextContainer>
                  <CardTitle>
                    <TextTruncater>Optimism and NFTs 🎈</TextTruncater>
                  </CardTitle>
                  <CardDescription>Bankless</CardDescription>
                </CardTextContainer>
              </Card>
            </a>
          </Carousel>
        </CarouselContainer>
      </ContainerExtended>
    </ContainerBackground>
  );
};
