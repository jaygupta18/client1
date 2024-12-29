import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css'
import {  useNavigate } from 'react-router-dom';
const AddItem = () => {
    const [newItem, setNewItem] = useState({ name: '', category: '', imageUrl: '' });
    const navigate = useNavigate();
     const baseUrl="https://server1-yg8e.onrender.com"
    const addItem = async () => {
      if (!newItem.name || !newItem.category ) {
        alert('All fields are required!');
        return;
      }
      try {
        await axios.post(`${baseUrl}/api/add`, newItem);
        navigate('/');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    };
  
    return (
      <div className="container">
        <h1>Add New Item</h1>
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
          <button onClick={addItem}>Submit</button>
        </div>
      </div>
    );
  };
  

export default AddItem