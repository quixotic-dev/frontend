import { ethers } from "ethers";
import Link from "next/link";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { GiMagicBroom } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { siteConfig } from "../../../shared/config";
import {
  Button,
  ModalContainer,
  ModalContent,
  ModalGridRow,
  ModalTitle,
  ModalTitleIcon,
  StyledModal,
  TextInput,
  TextInputContainer,
} from "../../Asset/AssetButtons/styles";
import { LoadingRing } from "../styles";
import { SweepBtn } from "./styles";

export const SweepButton = ({ collectionAddress, tokensState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [items, setItems] = useState(null);
  const [eth, setEth] = useState(null);

  async function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    setOpacity(0);
  }

  const addToCart = (token) => {
    let cart_ids = JSON.parse(
      localStorage.getItem(`${token.contract_address}_cart_token_ids`) || "[]"
    );
    cart_ids.push(token.contract_address + ":" + token.token_id);
    localStorage.setItem(
      `${token.contract_address}_cart_token_ids`,
      JSON.stringify(cart_ids)
    );
  };

  const updateCart = (count) => {
    setItems(count);

    if (tokensState.tokenResults && count) {
      localStorage.removeItem(`${collectionAddress}_cart_token_ids`);

      let total = 0;
      for (let i = 0; i < count; i++) {
        if (
          tokensState.tokenResults[i].sell_order &&
          tokensState.tokenResults[i].sell_order.payment_token.symbol ==
            "ETH" &&
          tokensState.tokenResults[i].sell_order.contract_version == 6
        ) {
          addToCart(tokensState.tokenResults[i]);
          total += Number(
            ethers.utils.formatEther(
              ethers.utils.parseUnits(
                tokensState.tokenResults[i].sell_order.price.toString(),
                "gwei"
              )
            )
          );
        }
      }

      setEth(Math.round(total * 1000) / 1000);
    }
  };

  const calculateCount = (eth) => {
    if (!isNaN(eth)) {
      setEth(eth);
    } else {
      return setEth(null);
    }

    let total = 0;
    let count = 0;
    let index = 0;

    localStorage.removeItem(`${siteConfig.CHAIN_ID}_cart_token_ids`);

    while (total <= eth && index < tokensState.tokenResults.length) {
      // Only add to cart if payment token is in ETH
      if (
        tokensState.tokenResults[index].sell_order &&
        tokensState.tokenResults[index].sell_order.payment_token.symbol ==
          "ETH" &&
        tokensState.tokenResults[index].sell_order.contract_version == 6
      ) {
        total += Number(
          ethers.utils.formatEther(
            ethers.utils.parseUnits(
              tokensState.tokenResults[index].sell_order.price.toString(),
              "gwei"
            )
          )
        );

        if (total <= eth) {
          addToCart(tokensState.tokenResults[index]);
          count += 1;
        }
      }
      index += 1;
    }

    setItems(count);
  };

  return (
    <>
      <SweepBtn onClick={toggleModal}>
        <GiMagicBroom />
      </SweepBtn>

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
            Sweep Collection
            <ModalTitleIcon onClick={toggleModal}>
              <MdClose />
            </ModalTitleIcon>
          </ModalTitle>
          {tokensState.tokenResults && !tokensState.tokensUpdating ? (
            <ModalContent>
              <ModalGridRow>
                <TextInputContainer>
                  <TextInput
                    name="items"
                    autoFocus
                    autoComplete="off"
                    value={items}
                    onChange={(e) =>
                      updateCart(
                        e.target.value
                          ? Math.min(
                              e.target.value.replace(/[^.0-9]/g, ""),
                              tokensState.tokenResults.length
                            )
                          : null
                      )
                    }
                  />
                  items
                </TextInputContainer>
              </ModalGridRow>
              <ModalGridRow>
                <TextInputContainer>
                  <FaEthereum />
                  <TextInput
                    name="eth"
                    autoComplete="off"
                    value={eth}
                    onChange={(e) =>
                      calculateCount(e.target.value.replace(/[^.0-9]/g, ""))
                    }
                  />
                  ETH
                </TextInputContainer>
              </ModalGridRow>

              <Link href={`/cart?collection=${collectionAddress}`}>
                <a>
                  <Button>Proceed to Checkout</Button>
                </a>
              </Link>
            </ModalContent>
          ) : (
            <ModalContent>
              <LoadingRing className="square" />
            </ModalContent>
          )}
        </ModalContainer>
      </StyledModal>
    </>
  );
};
