import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Strong autofill block
  useEffect(() => {
    setTimeout(() => {
      setEmail('');
      setPassword('');
    }, 100);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://mano-coffee-shop-1.onrender.com//api/auth/login', {
        email,
        password
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            required
            autoComplete="off"
            name="new-email"          // Trick for browser
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6"
            required
            autoComplete="new-password"
            name="new-password"       // Trick for browser
          />
          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account? <a href="/register" className="text-amber-800">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
