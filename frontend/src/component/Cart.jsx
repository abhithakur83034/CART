
import React, { useState } from "react";

export default function Cart({ cartItems, removeItem }) {
  const [updatedCartItems, setUpdatedCartItems] = useState(cartItems);

  const totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...updatedCartItems];
    updatedItems[index].quantity += 1;
    setUpdatedCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...updatedCartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setUpdatedCartItems(updatedItems);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...updatedCartItems];
    updatedItems.splice(index, 1);
    setUpdatedCartItems(updatedItems);
    removeItem(updatedCartItems[index].id);
  };

  return (
    <>
      <h1>Cart</h1>
      {updatedCartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Index</th>
              <th>sku</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {updatedCartItems.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button className="btn btn-outline-success" onClick={() => handleIncreaseQuantity(index)}>
                    +
                  </button>
                  &nbsp;
                  {item.quantity}
                  &nbsp;
                  <button className="btn btn-outline-danger" onClick={() => handleDecreaseQuantity(index)}>
                    -
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3"></td>
              <td>Total Quantity: {totalQuantity}</td>
              <td>Total Price: {totalPrice}</td>
              <td><button className="btn btn-outline-success">Buy Now</button></td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
}
