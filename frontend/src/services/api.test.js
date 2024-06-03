import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  loadArticles,
  loadProducts,
  getProducts,
  getArticles,
  getInventory,
  sellProduct,
  uploadData,
} from "./api";

const mock = new MockAdapter(axios);
const API_URL = "http://localhost:3001/api";

describe("API calls", () => {
  afterEach(() => {
    // Reset the mock adapter for other tests
    mock.reset();
  });

  test("getProducts should make a GET request to get products", async () => {
    mock.onGet(`${API_URL}/products`).reply(200, { data: [] });
    await getProducts();

    // Assert that one GET request was made
    expect(mock.history.get.length).toBe(1);

    // Assert that the GET request was made to the correct URL
    expect(mock.history.get[0].url).toBe(`${API_URL}/products`);
  });

  test("getArticles should make a GET request to get articles", async () => {
    mock.onGet(`${API_URL}/articles`).reply(200, { data: [] });
    await getArticles();
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${API_URL}/articles`);
  });

  test("getInventory should make a GET request to get inventory", async () => {
    mock.onGet(`${API_URL}/products/inventory`).reply(200, { data: [] });
    await getInventory();
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${API_URL}/products/inventory`);
  });

  test("sellProduct should make a POST request to sell a product", async () => {
    const productName = "Dining Chair";
    mock.onPost(`${API_URL}/products/sell`).reply(200);
    await sellProduct(productName);
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${API_URL}/products/sell`);
    expect(mock.history.post[0].data).toBe(JSON.stringify({ productName }));
  });

  test("uploadData should make a POST request to upload data", async () => {
    const formData = new FormData();
    formData.append("file", new Blob(["file content"], { type: "text/plain" }));
    const whatData = "products";
    mock.onPost(`${API_URL}/${whatData}/upload-${whatData}`).reply(200);
    await uploadData(formData, whatData);
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(
      `${API_URL}/${whatData}/upload-${whatData}`
    );
  });
});
