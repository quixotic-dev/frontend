import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateCollectionSettings } from "../../api/collection";
import { siteConfig } from "../../shared/config";
import { Button } from "../Asset/AssetButtons/styles";
import {
  DeleteImage,
  DisplayTheme,
  DisplayThemeGrid,
  DisplayThemeImage,
  DisplayThemeName,
  EditorDropdown,
  EditorGrid,
  EditorInput,
  EditorInputContainer,
  EditorLabel,
  EditorRow,
  EditorRowDescription,
  EditorRowLabel,
  EditorRowText,
  EditorTextArea,
  EditorTitle,
  ImageUpload,
  LoadingRing,
  SaveButtonContainer,
  Toggle,
  UploadedImage,
  URLInput,
} from "../Common/Settings/styles";

export const CollectionDetails = ({ collection }) => {
  const [name, setName] = useState(collection.name ? collection.name : "");
  const [slug, setSlug] = useState(collection.slug ? collection.slug : "");
  const [description, setDescription] = useState(
    collection.description ? collection.description : ""
  );
  const [category, setCategory] = useState(
    collection.category ? collection.category : ""
  );
  const [siteLink, setSiteLink] = useState(
    collection.site_link ? collection.site_link : ""
  );
  const [twitterLink, setTwitterLink] = useState(
    collection.twitter_link
      ? collection.twitter_link.replace("https://twitter.com/", "")
      : ""
  );
  const [discordLink, setDiscordLink] = useState(
    collection.discord_link
      ? collection.discord_link.replace("https://discord.gg/", "")
      : ""
  );

  const [displayTheme, setDisplayTheme] = useState(collection.display_theme);
  const [rankingEnabled, setRankingEnabled] = useState(
    collection.ranking_enabled
  );

  const [image, setImage] = useState(collection.profile_image);
  const [imageBlob, setImageBlob] = useState();
  const [imageName, setImageName] = useState();
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
  const [coverImage, setCoverImage] = useState(collection.cover_image);
  const [coverImageBlob, setCoverImageBlob] = useState();
  const [coverImageName, setCoverImageName] = useState();
  const [shouldDeleteCoverImage, setShouldDeleteCoverImage] = useState(false);

  const [savingState, setSavingState] = useState(0); // 0 = nothing, 1 = modified, 2 = saving

  const handleChange = (set) => (event) => {
    setSavingState(1);
    set(event.target.value);
  };

  const handleChangeSlug = (event) => {
    setSavingState(1);
    setSlug(event.target.value.replace(/[^a-z0-9\-]+$/, ""));
  };

  const handleChangeTwitter = (event) => {
    setSavingState(1);
    setTwitterLink(event.target.value.replace(/[\W]+/, ""));
  };

  const handleChangeDiscord = (event) => {
    setSavingState(1);
    setDiscordLink(event.target.value.replace(/[\W_]+/, ""));
  };

  const handleChangeRankings = () => {
    setSavingState(1);
    setRankingEnabled(!rankingEnabled);
  };

  const handleChangeDisplayTheme = (value) => {
    setSavingState(1);
    setDisplayTheme(value);
  };

  const handleImageDelete = () => {
    setSavingState(1);
    setImage(null);
    setImageBlob(null);
    setImageName(null);
    setShouldDeleteImage(true);
  };

  const handleCoverImageDelete = () => {
    setSavingState(1);
    setCoverImage(null);
    setCoverImageBlob(null);
    setCoverImageName(null);
    setShouldDeleteCoverImage(true);
  };

  const handleImageChange = (e) => {
    setSavingState(1);
    setShouldDeleteImage(false);
    const file = e.target.files[0];

    if (file.size > 10485760) {
      return toast.error("Max file size is 10MB");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setImage(reader.result as string);
      setImageBlob(file);
      setImageName(file.name);
    };
  };

  const handleCoverImageChange = (e) => {
    setSavingState(1);
    setShouldDeleteCoverImage(false);
    const file = e.target.files[0];

    if (file.size > 10485760) {
      return toast.error("Max file size is 10MB");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setCoverImage(reader.result as string);
      setCoverImageBlob(file);
      setCoverImageName(file.name);
    };
  };

  const handleUpdateDetails = async () => {
    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("display_theme", displayTheme);
    formData.append("category", category);
    formData.append("site_link", siteLink);
    formData.append(
      "twitter_link",
      twitterLink ? "https://twitter.com/" + twitterLink : ""
    );
    formData.append(
      "discord_link",
      discordLink ? "https://discord.gg/" + discordLink : ""
    );
    formData.append("shouldDeleteImage", String(shouldDeleteImage));
    imageBlob && formData.append("profile_image", imageBlob, imageName);
    formData.append("shouldDeleteCoverImage", String(shouldDeleteCoverImage));
    coverImageBlob &&
      formData.append("cover_image", coverImageBlob, coverImageName);

    formData.append("ranking_enabled", String(rankingEnabled));

    setSavingState(2);

    const status = await updateCollectionSettings(collection.address, formData);

    if (status < 400) {
      setSavingState(0);
    } else {
      setSavingState(1);
    }
  };

  return (
    <EditorGrid>
      <EditorRowText>
        <EditorTitle>Collection Details</EditorTitle>
      </EditorRowText>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Name</EditorRowLabel>
        </EditorRowText>
        <EditorInput
          type="text"
          value={name}
          onChange={handleChange(setName)}
        />
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Address</EditorRowLabel>
        </EditorRowText>
        <EditorInput type="text" value={collection.address} disabled />
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>URL</EditorRowLabel>
          <EditorRowDescription>
            Customize the URL of your collection
          </EditorRowDescription>
        </EditorRowText>
        <EditorInputContainer>
          {siteConfig.WEBSITE_URL}/collection/
          <URLInput
            type="text"
            value={slug}
            placeholder="example-collection"
            onChange={handleChangeSlug}
          />
        </EditorInputContainer>
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Description</EditorRowLabel>
        </EditorRowText>
        <EditorTextArea
          value={description}
          placeholder="Describe your collection"
          onChange={handleChange(setDescription)}
        />
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Collection Image</EditorRowLabel>
          <EditorRowDescription>
            Recommended aspect ratio of 1:1
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
            Recommended aspect ratio of 1:6
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
        <EditorRowText>
          <EditorRowLabel>Category</EditorRowLabel>
        </EditorRowText>
        <EditorInputContainer className="dropdown">
          <EditorDropdown
            name="duration"
            id="duration"
            onChange={handleChange(setCategory)}
            defaultValue={collection.category}
          >
            <option disabled selected>
              Select a category
            </option>
            {collection.categories.map((value, index) => (
              <option key={index} value={value[0]}>
                {value[1]}
              </option>
            ))}
          </EditorDropdown>
        </EditorInputContainer>
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Website Link</EditorRowLabel>
        </EditorRowText>
        <EditorInput
          type="url"
          value={siteLink}
          placeholder=""
          onChange={handleChange(setSiteLink)}
        />
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Twitter</EditorRowLabel>
          <EditorRowDescription>
            Enter only your Twitter handle
          </EditorRowDescription>
        </EditorRowText>
        <EditorInputContainer>
          twitter.com/
          <URLInput
            type="text"
            value={twitterLink}
            placeholder="qx_app"
            onChange={handleChangeTwitter}
          />
        </EditorInputContainer>
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Discord</EditorRowLabel>
          <EditorRowDescription>
            Enter only your Discord invite code
          </EditorRowDescription>
        </EditorRowText>
        <EditorInputContainer>
          discord.gg/
          <URLInput
            type="text"
            value={discordLink}
            placeholder="EXksHxP"
            onChange={handleChangeDiscord}
          />
        </EditorInputContainer>
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>
            Rarity Rankings{" "}
            <Toggle
              className={rankingEnabled ? "checked" : ""}
              onClick={handleChangeRankings}
            />
          </EditorRowLabel>
          <EditorRowDescription>
            Rankings are calculated when enabled and do not update automatically
            if metadata changes or if new items are minted. Learn how rankings
            are calculated{" "}
            <a
              href="https://help.qx.app/en/articles/6383982-how-are-rarity-rankings-calculated"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </EditorRowDescription>
        </EditorRowText>
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Display Theme</EditorRowLabel>
          <EditorRowDescription>
            Change how your items are displayed in the marketplace
          </EditorRowDescription>
        </EditorRowText>

        <DisplayThemeGrid>
          <DisplayTheme
            className={displayTheme == 0 ? "selected" : null}
            onClick={() => handleChangeDisplayTheme(0)}
          >
            <DisplayThemeImage>
              <Image
                src="/display-themes/padded.svg"
                alt=""
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                width={216}
                height={305}
              />
            </DisplayThemeImage>
            <DisplayThemeName>Padded</DisplayThemeName>
          </DisplayTheme>
          <DisplayTheme
            className={displayTheme == 1 ? "selected" : null}
            onClick={() => handleChangeDisplayTheme(1)}
          >
            <DisplayThemeImage>
              <Image
                src="/display-themes/contained.svg"
                alt=""
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                width={216}
                height={305}
              />
            </DisplayThemeImage>
            <DisplayThemeName>Contained</DisplayThemeName>
          </DisplayTheme>
          <DisplayTheme
            className={displayTheme == 2 ? "selected" : null}
            onClick={() => handleChangeDisplayTheme(2)}
          >
            <DisplayThemeImage>
              <Image
                src="/display-themes/covered.svg"
                alt=""
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                width={216}
                height={305}
              />
            </DisplayThemeImage>
            <DisplayThemeName>Covered</DisplayThemeName>
          </DisplayTheme>
        </DisplayThemeGrid>
      </EditorRow>

      <SaveButtonContainer>
        {savingState == 1 && (
          <Button onClick={handleUpdateDetails}>Save Changes</Button>
        )}
        {(savingState == 0 || savingState == 2) && (
          <Button className="muted">
            {savingState == 2 && <LoadingRing className="small-absolute" />}
            Save Changes
          </Button>
        )}
      </SaveButtonContainer>
    </EditorGrid>
  );
};
