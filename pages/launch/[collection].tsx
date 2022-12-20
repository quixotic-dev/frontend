import Head from "next/head";
import { fetchCollection } from "../../api/collection";
import { fetchLaunchpadCollection } from "../../api/launchpad";
import { Launchpad } from "../../components/Launchpad/Launchpad";
import { NotFound } from "../../components/NotFound/NotFound";
import { siteConfig } from "../../shared/config";

export const getServerSideProps = async ({ query }) => {
  const collection = await fetchCollection(query.collection);
  if (collection) {
    const hostedCollection = await fetchLaunchpadCollection(collection.address);
    return {
      props: {
        collection,
        hostedCollection,
        key: collection ? collection.address : null,
      },
    };
  } else {
    return {
      props: {
        collection: null,
        hostedCollection: null,
        key: collection ? collection.address : null,
      },
    };
  }
};

const LaunchpadPage = ({ collection, hostedCollection }) => {
  return (
    <>
      {collection && hostedCollection ? (
        <>
          <Head>
            <title>{collection.name} | Quix Launchpad</title>
            <meta
              property="og:title"
              content={`${collection.name} | Quix Launchpad`}
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

            {collection.image_url ? (
              <>
                <meta property="og:image" content={collection.image_url} />
                <meta name="twitter:image" content={collection.image_url} />
              </>
            ) : (
              <>
                <meta property="og:image" content={`/opt_banner.png`} />
                <meta
                  name="twitter:image"
                  content={`https://${siteConfig.WEBSITE_URL}/opt_twitter.png`}
                />
              </>
            )}
          </Head>

          <Launchpad
            collection={collection}
            hostedCollection={hostedCollection}
          />
        </>
      ) : (
        <>
          <Head>
            <title>Not Found | Quix</title>
            <meta property="og:title" content={`Not Found | Quix`} />

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

          <NotFound />
        </>
      )}
    </>
  );
};

export default LaunchpadPage;
