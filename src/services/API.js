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

function getProductDetails(id) {
  return axios.get(`${BASE_URL}/product/${id}`);
}
export { getProductDetails };
