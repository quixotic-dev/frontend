import Link from "next/link";
import { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { siteConfig } from "../../../shared/config";
import {
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleText,
} from "../styles";
import { Detail, DetailLabel, DetailsGrid, DetailText } from "./styles";

export const AssetDetails = ({ token }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Section>
      <SectionTitle onClick={() => setCollapsed(!collapsed)}>
        <SectionTitleText>
          <FaListAlt />
          Details
        </SectionTitleText>
        {collapsed ? <FiChevronRight /> : <FiChevronDown />}
      </SectionTitle>
      {!collapsed && (
        <SectionContent>
          <DetailsGrid>
            <Detail>
              <DetailLabel>Contract Address</DetailLabel>
              <DetailText>
                <a
                  href={`${
                    token.network != siteConfig.NETWORK
                      ? siteConfig.L1_BLOCK_EXPLORER_URL
                      : siteConfig.L2_BLOCK_EXPLORER_URL
                  }/address/${token.contract_address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {token.contract_address.slice(0, 6)}...
                  {token.contract_address.slice(-6)}
                </a>
              </DetailText>
            </Detail>
            <Detail>
              <DetailLabel>Token ID</DetailLabel>
              <DetailText>
                <a
                  href={`${
                    token.network != siteConfig.NETWORK
                      ? siteConfig.L1_BLOCK_EXPLORER_URL
                      : siteConfig.L2_BLOCK_EXPLORER_URL
                  }/address/${token.contract_address}?a=${token.token_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {token.token_id}
                </a>
              </DetailText>
            </Detail>
            <Detail>
              <DetailLabel>Token Standard</DetailLabel>
              <DetailText>{token.collection.contract_type}</DetailText>
            </Detail>
            {/* {token.collection.symbol && (
              <Detail>
                <DetailLabel>Contract Symbol</DetailLabel>
                <DetailText>{token.collection.symbol}</DetailText>
              </Detail>
            )} */}
            {token.collection.owner && (
              <Detail>
                <DetailLabel>Contract Owner</DetailLabel>
                <DetailText>
                  {token.collection.owner.username ? (
                    <Link href={"/" + token.collection.owner.username}>
                      <a>{token.collection.owner.username}</a>
                    </Link>
                  ) : token.collection.owner.reverse_ens ? (
                    <Link href={"/" + token.collection.owner.reverse_ens}>
                      <a>{token.collection.owner.reverse_ens}</a>
                    </Link>
                  ) : (
                    <Link href={"/" + token.collection.owner.address}>
                      <a>{token.collection.owner.address.slice(0, 6)}</a>
                    </Link>
                  )}
                </DetailText>
              </Detail>
            )}
            <Detail>
              <DetailLabel>Blockchain</DetailLabel>
              <DetailText>
                {token.network.startsWith("opt") && "Optimism"}
                {token.network.startsWith("arb") && "Arbitrum"}
                {token.network.startsWith("eth") && "Ethereum"}
              </DetailText>
            </Detail>

            <Detail>
              <DetailLabel>Creator Earnings</DetailLabel>
              <DetailText>
                {!!token.collection.royalty_per_mille
                  ? token.collection.royalty_per_mille / 10
                  : 0}
                %
              </DetailText>
            </Detail>
          </DetailsGrid>
        </SectionContent>
      )}
    </Section>
  );
};
