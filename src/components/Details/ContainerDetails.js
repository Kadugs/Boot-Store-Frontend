import styled from "styled-components";

const ContainerDetails = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  justify-content: center;
  margin-top: 20px;
  color: rgb(91, 91, 91);
`;
const MainDetails = styled.div`
  position: relative;
  background-color: #fff;
  display: flex;
  border-radius: 5px;
  width: 900px;
  min-height: 600px;
  padding: 40px;
  div {
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
const Button = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  bottom: 80px;
  right: 80px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f80032;
  color: white;
  font-size: 19px;
  height: 50px;
  width: 250px;
  border: none;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    filter: brightness(1.15);
  }
`;

export {
  ContainerDetails,
  MainDetails,
  Title,
  Description,
  Price,
  Img,
  Brand,
  Button,
};
