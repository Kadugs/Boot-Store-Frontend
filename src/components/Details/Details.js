import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductDetails } from "../../services/bootstore";
import {
  IoCartOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import {
  ContainerDetails,
  MainDetails,
  Title,
  Description,
  Price,
  Img,
  Brand,
  CartButtonArea,
  ItemQuantity,
  Button,
  Error,
} from "./ContainerDetails";

export default function Details() {
  const { id } = useParams();
  const [productInfos, setProductInfos] = useState({});
  const [quantityValue, setQuantityValue] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  function addToCart() {
    const cartInfos = {
      code: productInfos.code,
      quantity: quantityValue,
    };
    const storagedItems = JSON.parse(localStorage.getItem("@cartItems"));
    if (!storagedItems) {
      localStorage.setItem("@cartItems", JSON.stringify([cartInfos]));
    } else if (storagedItems.some((item) => item.code === cartInfos.code)) {
      const indexOfEquals = storagedItems.findIndex(
        (item) => item.code === cartInfos.code
      );
      storagedItems[indexOfEquals].quantity += quantityValue;
      localStorage.setItem("@cartItems", JSON.stringify(storagedItems));
    } else {
      localStorage.setItem(
        "@cartItems",
        JSON.stringify([...storagedItems, cartInfos])
      );
    }
  }

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("@cartItems")).some(
        (item) => item.code === productInfos.code
      )
    ) {
      setIsInCart(true);
    }
    getProductDetails(id)
      .then((res) => {
        setProductInfos(res.data);
      })
      .catch((err) => {
        ////////////////////////////////// ALTERAR ESSE CATCH ////////////////////////////////////////
        console.log(err);
      });
  }, [setIsInCart, id]);
  if (productInfos.name === undefined) {
    return <Error>Desculpe, produto não encontrado :(</Error>;
  }
  return (
    <ContainerDetails>
      <MainDetails>
        <Img src={productInfos.image} />
        <div>
          <Title>{productInfos.name}</Title>
          <StarRatings
            rating={4.5}
            starRatedColor="rgb(247, 210, 0)"
            name="rating"
            starDimension="20px"
            starSpacing="1px"
          />
          <Price>R$ {Number(productInfos.value).toFixed(2)}</Price>
          <Description>{productInfos.description}</Description>
          <Brand>Marca: {productInfos.brand}</Brand>
          <CartButtonArea>
            <Button onClick={addToCart}>
              <IoCartOutline fontSize="20px" />
              Adicionar ao carrinho
            </Button>
            <span>Quantidade:</span>
            <ItemQuantity>
              <IoChevronUpOutline
                className="arrows"
                onClick={() => setQuantityValue(quantityValue + 1)}
              />
              <span>{quantityValue}</span>
              <IoChevronDownOutline
                className="arrows"
                filter={quantityValue === 1 ? "brightness(2)" : "none"}
                onClick={
                  quantityValue > 1
                    ? () => setQuantityValue(quantityValue - 1)
                    : null
                }
              />
            </ItemQuantity>
          </CartButtonArea>
          {isInCart ? (
            <Link to="/Cart" className="link-to-cart">
              Item adicionado ao Carrinho!
            </Link>
          ) : null}
        </div>
      </MainDetails>
    </ContainerDetails>
  );
}
