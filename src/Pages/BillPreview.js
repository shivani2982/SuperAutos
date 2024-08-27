import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/items';

const BillPreview = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await api.get(`/bill/${billId}`);
        setBill(response.data);
      } catch (err) {
        console.error('Error fetching bill:', err.message);
      }
    };
    fetchBill();
  }, [billId]);

  if (!bill) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bill-preview">
      <p><strong>Bill Id:</strong> {bill._id}</p>
      <p><strong>Customer Name:</strong> {bill.customer_name}</p>
      <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
      <p>-------------------------------------------------- </p>
      <table className="bill-items">
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map(item => (
            <tr key={item._id}>
              <td>{item.item_id.name}</td>
              <td>{item.item_id.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>-------------------------------------------</p>
      <p><strong>Sub Total:</strong> ${bill.sub_total}</p>
      <p><strong>Discount:</strong> {bill.discount}</p>
      <p><strong>Total Amount:</strong> {bill.total_amount}</p>
      <p>-------------------------------------------</p>
      <p><strong>Contact Details:</strong></p>
      <p>Parkash Lal: 03003574538</p>
      <p>Subhash Kumar: 03330225182</p>
      <button className='printBill' onClick={() => window.print()}>Print Bill</button>
    </div>
  );
};

export default BillPreview;
