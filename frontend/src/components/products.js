import React from 'react';





function Products(props) {
  return (
    <div className="products">
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Contain Articles</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
         {props.products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <table className="nested-table">
                  <thead>
                    <tr>
                      <th>Article ID</th>
                      <th>Amount Of</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.contain_articles.map((article, idx) => (
                      <tr key={idx}>
                        <td>{article.art_id}</td>
                        <td>{article.amount_of}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>{product.price ? `$${product.price}` : 'N/A'}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
}

export default Products;
