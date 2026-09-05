import React,{useState, useEffect, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

const UserProfile = () => {
  const {token  , logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  if (!token) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/auth/me/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [token]);

  const user = {
    username: userData?.username || "John Doe",
    email: userData?.email || "johndoe@example.com",
    role: userData?.role || "Software Developer",
    phone: userData?.phone || "+91 98765 43210",
    location: userData?.location || "Pune, Maharashtra",
    joined: userData?.joined || "January 2026",
  };

  const handleLogout = () => {
//remove token from react context 
    logout(null, null, null);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-100"
          />
        </div>

        {/* Name */}
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {user.username}
          </h1>

          <p className="text-indigo-600 font-medium">
            {user.role}
          </p>
        </div>

        {/* Profile Information */}
        <div className="mt-6 space-y-4">

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">
              Email
            </p>
            <p className="font-medium text-gray-800">
              {user.email}
            </p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">
              Phone
            </p>
            <p className="font-medium text-gray-800">
              {user.phone}
            </p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">
              Location
            </p>
            <p className="font-medium text-gray-800">
              {user.location}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Joined
            </p>
            <p className="font-medium text-gray-800">
              {user.joined}
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 text-white py-2.5 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default UserProfile;