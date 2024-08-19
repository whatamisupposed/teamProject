import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear session storage or any authentication tokens
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to the login page
    history.push('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
