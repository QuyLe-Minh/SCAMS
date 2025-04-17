import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [triggerBuzzle, setTriggerBuzzle] = useState(false); // State to toggle the buzzle class

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/overview'); // Redirect to the overview page
      } else {
        setError(data.message); // Show error message
        triggerBuzzleEffect(); // Trigger the buzzle animation
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
      triggerBuzzleEffect(); // Trigger the buzzle animation
    }
  };

  const triggerBuzzleEffect = () => {
    setTriggerBuzzle(false); // Remove the class
    setTimeout(() => {
      setTriggerBuzzle(true); // Re-add the class after a short delay
    }, 50); // Small delay to ensure the animation re-triggers
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // Trigger login on Enter key press
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[400px]">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto w-12 h-12" />
          <p className="text-gray-400">SCAMS</p>
          <h2 className="text-xl font-semibold">Log In</h2>
          <p className="text-sm text-gray-500">Enter your email and password below</p>
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
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger login on Enter key press
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger login on Enter key press
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <div className="text-right text-xs text-blue-600 cursor-pointer mb-3">Forgot password?</div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Log In
        </button>
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