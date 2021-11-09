import {
  ContainerDetails,
  MainDetails,
  Title,
  Quantity,
  Description,
  Price,
  Img,
  Brand,
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
  const { name, quantity, description, value, image, brand } = mockProduct;
  return (
    <ContainerDetails>
      <MainDetails>
        <Img src={image} />
        <div>
          <Title>{name}</Title>
          <Quantity>Disponíveis: {quantity}</Quantity>
          <Description>{description}</Description>
          <Price>R$ {value.toFixed(2)}</Price>
          <Brand>Marca: {brand}</Brand>
        </div>
      </MainDetails>
    </ContainerDetails>
  );
}
