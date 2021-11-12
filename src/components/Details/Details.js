import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import CartContext from "../../contexts/CartContext.js";
import { useParams, Link, useHistory } from "react-router-dom";
import { getProductDetails, addToCart } from "../../services/bootstore";
import {
  IoCartOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoCheckbox,
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
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { code } = useParams();
  const [productInfos, setProductInfos] = useState({});
  const [quantityValue, setQuantityValue] = useState(1);
  const [haveError, setHaveError] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProductDetails(code)
      .then((res) => {
        setProductInfos(res.data);
      })
      .catch((err) => {
        setHaveError(true);
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  function addProductToCart() {
    setLoading(true);

    const body = {
      code: Number(productInfos.code),
      name: productInfos.name,
      image: productInfos.image,
      value: productInfos.value,
      quantity: quantityValue,
    };

    const newCart = cart ? [...cart, body] : [body];

    if (user?.token) {
      addToCart(user.token, body)
        .then(() => {
          setCart(newCart);
          setLoading(false);
        })
        .catch(() => alert("Ocorreu algum erro! Tente novamente!"));
    } else {
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setLoading(false);
    }
  }
  if (!productInfos.name) {
    return <></>;
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
            <Button
              onClick={
                cart?.some(
                  (item) => Number(item.code) === Number(productInfos.code)
                ) || loading
                  ? null
                  : addProductToCart
              }
              added={cart?.some(
                (item) => Number(item.code) === Number(productInfos.code)
              )}
              disabled={loading}
            >
              {cart?.some(
                (item) => Number(item.code) === Number(productInfos.code)
              ) ? (
                <IoCheckbox fontSize="20px" />
              ) : (
                <IoCartOutline fontSize="20px" />
              )}
              {cart?.some(
                (item) => Number(item.code) === Number(productInfos.code)
              )
                ? "Adicionado"
                : "Adicionar"}{" "}
              ao carrinho
            </Button>
            <span>Quantidade:</span>
            <ItemQuantity>
              <IoChevronUpOutline
                className="arrows"
                filter={
                  cart?.some(
                    (item) => Number(item.code) === Number(productInfos.code)
                  ) || loading
                    ? "brightness(2) "
                    : "none"
                }
                onClick={
                  cart?.some(
                    (item) => Number(item.code) === Number(productInfos.code)
                  ) || loading
                    ? null
                    : () => setQuantityValue(quantityValue + 1)
                }
              />
              <span>{quantityValue}</span>
              <IoChevronDownOutline
                className="arrows"
                filter={
                  quantityValue < 2 ||
                  cart?.some(
                    (item) => Number(item.code) === Number(productInfos.code)
                  ) ||
                  loading
                    ? "brightness(2)"
                    : "none"
                }
                onClick={
                  quantityValue < 2 ||
                  cart?.some(
                    (item) => Number(item.code) === Number(productInfos.code)
                  ) ||
                  loading
                    ? null
                    : () => setQuantityValue(quantityValue - 1)
                }
              />
            </ItemQuantity>
          </CartButtonArea>
          {cart?.some(
            (item) => Number(item.code) === Number(productInfos.code)
          ) ? (
            <Link to="/Cart" className="link-to-cart">
              Ir para ao Carrinho
            </Link>
          ) : null}
        </div>
      </MainDetails>
    </ContainerDetails>
  );
}
