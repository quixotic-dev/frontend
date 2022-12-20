import Head from "next/head";
import { fetchExtendedSearchResults } from "../api/search";
import { Search } from "../components/Search/Search";
import { siteConfig } from "../shared/config";

export const getServerSideProps = async ({ query }) => {
  const searchResults = await fetchExtendedSearchResults(query.query);

  return {
    props: {
      query: query.query,
      collections: searchResults.collections,
      profiles: searchResults.profiles,
      tokens: searchResults.tokens,
    },
  };
};

const SearchPage = ({ query, collections, profiles, tokens }) => {
  return (
    <>
      <Head>
        <title>Search | Quix</title>
        <meta property="og:title" content={`Search | Quix`} />

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
      <Search
        query={query}
        collections={collections}
        profiles={profiles}
        tokens={tokens}
      />
    </>
  );
};

export default SearchPage;
