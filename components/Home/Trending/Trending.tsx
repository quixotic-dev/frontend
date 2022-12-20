import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { MdChevronLeft, MdVerified } from "react-icons/md";
import { fetchMarketplaceStats } from "../../../api/stats";
import { CollectionImage } from "../../Common/Images/CollectionImage";
import { TextTruncater } from "../../Common/styles";
import { SectionTitle, Title } from "../styles";
import {
  ButtonContainer,
  CardContainer,
  CollectionImageContainer,
  CollectionRank,
  CollectionTextContainer,
  CollectionTextLarge,
  CollectionTextSmall,
  ContainerBackground,
  ContainerExtended,
  PriceContainer,
  PriceIcon,
  Toggle,
  ToggleSection,
  TrendingCard,
  TrendingGrid,
  TrendingGridColumn,
  VerifiedIcon,
  ViewAllButton,
} from "./styles";

export const Trending = ({ top_collections }) => {
  const [mode, setMode] = useState(2);
  const [collections, setCollections] = useState(top_collections);

  const fetchCollections = async (mode) => {
    const collectionsRes = await fetchMarketplaceStats(
      "volume:desc",
      mode == 0 ? "24h" : mode == 1 ? "7d" : "30d"
    );

    if (collectionsRes) {
      setCollections(collectionsRes.results);
    }
  };

  useEffect(() => {
    fetchCollections(mode);
  }, [mode]);

  return (
    <ContainerBackground>
      <ContainerExtended>
        <SectionTitle>
          <Link href="/stats">
            <a>
              <Title>Top Collections</Title>
            </a>
          </Link>
          <Toggle>
            <ToggleSection
              className={mode == 0 ? "active web-only" : "web-only"}
              onClick={() => setMode(0)}
            >
              1 day
            </ToggleSection>
            <ToggleSection
              className={mode == 1 ? "active" : null}
              onClick={() => setMode(1)}
            >
              7 day
            </ToggleSection>
            <ToggleSection
              className={mode == 2 ? "active" : null}
              onClick={() => setMode(2)}
            >
              30 day
            </ToggleSection>
          </Toggle>
        </SectionTitle>

        <TrendingGrid>
          <TrendingGridColumn>
            {collections.slice(0, 5).map((collection, index) => (
              <CardContainer key={collection.address}>
                <TrendingCollectionCard
                  rank={index + 1}
                  collection={collection}
                />
              </CardContainer>
            ))}
          </TrendingGridColumn>
          <TrendingGridColumn className="col-two">
            {collections.slice(5, 10).map((collection, index) => (
              <CardContainer key={collection.address}>
                <TrendingCollectionCard
                  rank={index + 6}
                  collection={collection}
                />
              </CardContainer>
            ))}
          </TrendingGridColumn>
          <TrendingGridColumn className="col-three">
            {collections.slice(10, 15).map((collection, index) => (
              <CardContainer key={collection.address}>
                <TrendingCollectionCard
                  rank={index + 11}
                  collection={collection}
                />
              </CardContainer>
            ))}
          </TrendingGridColumn>
        </TrendingGrid>

        <ButtonContainer>
          <Link href="/stats">
            <a>
              <ViewAllButton>View Stats</ViewAllButton>
            </a>
          </Link>
        </ButtonContainer>
      </ContainerExtended>
    </ContainerBackground>
  );
};

export const TrendingCollectionCard = ({ rank, collection }) => {
  return (
    <Link
      href={`/collection/${
        collection.slug ? collection.slug : collection.address
      }`}
      passHref
    >
      <a>
        <TrendingCard>
          <CollectionRank>{rank}</CollectionRank>
          <CollectionImageContainer>
            <CollectionImage collection={collection} />
            {collection.verified && (
              <VerifiedIcon>
                <MdVerified />
              </VerifiedIcon>
            )}
          </CollectionImageContainer>
          <CollectionTextContainer>
            <CollectionTextLarge>
              <TextTruncater>{collection.name}</TextTruncater>
            </CollectionTextLarge>
            <CollectionTextSmall>
              Floor:
              {!!collection.floor ? (
                collection.floor < 10000000 ? (
                  <PriceContainer>
                    <PriceIcon className="chevron">
                      <MdChevronLeft />
                    </PriceIcon>
                    <PriceIcon>
                      <FaEthereum />
                    </PriceIcon>
                    0.01
                  </PriceContainer>
                ) : (
                  <PriceContainer>
                    <PriceIcon>
                      <FaEthereum />
                    </PriceIcon>
                    {parseFloat(
                      ethers.utils.formatEther(
                        ethers.utils.parseUnits(
                          collection.floor.toString(),
                          "gwei"
                        )
                      )
                    ).toFixed(
                      collection.floor >= 1000000000000
                        ? 0
                        : collection.floor >= 100000000000
                        ? 1
                        : 2
                    )}
                  </PriceContainer>
                )
              ) : (
                "—"
              )}
            </CollectionTextSmall>
          </CollectionTextContainer>
          <CollectionTextContainer className="right">
            <CollectionTextLarge>
              <PriceIcon className="large">
                <FaEthereum />
              </PriceIcon>
              {!!collection.volume
                ? parseFloat(
                    ethers.utils.formatEther(
                      ethers.utils.parseUnits(
                        collection.volume.toString(),
                        "gwei"
                      )
                    )
                  ).toFixed(collection.volume >= 100000000000 ? 1 : 2)
                : "0.00"}{" "}
            </CollectionTextLarge>
            <CollectionTextSmall>
              {!!collection.eth_to_usd &&
                !!collection.volume &&
                Number(
                  ethers.utils.formatEther(
                    ethers.utils.parseUnits(
                      (collection.volume * collection.eth_to_usd).toString(),
                      "gwei"
                    )
                  )
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
            </CollectionTextSmall>
            {/* <CollectionTextSmall
              className={
                collection.volume_change_7d
                  ? collection.volume_change_7d > 0
                    ? "pos"
                    : collection.volume_change_7d < 0
                    ? "neg"
                    : null
                  : null
              }
            >
              {!!collection.volume_change_7d
                ? (collection.volume_change_7d > 0 ? "+" : "") +
                  (
                    Math.round(collection.volume_change_7d * 100 * 100) / 100
                  ).toLocaleString() +
                  "%"
                : "—"}
            </CollectionTextSmall> */}
          </CollectionTextContainer>
        </TrendingCard>
      </a>
    </Link>
  );
};
