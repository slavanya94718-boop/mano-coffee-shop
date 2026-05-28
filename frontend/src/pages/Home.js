import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-6 py-20">
        <div className="text-8xl mb-6">☕</div>
        
        <h1 className="text-6xl font-bold text-amber-900 mb-6 leading-tight">
          Welcome to<br />Mano Coffee Shop
        </h1>
        
        <p className="text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Authentic Kumbakonam Degree Coffee & More<br />
          Brewed with love in Tamil Nadu tradition
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => navigate('/menu')}
            className="bg-amber-800 hover:bg-amber-900 text-white px-12 py-5 rounded-2xl text-2xl font-semibold transition shadow-lg"
          >
            View Menu →
          </button>
          
          <button 
            onClick={() => navigate('/orders')}
            className="border-2 border-amber-800 text-amber-800 hover:bg-amber-100 px-12 py-5 rounded-2xl text-2xl font-semibold transition"
          >
            My Orders
          </button>
        </div>

        <p className="mt-12 text-gray-500">Freshly brewed • Traditional • Pure Taste</p>
      </div>
    </div>
  );
}

export default Home;