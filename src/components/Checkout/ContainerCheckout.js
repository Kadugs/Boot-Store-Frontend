import styled from "styled-components";

const ContainerCheckout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding-top: 50px;
`;
const Method = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    border: solid 1px gray;
    border-radius: 5px;
    background-color: #f8f8f8;
    width: 100px;
    height: 40px;
    margin: 10px;
  }
  .credit-card {
    background-color: ${(props) =>
      props.isCreditCard ? " #f80032" : "#f8f8f8"};
    color: ${(props) => (props.isCreditCard ? "white" : "black")};
  }
  button:hover {
    cursor: pointer;
    background-color: #f80032;
    border: solid 1px white;
    color: white;
  }
`;

const PaymentForm = styled.form`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  span {
    font-weight: bold;
    margin-bottom: 30px;
    font-size: 20px;
  }
`;
const Input = styled.input`
  width: 200px;
  border-radius: 6px;
  border: solid 1px gray;
  width: 400px;
  margin: 10px 0;
  padding-left: 10px;
  height: 35px;
`;
const Label = styled.label`
  width: 400px;
  color: black;
  &::placeholder {
    color: black;
  }
`;
const Button = styled.button`
  background-color: #f80032;
  color: white;
  border-radius: 5px;
  border: 1px solid gray;
  width: 380px;
  height: 50px;
  margin-top: 14px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(1.5);
    cursor: pointer;
  }
`;
export { ContainerCheckout, Method, PaymentForm, Input, Label, Button };
