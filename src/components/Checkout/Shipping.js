import {
  ContainerCheckout,
  Form,
  Input,
  InputNumber,
  Label,
  Button,
} from "./ContainerCheckout";
import Select from "./Select";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import PaymentContext from "../../contexts/PaymentContext";
import { useContext, useState, useEffect } from "react";

export default function Shipping() {
  const { payment, setPayment } = useContext(PaymentContext);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [state, setState] = useState("AC");
  const history = useHistory();

  useEffect(() => {
    if (!payment?.method) {
      Swal.fire({
        icon: "error",
        title: `Primeiro, preencha os dados de compra`,
        confirmButtonText: "Ok",
      }).then(history.push("/cart"));
    }
  }, [history, payment]);

  function saveShippingForm(event) {
    event.preventDefault();
    if (
      houseNumber < 0 ||
      houseNumber > 10000 ||
      city.length > 60 ||
      street.length > 174
    ) {
      Swal.fire({
        icon: "error",
        title: `Número de cartão inválido`,
        confirmButtonText: "Ok",
      });
    } else {
      const newPayment = {
        ...payment,
        city: city,
        street: street,
        number: houseNumber,
        state: state,
      };
      setPayment(newPayment);
      history.push("/checkout/confirm");
    }
  }

  return (
    <ContainerCheckout>
      <Form onSubmit={saveShippingForm}>
        <span>Preencha os dados de entrega</span>

        <Label>Cidade:</Label>
        <Input
          type="text"
          placeholder="nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Label>Rua:</Label>
        <Input
          type="text"
          placeholder="nome da rua"
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
          required
        />
        <div>
          <Label>Estado:</Label>
          <Select value={state} setState={setState} />
        </div>
        <div>
          <Label>Número:</Label>
          <InputNumber
            type="number"
            value={houseNumber}
            onChange={(e) => {
              setHouseNumber(e.target.value);
            }}
            required
          ></InputNumber>
        </div>
        <Button type="submit">continuar</Button>
      </Form>
    </ContainerCheckout>
  );
}
