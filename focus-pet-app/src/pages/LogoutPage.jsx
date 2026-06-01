import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/login', { replace: true });
      } catch (error) {
        console.error("Failed to log out", error);
        // Nawet jeśli wylogowanie z bazy wyrzuci błąd, bezpiecznie przekierowujemy:
        navigate('/login', { replace: true });
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card glass-effect" style={{ textAlign: 'center' }}>
        <h2 className="auth-title">Do zobaczenia!</h2>
        <p className="auth-subtitle" style={{ margin: '30px 0' }}>Trwa wylogowywanie z Twojego konta...</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LogoutPage;
