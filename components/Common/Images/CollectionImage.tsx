import Image from "next/image";
import { allowedDomains } from "../Utils";
import { ImageContainer, ImagePlaceholder } from "./styles";

export const CollectionImage = ({ collection, cover = true }) => {
  return (
    <>
      {collection.image_url ? (
        allowedDomains.has(collection.image_url.split("/")[2]) ? (
          <Image
            src={collection.image_url}
            alt=""
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
            width={100}
            height={100}
            priority={true}
          />
        ) : (
          <ImageContainer className={cover ? "cover" : null}>
            <img src={collection.image_url} alt="" />
          </ImageContainer>
        )
      ) : (
        <ImagePlaceholder
          start={collection.address.slice(2, 8)}
          end={collection.address.slice(3, 9)}
        />
      )}
    </>
  );
};
