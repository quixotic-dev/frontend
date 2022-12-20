import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { MdChevronLeft, MdVerified } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { usePalette } from "react-palette";
import ReactTooltip from "react-tooltip";
import { siteConfig } from "../../shared/config";
import { CollectionImage } from "../Common/Images/CollectionImage";
import {
  Card,
  CardContent,
  CardContentContainer,
  CardDetails,
  CollectioNameText,
  CollectionCoverImage,
  CollectionDescription,
  CollectionImageContainer,
  CollectionName,
  CollectionStats,
  Stat,
  StatIcon,
  StatText,
  VerifiedIcon,
} from "./styles";

export const CollectionCardLarge = ({
  collection,
  showStats = true,
  settingsLink = false,
  launchpadLink = false,
}) => {
  const { data } = usePalette(collection.image_url);

  return (
    <Link
      href={
        settingsLink
          ? `/collection/${
              collection.blockchain != siteConfig.NETWORK ? "eth/" : ""
            }${collection.address}/settings`
          : `/${launchpadLink ? "launch" : "collection"}/${
              collection.slug
                ? collection.slug
                : `${
                    collection.blockchain != siteConfig.NETWORK ? "eth/" : ""
                  }${collection.address}`
            }`
      }
      passHref
    >
      <a>
        <Card>
          <CollectionCoverImage
            color={
              data.vibrant && !collection.cover_image ? data.vibrant : "#bbbbbb"
            }
            className={collection.cover_image ? "fullOpacity" : null}
          >
            {collection.cover_image && (
              <Image
                src={collection.cover_image}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
              />
            )}
          </CollectionCoverImage>
          <CardContentContainer>
            <CardContent className="large">
              <CollectionImageContainer className="large">
                <CollectionImage collection={collection} />
              </CollectionImageContainer>
              <CardDetails className="large">
                <CollectionName>
                  <CollectioNameText>{collection.name}</CollectioNameText>
                  {collection.verified && (
                    <VerifiedIcon>
                      <MdVerified />
                    </VerifiedIcon>
                  )}
                  {collection.rewardscampaign &&
                    collection.rewardscampaign.is_boost_active && (
                      <>
                        {" "}
                        <VerifiedIcon
                          className="boost"
                          data-tip
                          data-for="boost"
                        >
                          <BsStars />
                        </VerifiedIcon>
                        <ReactTooltip
                          id="boost"
                          place="top"
                          effect="solid"
                          backgroundColor="#1C1C1D"
                          className="tooltip"
                        >
                          Receive an extra{" "}
                          {collection.rewardscampaign.boost_per_mille / 10}% in
                          OP rewards
                        </ReactTooltip>
                      </>
                    )}
                </CollectionName>
                {collection.description && (
                  <CollectionDescription className="large">
                    <ReactMarkdown
                      allowedElements={["a"]}
                      unwrapDisallowed={true}
                      linkTarget="_blank"
                    >
                      {collection.description.length > 150
                        ? collection.description.slice(0, 150).trim() + "..."
                        : collection.description}
                    </ReactMarkdown>
                  </CollectionDescription>
                )}
              </CardDetails>
            </CardContent>
            {showStats && (
              <CollectionStats className="large">
                <Stat className="large">
                  <StatText>
                    {collection.supply > 999999
                      ? Math.floor((collection.supply / 1000000) * 100) / 100 +
                        "M"
                      : collection.supply > 999
                      ? Math.floor((collection.supply / 1000) * 10) / 10 + "K"
                      : collection.supply}
                  </StatText>
                  items
                </Stat>
                <Stat className="large">
                  <StatText>
                    {collection.owners > 999999
                      ? Math.floor((collection.owners / 1000000) * 100) / 100 +
                        "M"
                      : collection.owners > 999
                      ? Math.floor((collection.owners / 1000) * 10) / 10 + "K"
                      : collection.owners}
                  </StatText>
                  owners
                </Stat>
                <Stat className="large">
                  <StatText>
                    {collection.listed && collection.supply
                      ? (collection.listed / collection.supply).toLocaleString(
                          undefined,
                          {
                            style: "percent",
                            minimumFractionDigits: 1,
                          }
                        )
                      : "—"}
                  </StatText>
                  listed
                </Stat>
                <Stat className="large">
                  <StatText>
                    {!!collection.floor ? (
                      collection.floor < 10000000 ? (
                        <>
                          <StatIcon className="chevron">
                            <MdChevronLeft />
                          </StatIcon>
                          <StatIcon>
                            <FaEthereum />
                          </StatIcon>
                          0.01
                        </>
                      ) : (
                        <>
                          <StatIcon>
                            <FaEthereum />
                          </StatIcon>
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
                        </>
                      )
                    ) : (
                      "—"
                    )}
                  </StatText>
                  floor
                </Stat>
                <Stat className="large">
                  <StatText>
                    <StatIcon>
                      <FaEthereum />
                    </StatIcon>
                    {!!collection.volume
                      ? parseFloat(
                          ethers.utils.formatEther(
                            ethers.utils.parseUnits(
                              collection.volume.toString(),
                              "gwei"
                            )
                          )
                        ).toFixed(collection.volume >= 100000000000 ? 1 : 2)
                      : "0.00"}
                  </StatText>
                  volume
                </Stat>
              </CollectionStats>
            )}
          </CardContentContainer>
        </Card>
      </a>
    </Link>
  );
};
