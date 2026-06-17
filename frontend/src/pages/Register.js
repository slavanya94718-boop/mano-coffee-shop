import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://mano-coffee-shop-1.onrender.com//api/auth/register', {
        name,
        email,
        password
      });
      alert("Registration Successful! Please Login with your new email");
      navigate('/');   // Login page ku po
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6"
            required
          />
          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <a href="/" className="text-amber-800">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
