import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext.js";
import CartContext from "../../contexts/CartContext.js";
import PurchaseContext from "../../contexts/PurchaseContext.js";
import { useParams, Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import {
  getProductDetails,
  addToCart,
  getProductRating,
  rateProduct,
  getPurchaseProducts,
} from "../../services/bootstore";
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
  ContainerRatings,
  Rating,
} from "./ContainerDetails";

Modal.setAppElement("#root");

export default function Details() {
  const { user } = useContext(UserContext);
  const { purchase, setPurchase } = useContext(PurchaseContext);
  const { cart, setCart } = useContext(CartContext);
  const { code } = useParams();
  const [productInfos, setProductInfos] = useState({});
  const [quantityValue, setQuantityValue] = useState(1);
  const [haveError, setHaveError] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [productRating, setProductRating] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isInCart = cart?.some(
    (item) => Number(item.code) === Number(productInfos.code)
  );
  const [starValue, setStarValue] = useState(
    purchase?.rating ? purchase.rating : 0
  );
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "200px",
      height: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };
  useEffect(() => {
    getProductDetails(code)
      .then((res) => {
        setProductInfos(res.data);
      })
      .catch((err) => {
        setHaveError(true);
      });
    getProductRating(code)
      .then((res) => {
        setProductRating(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Não conseguimos obter algumas informações do produto :c",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/");
          }
        });
      });
  }, [code, history, productRating]);
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
          localStorage.setItem("cart", JSON.stringify(newCart));

          setLoading(false);
        })
        .catch(() => alert("Ocorreu algum erro! Tente novamente!"));
    } else {
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setLoading(false);
    }
  }
  function setNewRating() {
    const body = {
      value: starValue,
      code,
    };
    rateProduct(user.token, body)
      .then(() => {
        getPurchaseProducts(user.token)
          .then((response) => setPurchase(response.data))
          .catch((error) =>
            Swal.fire({
              text: "Ocorreu algum erro! Tente novamente.",
            })
          );
      })
      .catch((error) => {
        Swal.fire({
          text: "Ocorreu algum erro! Tente novamente.",
        });
      });
    setModalIsOpen(false);
  }

  if (haveError) {
    Swal.fire({
      title: "Produto não encontrado :(",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
      }
    });
    return <></>;
  }

  return (
    <ContainerDetails>
      <MainDetails>
        <Img src={productInfos.image} />
        <div>
          <Title>{productInfos.name}</Title>
          <ContainerRatings>
            <StarRatings
              rating={productRating?.average}
              starRatedColor="rgb(247, 210, 0)"
              name="rating"
              starDimension="20px"
              starSpacing="1px"
            />
            <span>({productRating.quantity})</span>
          </ContainerRatings>
          <Price>R$ {Number(productInfos.value).toFixed(2)}</Price>
          <Description>{productInfos.description}</Description>
          <Brand>Marca: {productInfos.brand}</Brand>
          <CartButtonArea>
            <Button
              onClick={isInCart || loading ? null : addProductToCart}
              added={isInCart}
              disabled={loading}
            >
              {isInCart ? (
                <IoCheckbox fontSize="20px" />
              ) : (
                <IoCartOutline fontSize="20px" />
              )}
              {isInCart ? "Adicionado" : "Adicionar"} ao carrinho
            </Button>
            {isInCart ? null : (
              <>
                <span>Quantidade:</span>
                <ItemQuantity>
                  <IoChevronUpOutline
                    className="arrows"
                    filter={loading ? "brightness(2) " : "none"}
                    onClick={
                      loading ? null : () => setQuantityValue(quantityValue + 1)
                    }
                  />
                  <span>{quantityValue}</span>
                  <IoChevronDownOutline
                    className="arrows"
                    filter={
                      quantityValue < 2 || loading ? "brightness(2)" : "none"
                    }
                    onClick={
                      quantityValue < 2 || loading
                        ? null
                        : () => setQuantityValue(quantityValue - 1)
                    }
                  />
                </ItemQuantity>
              </>
            )}
          </CartButtonArea>
          {isInCart ? (
            <Link to="/Cart" className="link-to-cart">
              Ir para ao Carrinho
            </Link>
          ) : null}
          {purchase.some((item) => Number(item.code) === Number(code)) ? (
            purchase.some(
              (item) =>
                item.rating != null && Number(item.code) === Number(code)
            ) ? (
              <Rating>
                <span>
                  {" "}
                  Sua avaliação é:{" "}
                  {
                    purchase.find(
                      (item) =>
                        item.rating !== null &&
                        Number(item.code) === Number(code)
                    )?.rating
                  }{" "}
                  estrelas
                </span>
                <button onClick={() => setModalIsOpen(true)}>editar</button>
              </Rating>
            ) : (
              <Rating>
                <span>Você possui este item, mas ainda não avaliou. </span>
                <button onClick={() => setModalIsOpen(true)}>avaliar</button>
              </Rating>
            )
          ) : null}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          contentLabel="Rating"
        >
          <StarRatings
            rating={starValue}
            starRatedColor="rgb(247, 210, 0)"
            name="rating"
            starDimension="30px"
            starSpacing="1px"
            changeRating={(newValue) => {
              setStarValue(newValue);
            }}
          />
          <button onClick={setNewRating}>Confirmar</button>
          <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
        </Modal>
      </MainDetails>
    </ContainerDetails>
  );
}
