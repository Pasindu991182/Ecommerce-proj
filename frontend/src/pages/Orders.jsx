import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contex/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderItems, setOrderItems] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderItems(allOrdersItem.reverse()); // Show latest orders first
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="px-4 sm:px-10 py-10 bg-white min-h-screen">
      <div className="mb-6">
        <Title text1={"MY_"} text2={"ORDERS"} />
      </div>

      {/* Orders from Database */}
      <div className="space-y-6">
        {orderItems.length === 0 ? (
          <p className="text-gray-600 text-center">No orders placed yet.</p>
        ) : (
          orderItems.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <img src={item.image[0]} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Payment: {item.paymentMethod} - {item.payment ? 'Paid' : 'Not Paid'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-sm font-medium ${item.status === 'Order Placed' ? 'text-yellow-600' : 'text-green-700'}`}>
                  Status: {item.status}
                </span>
                <p className="font-semibold text-base">{currency}{item.price}</p>
                <button onClick={loadOrderData}>Track Order</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
