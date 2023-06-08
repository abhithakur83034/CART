
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addproduct from './component/Addproduct'
import Nav from "./component/Nav";
import Show from "./component/Show";
import Cart from "./component/Cart";
import Update from "./component/Update";


export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCartHandler = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };


  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };



  return (
    <>
      <BrowserRouter>
      <Nav cartItems={cartItems} />
        <Routes>
          <Route path="/add" element={<Addproduct />} />
          
          <Route path="/" element={<Show cartItems={cartItems} addToCartHandler={addToCartHandler} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeItem={removeItem} />
} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
