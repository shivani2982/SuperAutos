import React from 'react'
import {useNavigate}  from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";


const ItemsTable = React.memo(({items,handleDelete, handleAddToCart }) => {
    const navigate = useNavigate();
    return (
        <div className="item-list">
            {items.map((item) => (
                <div key={item._id.toString()} className="item-row">
                    <div className="item-header">
                        <div className="item-name">{item.name}</div>
                        <div className="item-actions">
                            <button className="editButton" onClick={() => navigate(`/editItem/${item._id}`)}>Edit</button>
                            <button className="deleteButton" onClick={() => handleDelete(item._id)}>Delete</button>
                            <button className="cart-Button" onClick={() => handleAddToCart(item)}>
                                <FaCartArrowDown />
                            </button>
                        </div>
                    </div>
                    <div className="item-details">
                        <span className="item-price">Price: {item.price}</span>
                        <span className="item-quantity">Quantity: {item.quantity}</span>
                    </div>
                </div>
            ))}
        </div>
        // <table>
        //     <thead>
        //     <tr>
        //         {/* <th>ID</th> */}
        //         <th>Name</th>
        //         <th>Price</th>
        //         <th>Quantity</th>
        //     </tr>
        //     </thead>
        //     <tbody>
        //     {items.map(item => (
        //         <tr key={item._id.toString()}>
        //         <td>{item.name}</td>
        //         <td>{item.price}</td>
        //         <td>{item.quantity}</td>
        //         <td>
        //             <button className='editButton' onClick={() => navigate(`/editItem/${item._id}`)}>Edit</button>
        //             <button className='deleteButton' onClick={() => handleDelete(item._id)}>Delete</button>
        //             <button className="cart-Button" onClick={() => handleAddToCart(item)}><FaCartArrowDown /></button>
        //         </td>
        //         </tr>
        //     ))}
        //     </tbody>
        // </table>
    )
})

export default ItemsTable