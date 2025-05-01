export const handleSignup = async (username, email, password, role, setError, setIsSigningUp, triggerBuzzleEffect) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role }), // Include username
    });

    const data = await response.json();

    if (data.success) {
      alert('Sign up successful! You can now log in.');
      setIsSigningUp(false); // Switch back to login mode
    } else {
      setError(data.message); // Show error message
      triggerBuzzleEffect(); // Trigger the buzzle animation
    }
  } catch (err) {
    console.error('Sign up failed:', err);
    setError('Sign up failed. Please try again.');
    triggerBuzzleEffect(); // Trigger the buzzle animation
  }
};