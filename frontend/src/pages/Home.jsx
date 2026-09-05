import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          Production-Ready <span className="text-indigo-500">Authentication</span> Architecture
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12">
          A secure, stateless REST API featuring JSON Web Tokens, Role-Based Access Control (RBAC), multi-device session tracking, and seamless front-end integration.
        </p>

        <div className="flex gap-4 mb-20">
          <Link 
            to="/login" 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-indigo-500/25"
          >
            Test Live System
          </Link>
          <Link 
            to="/register" 
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-indigo-500/30 transition">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-indigo-500/20">
              <span className="text-indigo-400 font-bold text-xl">01</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">JWT Rotation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dual-token architecture with 15-minute volatile access tokens stored securely in memory, backed by 7-day persistent refresh tokens with automatic Axios interceptor rotation.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-emerald-500/20">
              <span className="text-emerald-400 font-bold text-xl">02</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Device Management</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Active sessions are mapped via UUID to environmental metadata (IP & User Agent) in Django's LocMemCache, allowing real-time multi-device tracking and remote session revocation.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-purple-500/20">
              <span className="text-purple-400 font-bold text-xl">03</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">RBAC Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Custom user models utilizing PBKDF2 password hashing. Features role-based endpoint protection, restricting sensitive backend route access exclusively to users with the 'admin' designation.
            </p>
          </div>
        </div>
        
        {/* Test Credentials Banner */}
        <div className="mt-20 w-full max-w-4xl bg-slate-800 p-6 rounded-xl border border-slate-700 text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h4 className="text-white font-semibold mb-1">Demo Credentials</h4>
            <p className="text-slate-500 text-sm">Use these pre-seeded SQLite accounts to test the role-based routing.</p>
          </div>
          <div className="flex flex-col gap-2 bg-slate-900 p-4 rounded border border-slate-700 w-full md:w-auto">
             <div className="flex justify-between gap-8">
                <span className="text-indigo-400 text-sm font-mono uppercase tracking-wider">Admin</span>
                <span className="text-slate-300 text-sm font-mono">admin_master / admin@123</span>
             </div>
             <div className="flex justify-between gap-8">
                <span className="text-emerald-400 text-sm font-mono uppercase tracking-wider">User</span>
                <span className="text-slate-300 text-sm font-mono">ashwini / Ashwini@123</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;