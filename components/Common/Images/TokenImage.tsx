import Image from "next/image";
import ReactPlayer from "react-player";
import { allowedDomains } from "../Utils";
import { ImageContainer } from "./styles";

export const TokenImage = ({ token, useCollectionImage = true }) => {
  return (
    <div>
      {token.image ? (
        token.image.endsWith(".mp4") ? (
          <ReactPlayer
            className="videoPlayer"
            style={{ display: "flex" }}
            url={token.image}
            playing={false}
            controls={false}
            playsinline
            muted
            loop={false}
            width="100%"
            height="100%"
          />
        ) : allowedDomains.has(token.image.split("/")[2]) ? (
          <Image
            src={token.image}
            alt=""
            layout="responsive"
            objectFit="contain"
            objectPosition="center"
            width={100}
            height={100}
          />
        ) : (
          <ImageContainer>
            <img src={token.image} alt="" />
          </ImageContainer>
        )
      ) : (
        useCollectionImage &&
        token.collection &&
        token.collection.image_url &&
        (allowedDomains.has(token.collection.image_url.split("/")[2]) ? (
          <Image
            src={token.collection.image_url}
            alt=""
            layout="responsive"
            objectFit="contain"
            objectPosition="center"
            width={100}
            height={100}
          />
        ) : (
          <ImageContainer>
            <img src={token.collection.image_url} alt="" />
          </ImageContainer>
        ))
      )}
    </div>
  );
};

export const TokenImageForCard = ({ token }) => {
  return (
    <>
      {token.image ? (
        token.image.endsWith(".mp4") ? (
          <ReactPlayer
            className="videoPlayer"
            style={{ display: "flex" }}
            url={token.image}
            playing={false}
            controls={false}
            playsinline
            muted
            loop={false}
            width="100%"
            height="100%"
          />
        ) : allowedDomains.has(token.image.split("/")[2]) ? (
          <Image
            src={token.image}
            alt=""
            layout="fill"
            objectFit={
              token.collection.display_theme == 2 ? "cover" : "contain"
            }
            objectPosition="center"
          />
        ) : (
          <ImageContainer
            className={token.collection.display_theme == 2 ? "cover" : null}
          >
            <img src={token.image} alt="" />
          </ImageContainer>
        )
      ) : token.collection.image_url ? (
        <ImageContainer>
          <img src={token.collection.image_url} alt="" />
        </ImageContainer>
      ) : (
        <>No Image</>
      )}
    </>
  );
};

export const TokenMedia = ({ token }) => {
  return (
    <>
      {token.animation_url ? (
        token.collection.animation_url_type == "V" ||
        token.animation_url.endsWith(".mp4") ? (
          <ReactPlayer
            className="videoPlayer"
            style={{ display: "flex" }}
            url={token.animation_url}
            playing={true}
            controls={true}
            playsinline
            muted
            loop
            width="100%"
            height="100%"
          />
        ) : token.collection.animation_url_type == "A" ||
          token.animation_url.endsWith(".mp3") ? (
          <div style={{ width: "100%", height: "100%" }}>
            <ReactPlayer
              className="videoPlayer"
              style={{
                position: "absolute",
                padding: "0 10px 15px",
                zIndex: 1,
              }}
              url={token.animation_url}
              playing={true}
              controls={true}
              playsinline
              width="100%"
              height="100%"
            />
            {token.image && (
              <ImageContainer className="token-media">
                <img src={token.image} alt="" />
              </ImageContainer>
            )}
          </div>
        ) : token.collection.animation_url_type == "I" ||
          token.animation_url.endsWith(".png") ||
          token.animation_url.endsWith(".jpg") ||
          token.animation_url.endsWith(".jpeg") ||
          token.animation_url.endsWith(".gif") ? (
          <ImageContainer className="token-media">
            <img src={token.animation_url} alt="" />
          </ImageContainer>
        ) : token.collection.animation_url_type == "H" ? (
          <iframe
            src={token.animation_url}
            width="100%"
            height="100%"
            frameBorder="0"
          />
        ) : token.collection.animation_url_type == "M" ? (
          //@ts-ignore
          <model-viewer
            src={token.animation_url}
            ar
            ar-modes="webxr scene-viewer quick-look"
            environment-image="neutral"
            auto-rotate
            camera-controls
          />
        ) : (
          <ReactPlayer
            className="videoPlayer"
            style={{ display: "flex" }}
            url={token.animation_url}
            playing={true}
            controls={true}
            playsinline
            muted
            loop
            width="100%"
            height="100%"
          />
        )
      ) : token.image ? (
        token.image.endsWith(".mp4") ? (
          <ReactPlayer
            className="videoPlayer"
            style={{ display: "flex" }}
            url={token.image}
            playing={true}
            controls={true}
            playsinline
            muted
            loop
            width="100%"
            height="100%"
          />
        ) : allowedDomains.has(token.image.split("/")[2]) ? (
          <Image
            src={token.image}
            alt=""
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            priority
          />
        ) : (
          <ImageContainer className="token-media">
            <img src={token.image} alt="" />
          </ImageContainer>
        )
      ) : token.collection.image_url ? (
        allowedDomains.has(token.collection.image_url.split("/")[2]) ? (
          <Image
            src={token.collection.image_url}
            alt=""
            layout="responsive"
            objectFit="contain"
            objectPosition="center"
            width={100}
            height={100}
          />
        ) : (
          <ImageContainer className="token-media">
            <img src={token.collection.image_url} alt="" />
          </ImageContainer>
        )
      ) : (
        <>No Image</>
      )}
    </>
  );
};
