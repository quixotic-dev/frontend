import Link from "next/link";
import { useEffect, useState } from "react";
import { MdPersonAdd, MdPersonOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileFollow } from "../../api/discover";
import { State } from "../../store";
import { updateLogin } from "../../store/login";
import { updateProfile } from "../../store/profile";
import { ProfileImage } from "../Common/Images/ProfileImage";
import { TextTruncater } from "../Common/styles";
import {
  Card,
  CardContent,
  CardSection,
  FollowIcon,
  Name,
  ProfileImageContainer,
  SmallName,
} from "./styles";

export const ProfileCard = ({ profile }) => {
  const dispatch = useDispatch();

  const current_user = useSelector((state: State) => state.profile);

  const profile_link = profile
    ? profile.username
      ? profile.username
      : profile.reverse_ens
      ? profile.reverse_ens
      : profile.address
    : "";

  const handle = profile
    ? profile.username
      ? profile.username
      : profile.reverse_ens
      ? profile.reverse_ens
      : profile.address.slice(0, 6)
    : "";

  const address = profile
    ? profile.username && profile.reverse_ens
      ? profile.reverse_ens
      : `${profile.address.slice(0, 6)}...${profile.address.slice(-6)}`
    : "";

  const [profileFollowed, setProfileFollowed] = useState(false);

  const updateFollowStatus = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!current_user.address) {
      return updateLogin(true, dispatch);
    }

    if (profileFollowed) {
      setProfileFollowed(false);
      const res = await updateProfileFollow(
        current_user.address,
        profile.address,
        "unfollow",
        "profile"
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setProfileFollowed(true);
      }
    } else {
      setProfileFollowed(true);
      const res = await updateProfileFollow(
        current_user.address,
        profile.address,
        "follow",
        "profile"
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setProfileFollowed(false);
      }
    }
  };

  useEffect(() => {
    if (current_user && current_user.followed_profiles) {
      setProfileFollowed(
        current_user.followed_profiles.includes(profile.address)
      );
    }
  }, [current_user]);

  return (
    <Link href={`/${profile_link}`} passHref>
      <a>
        <Card>
          <CardContent>
            <ProfileImageContainer>
              <ProfileImage profile={profile} />
            </ProfileImageContainer>
            <CardSection>
              <Name>
                <TextTruncater>{handle}</TextTruncater>
              </Name>
              <SmallName>
                <TextTruncater>{address}</TextTruncater>
              </SmallName>
            </CardSection>
          </CardContent>
          {current_user &&
            current_user.address != profile.address &&
            (profileFollowed ? (
              <FollowIcon onClick={updateFollowStatus}>
                <MdPersonOff />
              </FollowIcon>
            ) : (
              <FollowIcon onClick={updateFollowStatus}>
                <MdPersonAdd />
              </FollowIcon>
            ))}
        </Card>
      </a>
    </Link>
  );
};
