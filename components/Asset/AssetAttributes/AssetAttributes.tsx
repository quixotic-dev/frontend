import Link from "next/link";
import { useState } from "react";
import { BiStats } from "react-icons/bi";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { TextTruncater } from "../../Common/styles";
import {
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleText,
} from "../styles";
import {
  Attribute,
  AttributeLabel,
  AttributeName,
  AttributeRarity,
  AttributesGrid,
} from "./styles";

export const AssetAttributes = ({ token }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    token.attributes.length > 0 && (
      <Section>
        <SectionTitle onClick={() => setCollapsed(!collapsed)}>
          <SectionTitleText>
            <BiStats />
            Properties
          </SectionTitleText>
          {collapsed ? <FiChevronRight /> : <FiChevronDown />}
        </SectionTitle>
        {!collapsed && (
          <SectionContent>
            <AttributesGrid>
              {token.attributes.map((attribute, index) => (
                <Link
                  href={
                    token.collection.slug
                      ? `/collection/${
                          token.collection.slug
                        }?attributes=${encodeURIComponent(
                          attribute.trait_type
                        )}:${encodeURIComponent(attribute.value)}`
                      : `/collection/${
                          token.contract_address
                        }?attributes=${encodeURIComponent(
                          attribute.trait_type
                        )}:${encodeURIComponent(attribute.value)}`
                  }
                  key={index}
                  passHref
                >
                  <a>
                    <Attribute>
                      <AttributeLabel>
                        <TextTruncater>{attribute.trait_type}</TextTruncater>
                      </AttributeLabel>
                      <AttributeName>
                        <TextTruncater>
                          {attribute.value == "" ? "None" : attribute.value}
                        </TextTruncater>
                      </AttributeName>
                      {attribute.rarity && (
                        <AttributeRarity>
                          <TextTruncater>
                            {attribute.rarity < 0.1
                              ? attribute.rarity < 0.01
                                ? Math.round(attribute.rarity * 100 * 100) / 100
                                : Math.round(attribute.rarity * 100 * 10) / 10
                              : Math.round(attribute.rarity * 100 * 1) / 1}
                            % have this trait
                          </TextTruncater>
                        </AttributeRarity>
                      )}
                    </Attribute>
                  </a>
                </Link>
              ))}
            </AttributesGrid>
          </SectionContent>
        )}
      </Section>
    )
  );
};
