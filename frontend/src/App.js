import React, { useState, useEffect } from "react";
import "./App.css";
import {
  getProducts,
  getArticles,
  getInventory,
  sellProduct,
  uploadData,
} from "./services/api";
import Articles from "./components/articles";
import Products from "./components/products";
import Inventory from "./components/inventory";

function App() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [fileInfo, setFileInfo] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchArticles();
    fetchInventory();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    if (response) setProducts(response.data);
  };

  const fetchArticles = async () => {
    const response = await getArticles();
    if (response) setArticles(response.data);
  };

  const fetchInventory = async () => {
    const response = await getInventory();
    if (response) setInventory(response.data);
  };
  const handleSell = async (productName) => {
    await sellProduct(productName)
      .then((response) => {
        alert(`Product sold and inventory updated`);
        fetchInventory();
        fetchArticles();
      })
      .catch((error) => {
        alert("Insufficient stock");
      });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);

    if (fileInfo && fileInfo.file) {
      const formData = new FormData();
      formData.append("file", fileInfo.file);

      uploadData(formData, fileInfo.whatData)
        .then((response) => {
          alert(`${fileInfo.whatData} loaded successfully`);
          setFileInfo(null);
          fetchProducts();
          fetchArticles();
          fetchInventory();
          e.target[0].value = null;
        })
        .catch((error) => {
          alert(
            `Error loading ${fileInfo.whatData} :  something wrong with the file `
          );
          e.target[0].value = null;
        });
    } else {
      alert("Please select a file");
    }
  };

  const handleFileChange = (e) => {
    let fileName = e.target.files[0].name;
    if (fileName === "inventory.json") {
      let whatData = "articles";
      setFileInfo({ file: e.target.files[0], whatData: whatData });
    } else if (fileName === "products.json") {
      let whatData = "products";
      setFileInfo({ file: e.target.files[0], whatData: whatData });
    } else {
      alert(
        "The name for your file must be 'products.json' or 'inventory.json'"
      );
      e.target.value = null;
    }
  };

  return (
    <div className="App">
      <h1 className="App-header"> Warehouse Management</h1>

      <div className="upload">
        <h1>Upload Data Form</h1>
        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload data</button>
        </form>
      </div>
      <Inventory inventory={inventory} handleSell={handleSell} />
      <Products products={products} />
      <Articles articles={articles} />
    </div>
  );
}

export default App;
