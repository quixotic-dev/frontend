import Image from "next/image";
import { ImagePlaceholder } from "./styles";

export const ProfileImage = ({ profile }) => {
  return (
    <>
      {profile.profile_image ? (
        <Image
          src={profile.profile_image}
          alt=""
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
          width={100}
          height={100}
          priority={true}
        />
      ) : (
        <ImagePlaceholder
          start={profile.address.slice(2, 8)}
          end={profile.address.slice(3, 9)}
        />
      )}
    </>
  );
};
