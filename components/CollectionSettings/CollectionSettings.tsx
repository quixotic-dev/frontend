import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsCodeSlash, BsStars } from "react-icons/bs";
import { FaCog, FaEthereum, FaImages, FaList } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { MdCreate } from "react-icons/md";
import { useSelector } from "react-redux";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import {
  ContainerExtended,
  EditorMenu,
  EditorMenuRow,
  Title,
} from "../Common/Settings/styles";
import { NotFound } from "../NotFound/NotFound";
import { CollectionDetails } from "./CollectionDetails";
import { CollectionGreenlist } from "./CollectionGreenlist";
import { CollectionMetadata } from "./CollectionMetadata";
import { CollectionMint } from "./CollectionMint";
import { CollectionRewards } from "./CollectionRewards";
import { CollectionRoyalties } from "./CollectionRoyalties";
import { CollectionVerification } from "./CollectionVerification";

export const CollectionSettings = ({ collection, hostedCollection }) => {
  const router = useRouter();

  const address = useSelector((state: State) => state.address);
  const [selectedTab, setSelectedTab] = useState(
    router.query.tab ? String(router.query.tab) : 0
  );

  const updateSelectedTab = (tab) => {
    setSelectedTab(tab);
    router.query.tab = tab;
    router.push(router, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      {collection.owner && collection.owner.address == address ? (
        <ContainerExtended>
          <div>
            <Title>Collection Settings</Title>
            <EditorMenu>
              <EditorMenuRow
                className={selectedTab == 0 ? "active" : null}
                onClick={() => updateSelectedTab(0)}
              >
                <FaCog />
                Details
              </EditorMenuRow>
              <EditorMenuRow
                className={selectedTab == 1 ? "active" : null}
                onClick={() => updateSelectedTab(1)}
              >
                <FaEthereum />
                Royalties
              </EditorMenuRow>
              {hostedCollection && (
                <>
                  <EditorMenuRow
                    className={selectedTab == 2 ? "active" : null}
                    onClick={() => updateSelectedTab(2)}
                  >
                    <MdCreate />
                    Minting
                  </EditorMenuRow>
                  {hostedCollection.premint && (
                    <EditorMenuRow
                      className={selectedTab == 3 ? "active" : null}
                      onClick={() => updateSelectedTab(3)}
                    >
                      <FaList />
                      Allowlist
                    </EditorMenuRow>
                  )}

                  <EditorMenuRow
                    className={selectedTab == 4 ? "active" : null}
                    onClick={() => updateSelectedTab(4)}
                  >
                    <FaImages />
                    Metadata
                  </EditorMenuRow>

                  {hostedCollection.src_code && (
                    <EditorMenuRow
                      className={selectedTab == 5 ? "active" : null}
                      onClick={() => updateSelectedTab(5)}
                    >
                      <FiCode />
                      Source Code
                    </EditorMenuRow>
                  )}
                </>
              )}

              {collection.rewardscampaign &&
                collection.rewardscampaign.is_eligible_for_boost && (
                  <EditorMenuRow
                    className={selectedTab == 6 ? "active" : null}
                    onClick={() => updateSelectedTab(6)}
                  >
                    <BsStars />
                    OP Rewards
                  </EditorMenuRow>
                )}
            </EditorMenu>
          </div>

          {selectedTab == 0 && <CollectionDetails collection={collection} />}

          {selectedTab == 1 && <CollectionRoyalties collection={collection} />}

          {hostedCollection && (
            <>
              {selectedTab == 2 && (
                <CollectionMint
                  collection={collection}
                  hostedCollection={hostedCollection}
                />
              )}

              {selectedTab == 3 && (
                <CollectionGreenlist
                  collection={collection}
                  hostedCollection={hostedCollection}
                />
              )}

              {selectedTab == 4 && (
                <CollectionMetadata
                  collection={collection}
                  hostedCollection={hostedCollection}
                />
              )}

              {selectedTab == 5 && hostedCollection.src_code && (
                <CollectionVerification
                  collection={collection}
                  hostedCollection={hostedCollection}
                />
              )}
            </>
          )}

          {collection.rewardscampaign &&
            collection.rewardscampaign.is_eligible_for_boost &&
            selectedTab == 6 && <CollectionRewards collection={collection} />}
        </ContainerExtended>
      ) : (
        <>
          <Head>
            <title>Not Found | Quix</title>
            <meta property="og:image" content={`/opt_banner.png`} />
          </Head>

          <NotFound />
        </>
      )}
    </>
  );
};
