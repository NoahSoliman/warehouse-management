import React from "react";

function Inventory(props) {
  return (
    <div className="inventory">
      <h1>Product Availability</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Available Quantity</th>
            <th>Sell Product</th>

          </tr>
        </thead>
        <tbody>
          {props.inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.availableQuantity}</td>
              <td>
            
                <button onClick={() => props.handleSell(item.product)}>
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
