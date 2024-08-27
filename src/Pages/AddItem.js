import React from 'react'
import { useLocation } from 'react-router-dom';
import {useNavigate}  from 'react-router-dom';

const AddItem = ({itemName, setItemName, itemQty, setItemQty, itemPrice, setItemPrice, handleAddItem}) => {
  const location = useLocation();
  const navigate= useNavigate()
  const { categoryId } = location.state || {}; 
  
  const onSubmit = (e) => {
    e.preventDefault();
    handleAddItem(itemName, itemQty, itemPrice, categoryId); // Pass categoryId to handleAddItem
  };
  return (
    <main className='NewItem'>
        <h2>Add New Item</h2>
        <form className='addItemForm' onSubmit={onSubmit}>
          <label htmlFor='itemName'>Name: </label>
          <input 
            id='itemName'
            required
            type='Text'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <label htmlFor='itemQty'>Quantity: </label>
          <input 
            id='itemQty'
            required
            type='number'
            value={itemQty}
            onChange={(e) => setItemQty(e.target.value)}
          />
          <label htmlFor='itemPrice'>Price: </label>
          <input 
            id='itemPrice'
            required
            type='number'
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <button type='submit'>Add</button>
          <button onClick={() => navigate('/content')}>Back</button>
        </form>
    </main>
  )
}

export default AddItem