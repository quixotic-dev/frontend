import Head from "next/head";
import { useState } from "react";
import { fetchMarketplaceStats } from "../api/stats";
import { Stats } from "../components/Stats/Stats";
import { siteConfig } from "../shared/config";

export const getStaticProps = async () => {
  const collectionsPromise = fetchMarketplaceStats("volume:desc", "30d", true);

  const [collectionsRes] = await Promise.all([collectionsPromise]);

  return {
    props: {
      collectionsRes,
    },
    revalidate: 60 * 10,
  };
};

const StatsPage = ({ collectionsRes }) => {
  const [collections, setCollections] = useState(collectionsRes);

  return (
    <>
      <Head>
        <title>Trending Collections | Quix</title>
        <meta property="og:title" content={`Trending Collections | Quix`} />

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

      <Stats collections={collections} setCollections={setCollections} />
    </>
  );
};

export default StatsPage;
