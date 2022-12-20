import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import { ModalProvider } from "styled-react-modal";
import { fetchMoreByURL } from "../../api/general";
import { fetchErc1155TokenOwnedQuantity } from "../../api/token";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { CancelSellOrderButton } from "../Asset/AssetButtons/CancelSellOrderButton";
import { SellButton } from "../Asset/AssetButtons/SellButton";
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

export const List = ({ listed, unlisted }) => {
  const [listedState, setListedState] = useState({
    tokens: listed,
    moreResults: listed.next ? true : false,
    results: listed.results,
  });

  const [unlistedState, setUnlistedState] = useState({
    tokens: unlisted,
    moreResults: unlisted.next ? true : false,
    results: unlisted.results,
  });

  const fetchMoreListings = async () => {
    const res = await fetchMoreByURL(listedState.tokens.next);

    setListedState({
      ...listedState,
      tokens: res,
      moreResults: res.next ? true : false,
      results: listedState.results.concat(res.results),
    });
  };

  const fetchMoreUnlistings = async () => {
    const res = await fetchMoreByURL(unlistedState.tokens.next);

    setUnlistedState({
      ...unlistedState,
      tokens: res,
      moreResults: res.next ? true : false,
      results: unlistedState.results.concat(res.results),
    });
  };

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ContainerBackground>
        <ContainerExtended>
          <Grid>
            <div>
              <Title>Manage Listings</Title>
              {listedState.results.length > 0 ? (
                <InfiniteScroll
                  dataLength={listedState.results.length}
                  next={fetchMoreListings}
                  hasMore={listedState.moreResults}
                  loader={<LoadingRing />}
                  style={{ overflow: "visible" }}
                >
                  <BuyOrdersGrid>
                    <BuyOrdersRow className="title">
                      <BuyOrdersText className="title">NFT</BuyOrdersText>
                      <BuyOrdersText className="title">Price</BuyOrdersText>
                      <BuyOrdersText className="title">USD Price</BuyOrdersText>
                      <BuyOrdersText className="title">Expires</BuyOrdersText>
                      <BuyOrdersText className="title">Manage</BuyOrdersText>
                    </BuyOrdersRow>
                    {listedState.results.map((token, index) => (
                      <TokenRow key={index} listed_token={token} />
                    ))}
                  </BuyOrdersGrid>
                </InfiniteScroll>
              ) : (
                <>No active listings</>
              )}
            </div>
            <div>
              {unlistedState.results.length > 0 ? (
                <InfiniteScroll
                  dataLength={unlistedState.results.length}
                  next={fetchMoreUnlistings}
                  hasMore={unlistedState.moreResults}
                  loader={<LoadingRing />}
                  style={{ overflow: "visible" }}
                >
                  <BuyOrdersGrid>
                    <BuyOrdersRow className="title">
                      <BuyOrdersText className="title">
                        Unlisted NFTs
                      </BuyOrdersText>
                      <BuyOrdersText className="title"></BuyOrdersText>
                      <BuyOrdersText className="title"></BuyOrdersText>
                      <BuyOrdersText className="title"></BuyOrdersText>
                      <BuyOrdersText className="title"></BuyOrdersText>
                    </BuyOrdersRow>
                    {unlistedState.results.map((token, index) => (
                      <TokenRow key={index} listed_token={token} />
                    ))}
                  </BuyOrdersGrid>
                </InfiniteScroll>
              ) : (
                <>No tokens found</>
              )}
            </div>
          </Grid>
        </ContainerExtended>
      </ContainerBackground>
    </ModalProvider>
  );
};

const TokenRow = ({ listed_token }) => {
  const address = useSelector((state: State) => state.address);

  const [token, setToken] = useState(listed_token);

  const [quantityOwned, setQuantityOwned] = useState(0);
  const [quantityListed, setQuantityListed] = useState(0);
  useEffect(() => {
    const fetchQuantityOwned = async () => {
      const res = await fetchErc1155TokenOwnedQuantity(
        token.collection.address,
        token.token_id,
        address
      );
      setQuantityOwned(res.quantity);
      setQuantityListed(res.listed);
    };

    if (address && token.collection.contract_type == "ERC-1155") {
      fetchQuantityOwned();
    }
  }, [address]);

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
        {token.sell_order && token.sell_order.seller.address == address && (
          <>
            <PriceIcon>
              <Image
                src={`/payment_tokens/${token.sell_order.payment_token.symbol}.png`}
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
              ethers.utils.parseUnits(token.sell_order.price.toString(), "gwei")
            )}
          </>
        )}
      </BuyOrdersText>

      <BuyOrdersText>
        {token.sell_order &&
          token.sell_order.seller.address == address &&
          !!token.sell_order.usd_price &&
          token.sell_order.usd_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
      </BuyOrdersText>

      <BuyOrdersText>
        {token.sell_order && token.sell_order.seller.address == address && (
          <TimeAgo
            date={token.sell_order.expiration}
            formatter={offerFormatter}
          />
        )}
      </BuyOrdersText>
      <BuyOrdersText className="button">
        {token.collection.contract_type == "ERC-721" && (
          <>
            {!token.sell_order &&
              !token.collection.delisted &&
              !token.collection.non_transferable && (
                <SellButton
                  token={token}
                  setToken={setToken}
                  setQuantityListed={setQuantityListed}
                  tiny={true}
                />
              )}

            {token.sell_order && (
              <CancelSellOrderButton
                token={token}
                setToken={setToken}
                sell_order={token.sell_order}
                setQuantityListed={setQuantityListed}
                tiny={true}
              />
            )}
          </>
        )}

        {token.collection.contract_type == "ERC-1155" && (
          <>
            {!token.collection.delisted &&
              !token.collection.non_transferable &&
              (quantityListed == 0 ? (
                <SellButton
                  token={token}
                  setToken={setToken}
                  setQuantityListed={setQuantityListed}
                  tiny={true}
                />
              ) : (
                <></>
              ))}
          </>
        )}
      </BuyOrdersText>
    </BuyOrdersRow>
  );
};
