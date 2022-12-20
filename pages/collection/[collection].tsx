import Head from "next/head";
import { useEffect } from "react";
import removeMd from "remove-markdown";
import { fetchCollection } from "../../api/collection";
import { Collection } from "../../components/Collection/Collection";
import { NotFound } from "../../components/NotFound/NotFound";
import { siteConfig } from "../../shared/config";
import { collectionVisited } from "../../utils/mixpanel";

export const getServerSideProps = async ({ query }) => {
  const collection = await fetchCollection(query.collection);

  const selectedTab = query.tab ? query.tab : 0;
  const availabilityParam = query.availability ? query.availability : "";
  const intersectAttributesParam = query.intersect_attributes
    ? query.intersect_attributes === "true"
    : "";
  const sortParam = query.sort
    ? query.sort
    : collection && collection.default_sort_str
    ? collection.default_sort_str
    : "";
  const activitySortParam = query.activitySort
    ? query.activitySort
    : "timestamp:desc";
  const priceArr = query.price ? query.price.split(":") : [];
  const paymentTokenParam = query.currency ? query.currency : "all";
  let minPriceParam = "";
  let maxPriceParam = "";
  if (priceArr.length == 1) {
    minPriceParam = priceArr[0];
  } else if (priceArr.length == 2) {
    minPriceParam = priceArr[0];
    maxPriceParam = priceArr[1];
  }
  const searchQueryParam = query.query ? query.query : "";
  const attributesParam = query.attributes
    ? query.attributes
        .split("&attribute=")
        .map((attribute) => {
          const attributeArr = attribute.split(":");
          if (attributeArr[0] != "") {
            return {
              trait_type: attributeArr[0].replace("attribute=", ""),
              value: attributeArr[1],
            };
          }
        })
        .filter(function (e) {
          return e !== undefined;
        })
    : [];
  const eventTypesParam = query.eventTypes
    ? query.eventTypes.split("&event=").map((event) => {
        if (event != "") {
          return event.replace("event=", "");
        }
      })
    : ["Sale"];
  const chainsParam = query.chains
    ? query.chains.split("&chain=").map((chain) => {
        if (chain != "") {
          return chain.replace("chain=", "");
        }
      })
    : [];

  return {
    props: {
      collection,
      attributesParam,
      intersectAttributesParam,
      sortParam,
      activitySortParam,
      availabilityParam,
      minPriceParam,
      maxPriceParam,
      paymentTokenParam,
      eventTypesParam,
      chainsParam,
      searchQueryParam,
      selectedTab,
      key: collection ? collection.address : null,
    },
  };
};

const CollectionPage = ({
  collection,
  attributesParam,
  intersectAttributesParam,
  sortParam,
  activitySortParam,
  availabilityParam,
  minPriceParam,
  maxPriceParam,
  paymentTokenParam,
  eventTypesParam,
  chainsParam,
  searchQueryParam,
  selectedTab,
}) => {
  useEffect(() => {
    !!collection && collectionVisited(collection.address);
  }, []);

  const formattedDescription = !!collection
    ? removeMd(collection.description)
    : "";

  return (
    <>
      {!!collection ? (
        <>
          <Head>
            <title>{collection.name} | Quix</title>
            <meta property="og:title" content={collection.name + " | Quix"} />

            {collection.description ? (
              <>
                <meta name="description" content={formattedDescription} />
                <meta
                  property="og:description"
                  content={formattedDescription}
                />
                <meta
                  name="twitter:description"
                  content={formattedDescription}
                />
              </>
            ) : (
              <>
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
              </>
            )}

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

          <Collection
            collection={collection}
            attributesParam={attributesParam}
            intersectAttributesParam={intersectAttributesParam}
            sortParam={sortParam}
            activitySortParam={activitySortParam}
            availabilityParam={availabilityParam}
            minPriceParam={minPriceParam}
            maxPriceParam={maxPriceParam}
            paymentTokenParam={paymentTokenParam}
            eventTypesParam={eventTypesParam}
            chainsParam={chainsParam}
            searchQueryParam={searchQueryParam}
            tab={selectedTab}
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

export default CollectionPage;
