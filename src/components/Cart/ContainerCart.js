import styled from "styled-components";

const ContainerCart = styled.div`
  display: flex;
  background-color: red;
  background-color: #fff;
  margin: 80px 0 0 80px;
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
  width: 900px;
  margin-top: 30px;
  tr {
  }
  th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
  }
  .product-th {
    display: flex;
    align-items: flex-start;
  }
  .qtd-th {
    width: 100px;
  }
  .price-th {
    width: 200px;
  }
`;
export { ContainerCart, MainCart, Title, CartProducts };
