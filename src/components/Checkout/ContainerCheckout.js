import styled from "styled-components";

const ContainerCheckout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding-top: 50px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  span {
    font-weight: bold;
    margin-bottom: 30px;
    font-size: 20px;
  }
  strong {
    font-weight: bold;
  }
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

const Form = styled.form`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  div {
    width: 400px;
  }
`;
const Input = styled.input`
  border-radius: 6px;
  border: solid 1px gray;
  width: 400px;
  margin: 10px 0;
  padding-left: 10px;
  height: 35px;
`;
const InputNumber = styled.input`
  width: 58px;
  height: 25px;
  border-radius: 5px;
  margin: 10px 20px;
  border: solid 1px gray;
  padding-left: 5px;
`;

const Label = styled.label`
  width: 400px;
  color: black;
  &::placeholder {
    color: black;
  }
`;
const ContainerSelect = styled.select`
  width: 260px;
  height: 25px;
  border-radius: 5px;
  margin: 10px 20px;
  border: solid 1px gray;
  padding-left: 5px;
  background-color: #fff;
`;
const Button = styled.button`
  background-color: ${(props) => (!props?.cancel ? "#f80032" : "whitegray")};
  color: ${(props) => (!props?.cancel ? "white" : "black")};
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
const ContainerConfirm = styled.div`
  display: flex;
`;
const ShippingInfos = styled.div`
  min-width: 300px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  line-height: 30px;
  margin-right: 20px;
  p {
    padding-top: 20px;
  }
`;
const ContainerConfirmInfos = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  min-width: 400px;
  height: 400px;
  border-radius: 5px;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: auto;
`;
const Li = styled.li`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;
export {
  ContainerCheckout,
  Method,
  Form,
  Input,
  InputNumber,
  Label,
  Button,
  ContainerSelect,
  ContainerConfirm,
  ShippingInfos,
  ContainerConfirmInfos,
  Li,
};
