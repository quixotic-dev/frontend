import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchMoreByURL } from "../../api/general";
import { fetchProfileHiddenTokens, showToken } from "../../api/profile";
import { State } from "../../store";
import { AssetCard } from "../AssetCard/AssetCard";
import { AssetCardGhost } from "../AssetCard/AssetCardGhost";
import { CardGrid } from "../AssetCard/styles";
import { NoItems } from "../Common/styles";

export const ProfileHiddenTokens = ({
  profileAddress,
  tokensState,
  setTokensState,
  updateTokens,
}) => {
  const gridLayout = useSelector((state: State) => state.gridLayout);

  const fetchTokens = async () => {
    setTokensState({
      ...tokensState,
      tokensUpdating: true,
    });

    const tokens = await fetchProfileHiddenTokens(profileAddress);

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

  const show = async (e, token) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await showToken(
      profileAddress,
      token.contract_address,
      token.token_id
    );
    if (res) {
      //   toast.success("Token unhidden from profile");

      setTokensState({
        ...tokensState,
        tokenResults: tokensState.tokenResults.filter((e) => e != token),
      });

      await updateTokens();
    } else {
      return toast.error("Error unhiding token from profile");
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <>
      {!!tokensState.tokensUpdating ? (
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
                {tokensState.tokenResults.map((token, index) => (
                  <AssetCard
                    token={token}
                    profile={profileAddress}
                    showToken={show}
                    key={index}
                  />
                ))}
              </InfiniteScroll>
            </CardGrid>
          ) : (
            <NoItems>
              <h1>No items to display</h1>
            </NoItems>
          )}
        </>
      )}
    </>
  );
};
