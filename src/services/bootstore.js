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

function getProductsList (order) {
    return axios.get(`${BASE_URL}/products?orderby=${order}`);
}

function getRatings () {
    return axios.get(`${BASE_URL}/ratings`);
}

function getProductDetails(code) {
  return axios.get(`${BASE_URL}/product/${code}`);
}

function addToCart(token, body) {
  const config = headerConfig(token);

  return axios.post(`${BASE_URL}/cart`, body, config);
}

function getCart (token) {
  const config = headerConfig(token);

  return axios.get(`${BASE_URL}/cart`, config);
}

function signUp (body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

export {
    searchProduct,
    getProductsList,
    getRatings,
    getProductDetails,
    addToCart,
    getCart,
    signUp,
}
