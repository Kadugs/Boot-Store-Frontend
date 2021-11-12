import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { getProductDetails, addItemToCart } from "../../services/bootstore";
import Swal from "sweetalert2";
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
} from "./ContainerDetails";

export default function Details() {
  const { code } = useParams();
  const [productInfos, setProductInfos] = useState({});
  const [quantityValue, setQuantityValue] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [haveError, setHaveError] = useState(false);
  const history = useHistory();
  const storagedItems = JSON.parse(localStorage.getItem("cart"));
  const user = JSON.parse(localStorage.getItem("user"));

  function addToCart() {
    const cartInfos = {
      code: productInfos?.code,
      quantity: quantityValue,
    };
    if (user) {
      addItemToCart(user?.token, cartInfos)
        .then(() => {
          setIsInCart(true);
        })
        .catch(() => {
          Swal.fire({
            title: "Produto não encontrado :(",
            confirmButtonText: "Ok",
          });
          localStorage.removeItem("user");
        });
    } else if (!storagedItems) {
      localStorage.setItem("cart", JSON.stringify([cartInfos]));
    } else if (storagedItems?.some((item) => item.code === cartInfos.code)) {
      const indexOfEquals = storagedItems.findIndex(
        (item) => item.code === cartInfos.code
      );
      storagedItems[indexOfEquals].quantity += quantityValue;
      localStorage.setItem("cart", JSON.stringify(storagedItems));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...storagedItems, cartInfos])
      );
    }
  }

  useEffect(() => {
    if (storagedItems?.some((item) => item?.code === productInfos?.code)) {
      setIsInCart(true);
    }
    getProductDetails(code)
      .then((res) => {
        setProductInfos(res.data);
        if (storagedItems?.some((item) => item?.code === res.data?.code)) {
          setIsInCart(true);
        }
      })
      .catch((err) => {
        setHaveError(true);
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsInCart, code]);
  if (haveError) {
    Swal.fire({
      title: "Produto não encontrado :(",
      confirmButtonText: "Ok",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        history.push("/");
      }
    });
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
