import Head from "next/head";
import { RabbitHole } from "../components/Custom/RabbitHole/RabbitHole";
import { siteConfig } from "../shared/config";

const RabbitHolePage = () => {
  if (siteConfig.NETWORK == "opt-mainnet") {
    return (
      <>
        <Head>
          <title>Mint your free RabbitHole L2 Explorer NFT | Quix</title>
          <meta
            property="og:title"
            content={`Mint your free RabbitHole L2 Explorer NFT | Quix`}
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

          <meta property="og:image" content={`/rabbithole/profile.png`} />
          <meta
            name="twitter:image"
            content={`https://${siteConfig.WEBSITE_URL}/rabbithole/profile.png`}
          />
        </Head>

        <RabbitHole />
      </>
    );
  } else {
    return <></>;
  }
};

export default RabbitHolePage;
