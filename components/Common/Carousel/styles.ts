import styled from "styled-components";

export const responsive = {
  max_width: {
    breakpoint: { max: 5000, min: 1280 },
    items: 3,
  },
  medium_width: {
    breakpoint: { max: 1279, min: 769 },
    items: 2,
    partialVisibilityGutter: 50,
  },
  small_width: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    partialVisibilityGutter: 50,
  },
};

export const CarouselContainer = styled.div`
  margin: 0 -10px;

  .carousel-item-class {
    padding: 0 10px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  position: relative;
  border-radius: 16px;
  height: 100%;
`;

export const CardImageContainer = styled.div`
  background: ${(props) => props.theme.colors.gray};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.gray};

  img {
    border-radius: 12px;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 5px;
  padding: 5px 10px;
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: auto;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 18px;
  }
`;

export const CardDescription = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }
`;
