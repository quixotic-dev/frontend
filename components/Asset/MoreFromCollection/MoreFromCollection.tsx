import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { IoGrid } from "react-icons/io5";
import { AssetCard } from "../../AssetCard/AssetCard";
import {
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleText,
} from "../styles";
import { CardGrid } from "./styles";

export const MoreFromCollection = ({ collectionName, tokens }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    tokens.length > 0 && (
      <Section>
        <SectionTitle onClick={() => setCollapsed(!collapsed)}>
          <SectionTitleText>
            <IoGrid />
            More from {collectionName}
          </SectionTitleText>
          {collapsed ? <FiChevronRight /> : <FiChevronDown />}
        </SectionTitle>
        {!collapsed && (
          <SectionContent>
            <CardGrid>
              {tokens.map((token, index) => (
                <AssetCard key={index} token={token} />
              ))}
            </CardGrid>
          </SectionContent>
        )}
      </Section>
    )
  );
};
