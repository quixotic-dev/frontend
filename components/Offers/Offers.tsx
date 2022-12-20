import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import TimeAgo from "react-timeago";
import { ModalProvider } from "styled-react-modal";
import { fetchMoreByURL } from "../../api/general";
import { siteConfig } from "../../shared/config";
import { AcceptOfferButton } from "../Asset/AssetButtons/AcceptOfferButton";
import { CancelOfferButton } from "../Asset/AssetButtons/CancelOfferButton";
import { LoadingRing } from "../Asset/AssetHero/styles";
import {
  ActivityInfo,
  ActivityText,
  CollectionName,
  TokenImageContainer,
  TokenName,
  VerifiedIcon,
} from "../Common/Activity/styles";
import { TokenImage } from "../Common/Images/TokenImage";
import { ModalBackground } from "../Common/StyledModal/styles";
import { PriceIcon, TextTruncater } from "../Common/styles";
import { offerFormatter } from "../Common/Utils";
import {
  BuyOrdersGrid,
  BuyOrdersRow,
  BuyOrdersText,
  ContainerBackground,
  ContainerExtended,
  Grid,
  Title,
} from "./styles";

export const Offers = ({ offersMade, offersReceived }) => {
  const [offersMadeState, setOffersMadeState] = useState({
    offers: offersMade,
    moreResults: offersMade.next ? true : false,
    results: offersMade.results,
  });

  const [offersReceivedState, setOffersReceivedState] = useState({
    offers: offersReceived,
    moreResults: offersReceived.next ? true : false,
    results: offersReceived.results,
  });

  const fetchMoreOffersMade = async () => {
    const res = await fetchMoreByURL(offersMadeState.offers.next);

    setOffersMadeState({
      ...offersMadeState,
      offers: res,
      moreResults: res.next ? true : false,
      results: offersMadeState.results.concat(res.results),
    });
  };

  const fetchMoreOffersReceived = async () => {
    const res = await fetchMoreByURL(offersReceivedState.offers.next);

    setOffersReceivedState({
      ...offersReceivedState,
      offers: res,
      moreResults: res.next ? true : false,
      results: offersReceivedState.results.concat(res.results),
    });
  };

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ContainerBackground>
        <ContainerExtended>
          <Grid>
            <div>
              <Title>Offers Made</Title>
              {offersMadeState.results.length > 0 ? (
                <InfiniteScroll
                  dataLength={offersMadeState.results.length}
                  next={fetchMoreOffersMade}
                  hasMore={offersMadeState.moreResults}
                  loader={<LoadingRing />}
                  style={{ overflow: "visible" }}
                >
                  <BuyOrdersGrid>
                    <BuyOrdersRow className="title">
                      <BuyOrdersText className="title">Token</BuyOrdersText>
                      <BuyOrdersText className="title">Price</BuyOrdersText>
                      <BuyOrdersText className="title">USD Price</BuyOrdersText>
                      <BuyOrdersText className="title">Floor</BuyOrdersText>
                      <BuyOrdersText className="title">Owner</BuyOrdersText>
                      <BuyOrdersText className="title">Created</BuyOrdersText>
                      <BuyOrdersText className="title">Expires</BuyOrdersText>
                      <BuyOrdersText className="title"></BuyOrdersText>
                    </BuyOrdersRow>
                    {offersMadeState.results.map((buy_order) => (
                      <OfferRow key={buy_order.id} buy_order={buy_order} />
                    ))}
                  </BuyOrdersGrid>
                </InfiniteScroll>
              ) : (
                <>No offers made yet</>
              )}
            </div>
            <div>
              <Title>Offers Received</Title>
              {offersReceivedState.results.length > 0 ? (
                <InfiniteScroll
                  dataLength={offersReceivedState.results.length}
                  next={fetchMoreOffersReceived}
                  hasMore={offersReceivedState.moreResults}
                  loader={<LoadingRing />}
                  style={{ overflow: "visible" }}
                >
                  <BuyOrdersGrid>
                    <BuyOrdersRow className="title">
                      <BuyOrdersText className="title">Token</BuyOrdersText>
                      <BuyOrdersText className="title">Price</BuyOrdersText>
                      <BuyOrdersText className="title">USD Price</BuyOrdersText>
                      <BuyOrdersText className="title">Floor</BuyOrdersText>
                      <BuyOrdersText className="title">From</BuyOrdersText>
                      <BuyOrdersText className="title">Created</BuyOrdersText>
                      <BuyOrdersText className="title">Expires</BuyOrdersText>
                      <BuyOrdersText className="title"></BuyOrdersText>
                    </BuyOrdersRow>
                    {offersReceivedState.results.map((buy_order) => (
                      <OfferRow
                        key={buy_order.id}
                        buy_order={buy_order}
                        received={true}
                      />
                    ))}
                  </BuyOrdersGrid>
                </InfiniteScroll>
              ) : (
                <>No offers received yet</>
              )}
            </div>
          </Grid>
        </ContainerExtended>
      </ContainerBackground>
    </ModalProvider>
  );
};

