export const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail: email, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/overview');
      } else {
        setError(data.message);
        triggerBuzzleEffect();
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username/email or password');
      triggerBuzzleEffect();
    }
};