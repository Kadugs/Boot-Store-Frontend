import styled from "styled-components";

const ContainerCart = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .checkout-button {
    text-decoration: none;
    width: 80%;
  }
`;
const MainCart = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: bold;
`;
const CartProducts = styled.table`
  min-width: 500px;
  width: 60vw;
  margin-top: 30px;
  th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    font-weight: bold;
  }
  td {
    padding-top: 5px;
  }
  .product-td {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    p {
      font-weight: bold;
    }
  }
  .product-td:hover {
    background-color: #f8f8f8;
  }
  .qtd-th {
    width: 100px;
  }
  .price-th {
    width: 200px;
  }
  .qtd-td,
  .price-td,
  .delete-td {
    text-align: center;
    vertical-align: middle;
    user-select: none;
  }
  .price-td {
    font-weight: bold;
  }
`;
const ItemImg = styled.img`
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  object-fit: cover;
  width: 140px;
  height: 100px;
  margin: 0 8px 5px 10px;
  border-radius: 5px;
`;
const CheckoutMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  padding: 15px;
  min-width: 160px;
  width: 27vw;
  height: 260px;
  margin-left: 20px;
  border-radius: 5px;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.1);
  overflow: auto;
`;
const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  span {
    font-weight: bold;
  }
`;
const CheckoutButton = styled.div`
  background-color: #f80032;
  color: white;
  border-radius: 5px;
  height: 50px;
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
const Empty = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 32px;
  }
`;
export {
  ContainerCart,
  MainCart,
  Title,
  CartProducts,
  ItemImg,
  CheckoutMenu,
  Total,
  CheckoutButton,
  Empty,
};
