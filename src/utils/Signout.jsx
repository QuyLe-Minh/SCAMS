export const handleSignOut = async (navigate) => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/'); // Redirect to the login page
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };