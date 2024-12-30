// Frontend Code (React.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';
import {  useNavigate } from 'react-router-dom';
const Card = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: '', imageUrl: '' });
  const baseUrl="https://server1-yg8e.onrender.com";
  const navigate = useNavigate();
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/remove/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const fruits = items.filter(item => item.category.toLowerCase() === 'fruit');
  const vegetables = items.filter(item => item.category.toLowerCase() === 'vegetable');

  return (
    <div className="container">
      <h1> Fruits and Vegetables</h1>
      <button className="firstbutton" onClick={() => navigate('/add') }>Add New Item</button>
      <div className="category-container">
        <div className="category">
          <h2>Fruits</h2>
          <ul className="item-list">
            {fruits.map((item) => (
              <li key={item._id} className="item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-info">
                  <strong>{item.name}</strong> 
                </div>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div> 
        <div className="category">
          <h2>Vegetables</h2>
          <ul className="item-list">
            {vegetables.map((item) => (
              <li key={item._id} className="item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-info">
                  <strong>{item.name}</strong>
                </div>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;