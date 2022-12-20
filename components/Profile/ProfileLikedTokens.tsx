import Link from "next/link";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { fetchMoreByURL } from "../../api/general";
import { fetchProfileLikedTokens } from "../../api/profile";
import { State } from "../../store";
import { AssetCard } from "../AssetCard/AssetCard";
import { AssetCardGhost } from "../AssetCard/AssetCardGhost";
import { CardGrid } from "../AssetCard/styles";
import { NoItems } from "../Common/styles";
import { NoItemsButton } from "./styles";

export const ProfileLikedTokens = ({
  profileAddress,
  tokensState,
  setTokensState,
}) => {
  const current_user = useSelector((state: State) => state.profile);
  const gridLayout = useSelector((state: State) => state.gridLayout);

  const fetchTokens = async () => {
    setTokensState({
      ...tokensState,
      tokensUpdating: true,
    });

    const tokens = await fetchProfileLikedTokens(profileAddress);

    if (tokens) {
      setTokensState({
        ...tokensState,
        tokens: tokens,
        moreTokens: tokens.next ? true : false,
        tokenResults: tokens.results,
        tokensUpdating: false,
      });
    }
  };

  const fetchMoreTokens = async () => {
    if (tokensState.tokens && tokensState.tokens.next) {
      const moreTokens = await fetchMoreByURL(tokensState.tokens.next);

      setTokensState({
        ...tokensState,
        tokens: moreTokens,
        moreTokens: moreTokens.next ? true : false,
        tokenResults: tokensState.tokenResults.concat(moreTokens.results),
      });
    }
  };

  useEffect(() => {
    if (!tokensState.tokens) {
      fetchTokens();
    }
  }, []);

  return (
    <>
      {!tokensState.tokens ? (
        <CardGrid className={gridLayout == 0 ? "large" : null}>
          {[...Array(18)].map((e, i) => (
            <AssetCardGhost key={i} />
          ))}
        </CardGrid>
      ) : (
        <>
          {!!tokensState.tokenResults && tokensState.tokenResults.length > 0 ? (
            <CardGrid className={gridLayout == 0 ? "large" : null}>
              <InfiniteScroll
                dataLength={tokensState.tokenResults.length}
                next={fetchMoreTokens}
                hasMore={tokensState.moreTokens}
                loader={[...Array(6)].map((e, i) => (
                  <AssetCardGhost key={i} />
                ))}
                style={{ display: "contents", overflow: "visible" }}
              >
                {tokensState.tokenResults.map((likedToken, index) => (
                  <AssetCard token={likedToken.token} key={index} />
                ))}
              </InfiniteScroll>
            </CardGrid>
          ) : (
            <NoItems>
              <h1>No items to display</h1>
              {current_user && current_user.address == profileAddress && (
                <Link href="/explore">
                  <a>
                    <NoItemsButton>Browse Marketplace</NoItemsButton>
                  </a>
                </Link>
              )}
            </NoItems>
          )}
        </>
      )}
    </>
  );
};
