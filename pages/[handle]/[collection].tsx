import Head from "next/head";
import { fetchProfile } from "../../api/profile";
import { NotFound } from "../../components/NotFound/NotFound";
import { Profile } from "../../components/Profile/Profile";
import { siteConfig } from "../../shared/config";

export const getServerSideProps = async ({ query }) => {
  const profile = await fetchProfile(query.handle);
  const selectedTab = query.tab ? query.tab : 0;

  return {
    props: {
      profile,
      selectedTab,
      key: profile ? profile.address : null,
    },
  };
};

const ProfilePage = ({ profile, selectedTab }) => {
  const handle = profile
    ? profile.username
      ? profile.username
      : profile.reverse_ens
      ? profile.reverse_ens
      : profile.address
    : "";

  return (
    <>
      {!!profile ? (
        <>
          <Head>
            <title>{handle} | Quix</title>
            <meta property="og:title" content={handle + " | "} />

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

            {profile.profile_image ? (
              <>
                <meta property="og:image" content={profile.profile_image} />
                <meta name="twitter:image" content={profile.profile_image} />
              </>
            ) : (
              <>
                <meta property="og:image" content={`/opt_banner.png`} />
                <meta
                  name="twitter:image"
                  content={`https://${siteConfig.WEBSITE_URL}/opt_twitter.png`}
                />
              </>
            )}
          </Head>

          <Profile profile={profile} tab={selectedTab} />
        </>
      ) : (
        <>
          <Head>
            <title>Not Found | Quix</title>
            <meta property="og:title" content={`Not Found | Quix`} />

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

          <NotFound />
        </>
      )}
    </>
  );
};

export default ProfilePage;
