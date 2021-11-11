import { useEffect, useState } from "react";
import { listCartProductsForVisitor } from "../../services/bootstore";
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
  const [cartItemsInfos, setCartItemsInfos] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const storagedItems = JSON.parse(localStorage.getItem("cart"));
  const productCodes = storagedItems.map((item) => item.code);

  function changeTotal() {
    const storaged = JSON.parse(localStorage.getItem("cart"));
    storaged?.forEach((item, index) => {
      setTotalPrice(totalPrice + item.quantity * cartItemsInfos[index].value);
    });
    console.log(totalPrice);
  }
  useEffect(() => {
    const body = {
      params: {
        productCodes: productCodes,
      },
    };
    listCartProductsForVisitor(body)
      .then((res) => {
        setCartItemsInfos(res.data);
        changeTotal();
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (cartItemsInfos[0]?.name === undefined)
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
          {storagedItems.map((item, index) => (
            <ItemCart
              changeTotal={changeTotal}
              cartIndex={index}
              key={item.code}
              itemInfos={cartItemsInfos[index]}
            />
          ))}
        </CartProducts>
      </MainCart>
      <CheckoutMenu>
        <Title>Informações do pedido</Title>
        <Total>
          <span>Total</span>
          <span>R$ {totalPrice}</span>
        </Total>
        <CheckoutButton>continuar</CheckoutButton>
      </CheckoutMenu>
    </ContainerCart>
  );
}
