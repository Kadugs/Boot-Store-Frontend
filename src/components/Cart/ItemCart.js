import { ItemImg } from "./ContainerCart";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
export default function ItemCart({ cartIndex, itemInfos }) {
  const { name, image, value } = itemInfos;
  const storagedItems = JSON.parse(localStorage.getItem("cart"));
  const history = useHistory();
  const [quantityValue, setQuantityValue] = useState(
    storagedItems[cartIndex]?.quantity
  );
  function deleteItem() {
    localStorage.setItem(
      "cart",
      JSON.stringify(storagedItems.filter((item, index) => index !== cartIndex))
    );
    setQuantityValue(0);
  }
  useEffect(() => {
    if (!!storagedItems[cartIndex]) {
      storagedItems[cartIndex].quantity = quantityValue;
    }
    localStorage.setItem("cart", JSON.stringify(storagedItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityValue]);
  if (storagedItems[cartIndex]?.quantity === undefined) return <></>;
  return (
    <tr>
      <td
        className="product-td"
        onClick={() =>
          history.push(`/products/${storagedItems[cartIndex].code}`)
        }
      >
        <ItemImg src={image} alt="dog" />
        <p>{name}</p>
      </td>
      <td className="qtd-td">
        <IoChevronBackOutline
          cursor="pointer"
          onClick={
            quantityValue > 1
              ? () => {
                  setQuantityValue(quantityValue - 1);
                }
              : null
          }
        />
        {quantityValue}
        <IoChevronForwardOutline
          cursor="pointer"
          onClick={() => {
            setQuantityValue(quantityValue + 1);
          }}
        />
      </td>
      <td className="price-td">R$ {value * quantityValue}</td>
      <td className="delete-td">
        <IoTrashBinOutline onClick={deleteItem} cursor="pointer" />
      </td>
    </tr>
  );
}
