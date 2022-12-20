import Head from "next/head";
import { useState } from "react";
import { fetchProfile, fetchProfileOwnedCollections } from "../../api/profile";
import { Collections } from "../../components/Collections/Collections";
import { NotFound } from "../../components/NotFound/NotFound";
import { siteConfig } from "../../shared/config";

export const getServerSideProps = async ({ query }) => {
  const profile = await fetchProfile(query.handle);

  let profileCollections;
  if (profile) {
    profileCollections = await fetchProfileOwnedCollections(profile.address);
  }

  return {
    props: {
      profile,
      profileCollections,
      key: profile ? profile.address : null,
    },
  };
};

const CollectionsPage = ({ profile, profileCollections }) => {
  const [collections, setCollections] = useState(profileCollections);

  const handle = profile
    ? profile.username
      ? profile.username
      : profile.reverse_ens
      ? profile.reverse_ens
      : profile.address
    : "";

  return (
    <>
      {profile && collections ? (
        <>
          <Head>
            <title>Explore {handle} Collections - Quix</title>
            <meta
              property="og:title"
              content={`Explore ${handle} Collections | Quix`}
            />

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
          <Collections
            profile={profile}
            collections={collections}
            setCollections={setCollections}
          />
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

export default CollectionsPage;
