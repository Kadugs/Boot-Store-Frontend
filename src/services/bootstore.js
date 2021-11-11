import axios from "axios";

const BASE_URL = "http://localhost:4000";

function createHeaders(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

function getCartQuantity(token) {
  const config = createHeaders(token);
  return axios.get(`${BASE_URL}/cart/quantity`, config);
}

function searchProduct(name) {
  return axios.get(`${BASE_URL}/products?name=${name}`);
}
function listCartProductsForVisitor(params) {
  return axios.get(`${BASE_URL}/products/cart`, params);
}

export { getCartQuantity, searchProduct, listCartProductsForVisitor };
