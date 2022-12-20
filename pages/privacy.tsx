import Head from "next/head";
import { Privacy } from "../components/Privacy/Privacy";
import { siteConfig } from "../shared/config";

const PrivacyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Quix</title>
        <meta property="og:title" content={`Privacy Policy | Quix`} />

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

      <Privacy />
    </>
  );
};

export default PrivacyPage;
