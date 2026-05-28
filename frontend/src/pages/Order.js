import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    address: '', 
    mobile: '' 
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || !formData.mobile) {
      alert("Please fill all details!");
      return;
    }

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

const orderPayload = {
  userId: user._id || "guest",   // ← Change to user._id
  name: formData.name,
  address: formData.address,
  mobile: formData.mobile,
  items: cart,
  total: total
};
    try {
      await axios.post('http://localhost:5000/api/orders', orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const orderId = "MCS" + Date.now().toString().slice(-6);

      const finalOrderData = { ...orderPayload, orderId };

      setOrderData(finalOrderData);
      setOrderPlaced(true);

      // Realistic SMS Notification
      setTimeout(() => {
        const smsMessage = `
📱 SMS from Mano Coffee Shop

Dear ${formData.name},

Your order has been confirmed!

Order ID: ${orderId}
Total Amount: ₹${total}

Items:
${cart.map(item => `• ${item.name} - ₹${item.price}`).join('\n')}

Thank you for choosing Mano Coffee Shop! ☕
Your order will be delivered soon.

- Team Mano Coffee
        `.trim();

        alert(smsMessage);
      }, 600);

      localStorage.removeItem('cart');

    } catch (err) {
      alert("Order failed! Please login again.");
      console.error(err);
    }
  };

  if (orderPlaced && orderData) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">Thank you for your order</p>
          
          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl mb-8 text-left">
            <p className="font-semibold text-green-700">📱 Notification Sent Successfully!</p>
            <p className="text-sm mt-1">SMS sent to: <strong>{orderData.mobile}</strong></p>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl text-left mb-8">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <p><strong>Order ID:</strong> {orderData.orderId}</p>
            <p><strong>Name:</strong> {orderData.name}</p>
            <p><strong>Mobile:</strong> {orderData.mobile}</p>
            <p><strong>Address:</strong> {orderData.address}</p>
            <p className="text-2xl font-bold text-amber-800 mt-4">Total: ₹{orderData.total}</p>
          </div>

          <button 
            onClick={() => navigate('/home')}
            className="bg-amber-800 hover:bg-amber-900 text-white px-10 py-4 rounded-2xl text-lg font-semibold w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-900">Checkout</h1>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">🛒 Your Cart ({cart.length})</h2>
          <ul className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-3">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="text-right text-3xl font-bold text-amber-800">
            Total: ₹{total}
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
          
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            onChange={handleChange} 
            className="w-full p-4 border rounded-xl mb-4" 
            required 
          />
          
          <input 
            type="tel" 
            name="mobile" 
            placeholder="Mobile Number (9876543210)" 
            onChange={handleChange} 
            className="w-full p-4 border rounded-xl mb-4" 
            required 
          />
          
          <textarea 
            name="address" 
            placeholder="Full Delivery Address" 
            onChange={handleChange} 
            className="w-full p-4 border rounded-xl mb-6 h-28" 
            required 
          />

          <button 
            type="submit" 
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-xl font-semibold"
          >
            Place Order - ₹{total}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Order;