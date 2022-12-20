import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchProfileListedTokens,
  fetchProfileUnlistedTokens,
} from "../api/profile";
import { List } from "../components/List/List";
import { Loader } from "../components/Loader/Loader";
import { NotLoggedIn } from "../components/NotLoggedIn/NotLoggedIn";
import { siteConfig } from "../shared/config";
import { State } from "../store";

const ProfilePage = () => {
  const address = useSelector((state: State) => state.address);
  const [listed, setListed] = useState(null);
  const [unlisted, setUnlisted] = useState(null);

  useEffect(() => {
    async function fetchOffers() {
      const listedPromise = fetchProfileListedTokens(address);
      const unlistedPromise = fetchProfileUnlistedTokens(address);

      const [listedRes, unlistedRes] = await Promise.all([
        listedPromise,
        unlistedPromise,
      ]);

      setListed(listedRes);
      setUnlisted(unlistedRes);
    }

    if (address) {
      setListed(null);
      setUnlisted(null);
      fetchOffers();
    }
  }, [address]);

  return (
    <>
      <Head>
        <title>Listings | Quix</title>
        <meta property="og:title" content={`Listings | Quix`} />

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

      {listed && unlisted ? (
        <List listed={listed} unlisted={unlisted} />
      ) : address ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default ProfilePage;
