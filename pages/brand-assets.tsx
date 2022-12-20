import Head from "next/head";
import { BrandAssets } from "../components/BrandAssets/BrandAssets";
import { siteConfig } from "../shared/config";

const BrandAssetsPage = () => {
  return (
    <>
      <Head>
        <title>Brand Assets | Quix</title>
        <meta property="og:title" content={`Brand Assets | Quix`} />

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

      <BrandAssets />
    </>
  );
};

export default BrandAssetsPage;
