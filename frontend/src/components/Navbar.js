import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/');
  }
};

  return (
    <nav className="bg-amber-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          ☕ Mano Coffee Shop
        </h1>
        
        <div className="flex gap-6 text-lg">
          {token ? (
            <>
              <Link to="/home" className="hover:text-amber-300 transition">Home</Link>
              <Link to="/menu" className="hover:text-amber-300 transition">Menu</Link>
              <Link to="/orders" className="hover:text-amber-300 transition">My Orders</Link>
              <button 
                onClick={handleLogout}
                className="hover:text-amber-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-amber-300 transition">Login</Link>
              <Link to="/register" className="hover:text-amber-300 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;