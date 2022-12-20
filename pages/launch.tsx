import Head from "next/head";
import { fetchLaunchpadCollections } from "../api/collection";
import { Launch } from "../components/Launch/Launch";
import { siteConfig } from "../shared/config";

export const getStaticProps = async () => {
  const collections = await fetchLaunchpadCollections();

  return {
    props: {
      collections,
    },
    revalidate: 60 * 5,
  };
};

const LaunchPage = ({ collections }) => {
  return (
    <>
      <Head>
        <title>Launch | Quix</title>
        <meta property="og:title" content={`Launch | Quix`} />

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

      <Launch collections={collections} />
    </>
  );
};

export default LaunchPage;
