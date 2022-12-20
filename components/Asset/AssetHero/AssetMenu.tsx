import { useEffect, useState } from "react";
import { BiExpandAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaCopy, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdRefresh, MdShare } from "react-icons/md";
import {
  RiCheckboxCircleFill,
  RiHeartFill,
  RiHeartLine,
  RiShareBoxFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { likeToken, unlikeToken } from "../../../api/token";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { updateLogin } from "../../../store/login";
import { updateProfile } from "../../../store/profile";
import { CartButton } from "./CartButton";
import {
  AssetMenuButton,
  AssetMenuButtonGrid,
  AssetMenuContainer,
  AssetMenuDropdown,
  AssetMenuDropdownRow,
  LikeCount,
  ShareMenuContainer,
} from "./styles";

export const AssetMenu = ({
  token,
  refreshToken,
  tokenRefreshed,
  setLightboxIsOpen,
}) => {
  const dispatch = useDispatch();
  const address = useSelector((state: State) => state.address);
  const profile = useSelector((state: State) => state.profile);

  const currentURL = `https://${siteConfig.WEBSITE_URL}/asset/${
    token.network != siteConfig.NETWORK ? "eth/" : ""
  }${token.contract_address}/${token.token_id}`;
  const tweetURL = `https://twitter.com/intent/tweet?text=Check%20out%20this%20@optimismFND%20NFT%20on%20Quix%20${currentURL}%20via%20@qx_app`;

  const [expanded, setExpanded] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const openShareMenu = async (e) => {
    if (navigator.canShare) {
      navigator.share({
        title: token.name,
        url: currentURL,
      });
    } else {
      setShowShareDropdown(e);
    }
  };

  const copyCurrentURL = async () => {
    await navigator.clipboard.writeText(currentURL);
    setLinkCopied(true);

    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  const [tokenLiked, setTokenLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(token.like_count);

  const updateLikeStatus = async () => {
    if (!address) {
      return updateLogin(true, dispatch);
    }

    if (tokenLiked) {
      setTokenLiked(false);
      setLikeCount(likeCount - 1);
      const res = await unlikeToken(
        token.contract_address,
        token.token_id,
        address
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setTokenLiked(true);
        setLikeCount(likeCount + 1);
      }
    } else {
      setTokenLiked(true);
      setLikeCount(likeCount + 1);
      const res = await likeToken(
        token.contract_address,
        token.token_id,
        address
      );
      if (res) {
        updateProfile(res, dispatch);
      } else {
        setTokenLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  useEffect(() => {
    if (profile && profile.likes) {
      const likes = new Set(
        profile.likes.map(function (like) {
          return `${like["token"]["collection"]["address"]}:${like["token"]["token_id"]}`;
        })
      );
      setTokenLiked(likes.has(`${token.contract_address}:${token.token_id}`));
    }
  }, [profile]);

  return (
    <AssetMenuContainer
      onMouseOver={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <AssetMenuButtonGrid className={expanded ? null : "hidden"}>
        <AssetMenuButton
          className="expand-button"
          onClick={() => setExpanded(!expanded)}
          data-tip="Expand Media"
        >
          <BsThreeDots />
        </AssetMenuButton>

        {!!token.sell_order &&
          token.sell_order.payment_token.symbol == "ETH" &&
          token.sell_order.contract_version == 6 &&
          token.collection.contract_type == "ERC-721" && (
            <CartButton token={token} expanded={expanded} />
          )}

        <AssetMenuButton onClick={() => setLightboxIsOpen(true)}>
          <BiExpandAlt />
        </AssetMenuButton>

        <AssetMenuButton
          className={expanded ? null : "hidden"}
          onClick={updateLikeStatus}
          data-tip={tokenLiked ? "Unfavorite" : "Favorite"}
        >
          {tokenLiked ? <RiHeartFill /> : <RiHeartLine />}
          {likeCount > 0 && <LikeCount>{likeCount}</LikeCount>}
        </AssetMenuButton>
        <AssetMenuButton
          className={expanded ? "refresh" : "refresh hidden"}
          onClick={refreshToken}
          data-tip="Refresh Token"
        >
          {tokenRefreshed ? <RiCheckboxCircleFill /> : <MdRefresh />}
        </AssetMenuButton>

        {token.external_url && (
          <a
            href={token.external_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AssetMenuButton
              className={expanded ? null : "hidden"}
              data-tip={"View on " + token.collection.name}
            >
              <RiShareBoxFill />
            </AssetMenuButton>
          </a>
        )}

        <ShareMenuContainer
          onMouseOver={() => openShareMenu(true)}
          onMouseLeave={() => openShareMenu(false)}
        >
          <AssetMenuButton className={expanded ? "last" : "hidden last"}>
            <MdShare />
            {showShareDropdown && (
              <AssetMenuDropdown>
                <AssetMenuDropdownRow onClick={copyCurrentURL}>
                  {linkCopied ? <RiCheckboxCircleFill /> : <FaCopy />}
                  Copy Link
                </AssetMenuDropdownRow>
                <a href={tweetURL} target="_blank" rel="noopener noreferrer">
                  <AssetMenuDropdownRow>
                    <FaTwitter />
                    Share on Twitter
                  </AssetMenuDropdownRow>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AssetMenuDropdownRow className="last">
                    <FaFacebook />
                    Share on Facebook
                  </AssetMenuDropdownRow>
                </a>
              </AssetMenuDropdown>
            )}
          </AssetMenuButton>
        </ShareMenuContainer>
      </AssetMenuButtonGrid>
    </AssetMenuContainer>
  );
};
