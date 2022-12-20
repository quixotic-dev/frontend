import { AssetCard } from "../AssetCard/AssetCard";
import { CardGrid } from "../AssetCard/styles";
import { CollectionCard } from "../CollectionCard/CollectionCard";
import { CollectionCardLarge } from "../CollectionCard/CollectionCardLarge";
import { CollectionsGrid } from "../CollectionCard/styles";
import { NoItems } from "../Common/styles";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { ProfilesGrid } from "../ProfileCard/styles";
import {
  ContainerBackground,
  ContainerExtended,
  SearchGrid,
  SearchQuery,
  SectionTitle,
  Title,
} from "./styles";

export const Search = ({ query, collections, profiles, tokens }) => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>
          Search results for <SearchQuery>{query}</SearchQuery>
        </Title>

        {collections.length > 0 || profiles.length > 0 || tokens.length > 0 ? (
          <SearchGrid>
            {collections.length > 0 && (
              <div>
                <SectionTitle>Collections</SectionTitle>
                <CollectionsGrid>
                  {collections.slice(0, 12).map((collection, index) => (
                    <CollectionCardLarge
                      collection={collection}
                      settingsLink={false}
                      key={index}
                    />
                  ))}
                </CollectionsGrid>
              </div>
            )}

            {profiles.length > 0 && (
              <div>
                <SectionTitle>Profiles</SectionTitle>
                <ProfilesGrid>
                  {profiles.slice(0, 12).map((profile, index) => (
                    <ProfileCard profile={profile} key={index} />
                  ))}
                </ProfilesGrid>
              </div>
            )}

            {tokens.length > 0 && (
              <div>
                <SectionTitle>NFTs</SectionTitle>
                <CardGrid>
                  {tokens.slice(0, 24).map((token, index) => (
                    <AssetCard token={token} key={index} />
                  ))}
                </CardGrid>
              </div>
            )}
          </SearchGrid>
        ) : (
          <NoItems>
            <h1>No results to display</h1>
            <p>Try updating your search query</p>
          </NoItems>
        )}
      </ContainerExtended>
    </ContainerBackground>
  );
};
