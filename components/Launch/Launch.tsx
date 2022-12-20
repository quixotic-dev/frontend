import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { siteConfig } from "../../shared/config";
import { CollectionCardLarge } from "../CollectionCard/CollectionCardLarge";

import {
  Card,
  CardDescription,
  CardImageContainer,
  CardTextContainer,
  CardTitle,
  CarouselContainer,
  responsive,
} from "../Common/Carousel/styles";
import {
  CollectionsGrid,
  ContainerBackground,
  ContainerExtended,
  SectionGrid,
  SectionSubtitle,
  SectionTitle,
  Subtitle,
  Title,
} from "./styles";

export const Launch = ({ collections }) => {
  const [pageState, setPageState] = useState({
    collections: collections,
    moreCollections: collections.next ? true : false,
    collectionResults: collections.results,
  });

  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>Launch on layer 2</Title>
        <Subtitle>Build your community on Optimism</Subtitle>

        <SectionGrid>
          <div>
            <SectionTitle>
              Launchpads.{" "}
              <SectionSubtitle>
                Deploy your NFT collection on Optimism.
              </SectionSubtitle>
            </SectionTitle>

            <CarouselContainer>
              <Carousel responsive={responsive} itemClass="carousel-item-class">
                <Link href="/launch/deploy">
                  <a>
                    <Card>
                      <CardImageContainer>
                        <Image
                          src={`/launch/opt.png`}
                          alt=""
                          layout="responsive"
                          objectFit="cover"
                          objectPosition="center"
                          width={400}
                          height={230}
                        />
                      </CardImageContainer>
                      <CardTextContainer>
                        <CardTitle>Quix Launchpad</CardTitle>
                        <CardDescription>
                          Simple free mints, built into Quix
                        </CardDescription>
                      </CardTextContainer>
                    </Card>
                  </a>
                </Link>

                <a
                  href="https://niftykit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/niftykit.png"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>NiftyKit</CardTitle>
                      <CardDescription>
                        The no-code solution for NFT smart contracts
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://mintplex.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/mintplex.png"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Mintplex</CardTitle>
                      <CardDescription>
                        Launch and build NFT communities without code
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>
              </Carousel>
            </CarouselContainer>
          </div>

          <div>
            <SectionTitle>
              Resources.{" "}
              <SectionSubtitle>
                Creator tools for project and community development.
              </SectionSubtitle>
            </SectionTitle>

            <CarouselContainer>
              <Carousel responsive={responsive} itemClass="carousel-item-class">
                <a
                  href="https://galaxy.eco/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/galaxy.jpeg"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Project Galaxy</CardTitle>
                      <CardDescription>
                        Create new experiences with web3 credentials
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://rainbow.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/rainbow.webp"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Rainbow Wallet</CardTitle>
                      <CardDescription>
                        The only wallet with in-app support for L2 NFTs
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://app.optimism.io/get-started/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/optimism.webp"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Get Started with Optimism</CardTitle>
                      <CardDescription>
                        Easily onboard your community to Optimism
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://guild.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/guild.png"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Guild</CardTitle>
                      <CardDescription>
                        Discord membership management tools
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://dune.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/dune.png"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Dune</CardTitle>
                      <CardDescription>
                        Explore, create and share crypto analytics
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://alchemy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/alchemy.jpeg"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Alchemy</CardTitle>
                      <CardDescription>
                        Blockchain &amp; NFT APIs
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://simplehash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/simplehash.png"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Simplehash</CardTitle>
                      <CardDescription>Multi-Chain NFT APIs</CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://layer3.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/layer3.jpeg"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Layer3</CardTitle>
                      <CardDescription>
                        Learn web3 by completing bounties
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://ethereumbots.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/ethereumbots.png"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Ethereum Bots</CardTitle>
                      <CardDescription>
                        Customizable Twitter &amp; Discord bots for L2 NFTs
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>

                <a
                  href="https://litprotocol.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card>
                    <CardImageContainer>
                      <Image
                        src="/launch/litprotocol.png"
                        alt=""
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        width={400}
                        height={230}
                      />
                    </CardImageContainer>
                    <CardTextContainer>
                      <CardTitle>Lit Protocol</CardTitle>
                      <CardDescription>
                        NFT-gated content access
                      </CardDescription>
                    </CardTextContainer>
                  </Card>
                </a>
              </Carousel>
            </CarouselContainer>
          </div>

          {collections.results.length > 0 && (
            <div>
              <SectionTitle>
                Drops.{" "}
                <SectionSubtitle>
                  Recent projects from the Quix launchpad.
                </SectionSubtitle>
              </SectionTitle>
              <CollectionsGrid>
                {pageState.collectionResults.slice(0, 6).map((collection) => (
                  <CollectionCardLarge
                    key={collection.address}
                    collection={collection}
                    showStats={true}
                    launchpadLink={true}
                  />
                ))}
              </CollectionsGrid>
            </div>
          )}
        </SectionGrid>
      </ContainerExtended>
    </ContainerBackground>
  );
};
