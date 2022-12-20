import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchProfileOffersMade,
  fetchProfileOffersReceived,
} from "../api/profile";
import { Loader } from "../components/Loader/Loader";
import { NotLoggedIn } from "../components/NotLoggedIn/NotLoggedIn";
import { Offers } from "../components/Offers/Offers";
import { siteConfig } from "../shared/config";
import { State } from "../store";

const ProfilePage = () => {
  const address = useSelector((state: State) => state.address);
  const [offersMade, setOffersMade] = useState(null);
  const [offersReceived, setOffersReceived] = useState(null);

  useEffect(() => {
    async function fetchOffers() {
      const offersMadePromise = fetchProfileOffersMade(address);
      const offersReceivedPromise = fetchProfileOffersReceived(address);

      const [offersMadeRes, offersReceivedRes] = await Promise.all([
        offersMadePromise,
        offersReceivedPromise,
      ]);

      setOffersMade(offersMadeRes);
      setOffersReceived(offersReceivedRes);
    }

    if (address) {
      setOffersMade(null);
      setOffersReceived(null);
      fetchOffers();
    }
  }, [address]);

  return (
    <>
      <Head>
        <title>Offers | Quix</title>
        <meta property="og:title" content={`Offers | Quix`} />

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

      {offersMade && offersReceived ? (
        <Offers offersMade={offersMade} offersReceived={offersReceived} />
      ) : address ? (
        <Loader />
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default ProfilePage;
