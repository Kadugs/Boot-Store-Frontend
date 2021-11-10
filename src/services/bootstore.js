import axios from "axios";
const BASE_URL = "http://localhost:4000";

function getCartQuantity(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${BASE_URL}/cart/quantity`, config);
}

function searchProduct(name) {
  return axios.get(`${BASE_URL}/products?name=${name}`);
}
function getProductDetails(id) {
  return axios.get(`${BASE_URL}/product/${id}`);
}
export { getCartQuantity, searchProduct, getProductDetails };
