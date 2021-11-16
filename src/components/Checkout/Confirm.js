import {
  ContainerCheckout,
  Button,
  ContainerConfirm,
  ShippingInfos,
  ContainerConfirmInfos,
  Li,
} from "./ContainerCheckout";
import { getProductsQuantity } from "../../services/bootstore";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import PaymentContext from "../../contexts/PaymentContext";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect } from "react";
import { confirmPurchase } from "../../services/bootstore";
export default function Confirm() {
  const { payment } = useContext(PaymentContext);
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const history = useHistory();
  useEffect(() => {
    if (!payment?.method) {
      Swal.fire({
        icon: "error",
        title: `Primeiro, preencha os dados de compra`,
        confirmButtonText: "Ok",
      }).then(history.push("/cart"));
    }
  }, [cart, history, payment]);

  function confirm() {
    getProductsQuantity(cart)
      .then((res) => {
        let soldOut = cart.find(
          (product, index) => product.quantity > res.data[index]
        );
        if (soldOut) {
          Swal.fire({
            icon: "error",
            title: `Desculpe, mas não temos ${soldOut.name} no estoque na quantidade que você necessita :c
            Por favor, tente novamente mais tarde`,
            confirmButtonText: "Ok",
          }).then(history.push("/cart"));
        } else {
          confirmPurchase(user.token)
            .then(() => {
              Swal.fire({
                title: "Compra Concluída!",
                confirmButtonText: "Ok",
              });
              history.push("/");
              setCart([]);
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: `Desculpe, tivemos um problema ao finalizar seu pedido, 
              por favor, tente novamente`,
                confirmButtonText: "Ok",
              }).then(history.push("/cart"));
            });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `Desculpe, tivemos um problema ao finalizar seu pedido, 
              por favor, tente novamente`,
          confirmButtonText: "Ok",
        }).then(history.push("/cart"));
      });
  }
  function cancel() {
    Swal.fire({
      title: `Tem certeza que deseja cancelar?`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((res) => (res.isConfirmed ? history.push("/cart") : null));
  }
  function ItemCart({ item }) {
    return (
      <Li>
        <div>
          {item.quantity} - {item.name}:
        </div>
        <div>
          {Number(item.value * item.quantity).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </Li>
    );
  }
  return (
    <ContainerCheckout>
      <span>Confirmar compra</span>
      <ContainerConfirm>
        <ShippingInfos>
          <p>
            <strong>Meio de pagamento:</strong> {payment?.method}
          </p>
          <p>
            <strong>Endereço:</strong> <br /> {payment?.street}, n°{" "}
            {payment?.number} <br /> {payment?.city} - {payment?.state}
          </p>
        </ShippingInfos>
        <ContainerConfirmInfos>
          <span>Itens do carrinho</span>
          <ul>
            {cart.map((item) => (
              <ItemCart item={item} key={item.code} />
            ))}
          </ul>
        </ContainerConfirmInfos>
      </ContainerConfirm>
      <div>
        <Button onClick={confirm}>Confirmar</Button>
        <Button cancel onClick={cancel}>
          Cancelar
        </Button>
      </div>
    </ContainerCheckout>
  );
}
