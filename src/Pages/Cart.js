import React, { useState, useEffect } from 'react';
import {useNavigate}  from 'react-router-dom';
import Modal from './Modal';
import GenerateBill from './GenerateBill';

const Cart = ({ cartItems, handleRemoveFromCart, calculateTotalAmount, handleUpdateCartQuantity }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  const handleQuantityChange = (item, change) => {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        handleRemoveFromCart(item); 
      } else {
        handleUpdateCartQuantity(item._id, newQuantity); 
      }
  };
  const handlePrintBill = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBillGenerated = (billId) => {
    setShowModal(false); 
    navigate(`/generate-bill/${billId}`); 
  };

  return (
    <div className={`cart ${cartItems.length > 0 ? 'active' : ''}`}>
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p className="empty-cart">Your cart is empty.</p>
          <button style={{"margin-top": "1rem"}}  className="back-button" onClick={() => navigate('/content')}>Back</button>
        </>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div>
                  <div className="item-info">
                    <div className="item-detail">
                        <h3>{item.item_id.name}</h3>
                        <p>Price: {item.item_id.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total Price: {item.total_price}</p>
                    </div>
                  </div>
                  <div>
                    <div className="item-actions">
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        Remove Item
                      </button>
                      <div className="quantity">
                        
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                        >
                          -
                        </button>
                        <p className='quant'>{item.quantity}</p>
                        <button
                          // style={{ margin: "1%" }}
                          onClick={() => handleQuantityChange(item, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-section">
            <div className="checkout-total">
              <p className="total">Total Amount: {calculateTotalAmount()}</p>
            </div>
            <button
              className="checkout-button"
              disabled={cartItems.length === 0 || calculateTotalAmount() === 0}
              onClick={handlePrintBill}
            >
              Print Total Bill
            </button>
            <button className="back-button" onClick={() => navigate('/content')}>Back</button>
          </div>
          <Modal show={showModal} onClose={handleCloseModal}>
              <GenerateBill onBillGenerated={handleBillGenerated} />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Cart;
