import React, { useState } from "react";
import {
  SCREEN_SIZE,
  useDetectScreenType,
} from "../../../hooks/useDetectScreenType.ts";
import { useAuth } from "../../../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter your username and password.");
      return;
    }

    // TODO: Handle login logic here
    console.log({ username, password });
    setErrorMsg("");
  };

  const isMobile = useDetectScreenType(SCREEN_SIZE.SMALL);

  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm sm:max-w-md p-6">
        <h2 className="text-center text-2xl font-bold mb-4">🔐 Login</h2>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
