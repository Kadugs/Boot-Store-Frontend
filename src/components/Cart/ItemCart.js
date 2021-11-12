import { ItemImg } from "./ContainerCart";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { addToCart } from "../../services/bootstore";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
export default function ItemCart({ item, index }) {
  const { name, image, value, quantity, code } = item;
  const history = useHistory();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  function deleteItem() {
    setCart(cart.filter((cartItems) => cartItems !== item));
  }
  function changeCartQuantity(value) {
    const newCart = cart.map((itemCart) =>
    itemCart === item
      ? {
          code: itemCart.code,
          name: itemCart.name,
          image: itemCart.image,
          value: itemCart.value,
          quantity: itemCart.quantity + value,
        }
      : itemCart
      )
    setCart(newCart);
    if (user) {
      addToCart(user.token, newCart[index])
        .then(() => {
          
        })
        .catch(() => alert("Ocorreu algum erro! Tente novamente."));
    } 
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  if (quantity === undefined) return <></>;
  return (
    <tr>
      <td
        className="product-td"
        onClick={() => history.push(`/products/${code}`)}
      >
        <ItemImg src={image} alt="dog" />
        <p>{name}</p>
      </td>
      <td className="qtd-td">
        <IoChevronBackOutline
          cursor="pointer"
          onClick={
            quantity > 1
              ? () => changeCartQuantity(-1)
              : null
          }
        />
        {quantity}
        <IoChevronForwardOutline
          cursor="pointer"
          onClick={() => changeCartQuantity(1)}
        />
      </td>
      <td className="price-td">R$ {value * quantity}</td>
      <td className="delete-td">
        <IoTrashBinOutline onClick={deleteItem} cursor="pointer" />
      </td>
    </tr>
  );
}
