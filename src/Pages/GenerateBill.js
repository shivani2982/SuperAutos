import React, { useState } from 'react';
import api from '../api/items';
import {useNavigate}  from 'react-router-dom';


const GenerateBill = ({onBillGenerated}) => {
  const [customerName, setCustomerName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();


  const handleGenerateBill = async () => {
    setLoading(true);
    try {
      const response = await api.post('/bill/generate-bill', {
        customer_name: customerName,
        discount,
      });
      const billId = response.data._id;
      onBillGenerated(billId); 
    } catch (err) {
      console.error('Error generating bill:', err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="generate-bill">
      <h2>Generate Bill</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <label htmlFor="discount">Discount:</label>
        <input
          id="discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
        <button
            type="button"
            onClick={handleGenerateBill}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Bill'}
          </button>
        </form>
    </div>
  );
};

export default GenerateBill;
