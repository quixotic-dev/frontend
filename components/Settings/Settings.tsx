import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdPriceChange } from "react-icons/md";
import {
  ContainerExtended,
  EditorMenu,
  EditorMenuRow,
  Title,
} from "../Common/Settings/styles";
import { ProfileNotifications } from "./ProfileNotifications";
import { ProfileOffers } from "./ProfileOffers";
import { ProfileSettings } from "./ProfileSettings";

export const Settings = ({ profile }) => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(
    router.query.tab ? String(router.query.tab) : 0
  );

  const updateSelectedTab = (tab) => {
    setSelectedTab(tab);
    router.query.tab = tab;
    router.push(router, undefined, { shallow: true, scroll: false });
  };

  return (
    <ContainerExtended>
      <div>
        <Title>Settings</Title>
        <EditorMenu>
          <EditorMenuRow
            className={selectedTab == 0 ? "active" : null}
            onClick={() => updateSelectedTab(0)}
          >
            <FaUser />
            Profile
          </EditorMenuRow>
          <EditorMenuRow
            className={selectedTab == 1 ? "active" : null}
            onClick={() => updateSelectedTab(1)}
          >
            <BsLightningChargeFill />
            Notifications
          </EditorMenuRow>
          <EditorMenuRow
            className={selectedTab == 2 ? "active" : null}
            onClick={() => updateSelectedTab(2)}
          >
            <MdPriceChange />
            Offers
          </EditorMenuRow>
        </EditorMenu>
      </div>

      {selectedTab == 0 && <ProfileSettings profile={profile} />}
      {selectedTab == 1 && <ProfileNotifications profile={profile} />}
      {selectedTab == 2 && <ProfileOffers profile={profile} />}
    </ContainerExtended>
  );
};
