export const handleLogin = async (email, password, setError, triggerBuzzleEffect, navigate) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail: email, password }),
    });

    const data = await response.json();

    if (data.success) {
      navigate('/overview'); // Redirect on successful login
    } else {
      setError(data.message); // Set error message
      triggerBuzzleEffect(); // Trigger the buzzle effect
    }
  } catch (err) {
    console.error('Login failed:', err);
    setError('Invalid username/email or password'); // Set generic error message
    triggerBuzzleEffect(); // Trigger the buzzle effect
  }
};