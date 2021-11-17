import axios from "axios";
const BASE_URL = "https://bootstore-cl.herokuapp.com";

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

function getProductsList(order) {
  return axios.get(`${BASE_URL}/products?orderby=${order}`);
}

function getRatings() {
  return axios.get(`${BASE_URL}/ratings`);
}
function getProductRating(code) {
  return axios.get(`${BASE_URL}/ratings/${code}`);
}

function getProductDetails(code) {
  return axios.get(`${BASE_URL}/product/${code}`);
}

function addToCart(token, body) {
  const config = headerConfig(token);

  return axios.post(`${BASE_URL}/cart`, body, config);
}
function deleteFromCart(token, code) {
  const config = headerConfig(token);

  return axios.delete(`${BASE_URL}/cart/${code}`, config);
}

function getCart(token) {
  const config = headerConfig(token);

  return axios.get(`${BASE_URL}/cart`, config);
}
function getPurchaseProducts(token) {
  const config = headerConfig(token);

  return axios.get(`${BASE_URL}/purchase`, config);
}
function rateProduct(token, body) {
  const config = headerConfig(token);

  return axios.post(`${BASE_URL}/ratings`, body, config);
}
function getProductsQuantity(array) {
  let codesUrl = `?`;
  array.forEach((item, index) => {
    if (index === array.length - 1) {
      codesUrl += `codes=${item.code}`;
    } else {
      codesUrl += `codes=${item.code}&`;
    }
  });
  return axios.get(`${BASE_URL}/products/quantity/codes${codesUrl}`);
}
function confirmPurchase(token) {
  const config = headerConfig(token);
  return axios.post(`${BASE_URL}/purchase`, [], config);
}

function signUp(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function signIn(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

export {
  searchProduct,
  getProductsList,
  getRatings,
  getProductRating,
  getProductDetails,
  addToCart,
  getCart,
  deleteFromCart,
  getPurchaseProducts,
  rateProduct,
  signUp,
  signIn,
  getProductsQuantity,
  confirmPurchase,
};
