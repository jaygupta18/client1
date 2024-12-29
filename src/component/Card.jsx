import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";

function Card() {
  const [items, setItems] = useState([]);
   const baseUrl="https://server1-yg8e.onrender.com";
  
  useEffect(() => {
    axios.get(`${baseUrl}/items`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);

  const handleAdd = (name) => {
    axios
      .post(`${baseUrl}/add`, { name })
      .then((response) => {
        const updatedItems = items.map((item) =>
          item.name === name ? { ...item, count: response.data.count } : item
        );
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error adding count:", error.message);
        if (error.response) {
          console.error("Response error:", error.response.data);
        }
      });
  };

  const handleRemove = (name) => {
    axios.post(`${baseUrl}/remove`, { name })
      .then((response) => {
        const updatedItems = items.map((item) =>
          item.name === name ? { ...item, count: response.data.count } : item
        );
        console.log("hello");
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error("Error removing count:", error);
      });
  };

  return (
    <div className="container">
      
      {items.map((item) => (
        <div className="card" key={item.name}>
          <h2>{item.name}</h2>

          <img
            src={
              item.name === "vegetables"
                ? "https://cdn-icons-png.flaticon.com/512/135/135620.png"
                : "https://cdn-icons-png.flaticon.com/512/135/135574.png"
            }
            alt={item.name}
            className="card-image"
          />
          <p>Count: {item.count}</p>
          <div className="button-group">
            <button onClick={() => handleAdd(item.name)}>Add</button>
            <button onClick={() => handleRemove(item.name)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;

