import { ethers } from "ethers";
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { siteConfig } from "../../shared/config";
import { CollectionImage } from "../Common/Images/CollectionImage";
import {
  Card,
  CardContent,
  CardDetails,
  CollectioNameText,
  CollectionDescription,
  CollectionImageContainer,
  CollectionName,
  CollectionStats,
  Stat,
  StatIcon,
  StatText,
  VerifiedIcon,
} from "./styles";

export const CollectionCard = ({ collection, settingsLink = false }) => {
  return (
    <Link
      href={
        settingsLink
          ? `/collection/${
              collection.blockchain != siteConfig.NETWORK ? "eth/" : ""
            }${collection.address}/settings`
          : `/collection/${
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
          <CardContent>
            <CollectionImageContainer>
              <CollectionImage collection={collection} />
            </CollectionImageContainer>
            <CardDetails>
              <CollectionName>
                <CollectioNameText>{collection.name}</CollectioNameText>
                {collection.verified && (
                  <VerifiedIcon>
                    <MdVerified />
                  </VerifiedIcon>
                )}
              </CollectionName>
              {collection.description && (
                <CollectionDescription>
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
              <CollectionStats>
                <Stat>
                  <StatText>
                    {collection.supply > 999
                      ? Math.floor((collection.supply / 1000) * 10) / 10 + "K"
                      : collection.supply}
                  </StatText>
                  items
                </Stat>
                <Stat className="web-only">
                  <StatText>
                    {collection.owners > 999
                      ? Math.floor((collection.owners / 1000) * 10) / 10 + "K"
                      : collection.owners}
                  </StatText>
                  owners
                </Stat>
                <Stat>
                  <StatText>
                    {!!collection.floor ? (
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
                    ) : (
                      "—"
                    )}
                  </StatText>
                  floor
                </Stat>
                <Stat>
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
            </CardDetails>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};
