import { siteConfig } from "../../shared/config";
import { Explore } from "./Explore/Explore";
import { FeaturedAssets } from "./FeaturedAssets/FeaturedAssets";
import { FeaturedCollections } from "./FeaturedCollections/FeaturedCollections";
import { GasTracker } from "./GasTracker/GasTracker";
import { Hero } from "./Hero/Hero";
import { Mirror } from "./Mirror/Mirror";
import { Arbitrum } from "./Network/Arbitrum";
import { Optimism } from "./Network/Optimism";
import { OptimismNFTs } from "./OptimismNFTs/OptimismNFTs";
import { Quixotic } from "./Quixotic/Quixotic";
import { Trending } from "./Trending/Trending";

export const Home = ({ featured, collections }) => {
  return (
    <>
      <Hero collection={featured ? featured.collections[0] : null} />
      {featured && featured.collections.length > 0 && (
        <FeaturedCollections collections={featured.collections.slice(0, 6)} />
      )}

      {featured && featured.mirror && featured.mirror.length > 0 && (
        <Mirror collections={featured.mirror} />
      )}

      {collections && collections.results.length > 0 && (
        <Trending top_collections={collections.results.slice(0, 15)} />
      )}

      {featured && featured.opog && featured.opog.length > 0 && (
        <OptimismNFTs collections={featured.opog.slice(0, 3)} />
      )}

      <Optimism />

      {featured && featured.tokens.length > 0 && (
        <FeaturedAssets tokens={featured.tokens.slice(0, 10)} />
      )}

      <Quixotic />

      <GasTracker />
      <Explore />
    </>
  );
};
