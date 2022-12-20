import Head from "next/head";
import { Bridge } from "../components/Bridge/Bridge";
import { siteConfig } from "../shared/config";

export const getServerSideProps = async ({ query }) => {
  const network = query.network ? query.network : "ethereum";
  const collectionAddress = query.address ? query.address : null;
  const tokenId = query.token_id ? query.token_id : null;

  return {
    props: {
      network,
      collectionAddress,
      tokenId,
    },
  };
};

const BridgePage = ({ network, collectionAddress, tokenId }) => {
  return (
    <>
      <Head>
        <title>Optimism NFT Bridge | Quix</title>
        <meta property="og:title" content={`Optimism NFT Bridge | Quix`} />

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

      <Bridge
        network={network}
        collection={collectionAddress}
        token={tokenId}
      />
    </>
  );
};

export default BridgePage;
