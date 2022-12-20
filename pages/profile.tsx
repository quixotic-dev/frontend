import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProfile } from "../api/profile";
import { Loader } from "../components/Loader/Loader";
import { NotLoggedIn } from "../components/NotLoggedIn/NotLoggedIn";
import { Profile } from "../components/Profile/Profile";
import { siteConfig } from "../shared/config";
import { State } from "../store";

const ProfilePage = () => {
  const router = useRouter();
  const address = useSelector((state: State) => state.address);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const profileRes = await fetchProfile(address);

      setProfile(profileRes);
    }

    if (address) {
      setProfile(null);
      getProfile();
    }
  }, [address]);

  return (
    <>
      <Head>
        <title>My Profile | Quix</title>
        <meta property="og:title" content={`My Profile | Quix`} />

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
        <Profile
          profile={profile}
          tab={router.query.tab ? String(router.query.tab) : 0}
        />
      ) : address ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default ProfilePage;
