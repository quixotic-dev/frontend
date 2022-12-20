import Image from "next/image";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { ImageContainer } from "../Common/Images/styles";
import { allowedDomains } from "../Common/Utils";
import {
  AssetInfo,
  AssetInfoLabel,
  AssetInfoText,
  AssetName,
  Card,
  CardContent,
  CardSection,
  CollectionName,
  HeroContainer,
  HeroSection,
  TextContainer,
  TokenImageContainer,
} from "./styles";

export const AssetCardBridge = ({ token }) => {
  const address = useSelector((state: State) => state.address);

  return (
    <Card className="bridge">
      <TokenImageContainer
        className={!token.token_image ? "no-image" : null}
        backgroundColor={
          token.background_color ? `#${token.background_color}` : null
        }
      >
        {token.token_image ? (
          token.token_image.endsWith(".mp4") ? (
            <ReactPlayer
              className="videoPlayer"
              style={{ display: "flex" }}
              url={token.token_image}
              playing={false}
              controls={false}
              playsinline
              muted
              loop={false}
              width="100%"
              height="100%"
            />
          ) : allowedDomains.has(token.token_image.split("/")[2]) ? (
            <Image
              src={token.token_image}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          ) : (
            <ImageContainer className="cover">
              <img src={token.token_image} alt="" />
            </ImageContainer>
          )
        ) : (
          <>No Image</>
        )}
      </TokenImageContainer>
      <CardContent>
        <HeroContainer>
          <HeroSection>
            <CollectionName>
              <TextContainer>{token.contract_name}</TextContainer>
            </CollectionName>
            <AssetName>
              <TextContainer>{token.token_name}</TextContainer>
            </AssetName>
          </HeroSection>
        </HeroContainer>

        {token.token_owner != "0x0000000000000000000000000000000000000000" &&
          token.token_owner != "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D" &&
          token.token_owner != "0x8DD330DdE8D9898d43b4dc840Da27A07dF91b3c9" && (
            <CardSection className="detail">
              <AssetInfo className="detail">
                <AssetInfoLabel className="detail">Owned by</AssetInfoLabel>
                <AssetInfoText className="detail">
                  {token.token_owner == address
                    ? "you"
                    : token.token_owner.slice(0, 6)}
                </AssetInfoText>
              </AssetInfo>
            </CardSection>
          )}
      </CardContent>
    </Card>
  );
};
