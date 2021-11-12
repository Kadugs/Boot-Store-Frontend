import axios from "axios";

const BASE_URL = "http://localhost:4000";

function headerConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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
  const config = headerConfig(token);
  return axios.get(`${BASE_URL}/products/addCart`, config, params);
}

function listCartProductsForUsers(token, params) {
  const config = headerConfig(token);

  return axios.get(`${BASE_URL}/products/listUserCart`, config, params);
}

function getProductsList(order) {
  return axios.get(`${BASE_URL}/products?orderby=${order}`);
}

function getRatings() {
  return axios.get(`${BASE_URL}/ratings`);
}

function addToCart(token, body) {
  const config = headerConfig(token);

  return axios.post(`${BASE_URL}/cart`, body, config);
}

function getCart(token) {
  const config = headerConfig(token);

  return axios.get(`${BASE_URL}/cart`, config);
}

export {
  searchProduct,
  getProductsList,
  getRatings,
  getProductDetails,
  listCartProductsForVisitor,
  listCartProductsForUsers,
  addItemToCart,
  getCart,
  addToCart,
};
