import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { IoMdPricetags } from "react-icons/io";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import { State } from "../../../store";
import { PriceIcon } from "../../Common/styles";
import { offerFormatter } from "../../Common/Utils";
import { BuySellOrderButton } from "../AssetButtons/BuySellOrderButton";
import { CancelSellOrderButton } from "../AssetButtons/CancelSellOrderButton";
import {
  Section,
  SectionContent,
  SectionNoData,
  SectionTitle,
  SectionTitleText,
} from "../styles";
import { BuyOrdersGrid, BuyOrdersRow, BuyOrdersText } from "./styles";

export const AssetListings = ({
  token,
  setToken,
  setQuantityOwned,
  setQuantityListed,
}) => {
  const address = useSelector((state: State) => state.address);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Section>
      <SectionTitle onClick={() => setCollapsed(!collapsed)}>
        <SectionTitleText>
          <IoMdPricetags />
          Listings
        </SectionTitleText>
        {collapsed ? <FiChevronRight /> : <FiChevronDown />}
      </SectionTitle>
      {!collapsed && (
        <SectionContent className="offers">
          {token.sell_orders.length > 0 ? (
            <BuyOrdersGrid>
              <BuyOrdersRow className="title">
                <BuyOrdersText className="title">Price</BuyOrdersText>
                <BuyOrdersText className="title">Expiration</BuyOrdersText>
                <BuyOrdersText className="title">From</BuyOrdersText>
                <BuyOrdersText className="title"></BuyOrdersText>
              </BuyOrdersRow>
              {token.sell_orders.map((sell_order, index) => (
                <ListingRow
                  key={index}
                  address={address}
                  token={token}
                  setToken={setToken}
                  sell_order={sell_order}
                  setQuantityOwned={setQuantityOwned}
                  setQuantityListed={setQuantityListed}
                />
              ))}
            </BuyOrdersGrid>
          ) : (
            <SectionNoData>No listings yet</SectionNoData>
          )}
        </SectionContent>
      )}
    </Section>
  );
};

const ListingRow = ({
  address,
  token,
  setToken,
  sell_order,
  setQuantityOwned,
  setQuantityListed,
}) => {
  const from_profile =
    sell_order.seller.username ||
    sell_order.seller.reverse_ens ||
    sell_order.seller.address;

  const from_end = sell_order.seller.username
    ? sell_order.seller.username.length > 6
    : sell_order.seller.reverse_ens && sell_order.seller.reverse_ens.length > 6;

  return (
    <BuyOrdersRow>
      <BuyOrdersText>
        <PriceIcon>
          <Image
            src={`/payment_tokens/${sell_order.payment_token.symbol}.png`}
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
          ethers.utils.parseUnits(sell_order.price.toString(), "gwei")
        )}
      </BuyOrdersText>
      <BuyOrdersText>
        <TimeAgo date={sell_order.expiration} formatter={offerFormatter} />
      </BuyOrdersText>
      <BuyOrdersText>
        <Link href={"/" + from_profile}>
          <a>
            {address === sell_order.seller.address ? (
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
        {address === sell_order.seller.address ? (
          <CancelSellOrderButton
            token={token}
            setToken={setToken}
            sell_order={sell_order}
            setQuantityListed={setQuantityListed}
            tiny={true}
          />
        ) : (
          <BuySellOrderButton
            token={token}
            setToken={setToken}
            sell_order={sell_order}
            setQuantityOwned={setQuantityOwned}
            setQuantityListed={setQuantityListed}
            tiny={true}
          />
        )}
      </BuyOrdersText>
    </BuyOrdersRow>
  );
};
