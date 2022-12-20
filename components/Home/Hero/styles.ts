import styled from "styled-components";
import { Container } from "../../Common/Container/styles";

export const ContainerBackground = styled.div`
  /* background: ${(props) =>
    `linear-gradient(${props.theme.colors.network}00, ${props.theme.colors.networkLight}, ${props.theme.colors.network}00)`}; */
`;

export const ContainerExtended = styled(Container)`
  position: relative;
  color: white;
  padding: 20px;
  z-index: 1;

  a {
    color: white;
  }

  a:hover {
    color: white;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 60px 40px 20px;
  }
`;

interface GridProps {
  cover_image_url: string;
}

export const Grid = styled.div<GridProps>`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;
  border-radius: 24px;
  padding: 30px 25px 20px;

  &:after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background: ${(props) =>
      props.cover_image_url
        ? `url(${props.cover_image_url})`
        : `linear-gradient(-45deg, ${props.theme.colors.heroBackgroundStart}, ${props.theme.colors.heroBackgroundEnd})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.15);
    z-index: -1;

    filter: blur(20px);
    transform: scale(1.1);
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1.2fr 1fr;
    padding: 40px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 1.2fr 1fr;
    grid-gap: 60px;
    padding: 60px 80px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    grid-template-columns: 1.2fr 1fr;
    padding: 60px 100px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  margin: auto 0;

  @media (min-width: 475px) {
    br {
      display: none;
    }
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    br {
      display: block;
    }
  }
`;

export const ImageContainer = styled.div`
  border: 5px solid white;
  border-radius: 20px;

  img {
    aspect-ratio: 1;
    border-radius: 15px !important;
    background: ${(props) => props.theme.colors.gray};
  }
`;

export const Title = styled.div`
  position: relative;
  text-align: center;
  font-weight: 800;
  letter-spacing: 1px;

  font-size: 56px;
  line-height: 62px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    text-align: left;
    font-size: 68px;
    line-height: 74px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 82px;
    line-height: 90px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    font-size: 96px;
    line-height: 104px;
  }

  /* &.shadow {
    display: none;

    @supports (-webkit-text-stroke: 1px white) {
      display: block;
      position: absolute;
      top: 4px;
      left: 4px;
      z-index: 0;
      opacity: 0.67;
      -webkit-text-stroke: 1px white;
      -webkit-text-fill-color: transparent;

      @media (min-width: ${(props) => props.theme.small_width}) {
        top: 6px;
        left: 6px;
      }
    }
  } */
`;

export const Subtitle = styled.div`
  font-size: 14px;
  text-align: center;

  br {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 14px;
    text-align: left;

    br {
      display: block;
    }
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    font-size: 16px;
    line-height: 24px;
  }

  @media (min-width: ${(props) => props.theme.max_width}) {
    font-size: 18px;
    line-height: 26px;
  }
`;

export const Button = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  background: white;
  color: black;
  border-radius: 52px;
  padding: 10px 0;
  transition: all 0.2s;
  margin-top: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: fit-content;
    padding: 12px 50px;
    margin-top: 15px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    padding: 15px 60px;
    margin-top: 20px;
    font-size: 16px;
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
`;

export const CardImage = styled.div`
  position: relative;
  padding: 0 40px 55px 0;
  z-index: 1;
`;

export const CardContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: calc(100% - 70px);
  width: calc(100% - 40px);
  border: 1px solid white;
  border-radius: 20px;
  margin: 55px 0 0 40px;
  padding: 12px 15px;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 2px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    height: calc(100% - 60px);
    padding: 15px 25px;
  }
`;

export const CollectionName = styled.div`
  display: flex;
  grid-gap: 5px;
  align-items: center;
  font-size: 13px;
  margin-top: auto;
`;

export const CollectionIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 2px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
    margin-top: 3px;
  }
`;

export const AssetName = styled.div`
  display: flex;
  grid-gap: 5px;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  margin-top: auto;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 18px;
  }
`;

export const Shape = styled.div`
  position: absolute;
  display: none;
  z-index: -1;

  @media (min-width: ${(props) => props.theme.small_width}) {
    display: block;
  }

  &.wheel {
    top: 25px;
    right: 25px;
    width: 15vw;
    height: 15vw;
    max-width: 200px;
    max-height: 200px;
  }

  &.rainbow {
    top: 0;
    left: 15%;
    width: 15vw;
    height: 15vw;
    max-width: 180px;
    max-height: 180px;
    transform: rotate(10deg);
  }

  &.cube {
    bottom: 50px;
    left: 40%;
    width: 12vw;
    height: 12vw;
    max-width: 150px;
    max-height: 150px;
    /* z-index: 1; */
  }

  &.cube_large {
    bottom: 0px;
    left: -10px;
    width: 15vw;
    height: 15vw;
    max-width: 200px;
    max-height: 200px;
  }

  &.zigzag {
    bottom: -5%;
    right: 10%;
    width: 15vw;
    height: 15vw;
    max-width: 160px;
    max-height: 160px;
    transform: rotate(15deg);
  }
`;
