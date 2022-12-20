import Head from "next/head";
import { Cart } from "../components/Cart/Cart";
import { siteConfig } from "../shared/config";

export const getServerSideProps = async ({ query }) => {
  const collectionAddress = query.collection ? query.collection : null;

  return {
    props: {
      collectionAddress,
      key: collectionAddress,
    },
  };
};

const CartPage = ({ collectionAddress }) => {
  return (
    <>
      <Head>
        <title>Cart | Quix</title>
        <meta property="og:title" content={`Launchpad | Quix`} />

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

      <Cart collectionAddress={collectionAddress} />
    </>
  );
};

export default CartPage;
