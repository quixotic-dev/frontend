import styled from "styled-components";

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 1;
  }

  &.cover {
    img {
      object-fit: cover;
    }
  }

  &.token-media {
    position: relative;

    img {
      position: absolute;
    }
  }
`;

interface ImagePlaceholderProps {
  start: string;
  end: string;
}

export const ImagePlaceholder = styled.div<ImagePlaceholderProps>`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `linear-gradient(-45deg, #${props.start}, #${props.end})`};
`;
