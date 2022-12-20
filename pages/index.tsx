import Head from "next/head";
import { useEffect } from "react";
import { fetchFeaturedItems } from "../api/featured";
import { fetchMarketplaceStats } from "../api/stats";
import { Home } from "../components/Home/Home";
import { siteConfig } from "../shared/config";
import { visitHomePage } from "../utils/mixpanel";

export const getStaticProps = async () => {
  const featuredPromise = fetchFeaturedItems();
  const collectionsPromise = fetchMarketplaceStats("volume:desc", "30d", true);

  const [featured, collections] = await Promise.all([
    featuredPromise,
    collectionsPromise,
  ]);

  return {
    props: {
      featured,
      collections,
    },
    revalidate: 60 * 5,
  };
};

const HomePage = ({ featured, collections }) => {
  useEffect(() => {
    visitHomePage();
  }, []);
  return (
    <>
      <Head>
        <title>Quix, the largest NFT marketplace on Optimism</title>
        <meta
          property="og:title"
          content={`Quix, the largest NFT marketplace on Optimism`}
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

      <Home featured={featured} collections={collections} />
    </>
  );
};

export default HomePage;
