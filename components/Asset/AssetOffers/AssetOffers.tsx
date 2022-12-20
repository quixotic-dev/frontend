import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { IoMdPricetag } from "react-icons/io";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import { State } from "../../../store";
import { PriceIcon, TextTruncater } from "../../Common/styles";
import { offerFormatter } from "../../Common/Utils";
import { AcceptOfferButton } from "../AssetButtons/AcceptOfferButton";
import { CancelOfferButton } from "../AssetButtons/CancelOfferButton";
import {
  Section,
  SectionContent,
  SectionNoData,
  SectionTitle,
  SectionTitleText,
} from "../styles";
import { BuyOrdersGrid, BuyOrdersRow, BuyOrdersText } from "./styles";

export const AssetOffers = ({ token, setToken, quantityOwned }) => {
  const address = useSelector((state: State) => state.address);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Section>
      <SectionTitle onClick={() => setCollapsed(!collapsed)}>
        <SectionTitleText>
          <IoMdPricetag />
          Offers
        </SectionTitleText>
        {collapsed ? <FiChevronRight /> : <FiChevronDown />}
      </SectionTitle>
      {!collapsed && (
        <SectionContent className="offers">
          {token.buy_orders.length > 0 ? (
            <BuyOrdersGrid>
              <BuyOrdersRow className="title">
                <BuyOrdersText className="title">Price</BuyOrdersText>
                <BuyOrdersText className="title">
                  <TextTruncater>USD Price</TextTruncater>
                </BuyOrdersText>
                <BuyOrdersText className="title">Floor</BuyOrdersText>
                <BuyOrdersText className="title">Expiration</BuyOrdersText>
                <BuyOrdersText className="title">From</BuyOrdersText>
                <BuyOrdersText className="title"></BuyOrdersText>
              </BuyOrdersRow>
              {token.buy_orders.map((buy_order) => (
                <OfferRow
                  key={buy_order.id}
                  address={address}
                  token={token}
                  setToken={setToken}
                  buy_order={buy_order}
                  quantityOwned={quantityOwned}
                />
              ))}
            </BuyOrdersGrid>
          ) : (
            <SectionNoData>No offers yet</SectionNoData>
          )}
        </SectionContent>
      )}
    </Section>
  );
};

const OfferRow = ({ address, token, setToken, buy_order, quantityOwned }) => {
  const from_profile =
    buy_order.buyer.username ||
    buy_order.buyer.reverse_ens ||
    buy_order.buyer.address;

  const from_end = buy_order.buyer.username
    ? buy_order.buyer.username.length > 6
    : buy_order.buyer.reverse_ens && buy_order.buyer.reverse_ens.length > 6;

  const showUSD = useSelector((state: State) => state.showUSD);

  return (
    <BuyOrdersRow>
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
          ? (buy_order.floor_difference > 0 && "+") +
            Math.round(buy_order.floor_difference * 100) / 100 +
            "%"
          : "—"}
      </BuyOrdersText>
      <BuyOrdersText>
        <TimeAgo date={buy_order.expiration} formatter={offerFormatter} />
      </BuyOrdersText>
      <BuyOrdersText>
        <Link href={"/" + from_profile}>
          <a>
            {address === buy_order.buyer.address ? (
              "you"
            ) : (
              <>
                {from_profile.slice(0, 6)}
                {from_end && "..."}
              </>
            )}
          </a>
        </Link>
      </BuyOrdersText>
      <BuyOrdersText>
        {address === buy_order.buyer.address && (
          <CancelOfferButton
            token={token}
            setToken={setToken}
            buy_order={buy_order}
          />
        )}
        {((token.owner && address === token.owner.address) ||
          quantityOwned > 0) && (
          <AcceptOfferButton
            token={token}
            setToken={setToken}
            buy_order={buy_order}
          />
        )}
      </BuyOrdersText>
    </BuyOrdersRow>
  );
};
