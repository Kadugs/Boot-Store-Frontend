import StarRatings from "react-star-ratings";
import { IoCartOutline } from "react-icons/io5";
import {
  ContainerDetails,
  MainDetails,
  Title,
  Description,
  Price,
  Img,
  Brand,
  Button,
} from "./ContainerDetails";

const mockProduct = {
  name: "playstation 5",
  quantity: 200,
  description:
    "Parafusadeira / Furadeira a Bateria 12V Carregador Bivolt Automático pfv 012 vonder Indicada para soltar e apertar parafusos de até 6 mm de diâmetro e fazer furos em madeiras ou metais. Possui regulagem para 18 posições de torque ",
  value: 8000,
  image:
    "https://files.tecnoblog.net/wp-content/uploads/2020/11/playstation_5_produto-700x700.png",
  brand: "Sony",
  category: "console",
};
export default function Details() {
  function addToCart() {}

  const { name, description, value, image, brand } = mockProduct;
  return (
    <ContainerDetails>
      <MainDetails>
        <Img src={image} />
        <div>
          <Title>{name}</Title>
          <StarRatings
            rating={4.5}
            starRatedColor="rgb(247, 210, 0)"
            name="rating"
            starDimension="20px"
            starSpacing="1px"
          />
          <Price>R$ {value.toFixed(2)}</Price>
          <Description>{description}</Description>
          <Brand>Marca: {brand}</Brand>
        </div>
        <Button onCLick={addToCart}>
          <IoCartOutline fontSize="20px" />
          Adicionar ao carrinho
        </Button>
      </MainDetails>
    </ContainerDetails>
  );
}
