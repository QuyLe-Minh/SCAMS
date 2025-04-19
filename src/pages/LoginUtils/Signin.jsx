export const handleLogin = async (email, password, setError, triggerBuzzleEffect, navigate) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail: email, password }),
    });

    const data = await response.json();

    if (data.success || data.resultCode === 4) {
      // Treat resultCode 4 (Already logged in) as a successful login
      navigate('/overview');
    } else if (data.resultCode === 5) {
      setError('Different account detected. Please try logging in again.');
      triggerBuzzleEffect();
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