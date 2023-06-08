

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Show(props) {
  console.log("show",props)
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  let url = "http://localhost:4000/list";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hDelete = async (id) => {
    let result = await fetch('http://localhost:4000/delete/' + id, {
      method: "DELETE"
    });
    result = await result.json();
    if (result) {
      window.location.reload();
    }
  }

  const hUpdate = (id) => {
    navigate('/update/' + id);
  }


  const addToCartHandler = (item) => {
    const isDuplicate = props.cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (isDuplicate) {
      alert("Item is already in the cart.");
    } else {
      props.addToCartHandler(item);
    }
  };
  
  console.log("Data" , data)

  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <div className="card mb-3" style={{ maxWidth: "500px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  
                  <img src={item.image} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    {/* <h5 className="card-title"><b>sku::</b>{item._id} </h5> */}
                    <h5 className="card-title"><b>sku::</b>{item.sku} </h5>
                    <p className="card-text"><b>name::</b>{item.name} </p>
                    <p className="card-text"><b>price::</b>{item.price} </p>
                    <p className="card-text"><b>model::</b>{item.model} </p>
                    <p className="card-text"> <b>manufacturer</b>{item.manufacturer} </p>
                    <p className="card-text" style={{ width: 'fit-content' }} onClick={() => { hDelete(item._id) }}>
                      <i className="fa-solid fa-trash"></i> </p>
                    <p className="card-text" style={{ width: 'fit-content' }} onClick={() => { hUpdate(item._id) }}>
                      <i className="fa-solid fa-pen-to-square"></i> </p>

                      <input
              type="submit"
              onClick={() => addToCartHandler({
                sku: item.sku,
                name: item.name,
                price: item.price,
                id: item._id,
                quantity:item.quantity
              })}
              value="Add To Cart"
              className="btn btn-outline-success"
            />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
