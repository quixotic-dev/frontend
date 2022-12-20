import { FaParachuteBox } from "react-icons/fa";
import { IoMdCart, IoMdPricetag, IoMdTrash } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { TbBuildingBridge } from "react-icons/tb";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { siteConfig } from "../../shared/config";

export const eligiblePaymentTokens = ["ETH", "OP"];

export const allowedDomains = new Set([
  "fanbase-1.s3.amazonaws.com",
  "ipfs.quixotic.io",
  "quixotic.infura-ipfs.io",
  "ipfs.io",
  "fanbase-1.s3.us-west-2.amazonaws.com",
  "gateway.pinata.cloud",
  "cloudflare-ipfs.com",
  "cf-ipfs.com",
  "ipfs.infura.io",
  "storage.googleapis.com",
  "firebasestorage.googleapis.com",
  "arweave.net",
  "cryptotesters.mypinata.cloud",
]);

export const offerFormatter = buildFormatter({
  prefixAgo: null,
  prefixFromNow: "in",
  suffixAgo: "ago",
  suffixFromNow: null,
  seconds: "a minute",
  minute: "a minute",
  minutes: "%d minutes",
  hour: "an hour",
  hours: "%d hours",
  day: "a day",
  days: "%d days",
  month: "a month",
  months: "%d months",
  year: "a year",
  years: "%d years",
  wordSeparator: " ",
});

export const expirationFormatter = buildFormatter({
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: "ago",
  suffixFromNow: "",
  seconds: "< 1 min",
  minute: "1 min",
  minutes: "%d min",
  hour: "1 hour",
  hours: "%d hours",
  day: "1 day",
  days: "%d days",
  month: "1 month",
  months: "%d months",
  year: "1 year",
  years: "%d years",
  wordSeparator: " ",
});

export const activityIconRegistry = {
  Transfer: <RiArrowLeftRightLine />,
  Sale: <IoMdCart />,
  Mint: <IoCreate />,
  List: <IoMdPricetag />,
  Offer: <MdPriceChange />,
  Burn: <IoMdTrash />,
  Airdrop: <FaParachuteBox />,
  Bridge: <TbBuildingBridge />,
};

// This list should match backend ActivityType model
export const activityEventRegistry = {
  Mint: "MI",
  Sale: "SA",
  Transfer: "TR",
  Offer: "OF",
  List: "LI",
  Burn: "BU",
  Airdrop: "AD",
  Bridge: "BR",
};

export const chainRegistry = {
  opt: "Optimism",
  eth: "Ethereum",
};

export const chainIconRegistry = {
  opt: "OP",
  eth: "ETH",
};
