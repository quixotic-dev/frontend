import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateCollectionRoyalties } from "../../api/collection";
import {
  EditorDescription,
  EditorGrid,
  EditorInput,
  EditorRow,
  EditorRowLabel,
  EditorRowText,
  EditorTitle,
  SaveButton,
  SaveButtonContainer,
} from "../Common/Settings/styles";

export const CollectionRoyalties = ({ collection }) => {
  const [buttonText, setButtonText] = useState("Save Changes");
  const [buttonState, setButtonState] = useState(0);

  const [royalties, setRoyalties] = useState(
    String(
      collection.royalty_per_mille ? collection.royalty_per_mille / 10 : ""
    )
  );
  const [payoutAddress, setPayoutAddress] = useState(
    collection.payout_address &&
      collection.payout_address != "0x0000000000000000000000000000000000000000"
      ? collection.payout_address
      : ""
  );

  const handleChangePayoutAddress = (event) => {
    setButtonText("Save Changes");
    setButtonState(1);
    setPayoutAddress(event.target.value.replace(/[^a-z0-9]/gi, ""));
  };

  const handleChangeRoyalties = (event) => {
    if (
      /^\d{0,2}(?:\.\d)?$/.test(event.target.value) &&
      event.target.value >= 0 &&
      event.target.value <= 15
    ) {
      setButtonText("Save Changes");
      setButtonState(1);
      setRoyalties(event.target.value);
    } else {
      toast.error(
        "Tha maximum royalty rate is 15%. Royalties can only include one decimal place."
      );
      setButtonState(2);
      setButtonText("Save Changes");
      setRoyalties(null);
    }
  };

  const handleUpdateRoyalties = async () => {
    if (collection.rewardscampaign) {
      return toast.error(
        "Changing royalties is not possible while OP rewards campaign is active"
      );
    }

    setButtonText("Saving Changes...");

    if (!ethers.utils.isAddress(payoutAddress)) {
      return toast.error("Invalid payout address");
    } else if (!royalties) {
      return toast.error("Invalid royalty amount");
    }

    const formData = new FormData();
    formData.append("fee_recipient", payoutAddress);
    formData.append("royalty_per_mille", String(Number(royalties) * 10));

    const status = await updateCollectionRoyalties(
      collection.address,
      formData
    );

    if (status < 400) {
      setButtonState(0);
    } else {
      setButtonState(2);
    }
    setButtonText("Save Changes");
  };

  return (
    <EditorGrid>
      <EditorRowText>
        <EditorTitle>Collection Royalties</EditorTitle>
        <EditorDescription>
          Collect a fee when a user resells an item you created, up to 15%. This
          is deducted from the final sale price and is paid out at the time of
          the transaction.
        </EditorDescription>
      </EditorRowText>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Royalties</EditorRowLabel>
        </EditorRowText>
        <EditorInput
          type="number"
          step="0.1"
          min="0"
          max="15"
          value={royalties}
          placeholder="Enter a percentage, e.g. 2.5"
          onChange={handleChangeRoyalties}
        />
      </EditorRow>
      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Payout Address</EditorRowLabel>
        </EditorRowText>
        <EditorInput
          type="text"
          value={payoutAddress}
          placeholder="Enter a wallet address, e.g. 0x0977..."
          onChange={handleChangePayoutAddress}
        />
      </EditorRow>

      <SaveButtonContainer>
        {buttonState == 1 && (
          <SaveButton onClick={handleUpdateRoyalties}>{buttonText}</SaveButton>
        )}
        {(buttonState == 0 || buttonState == 2) && (
          <SaveButton
            className={
              buttonState == 0 ? "disabled" : buttonState == 2 ? "error" : null
            }
          >
            {buttonText}
          </SaveButton>
        )}
      </SaveButtonContainer>
    </EditorGrid>
  );
};
