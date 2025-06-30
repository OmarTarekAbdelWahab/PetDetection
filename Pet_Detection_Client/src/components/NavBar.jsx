import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function Navbar() {
  const { logUserOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logUserOut();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-primaryDark text-white px-6 py-4 shadow-lg backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-wide hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <span className="text-3xl">🐾</span>
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Pet Detector
          </span>
        </Link>

        <div className="flex space-x-2 items-center">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-lg backdrop-blur-sm border border-transparent hover:border-white/20"
          >
            Home
          </Link>
          <Link 
            to="/analyze" 
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-lg backdrop-blur-sm border border-transparent hover:border-white/20"
          >
            Analyze
          </Link>
          <Link 
            to="/history" 
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-lg backdrop-blur-sm border border-transparent hover:border-white/20"
          >
            History
          </Link>
          
          <div className="w-px h-6 bg-white/30 mx-2"></div>
          
          <button
            onClick={handleLogout}
            className="bg-white/90 text-primary font-semibold px-5 py-2 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200 flex items-center space-x-2 border border-white/20 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
