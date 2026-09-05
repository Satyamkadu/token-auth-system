import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import api from "../api";

const UserProfile = () => {
  const { token, refreshToken, sessionId, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [adminData, setAdminData] = useState(null);
  const [adminError, setAdminError] = useState("");

  // If there is no refresh token, they are not authenticated. Boot them.
  if (!refreshToken) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch authentic user profile data
        const profileRes = await api.get('/auth/me/');
        setUserData(profileRes.data);

        // 2. Fetch all active device sessions from the Django cache
        const sessionsRes = await api.get('/auth/devices/');
        setSessions(sessionsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Live countdown timer for the demo
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 900)); // Resets to 15m for demo looping
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const fetchAdminData = async () => {
    try {
      setAdminError("");
      const res = await api.get('/auth/admin-dashboard/');
      setAdminData(res.data);
    } catch (err) {
      setAdminError("403 FORBIDDEN: Insufficient clearance.");
    }
  };

  const handleRevokeSession = async (targetSessionId) => {
    try {
      await api.delete(`/auth/devices/${targetSessionId}/`);
      // Remove the revoked session from the UI immediately
      setSessions((prev) => {
        const updatedSessions = { ...prev };
        delete updatedSessions[targetSessionId];
        return updatedSessions;
      });
    } catch (error) {
      console.error("Failed to revoke session", error);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-indigo-400 font-mono">
        Establishing secure connection...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center bg-slate-800 p-6 rounded-xl border border-slate-700">
          <div>
            <h1 className="text-3xl font-bold text-white">System Architecture Demo</h1>
            <p className="text-slate-400 mt-1">Authenticated as <span className="text-indigo-400 font-mono">{userData?.username}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 text-red-400 border border-red-500/20 px-6 py-2 rounded-lg font-medium hover:bg-red-500/20 transition"
          >
            Terminate Master Session
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Identity & RBAC Panel */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Identity & RBAC</h2>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">User ID (UUID)</p>
              <p className="font-mono text-white text-xs truncate" title={userData?.id}>{userData?.id}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
              <p className="text-white">{userData?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Assigned Role</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${userData?.role === 'admin' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                {userData?.role}
              </span>
            </div>
          </div>

          {/* Token Mechanics Panel */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 col-span-1 md:col-span-2 space-y-4 overflow-hidden">
            <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Token Mechanics</h2>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Volatile Access Token</p>
                <p className="text-xs font-mono font-bold text-red-400 border border-red-500/30 bg-red-500/10 px-2 py-0.5 rounded">
                  EXPIRES IN: {formatTime(countdown)}
                </p>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-emerald-400 break-all h-24 overflow-y-auto">
                {token || "Handled securely in memory by Axios Interceptor"}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Persistent Refresh Token (7d)</p>
              <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-indigo-400 break-all h-24 overflow-y-auto">
                {refreshToken}
              </div>
            </div>
          </div>
        </div>

        {/* RBAC Demonstration Panel - Only visible to Admins */}
        {userData?.role === 'admin' && (
          <div className="bg-slate-800 p-6 rounded-xl border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-4 flex items-center gap-2">
              <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Restricted</span>
              Admin Control Panel
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              This section is only rendered because your identity payload contains the 'admin' role. Click below to request data from the protected Django admin endpoint.
            </p>
            
            <button 
              onClick={fetchAdminData}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded shadow transition mb-4 text-sm font-medium"
            >
              Fetch Protected Server Data
            </button>

            {adminData && adminData.users && (
              <div className="mt-4 bg-slate-900 rounded border border-emerald-500/30 overflow-x-auto shadow-inner shadow-black/20">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-emerald-500 uppercase tracking-wider border-b border-emerald-500/30 bg-emerald-500/10">
                      <th className="p-3 font-medium">User ID (UUID)</th>
                      <th className="p-3 font-medium">Username</th>
                      <th className="p-3 font-medium">Email</th>
                      <th className="p-3 font-medium">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-500/20">
                    {adminData.users.map((sysUser) => (
                      <tr key={sysUser.id} className="hover:bg-emerald-500/5 transition text-emerald-400">
                        <td className="p-3 font-mono text-xs truncate max-w-[150px]" title={sysUser.id}>{sysUser.id}</td>
                        <td className="p-3 font-medium">{sysUser.username}</td>
                        <td className="p-3">{sysUser.email || "N/A"}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${sysUser.role === 'admin' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            {sysUser.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {adminError && (
              <div className="bg-slate-900 p-4 rounded border border-red-500/30 text-red-400 font-mono text-sm">
                SECURITY BREACH: {adminError}
              </div>
            )}
          </div>
        )}

        {/* Active Sessions Panel */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-4">Active Device Sessions (LocMemCache)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500 uppercase tracking-wider border-b border-slate-700">
                  <th className="pb-3 font-medium">Session ID (UUID)</th>
                  <th className="pb-3 font-medium">IP Address</th>
                  <th className="pb-3 font-medium">Device Agent</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {Object.entries(sessions).map(([sid, data]) => (
                  <tr key={sid} className="hover:bg-slate-700/20 transition">
                    <td className="py-3 font-mono text-xs text-indigo-300">
                      {sid} {sid === sessionId && <span className="ml-2 text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full">CURRENT</span>}
                    </td>
                    <td className="py-3 font-mono text-slate-400">{data.ip}</td>
                    <td className="py-3 text-slate-400 truncate max-w-xs" title={data.device}>{data.device}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleRevokeSession(sid)}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-1 border border-red-500/30 rounded bg-red-500/10 transition"
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {Object.keys(sessions).length === 0 && (
              <p className="text-center text-slate-500 py-4">No active sessions found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;