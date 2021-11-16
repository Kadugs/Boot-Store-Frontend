import { ItemImg } from "./ContainerCart";
import { useHistory } from "react-router-dom";
export default function ItemCart({ item, index }) {
  const { name, image, quantity, code, rating } = item;
  const history = useHistory();

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
