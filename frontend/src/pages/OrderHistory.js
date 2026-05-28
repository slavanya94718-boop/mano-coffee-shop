import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error("No orders or error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-amber-900">📜 My Orders</h1>
          <button 
            onClick={() => navigate('/menu')}
            className="bg-amber-800 text-white px-6 py-3 rounded-xl hover:bg-amber-900"
          >
            Order More →
          </button>
        </div>

        {loading ? (
          <p className="text-center text-2xl">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No orders yet ☕</p>
            <p className="mt-4">Place your first order from Menu!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex justify-between border-b pb-4 mb-4">
                  <div>
                    <p className="font-bold text-lg">Order #{order.orderId || order._id?.slice(-6)}</p>
                    <p className="text-gray-500 text-sm">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <p className="text-2xl font-bold text-amber-800">₹{order.total}</p>
                </div>

                <div className="mb-4">
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Mobile:</strong> {order.mobile}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                </div>

                <h3 className="font-bold mb-3">Items Ordered:</h3>
                <ul className="space-y-2 mb-6">
                  {order.items?.map((item, i) => (
                    <li key={i} className="flex justify-between bg-amber-50 p-3 rounded-xl">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;