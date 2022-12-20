import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateNotificationSettings } from "../../api/settings";
import {
  EditorGrid,
  EditorInput,
  EditorInputContainer,
  EditorRow,
  EditorRowDescription,
  EditorRowLabel,
  EditorRowText,
  EditorTitle,
  SaveButton,
  SaveButtonContainer,
} from "../Common/Settings/styles";

export const ProfileNotifications = ({ profile }) => {
  const [buttonText, setButtonText] = useState("Save Changes");
  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState("");

  useEffect(() => {
    setButtonText("Save Changes");
    setEmail(profile.email ? profile.email : "");
    setThreshold(
      profile.minimum_offer
        ? ethers.utils.formatEther(
            ethers.utils.parseUnits(profile.minimum_offer.toString(), "gwei")
          )
        : ""
    );
  }, [profile]);

  const handleChange = (set) => (event) => {
    setButtonText("Save Changes");
    set(event.target.value);
  };

  const handleChangeTheshold = (event) => {
    setButtonText("Save Changes");
    setThreshold(
      event.target.value
        .replace(",", ".")
        .replace(/[^.0-9]/g, "")
        .replace("..", ".")
    );
  };

  const handleClickSave = async () => {
    setButtonText("Saving Changes...");

    let minimum_offer;
    try {
      minimum_offer = threshold
        ? Number(
            ethers.utils.formatUnits(ethers.utils.parseEther(threshold), "gwei")
          )
        : 0;
    } catch (error) {
      return toast.error("Please enter a valid minimum offer theshold");
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("minimum_offer", minimum_offer);

    const status = await updateNotificationSettings(profile.address, formData);

    if (status < 400) {
      setButtonText("Saved!");
    } else {
      setButtonText("Save Changes");
    }
  };

  return (
    <EditorGrid>
      <EditorTitle>Notifications</EditorTitle>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Email</EditorRowLabel>
          <EditorRowDescription>
            Enter your email address to receive marketplace notifications
          </EditorRowDescription>
        </EditorRowText>
        <EditorInput
          type="text"
          value={email}
          placeholder="Enter your email address"
          onChange={handleChange(setEmail)}
        />
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Minimum Offer Threshold</EditorRowLabel>
          <EditorRowDescription>
            You will only get notified of offers greater than or equal to this
            amount
          </EditorRowDescription>
        </EditorRowText>
        <EditorInputContainer className="price">
          <FaEthereum />
          <EditorInput
            className="price"
            type="text"
            value={threshold}
            placeholder="e.g. 0.01"
            onChange={handleChangeTheshold}
          />
        </EditorInputContainer>
      </EditorRow>
      <SaveButtonContainer>
        <SaveButton onClick={handleClickSave}>{buttonText}</SaveButton>
      </SaveButtonContainer>
    </EditorGrid>
  );
};
