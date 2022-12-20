import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCollectionWithRefreshedCampaign } from "../../api/collection";
import { toggleCampaign } from "../../utils/rewards/rewards";
import { switchNetwork } from "../../utils/wallet";
import {
  EditorGrid,
  EditorRow,
  EditorRowDescription,
  EditorRowLabel,
  EditorRowText,
  EditorTitle,
  LoadingRing,
  Toggle,
  ToggleContainer,
} from "../Common/Settings/styles";

export const CollectionRewards = ({ collection }) => {
  const [campaignActive, setCampaignActive] = useState(
    collection.rewardscampaign
      ? collection.rewardscampaign.is_boost_active
      : false
  );
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [toggledCampaignState, setToggledCampaignState] = useState(false);

  const toggleCampaignState = async () => {
    setUpdateInProgress(true);
    await switchNetwork();

    const tx = await toggleCampaign(collection.address);

    if (tx) {
      setToggledCampaignState(true);
    } else {
      setUpdateInProgress(false);
    }
  };

  useEffect(() => {
    async function refreshCampaign(interval) {
      const updatedCollection = await fetchCollectionWithRefreshedCampaign(
        collection.address
      );

      if (
        updatedCollection &&
        updatedCollection.rewardscampaign &&
        updatedCollection.rewardscampaign.is_boost_active != campaignActive
      ) {
        clearInterval(interval);
        setCampaignActive(updatedCollection.rewardscampaign.is_boost_active);
        setToggledCampaignState(false);
        setUpdateInProgress(false);

        return toast.success(
          `${
            updatedCollection.rewardscampaign.is_boost_active
              ? "Enabled"
              : "Disabled"
          } OP rewards boost`
        );
      }
    }

    if (toggledCampaignState == true) {
      const interval = setInterval(() => {
        refreshCampaign(interval);
      }, 1000);
    }
  }, [toggledCampaignState]);

  return (
    <EditorGrid>
      <EditorRowText>
        <EditorTitle>OP Rewards</EditorTitle>
      </EditorRowText>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>
            Boost Active
            <ToggleContainer>
              {updateInProgress && <LoadingRing className="small" />}
              <Toggle
                className={campaignActive ? "checked" : ""}
                onClick={() => {
                  !updateInProgress && toggleCampaignState();
                }}
              />
            </ToggleContainer>
          </EditorRowLabel>
          <EditorRowDescription>
            Toggling this setting enables a{" "}
            {collection.rewardscampaign.boost_per_mille / 10}% OP Rewards boost
            for purchases from your collection
          </EditorRowDescription>
        </EditorRowText>
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>
            Boost Amount
            <div>{collection.rewardscampaign.boost_per_mille / 10}%</div>
          </EditorRowLabel>
          <EditorRowDescription>
            This amount is on top of any site-wide rewards
          </EditorRowDescription>
        </EditorRowText>
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>
            Rewards Distributed
            <div>
              {collection.rewardscampaign.distributed.toLocaleString()} /{" "}
              {collection.rewardscampaign.budget.toLocaleString()} OP
            </div>
          </EditorRowLabel>
        </EditorRowText>
      </EditorRow>
    </EditorGrid>
  );
};
