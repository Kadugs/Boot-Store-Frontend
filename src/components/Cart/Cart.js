import { ContainerCart, MainCart, Title, CartProducts } from "./ContainerCart";
import ItemCart from "./ItemCart";
export default function Cart() {
  const itemsLocalStorage = JSON.parse(localStorage.getItem("cart"));
  return (
    <ContainerCart>
      <MainCart>
        <Title>Meu carrinho</Title>
        <CartProducts>
          <tr>
            <th className="product-th">produto</th>
            <th className="qtd-th">qtd.</th>
            <th className="price-th">valor</th>
          </tr>
          {itemsLocalStorage.map((item) => (
            <ItemCart cartInfos={item} key={item.code} />
          ))}
        </CartProducts>
      </MainCart>
    </ContainerCart>
  );
}
