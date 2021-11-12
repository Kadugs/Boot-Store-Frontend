import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import {getProductsQuantity} from "../../contexts/getCart";
import Swal from 'sweetalert2'
import {
    ContainerCheckout
} from "./ContainerCheckout";

export default function Checkout() {
  const {user} = useContext(UserContext);
  const {cart} = useContext(CartContext);
  const history = useHistory();
  useEffect(() => {
    if(!user) {
      history.push("sign-in");
    }
    getProductsQuantity(cart)
      .then((res) => {
          if(!cart.some((product, index) => product.quantity < res.data[index])) {
            
          } 
      })
  }, [user, history]);

  return(
      <ContainerCheckout>

      </ContainerCheckout>
  )
}