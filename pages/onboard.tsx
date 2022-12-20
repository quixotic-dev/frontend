import Head from "next/head";
import { Optimism } from "../components/Custom/Optimism/Optimism";
import { siteConfig } from "../shared/config";

const OptimismPage = () => {
  if (siteConfig.NETWORK == "opt-mainnet") {
    return (
      <>
        <Head>
          <title>Mint your free Optimistic Explorer NFT | Quix</title>
          <meta
            property="og:title"
            content={`Mint your free Optimistic Explorer NFT | Quix`}
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

        <Optimism />
      </>
    );
  } else {
    return <></>;
  }
};

export default OptimismPage;
