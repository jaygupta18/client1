// Frontend Code (React.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

const Card = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: '', imageUrl: '' });
  const baseUrl="https://server1-yg8e.onrender.com"
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

  const addItem = async () => {
    if (!newItem.name || !newItem.category ) {
      alert('All fields are required!');
      return;
    } 
    try {
      await axios.post(`${baseUrl}/api/add`, newItem);
      fetchItems();
      setNewItem({ name: '', category: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding item:', error);
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
      <h1>Vegetables and Fruits</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.imageUrl}
          onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
        />
        <button onClick={addItem}>Add</button>
      </div> 
      <div className="category-container">
        <div className="category">
          <h2>Fruit</h2>
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
          <h2>Vegetable</h2>
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