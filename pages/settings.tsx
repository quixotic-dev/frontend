import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProfileSettings } from "../api/settings";
import { Loader } from "../components/Loader/Loader";
import { NotFound } from "../components/NotFound/NotFound";
import { NotLoggedIn } from "../components/NotLoggedIn/NotLoggedIn";
import { Settings } from "../components/Settings/Settings";
import { siteConfig } from "../shared/config";
import { State } from "../store";

const SettingsPage = () => {
  const address = useSelector((state: State) => state.address);
  const [profile, setProfile] = useState(null);
  const [failedSign, setFailedSign] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setProfile(null);
      setFailedSign(false);
      const profileRes = await fetchProfileSettings(address);
      if (profileRes) {
        setProfile(profileRes);
      } else {
        setFailedSign(true);
      }
    };

    if (address) fetchProfile();
  }, [address]);

  return (
    <>
      <Head>
        <title>Settings | Quix</title>
        <meta property="og:title" content={`Settings | Quix`} />

        <meta
          name="description"
          content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
        />
        <meta
          property="og:description"
          content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
        />
        <meta
          name="twitter:description"
          content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
        />

        <meta property="og:image" content={`/opt_banner.png`} />
        <meta
          name="twitter:image"
          content={`https://${siteConfig.WEBSITE_URL}/opt_twitter.png`}
        />
      </Head>

      {!!profile ? (
        <Settings profile={profile} />
      ) : failedSign ? (
        <NotFound />
      ) : address ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default SettingsPage;
