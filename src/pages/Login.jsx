import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const validEmail = 'admin';
    const validPassword = 'admin';

    if (email === validEmail && password === validPassword) {
      navigate('/overview');
    } else {
      setError('Invalid email or password');
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
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        className="w-full mb-3 px-4 py-2 border rounded"
        />
        <div className="text-right text-xs text-blue-600 cursor-pointer mb-3">Forgot password?</div>
        <button onClick={handleLogin} className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-700 transition-colors">Log In</button>
        <div className="text-center mt-4 text-sm">
          Or sign in as <span onClick={() => navigate('/guest')} className="text-blue-600 cursor-pointer">Guest</span>
        </div>
      </div>
    </div>
  );
}

export default Login;