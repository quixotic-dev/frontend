import Head from "next/head";
import { useRouter } from "next/router";
import { fetchExploreCollections } from "../api/collection";
import { Explore } from "../components/Explore/Explore";
import { siteConfig } from "../shared/config";

export const getStaticProps = async () => {
  const collections = await fetchExploreCollections();

  return {
    props: {
      collections,
    },
    revalidate: 60 * 5,
  };
};

const ExplorePage = ({ collections }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Explore NFTs | Quix</title>
        <meta property="og:title" content={`Explore NFTs | Quix`} />

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

      <Explore
        collections={collections}
        tab={router.query.tab ? String(router.query.tab) : 0}
      />
    </>
  );
};

export default ExplorePage;
