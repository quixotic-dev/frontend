import { siteConfig } from "../../shared/config";
import {
  ContainerBackground,
  ContainerExtended,
  NoItemsButton,
  Subtitle,
  Title,
} from "./styles";

export const BrandAssets = () => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>Brand Assets</Title>
        <Subtitle>
          Download official Quix logos to use on your marketing materials or
          website.
        </Subtitle>
        <a href={`https://${siteConfig.WEBSITE_URL}/Quix_Logos.zip`} download>
          <NoItemsButton>Download Logos</NoItemsButton>
        </a>
      </ContainerExtended>
    </ContainerBackground>
  );
};
