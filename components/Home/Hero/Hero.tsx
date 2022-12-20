import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { siteConfig } from "../../../shared/config";
import { CollectionImage } from "../../Common/Images/CollectionImage";
import { TextTruncater } from "../../Common/styles";
import {
  AssetName,
  Button,
  CardContent,
  CardImage,
  CollectionIcon,
  ContainerBackground,
  ContainerExtended,
  Grid,
  ImageContainer,
  Subtitle,
  TextContainer,
  Title,
} from "./styles";

export const Hero = ({ collection }) => {
  return (
    <div className="hero">
      <ContainerBackground>
        <ContainerExtended>
          <Grid cover_image_url={collection && collection.cover_image}>
            <TextContainer>
              <Title>
                LAYER 2 <br />
                IS HERE
              </Title>
              <Subtitle>
                Discover, collect, and sell digital items <br />
                on Optimism&apos;s largest NFT marketplace
              </Subtitle>
              <Link href="/explore">
                <a>
                  <Button>Explore NFTs</Button>
                </a>
              </Link>
            </TextContainer>

            {collection && collection.image_url && (
              <Link
                href={`/collection/${
                  collection.slug ? collection.slug : collection.address
                }`}
                passHref
              >
                <a>
                  <CardImage>
                    <ImageContainer>
                      <CollectionImage collection={collection} cover={true} />
                    </ImageContainer>
                    <CardContent>
                      <AssetName>
                        <TextTruncater>{collection.name}</TextTruncater>
                        {collection.verified && (
                          <CollectionIcon>
                            <MdVerified />
                          </CollectionIcon>
                        )}
                      </AssetName>
                    </CardContent>
                  </CardImage>
                </a>
              </Link>
            )}
          </Grid>
        </ContainerExtended>
      </ContainerBackground>
    </div>
  );
};
