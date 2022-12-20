import Image from "next/image";
import { useState } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { GrTextAlignFull } from "react-icons/gr";
import ReactMarkdown from "react-markdown";
import { siteConfig } from "../../../shared/config";
import {
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleText,
} from "../styles";
import {
  CollectionLink,
  CollectionLinksGrid,
  DescriptionGrid,
  DescriptionText,
} from "./styles";

export const AssetDescription = ({ token }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {(token.description ||
        token.collection.site_link ||
        token.collection.twitter_link ||
        token.collection.discord_link) && (
        <Section>
          <SectionTitle onClick={() => setCollapsed(!collapsed)}>
            <SectionTitleText>
              <GrTextAlignFull />
              Description
            </SectionTitleText>
            {collapsed ? <FiChevronRight /> : <FiChevronDown />}
          </SectionTitle>
          {!collapsed && (
            <SectionContent>
              <DescriptionGrid>
                {!!token.description && (
                  <DescriptionText>
                    <ReactMarkdown
                      allowedElements={["br", "strong", "em", "a"]}
                      unwrapDisallowed={true}
                      linkTarget="_blank"
                    >
                      {token.description}
                    </ReactMarkdown>
                  </DescriptionText>
                )}

                <CollectionLinksGrid>
                  {token.collection.site_link && (
                    <a
                      href={token.collection.site_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CollectionLink>
                        <CgWebsite />
                      </CollectionLink>
                    </a>
                  )}
                  {token.collection.twitter_link && (
                    <a
                      href={token.collection.twitter_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CollectionLink>
                        <FaTwitter />
                      </CollectionLink>
                    </a>
                  )}
                  {token.collection.discord_link && (
                    <a
                      href={token.collection.discord_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CollectionLink>
                        <FaDiscord />
                      </CollectionLink>
                    </a>
                  )}

                  <a
                    href={`${
                      token.network != siteConfig.NETWORK
                        ? siteConfig.L1_BLOCK_EXPLORER_URL
                        : siteConfig.L2_BLOCK_EXPLORER_URL
                    }/address/${token.contract_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CollectionLink className="etherscan">
                      <Image
                        src="/etherscan.svg"
                        alt=""
                        layout="responsive"
                        objectFit="contain"
                        objectPosition="center"
                        width={50}
                        height={50}
                        priority
                      />
                    </CollectionLink>
                  </a>
                </CollectionLinksGrid>
              </DescriptionGrid>
            </SectionContent>
          )}
        </Section>
      )}
    </>
  );
};
