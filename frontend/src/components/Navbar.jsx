import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  // Check refreshToken instead of token, as the access token lives in memory and resets on hard reload
  const { refreshToken } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-950 border-b border-slate-800 text-slate-300">
      <div className="text-xl font-bold text-white tracking-wide">
        <span className="text-indigo-500">Secure</span>Auth
      </div>
      <div className="flex items-center gap-6 font-medium text-sm">
        <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
        {
          refreshToken ? (
            <>
              <Link 
                to="/profile" 
                className="bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/30 text-indigo-400 py-2 px-5 rounded-lg transition"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-400 transition">Login</Link>
              <Link 
                to="/register" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-5 rounded-lg transition shadow-lg shadow-indigo-500/20"
              >
                Register
              </Link>
            </>
          )
        }
      </div>
    </nav>
  );
}

export default Navbar;