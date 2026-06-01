import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Jeśli użytkownik nie jest zalogowany, przekierowujemy do logowania
  if (!currentUser) {
    // replace zapobiega dodaniu ścieżki logowania do historii (użytkownik nie może "cofnąć" na stronę chronioną)
    return <Navigate to="/login" replace />;
  }

  // Jeśli jest zalogowany, renderujemy docelowy komponent
  return children;
};

export default ProtectedRoute;
