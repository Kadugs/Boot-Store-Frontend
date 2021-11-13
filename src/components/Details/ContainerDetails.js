import styled from "styled-components";

const ContainerDetails = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  justify-content: center;
  margin-top: 20px;
  color: rgb(91, 91, 91);
  .link-to-cart {
    color: gray;
  }
`;
const MainDetails = styled.div`
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  width: 900px;
  min-height: 600px;
  padding: 40px;
  div {
    margin-left: 30px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    height: 280px;

    .star-ratings,
    .star-container {
      height: 20px;
      margin: 0;
    }
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 20px;
`;

const Price = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0;
`;

const Img = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
  border-radius: 5px;
`;
const Description = styled.span`
  padding-top: 20px;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  line-height: 19px;
`;
const Brand = styled.span`
  font-weight: bold;
  padding: 20px 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
`;
const CartButtonArea = styled.div`
  display: flex !important;
  height: 100px !important;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  span {
    font-size: 12px;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ added }) => (added ? "#4CBB17" : "#f80032")};
  color: white;
  font-size: 19px;
  height: 50px;
  width: 250px;
  border: none;
  font-weight: bold;
  filter: ${({ disabled }) => (disabled ? "brightness(0.5)" : "none")};
  &:hover {
    cursor: ${({ added, disabled }) =>
      added || disabled ? "initial" : "pointer"};
    ${({ added, disabled }) =>
      added || disabled ? "" : "filter: brightness(1.15)"};
  }
`;
const ItemQuantity = styled.div`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 !important;
`;

export {
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
};
