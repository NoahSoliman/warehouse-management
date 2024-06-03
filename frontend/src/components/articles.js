import React from "react";

function Articles(props) {

  return (
    <div className="articles">
      <h1>Articles</h1>
      <table>
        <thead>
          <tr>
            <th>Article ID</th>
            <th>Name</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {props.articles.map((item, index) => (
            <tr key={index}>
              <td>{item.art_id}</td>
              <td>{item.name}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




export default Articles;
