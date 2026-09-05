import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center px-8 py-6  bg-gray-800 text-white mx">
        <div className="logo">JWT Authentication</div>
        <div className="flex items-center gap-5">
            <Link to="/">Home</Link>
            {
              token ? (
                <>
                  <Link to="/profile" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Profile</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</Link>
                  <Link to="/register" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Register</Link>
                </>
              )
            }
        </div>
    </div>
  )
}

export default Navbar