import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateProfileSettings } from "../../api/settings";
import {
  DeleteImage,
  EditorGrid,
  EditorInput,
  EditorLabel,
  EditorRow,
  EditorRowDescription,
  EditorRowLabel,
  EditorRowText,
  EditorTextArea,
  EditorTitle,
  ImageUpload,
  SaveButton,
  SaveButtonContainer,
  UploadedImage,
} from "../Common/Settings/styles";

export const ProfileSettings = ({ profile }) => {
  const [buttonText, setButtonText] = useState("Save Changes");
  const [username, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [imageBlob, setImageBlob] = useState();
  const [imageName, setImageName] = useState("");
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [coverImageBlob, setCoverImageBlob] = useState();
  const [coverImageName, setCoverImageName] = useState("");
  const [shouldDeleteCoverImage, setShouldDeleteCoverImage] = useState(false);

  useEffect(() => {
    setButtonText("Save Changes");
    setUsername(profile.username ? profile.username : "");
    setBio(profile.bio ? profile.bio : "");
    setTwitter(
      profile.twitter ? profile.twitter.replace("https://twitter.com/", "") : ""
    );
    setImage(profile.profile_image);
    setImageBlob(null);
    setImageName("");
    setShouldDeleteImage(false);
    setCoverImage(profile.cover_image);
    setCoverImageBlob(null);
    setCoverImageName("");
    setShouldDeleteCoverImage(false);
  }, [profile]);

  const handleChange = (set) => (event) => {
    setButtonText("Save Changes");
    set(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setButtonText("Save Changes");
    setUsername(event.target.value.replace(/[\W]+/, "").slice(0, 15));
  };

  const handleChangeTwitter = (event) => {
    setButtonText("Save Changes");
    setTwitter(
      event.target.value
        .replace(/[\W]+/, "")
        .replace("https://twitter.com/", "")
        .replace("http://twitter.com/", "")
        .replace("twitter.com/", "")
        .slice(0, 15)
    );
  };

  const handleImageDelete = () => {
    setButtonText("Save Changes");
    setImage(null);
    setImageBlob(null);
    setImageName(null);
    setShouldDeleteImage(true);
  };

  const handleCoverImageDelete = () => {
    setButtonText("Save Changes");
    setCoverImage(null);
    setCoverImageBlob(null);
    setCoverImageName(null);
    setShouldDeleteCoverImage(true);
  };

  const handleImageChange = (e) => {
    setButtonText("Save Changes");
    setShouldDeleteImage(false);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setImage(reader.result as string);
      setImageBlob(file);
      setImageName(file.name);
    };
  };

  const handleCoverImageChange = (e) => {
    setButtonText("Save Changes");
    setShouldDeleteCoverImage(false);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setCoverImage(reader.result as string);
      setCoverImageBlob(file);
      setCoverImageName(file.name);
    };
  };

  const handleClickSave = async () => {
    if (username != "" && username.length < 3) {
      return toast.error("Username must be at least 3 characters long");
    }

    setButtonText("Saving Changes...");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("twitter", twitter ? "https://twitter.com/" + twitter : "");
    formData.append("bio", bio);
    formData.append("shouldDeleteImage", String(shouldDeleteImage));
    imageBlob && formData.append("img", imageBlob, imageName);
    formData.append("shouldDeleteCoverImage", String(shouldDeleteCoverImage));
    coverImageBlob &&
      formData.append("cover_image", coverImageBlob, coverImageName);

    const status = await updateProfileSettings(profile.address, formData);

    if (status < 400) {
      setButtonText("Saved!");
    } else {
      setButtonText("Save Changes");
    }
  };

  return (
    <EditorGrid>
      <EditorTitle>Profile</EditorTitle>

      <EditorRow>
        <EditorRowLabel>Username</EditorRowLabel>
        <EditorInput
          type="text"
          value={username}
          placeholder="Enter a username"
          onChange={handleChangeUsername}
        />
      </EditorRow>
      <EditorRow>
        <EditorRowLabel>Twitter</EditorRowLabel>
        <EditorInput
          type="text"
          value={twitter}
          placeholder="Enter your Twitter handle"
          onChange={handleChangeTwitter}
        />
      </EditorRow>
      <EditorRow>
        <EditorRowLabel>Bio</EditorRowLabel>
        <EditorTextArea
          value={bio}
          placeholder="Share your story"
          onChange={handleChange(setBio)}
        />
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Profile Image</EditorRowLabel>
          <EditorRowDescription>
            The suggested aspect ration is 1:1
          </EditorRowDescription>
        </EditorRowText>
        <ImageUpload className={image ? "profile" : "upload"}>
          {image ? (
            <UploadedImage>
              <Image
                src={image}
                alt=""
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                width={100}
                height={100}
              />
              <DeleteImage onClick={handleImageDelete} />
            </UploadedImage>
          ) : (
            <>
              <EditorLabel htmlFor="image-upload">Select an image</EditorLabel>
              <EditorInput
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </>
          )}
        </ImageUpload>
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Cover Image</EditorRowLabel>
          <EditorRowDescription>
            The cover image has a fixed height of 250px. The width varies with
            the page.
          </EditorRowDescription>
        </EditorRowText>
        <ImageUpload className={coverImage ? null : "upload"}>
          {coverImage ? (
            <UploadedImage className="cover">
              <Image
                src={coverImage}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <DeleteImage onClick={handleCoverImageDelete} />
            </UploadedImage>
          ) : (
            <>
              <EditorLabel htmlFor="cover-image-upload">
                Select an image
              </EditorLabel>
              <EditorInput
                id="cover-image-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
              />
            </>
          )}
        </ImageUpload>
      </EditorRow>
      <EditorRow>
        <EditorRowLabel>Wallet Address</EditorRowLabel>
        <EditorInput type="text" value={profile.address} disabled />
      </EditorRow>
      {profile.reverse_ens && (
        <EditorRow>
          <EditorRowLabel>ENS</EditorRowLabel>
          <EditorInput type="text" value={profile.reverse_ens} disabled />
        </EditorRow>
      )}
      <SaveButtonContainer>
        <SaveButton onClick={handleClickSave}>{buttonText}</SaveButton>
      </SaveButtonContainer>
    </EditorGrid>
  );
};
