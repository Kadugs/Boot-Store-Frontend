import { ItemImg } from "./ContainerCart";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
export default function ItemCart({ item }) {
  const { name, image, value, quantity, code } = item;
  const history = useHistory();
  const { cart, setCart } = useContext(CartContext);
  function deleteItem() {
    setCart(cart.filter((cartItems) => cartItems !== item));
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              ? () => {
                  setCart(
                    cart.map((itemCart) =>
                      itemCart === item
                        ? {
                            code: itemCart.code,
                            name: itemCart.name,
                            image: itemCart.image,
                            value: itemCart.value,
                            quantity: itemCart.quantity - 1,
                          }
                        : itemCart
                    )
                  );
                }
              : null
          }
        />
        {quantity}
        <IoChevronForwardOutline
          cursor="pointer"
          onClick={() => {
            setCart(
              cart.map((itemCart) =>
                itemCart === item
                  ? {
                      code: itemCart.code,
                      name: itemCart.name,
                      image: itemCart.image,
                      value: itemCart.value,
                      quantity: itemCart.quantity + 1,
                    }
                  : itemCart
              )
            );
          }}
        />
      </td>
      <td className="price-td">R$ {value * quantity}</td>
      <td className="delete-td">
        <IoTrashBinOutline onClick={deleteItem} cursor="pointer" />
      </td>
    </tr>
  );
}
