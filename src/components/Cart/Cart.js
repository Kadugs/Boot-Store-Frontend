import { useEffect, useState, useContext } from "react";
import CartContext from "../../contexts/CartContext";
import {
  ContainerCart,
  MainCart,
  Title,
  CartProducts,
  CheckoutMenu,
  Total,
  CheckoutButton,
  Empty,
} from "./ContainerCart";
import ItemCart from "./ItemCart";
export default function Cart() {
  const [total, setTotal] = useState(0);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    let totalValue = 0;
    cart?.forEach((item) => {
      setTotal(totalValue + item.quantity * item.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  if (cart[0]?.name === undefined)
    return (
      <Empty>
        <span>Carrinho vazio</span>
      </Empty>
    );
  return (
    <ContainerCart>
      <MainCart>
        <Title>Meu carrinho</Title>
        <CartProducts>
          <tr>
            <th className="product-th">produto</th>
            <th className="qtd-th">qtd.</th>
            <th className="price-th">valor</th>
            <th></th>
          </tr>
          {cart.map((item, index) => (
            <ItemCart key={item.code} item={item} index={index} />
          ))}
        </CartProducts>
      </MainCart>
      <CheckoutMenu>
        <Title>Informações do pedido</Title>
        <Total>
          <span>Total</span>
          <span>R$ {total}</span>
        </Total>
        <CheckoutButton>continuar</CheckoutButton>
      </CheckoutMenu>
    </ContainerCart>
  );
}
