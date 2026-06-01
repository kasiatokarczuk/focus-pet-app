import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Zwracamy loader w trakcie weryfikacji zgodnie z instrukcją
  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Jeśli użytkownik nie jest zalogowany, przekierowujemy do logowania
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Jeśli jest zalogowany, renderujemy docelowy komponent
  return children;
};

export default PrivateRoute;
