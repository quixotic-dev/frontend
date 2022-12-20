import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { GoSearch } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { MdClose, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { fetchSearchResults } from "../../../api/search";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { CollectionImage } from "../../Common/Images/CollectionImage";
import { ProfileImage } from "../../Common/Images/ProfileImage";
import {
  ClearSearchIcon,
  Divider,
  LoadingRing,
  MobileSearchButton,
  PageOverlay,
  ResultName,
  ResultsContainer,
  ResultsCount,
  ResultsGrid,
  ResultsImage,
  ResultsPrimaryInfo,
  ResultsRow,
  ResultsTitle,
  SearchContainer,
  SearchInput,
  VerifiedIcon,
} from "./styles";

export const Search = ({ isMobile, scrolled }) => {
  const router = useRouter();

  const banner = useSelector((state: State) => state.banner);

  const [displayMobileSearch, setDisplayMobileSearch] = useState(false);
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const updateSearchResults = async (e) => {
    if (e.target.value != "") {
      setSearchQuery(e.target.value);
      setDisplaySearchResults(true);

      const results = await fetchSearchResults(e.target.value);

      if (results) {
        setSearchResults(results);
      }
    } else {
      setDisplaySearchResults(false);
    }
  };

  const clearSearchResults = () => {
    setSearchQuery("");
    setSearchResults(null);
    setDisplaySearchResults(false);
    setDisplayMobileSearch(false);
  };

  const handleKeyDown = (event, override = null) => {
    if (event.key === "Enter" || override) {
      event.target.blur();
      setDisplaySearchResults(false);
      setDisplayMobileSearch(false);
      router.push(`/search?query=${event.target.value || searchQuery}`);
    }
  };

  return (
    <>
      <MobileSearchButton
        onClick={() => {
          setDisplayMobileSearch(true);
        }}
        className={isMobile ? "mobile" : null}
      >
        <IoMdSearch />
      </MobileSearchButton>
      <SearchContainer
        className={
          isMobile
            ? displayMobileSearch
              ? scrolled
                ? banner
                  ? "mobile visible scrolled bannerVisible"
                  : "mobile visible scrolled"
                : banner
                ? "mobile visible bannerVisible"
                : "mobile visible"
              : banner
              ? "mobile bannerVisible"
              : "mobile"
            : null
        }
      >
        <GoSearch />
        <DebounceInput
          element={SearchInput}
          minLength={2}
          debounceTimeout={300}
          placeholder="Search for collections and accounts"
          value={searchQuery}
          onChange={updateSearchResults}
          onKeyDown={handleKeyDown}
        />

        {(searchQuery || displayMobileSearch) && (
          <ClearSearchIcon onClick={clearSearchResults}>
            <MdClose />
          </ClearSearchIcon>
        )}

        <PageOverlay
          onClick={clearSearchResults}
          className={
            displaySearchResults || displayMobileSearch ? "visible" : null
          }
        />

        <ResultsContainer className={displaySearchResults ? "visible" : null}>
          {searchResults ? (
            <>
              {searchResults.collections.length > 0 ||
              searchResults.profiles.length > 0 ? (
                <>
                  {searchResults.collections.length > 0 && (
                    <div>
                      <ResultsTitle>Collections</ResultsTitle>
                      <ResultsGrid>
                        {searchResults.collections.map((result, index) => (
                          <Link
                            href={
                              result.slug
                                ? `/collection/${result.slug}`
                                : `/collection/${
                                    result.blockchain != siteConfig.NETWORK
                                      ? "eth/"
                                      : ""
                                  }${result.address}`
                            }
                            key={index}
                          >
                            <a onClick={() => clearSearchResults()}>
                              <ResultsRow key={index}>
                                <ResultsPrimaryInfo>
                                  <ResultsImage>
                                    <CollectionImage collection={result} />
                                  </ResultsImage>
                                  <ResultName>{result.name}</ResultName>
                                  {result.verified && (
                                    <VerifiedIcon>
                                      <MdVerified />
                                    </VerifiedIcon>
                                  )}
                                </ResultsPrimaryInfo>
                                <ResultsCount>
                                  {result.supply > 999
                                    ? Math.floor((result.supply / 1000) * 10) /
                                        10 +
                                      "K"
                                    : result.supply}{" "}
                                  items
                                </ResultsCount>
                              </ResultsRow>
                            </a>
                          </Link>
                        ))}
                      </ResultsGrid>
                    </div>
                  )}

                  {searchResults.profiles.length > 0 &&
                    searchResults.collections.length > 0 && <Divider />}

                  {searchResults.profiles.length > 0 && (
                    <div>
                      <ResultsTitle>Accounts</ResultsTitle>
                      <ResultsGrid>
                        {searchResults.profiles.map((result, index) => (
                          <Link
                            href={`/${
                              result.username ||
                              result.reverse_ens ||
                              result.address
                            }`}
                            key={index}
                          >
                            <a onClick={() => clearSearchResults()}>
                              <ResultsRow key={index}>
                                <ResultsPrimaryInfo>
                                  <ResultsImage>
                                    <ProfileImage profile={result} />
                                  </ResultsImage>
                                  {result.username ||
                                    result.reverse_ens ||
                                    result.address}
                                </ResultsPrimaryInfo>
                              </ResultsRow>
                            </a>
                          </Link>
                        ))}
                      </ResultsGrid>
                    </div>
                  )}

                  <Divider />

                  <ResultsGrid>
                    <ResultsRow
                      className="helper"
                      onClick={(e) => {
                        handleKeyDown(e, true);
                      }}
                    >
                      Press <b>enter</b> to see all results
                    </ResultsRow>
                  </ResultsGrid>
                </>
              ) : (
                <ResultsTitle className="tall">No results found</ResultsTitle>
              )}
            </>
          ) : (
            <ResultsTitle>
              <LoadingRing />
            </ResultsTitle>
          )}
        </ResultsContainer>
      </SearchContainer>
    </>
  );
};
