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

function getProductDetails(id) {
  return axios.get(`${BASE_URL}/product/${id}`);
}

function listCartProductsForVisitor(params) {
  console.log(params);
  return axios.get(`${BASE_URL}/products/cart`, params);
}
function addItemToCart(token, params) {
  const config = createHeaders(token);
  return axios.get(`${BASE_URL}/products/addCart`, config, params);
}

function listCartProductsForUsers(token, params) {
  const config = createHeaders(token);
  return axios.get(`${BASE_URL}/products/listUserCart`, config, params);
}

function getProductsList(order) {
  return axios.get(`${BASE_URL}/products?orderby=${order}`);
}

function getRatings() {
  return axios.get(`${BASE_URL}/ratings`);
}

export {
  getCartQuantity,
  searchProduct,
  getProductsList,
  getRatings,
  getProductDetails,
  listCartProductsForVisitor,
  listCartProductsForUsers,
  addItemToCart,
};
