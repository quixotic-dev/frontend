import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { RiArrowRightDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { ProfileImage } from "../Images/ProfileImage";
import { TokenImage } from "../Images/TokenImage";
import { PriceIcon, TextTruncater } from "../styles";
import { activityIconRegistry, expirationFormatter } from "../Utils";
import {
  ActivityGridMobileRow,
  ActivityGridRow,
  ActivityIcon,
  ActivityInfo,
  ActivityInfoText,
  ActivityState,
  ActivityText,
  CollectionName,
  DateContainer,
  PriceSmall,
  ProfileGrid,
  ProfileIcon,
  TokenImageContainer,
  TokenName,
  VerifiedIcon,
} from "./styles";

export const AssetActivityRow = ({ token, event }) => {
  const showUSD = useSelector((state: State) => state.showUSD);

  const from_profile =
    event.from_profile &&
    (event.from_profile.username ||
      event.from_profile.reverse_ens ||
      event.from_profile.address);

  const from_profile_short =
    event.from_profile &&
    (event.from_profile.username
      ? event.from_profile.username
      : event.from_profile.reverse_ens
      ? event.from_profile.reverse_ens
      : event.from_profile.address.slice(0, 6));

  const to_profile =
    event.to_profile &&
    (event.to_profile.username ||
      event.to_profile.reverse_ens ||
      event.to_profile.address);

  const to_profile_short =
    event.to_profile &&
    (event.to_profile.username
      ? event.to_profile.username
      : event.to_profile.reverse_ens
      ? event.to_profile.reverse_ens
      : event.to_profile.address.slice(0, 6));

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ActivityGridRow className="asset-activity">
      <ActivityInfo className="type">
        <ActivityInfoText>
          <ActivityIcon>{activityIconRegistry[event.event_type]}</ActivityIcon>
          <TextTruncater>{event.event_type}</TextTruncater>
        </ActivityInfoText>
        <ActivityState>
          <TextTruncater>
            {event.sell_order &&
              !event.sell_order.fulfilled &&
              (event.sell_order.cancelled
                ? "Cancelled"
                : !event.sell_order.active && "Expired")}
            {event.dutch_auction &&
              !event.dutch_auction.fulfilled &&
              (event.dutch_auction.cancelled
                ? "Cancelled"
                : !event.dutch_auction.active && "Expired")}
            {event.buy_order &&
              !event.buy_order.fulfilled &&
              (event.buy_order.cancelled
                ? "Cancelled"
                : !event.buy_order.active && "Expired")}
          </TextTruncater>
        </ActivityState>
      </ActivityInfo>
      <ActivityGridMobileRow>
        <ActivityInfo className="item asset-activity">
          <TokenImageContainer>
            <TokenImage token={token} />
          </TokenImageContainer>
          <ActivityText>
            <CollectionName>
              <TextTruncater>{token.collection.name}</TextTruncater>
              {token.collection.verified && (
                <VerifiedIcon>
                  <MdVerified />
                </VerifiedIcon>
              )}
            </CollectionName>
            <TokenName>
              <TextTruncater>{token.name}</TextTruncater>
            </TokenName>
          </ActivityText>
        </ActivityInfo>

        <ActivityText>
          <ActivityInfo className="price">
            {event.event_type == "Sale" ? (
              <>
                <PriceIcon>
                  <Image
                    src={`/payment_tokens/${
                      event.sell_order
                        ? event.sell_order.payment_token.symbol
                        : event.buy_order
                        ? event.buy_order.payment_token.symbol
                        : event.dutch_auction &&
                          event.dutch_auction.payment_token.symbol
                    }.png`}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    width={50}
                    height={50}
                  />
                </PriceIcon>
                {ethers.utils.formatEther(
                  ethers.utils.parseUnits(
                    event.sell_order
                      ? event.sell_order.price.toString()
                      : event.buy_order
                      ? event.buy_order.price.toString()
                      : event.dutch_auction
                      ? event.dutch_auction.price.toString()
                      : "0",
                    "gwei"
                  )
                )}
              </>
            ) : event.event_type == "List" ? (
              <>
                <PriceIcon>
                  <Image
                    src={`/payment_tokens/${
                      event.sell_order
                        ? event.sell_order.payment_token.symbol
                        : event.buy_order
                        ? event.buy_order.payment_token.symbol
                        : event.dutch_auction &&
                          event.dutch_auction.payment_token.symbol
                    }.png`}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    width={50}
                    height={50}
                  />
                </PriceIcon>
                {ethers.utils.formatEther(
                  ethers.utils.parseUnits(
                    event.sell_order
                      ? event.sell_order.price.toString()
                      : event.dutch_auction
                      ? event.dutch_auction.start_price.toString()
                      : "0",
                    "gwei"
                  )
                )}
                {event.dutch_auction && (
                  <ActivityIcon className="dutchAuction">
                    <RiArrowRightDownLine />
                  </ActivityIcon>
                )}
              </>
            ) : event.event_type == "Offer" ? (
              <>
                <PriceIcon>
                  <Image
                    src={`/payment_tokens/${
                      event.sell_order
                        ? event.sell_order.payment_token.symbol
                        : event.buy_order
                        ? event.buy_order.payment_token.symbol
                        : event.dutch_auction &&
                          event.dutch_auction.payment_token.symbol
                    }.png`}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                    width={50}
                    height={50}
                  />
                </PriceIcon>
                {ethers.utils.formatEther(
                  ethers.utils.parseUnits(
                    event.buy_order ? event.buy_order.price.toString() : "0",
                    "gwei"
                  )
                )}
              </>
            ) : (
              "—"
            )}
          </ActivityInfo>
          <PriceSmall>
            {showUSD &&
              (event.sell_order && !!event.sell_order.usd_price
                ? event.sell_order.usd_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : event.buy_order && !!event.buy_order.usd_price
                ? event.buy_order.usd_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : event.dutch_auction &&
                  !!event.dutch_auction.usd_price &&
                  event.dutch_auction.usd_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }))}
          </PriceSmall>
        </ActivityText>
      </ActivityGridMobileRow>

      <ActivityGridMobileRow className="bottom">
        <div>
          <ActivityInfo className="title mobile">From</ActivityInfo>
          <ActivityInfo>
            {from_profile ? (
              <Link href={"/" + from_profile}>
                <a>
                  <ProfileGrid>
                    <ProfileIcon>
                      <ProfileImage profile={event.from_profile} />
                    </ProfileIcon>
                    <TextTruncater>{from_profile_short}</TextTruncater>
                  </ProfileGrid>
                </a>
              </Link>
            ) : (
              "—"
            )}
          </ActivityInfo>
        </div>

        <div>
          <ActivityInfo className="title mobile">To</ActivityInfo>
          <ActivityInfo>
            {to_profile ? (
              <Link href={"/" + to_profile}>
                <a>
                  <ProfileGrid>
                    <ProfileIcon>
                      <ProfileImage profile={event.to_profile} />
                    </ProfileIcon>
                    <TextTruncater>{to_profile_short}</TextTruncater>
                  </ProfileGrid>
                </a>
              </Link>
            ) : (
              "—"
            )}
          </ActivityInfo>
        </div>

        {event.txn_id ? (
          <a
            href={`${
              siteConfig.NETWORK != token.network
                ? siteConfig.L1_BLOCK_EXPLORER_URL
                : siteConfig.L2_BLOCK_EXPLORER_URL
            }/tx/${event.txn_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DateContainer>
              <ActivityInfo className="title mobile date">Date</ActivityInfo>
              <ActivityInfo className="date" onClick={handleChildClick}>
                <TextTruncater>
                  <TimeAgo
                    date={event.timestamp}
                    formatter={expirationFormatter}
                  />
                </TextTruncater>
                <BiLinkExternal />
              </ActivityInfo>
            </DateContainer>
          </a>
        ) : (
          <DateContainer>
            <ActivityInfo className="title mobile date">Date</ActivityInfo>
            <ActivityInfo>
              <TextTruncater>
                <TimeAgo
                  date={event.timestamp}
                  formatter={expirationFormatter}
                />
              </TextTruncater>
            </ActivityInfo>
          </DateContainer>
        )}
      </ActivityGridMobileRow>
    </ActivityGridRow>
  );
};
