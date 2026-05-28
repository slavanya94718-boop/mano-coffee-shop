import { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Fetch Products
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-amber-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-4 text-amber-900">☕ Mano Coffee Shop</h1>
        <p className="text-center text-xl text-gray-600 mb-12">Authentic Tamil Nadu Degree Coffee & More</p>

        {loading ? (
          <p className="text-center text-2xl">Loading Menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-56 object-cover"
                  onError={(e) => e.target.src = "https://picsum.photos/id/431/400/300"}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-amber-800">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-xl font-semibold transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Persistent Cart */}
        {cart.length > 0 && (
          <div className="mt-12 bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6">🛒 Your Cart ({cart.length})</h3>
            
            <ul className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-6">
                    <span className="font-semibold text-lg">₹{item.price}</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="text-right mb-6">
              <p className="text-3xl font-bold text-amber-800">Total: ₹{total}</p>
            </div>

            <button
              onClick={() => window.location.href = '/order'}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-xl font-semibold"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;