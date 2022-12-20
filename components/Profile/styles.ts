import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div``;

export const ContainerExtended = styled(Container)`
  max-width: none;
`;

interface ProfileCoverImageProps {
  color: string;
}

export const ProfileCoverImage = styled.div<ProfileCoverImageProps>`
  background: ${(props) =>
    `linear-gradient(-135deg, ${props.color}, ${props.color}40)`};
  opacity: 0.33;
  height: 200px;
  width: 100vw;
  position: relative;

  &.fullOpacity {
    opacity: 1;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    height: 250px;
  }
`;

export const TwoColGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 40px;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  margin-top: -150px;

  p {
    font-size: 1rem;
    margin: 0;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-top: -220px;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.lightGray};
  width: 175px;
  height: 175px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  border: 6px solid ${(props) => props.theme.colors.secondary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: 250px;
    height: 250px;
  }
`;

export const ProfileImageEditIcon = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 96px;
  color: white;
  background: rgb(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;

export const ProfileBadgeGrid = styled.div`
  display: flex;
  grid-gap: 12px 8px;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 0 20px;
`;

export const ProfileBadge = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  width: fit-content;
  font-size: 14px;
  font-weight: 400;
  background: ${(props) => props.theme.colors.networkLight};
  color: ${(props) => props.theme.colors.network};
  border-radius: 52px;
  padding: 5px 8px;

  &:hover {
    cursor: pointer;
  }
`;

export const ProfileBadgeIcon = styled.div`
  display: flex;
  padding: 6px;
  margin: -6px;
`;

export const ENSBadge = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.5px;
  background: ${(props) => props.theme.colors.network};
  color: ${(props) => props.theme.colors.networkLight};
  padding: 1px 4px;
  border-radius: 52px;
`;

export const ProfileUsername = styled.div`
  font-size: 18px;
  font-weight: 800;
  overflow-wrap: anywhere;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 24px;
  }
`;

export const ProfileBio = styled.div`
  font-size: 14px;
  word-break: break-word;
  color: ${(props) => props.theme.colors.accent};
  max-width: 650px;
  margin-top: 5px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 30px;
    /* overflow: scroll; */
  }
`;

export const ProfileEditButton = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
`;

export const NoItemsButton = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 52px;
  padding: 10px 30px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;

  @media (min-width: ${(props) => props.theme.small_width}) {
    width: fit-content;
  }

  &:hover {
    cursor: pointer;
  }

  &.no-click {
    cursor: default;
  }
`;

export const FeaturedAsset = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.max_width}) {
    display: block;
    padding-bottom: 40px;
  }
`;

export const UsernameContainer = styled.div`
  display: flex;
  grid-gap: 12px;
`;

export const FollowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-gap: 3px;
  border-radius: 52px;
  margin-top: 4px;
  padding: 4px 10px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  width: fit-content;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  height: fit-content;

  &.follow {
    padding: 4px 10px 4px 6px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.1);
    background: ${(props) => props.theme.colors.network};
    color: ${(props) => props.theme.colors.networkLight};
  }

  &.collection {
    margin-top: 0;
  }
`;

export const TopGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  margin-top: -160px;
  margin-bottom: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 25px;
    margin-top: -247px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    /* display: grid; */
    /* grid-template-columns: 300px 1fr; */
    grid-gap: 25px 40px;
    /* align-items: end; */
    /* margin-bottom: 20px; */
  }

  &.no-margin {
    margin-top: 0;
    margin-bottom: 0;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      margin-bottom: 15px;
    }
  }
`;

export const BottomGrid = styled.div`
  &.two-column {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    @media (min-width: ${(props) => props.theme.medium_width}) {
      display: grid;
      grid-template-columns: 300px 1fr;
      grid-gap: 40px;
    }
  }
`;
