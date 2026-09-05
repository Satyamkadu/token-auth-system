import React from "react";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1720192861639-1524439fc166?fm=jpg&q=60&w=3000&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Welcome to the JWT Authentication System
        </h1>

        <p className="mt-4 text-lg text-gray-200">
          Secure authentication made simple.
        </p>
      </div>
    </div>
  );
};

export default Home;