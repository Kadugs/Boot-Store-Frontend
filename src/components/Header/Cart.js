import styled from "styled-components";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RiShoppingCartLine as CartIcon } from "react-icons/ri";
import { getCartQuantity } from "../../services/bootstore.js";

export default function Cart({ token }) {
  const [quantity, setQuantity] = useState(0);
  const history = useHistory();

  useEffect(() => {
    getCartQuantity(token)
      .then((response) => setQuantity(response.data))
      .catch(() => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        setQuantity(cart ? cart.length : 0);
      });
  }, [quantity]);

  return (
    <CartBox onClick={() => history.push("/cart")}>
      <CartIcon style={{ fontSize: "50px" }} />
      <CartQuantity>{quantity}</CartQuantity>
    </CartBox>
  );
}

const CartBox = styled.div`
  cursor: pointer;
  position: relative;
`;

const CartQuantity = styled.div`
  background-color: #cd0114;
  position: absolute;
  top: -5px;
  right: -10px;
  padding: 5px;
  border-radius: 50%;
`;
