import { useState } from "react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { siteConfig } from "../../../shared/config";
import { AssetMenuButton } from "./styles";

export const CartButton = ({ token, expanded }) => {
  const [isInCart, setIsInCart] = useState(
    typeof window !== "undefined" &&
      JSON.parse(
        localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
      ).indexOf(token.contract_address + ":" + token.token_id) > -1
  );

  const addToCart = () => {
    let cart_ids = JSON.parse(
      localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
    );
    cart_ids.push(token.contract_address + ":" + token.token_id);
    localStorage.setItem(
      `${siteConfig.CHAIN_ID}_cart_token_ids`,
      JSON.stringify(cart_ids)
    );
    setIsInCart(true);
    window.dispatchEvent(new Event("cart"));
  };

  const removeFromCart = () => {
    let cart_ids = JSON.parse(
      localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
    );
    cart_ids = cart_ids.filter(
      (e) => e !== token.contract_address + ":" + token.token_id
    );
    localStorage.setItem(
      `${siteConfig.CHAIN_ID}_cart_token_ids`,
      JSON.stringify(cart_ids)
    );
    setIsInCart(false);
    window.dispatchEvent(new Event("cart"));
  };

  return (
    <AssetMenuButton
      className={expanded ? "cart" : "hidden cart"}
      onClick={isInCart ? removeFromCart : addToCart}
      data-tip={isInCart ? "Remove from Cart" : "Add to Cart"}
    >
      {isInCart ? <MdRemoveShoppingCart /> : <MdAddShoppingCart />}
    </AssetMenuButton>
  );
};
