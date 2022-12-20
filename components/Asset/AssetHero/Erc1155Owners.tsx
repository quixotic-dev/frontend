import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsPeopleFill, BsPersonFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { RiLayoutGridFill } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreByURL } from "../../../api/general";
import { fetchErc1155TokenOwners } from "../../../api/token";
import { ProfileImage } from "../../Common/Images/ProfileImage";
import {
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalTitleIcon,
  StyledModal,
} from "../AssetButtons/styles";
import {
  AssetOwner,
  AssetOwnerItem,
  LoadingRing,
  OwnerAddress,
  OwnerGrid,
  OwnerImage,
  OwnerInfo,
  OwnerInfoText,
  OwnerItemCount,
  OwnerName,
  OwnerRow,
} from "./styles";

export const Erc1155Owners = ({ token, quantityOwned }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const [tokenOwnersState, setTokenOwnersState] = useState({
    owners: null,
    moreResults: false,
    results: [],
  });

  const toggleModal = async (e) => {
    fetchTokenOwners();
    setOpacity(0);
    setIsOpen(!isOpen);
  };

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  const beforeClose = () => {
    setOpacity(0);
  };

  const fetchTokenOwners = async () => {
    if (!tokenOwnersState.owners) {
      const owners = await fetchErc1155TokenOwners(
        token.collection.address,
        token.token_id
      );

      setTokenOwnersState({
        ...tokenOwnersState,
        owners: owners,
        moreResults: owners.next ? true : false,
        results: owners.results,
      });
    }
  };

  const fetchMoreOwners = async () => {
    if (tokenOwnersState.owners && tokenOwnersState.owners.next) {
      const owners = await fetchMoreByURL(tokenOwnersState.owners.next);

      setTokenOwnersState({
        ...tokenOwnersState,
        owners: owners,
        moreResults: owners.next ? true : false,
        results: tokenOwnersState.results.concat(owners.results),
      });
    }
  };

  return (
    <>
      <AssetOwner>
        <AssetOwnerItem className="link" onClick={toggleModal}>
          <BsPeopleFill />
          {token.unique_owners > 999
            ? Math.floor((token.unique_owners / 1000) * 10) / 10 + "K"
            : token.unique_owners}{" "}
          owner{token.unique_owners != 1 && "s"}
        </AssetOwnerItem>

        <AssetOwnerItem>
          <RiLayoutGridFill />
          {token.quantity > 999
            ? Math.floor((token.quantity / 1000) * 10) / 10 + "K"
            : token.quantity}{" "}
          total
        </AssetOwnerItem>

        {quantityOwned > 0 && (
          <AssetOwnerItem>
            <BsPersonFill />
            You own{" "}
            {quantityOwned > 999
              ? Math.floor((quantityOwned / 1000) * 10) / 10 + "K"
              : quantityOwned}
          </AssetOwnerItem>
        )}
      </AssetOwner>

      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <ModalContainer>
          <ModalTitle>
            Owned by
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          <ModalContent>
            {tokenOwnersState.owners ? (
              <InfiniteScroll
                dataLength={tokenOwnersState.results.length}
                next={fetchMoreOwners}
                hasMore={tokenOwnersState.moreResults}
                loader={<LoadingRing className="medium" />}
                style={{ overflow: "visible" }}
                scrollableTarget="scrollableDiv"
              >
                <OwnerGrid id="scrollableDiv">
                  {tokenOwnersState.results.map((owner, index) => (
                    <Link
                      href={`/${
                        owner.owner.username ||
                        owner.owner.reverse_ens ||
                        owner.owner.address
                      }`}
                      key={index}
                    >
                      <a>
                        <OwnerRow>
                          <OwnerInfo>
                            <OwnerImage>
                              <ProfileImage profile={owner.owner} />
                            </OwnerImage>
                            <OwnerInfoText>
                              <OwnerName>
                                {owner.owner.username ||
                                  owner.owner.reverse_ens ||
                                  owner.owner.address.slice(0, 6)}
                              </OwnerName>
                              <OwnerAddress>
                                {owner.owner.address.slice(0, 5)}...
                                {owner.owner.address.slice(-4)}
                              </OwnerAddress>
                            </OwnerInfoText>
                          </OwnerInfo>
                          <OwnerItemCount>
                            {owner.quantity} item{owner.quantity != 1 && "s"}
                          </OwnerItemCount>
                        </OwnerRow>
                      </a>
                    </Link>
                  ))}
                </OwnerGrid>
              </InfiniteScroll>
            ) : (
              <LoadingRing />
            )}
          </ModalContent>
        </ModalContainer>
      </StyledModal>
    </>
  );
};
