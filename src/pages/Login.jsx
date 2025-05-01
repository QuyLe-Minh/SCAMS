import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSignup } from '../utils/Signup'; // Adjust the path as needed
import { handleLogin } from '../utils/Signin'; // Adjust the path as needed

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // New state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Guest'); // Default role
  const [error, setError] = useState('');
  const [triggerBuzzle, setTriggerBuzzle] = useState(false); // State to toggle the buzzle class
  const [isSigningUp, setIsSigningUp] = useState(false); // State to toggle between login and signup

  const triggerBuzzleEffect = () => {
    setTriggerBuzzle(false); // Remove the class
    setTimeout(() => {
      setTriggerBuzzle(true); // Re-add the class after a short delay
    }, 50); // Small delay to ensure the animation re-triggers
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      isSigningUp
        ? handleSignup(username, email, password, role, setError, setIsSigningUp, triggerBuzzleEffect)
        : handleLogin(email, password, setError, triggerBuzzleEffect, navigate); // Trigger login or signup on Enter key press
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[400px]">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto w-12 h-12" />
          <p className="text-gray-400">SCAMS</p>
          <h2 className="text-xl font-semibold">{isSigningUp ? 'Sign Up' : 'Log In'}</h2>
          <p className="text-sm text-gray-500">
            {isSigningUp
              ? 'Register using your email and password below'
              : 'Enter your email and password below'}
          </p>
        </div>
        {error && (
          <p
            className={`text-red-500 text-sm mb-3 ${
              triggerBuzzle ? 'buzzle' : ''
            }`}
          >
            {error}
          </p>
        )}
        {isSigningUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full mb-3 px-4 py-2 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        {isSigningUp && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Lecturer">Lecturer</option>
              <option value="Guest">Guest</option>
              <option value="Staff">Staff</option>
              <option value="Student">Student</option>
            </select>
          </div>
        )}
        <div className="text-right text-xs text-blue-600 cursor-pointer mb-3">
          Forgot password?
        </div>
        {!isSigningUp ? (
          <>
            <button
              onClick={() => handleLogin(email, password, setError, triggerBuzzleEffect, navigate)}
              className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-700 transition-colors mb-3"
            >
              Log In
            </button>
            <button
              onClick={() => setIsSigningUp(true)} // Switch to sign-up mode
              className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                handleSignup(username, email, password, role, setError, setIsSigningUp, triggerBuzzleEffect)
              }
              className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-700 transition-colors mb-3"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSigningUp(false)} // Switch back to login mode
              className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Back to Log In
            </button>
          </>
        )}
        <div className="text-center mt-4 text-sm">
          Or sign in as{' '}
          <span
            onClick={() => navigate('/guest')}
            className="text-blue-600 cursor-pointer"
          >
            Guest
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;