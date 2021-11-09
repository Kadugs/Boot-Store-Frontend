import styled from "styled-components";

const ContainerDetails = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;
const MainDetails = styled.div`
  display: flex;
  div {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.span``;

const Quantity = styled.span``;

const Description = styled.span``;

const Price = styled.span``;

const Img = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
`;
const Brand = styled.span``;

export {
  ContainerDetails,
  MainDetails,
  Title,
  Quantity,
  Description,
  Price,
  Img,
  Brand,
};
