import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const getProducts = () =>
  axios.get(`${API_URL}/products`).catch((error) => {
    alert("There is a connection problem with the server for this request"+ error);
  });
export const getArticles = () =>
  axios.get(`${API_URL}/articles`).catch((error) => {
    alert("There is a connection problem with the server for this request"+ error);
  });

export const getInventory = () =>
  axios.get(`${API_URL}/products/inventory`).catch((error) => {
    alert("There is a connection problem with the server for this request"+ error);
  });

export const sellProduct = (productName) =>
  axios.post(`${API_URL}/products/sell`, { productName })

export const uploadData = (formData, whatData) =>
  axios.post(`${API_URL}/${whatData}/upload-${whatData}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })