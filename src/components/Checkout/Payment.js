import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import PaymentContext from "../../contexts/PaymentContext";
import { getProductsQuantity } from "../../services/bootstore";
import {
  ContainerCheckout,
  Method,
  Form,
  Input,
  Label,
  Button,
} from "./ContainerCheckout";
import Swal from "sweetalert2";

export default function Payment() {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { payment, setPayment } = useContext(PaymentContext);
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [name, setName] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Para continuar, entre com uma conta :D",
        confirmButtonText: "Ok",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          history.push("/sign-in");
        }
      });
    }
    getProductsQuantity(cart).then((res) => {
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
      }
    });
  }, [user, history, cart]);

  function savePaymentForm(event) {
    event.preventDefault();
    if (creditCard.length !== 16 || !Number(creditCard)) {
      Swal.fire({
        icon: "error",
        title: `Número de cartão inválido`,
        confirmButtonText: "Ok",
      });
    } else {
      setPayment({ ...payment, name: name, creditCard: creditCard });
      history.push("/checkout/shipping");
    }
  }

  return (
    <ContainerCheckout>
      <Method isCreditCard={isCreditCard}>
        <span>Escolha o método de pagamento</span>
        <div>
          <button
            onClick={() => {
              setPayment({ method: "ticket" });
              history.push("/checkout/shipping");
            }}
          >
            Boleto
          </button>
          <button
            className="credit-card"
            onClick={() => {
              if (!isCreditCard) setPayment({ method: "credit-Card" });
              setIsCreditCard(!isCreditCard);
            }}
          >
            Cartão
          </button>
        </div>
      </Method>
      {isCreditCard ? (
        <Form onSubmit={savePaymentForm}>
          <span>Preencha os dados do Cartão</span>
          <Label>Nome do titular:</Label>
          <Input
            type="text"
            placeholder="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Label>Número do cartão:</Label>
          <Input
            type="text"
            placeholder="16 dígitos"
            value={creditCard}
            onChange={(e) => {
              setCreditCard(e.target.value);
            }}
          />
          <Button type="submit">continuar</Button>
        </Form>
      ) : null}
    </ContainerCheckout>
  );
}
