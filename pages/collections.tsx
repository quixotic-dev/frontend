import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProfileOwnedCollections } from "../api/profile";
import { Loader } from "../components/Loader/Loader";
import { MyCollections } from "../components/MyCollections/MyCollections";
import { NotLoggedIn } from "../components/NotLoggedIn/NotLoggedIn";
import { siteConfig } from "../shared/config";
import { State } from "../store";

const MyCollectionsPage = () => {
  const address = useSelector((state: State) => state.address);
  const [collections, setCollections] = useState();

  useEffect(() => {
    async function fetchCollections() {
      const collections = await fetchProfileOwnedCollections(address);
      setCollections(collections);
    }

    if (address) {
      setCollections(null);
      fetchCollections();
    }
  }, [address]);

  return (
    <>
      <Head>
        <title>Collections | Quix</title>
        <meta property="og:title" content={`Collections | Quix`} />

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

      {!!collections ? (
        <MyCollections
          collections={collections}
          setCollections={setCollections}
        />
      ) : address ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default MyCollectionsPage;