const OfferRow = ({ buy_order, received = false }) => {
  const [token, setToken] = useState(buy_order.token);

  const from_profile =
    buy_order.buyer.username ||
    buy_order.buyer.reverse_ens ||
    buy_order.buyer.address;

  const from_short =
    buy_order.buyer.username ||
    buy_order.buyer.reverse_ens ||
    buy_order.buyer.address.slice(0, 6);

  const owner_profile =
    token.owner &&
    (token.owner.username || token.owner.reverse_ens || token.owner.address);

  const owner_short =
    token.owner &&
    (token.owner.username ||
      token.owner.reverse_ens ||
      token.owner.address.slice(0, 6));

  return (
    <BuyOrdersRow>
      <Link
        href={`/asset/${token.network != siteConfig.NETWORK ? "eth/" : ""}${
          token.contract_address
        }/${token.token_id}`}
        passHref
      >
        <a>
          <ActivityInfo className="item">
            <TokenImageContainer>
              <TokenImage token={token} />
            </TokenImageContainer>
            <ActivityText>
              <Link
                href={
                  token.collection.slug
                    ? `/collection/${token.collection.slug}`
                    : `/collection/${token.collection.address}`
                }
              >
                <a>
                  <CollectionName>
                    <TextTruncater>{token.collection.name}</TextTruncater>
                    {token.collection.verified && (
                      <VerifiedIcon>
                        <MdVerified />
                      </VerifiedIcon>
                    )}
                  </CollectionName>
                </a>
              </Link>
              <TokenName>
                <TextTruncater>{token.name}</TextTruncater>
              </TokenName>
            </ActivityText>
          </ActivityInfo>
        </a>
      </Link>
      <BuyOrdersText>
        <PriceIcon>
          <Image
            src={`/payment_tokens/${buy_order.payment_token.symbol}.png`}
            alt=""
            layout="responsive"
            objectFit="contain"
            objectPosition="center"
            width={50}
            height={50}
            priority
          />
        </PriceIcon>
        {ethers.utils.formatEther(
          ethers.utils.parseUnits(buy_order.price.toString(), "gwei")
        )}
      </BuyOrdersText>
      <BuyOrdersText>
        {!!buy_order.usd_price &&
          buy_order.usd_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
      </BuyOrdersText>
      <BuyOrdersText>
        {buy_order.floor_difference
          ? (buy_order.floor_difference > 0 ? "+" : "") +
            (
              Math.round(buy_order.floor_difference * 100) / 100
            ).toLocaleString() +
            "%"
          : "—"}
      </BuyOrdersText>
      {received ? (
        <BuyOrdersText>
          <Link href={"/" + from_profile}>
            <a>{from_short}</a>
          </Link>
        </BuyOrdersText>
      ) : (
        <BuyOrdersText>
          {token.owner ? (
            <Link href={"/" + owner_profile}>
              <a>{owner_short}</a>
            </Link>
          ) : (
            "—"
          )}
        </BuyOrdersText>
      )}
      <BuyOrdersText>
        <TimeAgo date={buy_order.start_time} formatter={offerFormatter} />
      </BuyOrdersText>
      <BuyOrdersText>
        <TimeAgo date={buy_order.expiration} formatter={offerFormatter} />
      </BuyOrdersText>
      <BuyOrdersText className="button">
        {received ? (
          <AcceptOfferButton
            token={token}
            setToken={setToken}
            buy_order={buy_order}
          />
        ) : (
          <CancelOfferButton
            token={token}
            setToken={setToken}
            buy_order={buy_order}
          />
        )}
      </BuyOrdersText>
    </BuyOrdersRow>
  );
};
