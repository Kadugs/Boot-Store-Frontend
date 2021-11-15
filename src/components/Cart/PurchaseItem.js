import { ItemImg } from "./ContainerCart";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { addToCart, deleteFromCart } from "../../services/bootstore";
export default function ItemCart({ item, index }) {
  const { name, image, quantity, code, rating } = item;
  const history = useHistory();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  function deleteItem() {
    const newCart = cart.filter((itemCart) => itemCart !== item);
    if (user) {
      deleteFromCart(user.token, code)
        .then(() => {
          setCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        })
        .catch(() => alert("Ocorreu algum erro! Tente novamente."));
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    }
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
    );
    if (user) {
      addToCart(user.token, newCart[index])
        .then(() => {
          localStorage.setItem("cart", JSON.stringify(newCart));
          setCart(newCart);
        })
        .catch(() => alert("Ocorreu algum erro! Tente novamente."));
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    }
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
      <td className="qtd-td">{quantity}</td>
      <td className="rate-td">{rating ? `${rating} estrelas` : ""}</td>
    </tr>
  );
}
