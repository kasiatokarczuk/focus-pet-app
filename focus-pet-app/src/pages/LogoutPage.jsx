import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    setLoading(true);
      try {
        await logout();
        navigate('/login', { replace: true });
      } catch (error) {
        console.error("Failed to log out", error);
        // Nawet jeśli wylogowanie z bazy wyrzuci błąd, bezpiecznie przekierowujemy:
        navigate('/login', { replace: true });
      }
    };

  const handleStay = () => {
    navigate('/home');
  };

  return (
    <main className="center-page logout-page">
      <Link className="brand center-page__brand" to="/home">
        Focus Pet
      </Link>

      <section className="modal-card logout-card">
        <div className="logout-avatar" aria-hidden="true">
          <img
            className="logout-avatar__image"
            src={`${process.env.PUBLIC_URL}/assets/pets/dog/baby.png`}
            alt=""
          />
        </div>

        <h1>Before you go...</h1>
        <p>
          Your pet will be waiting for you.
          <br />
          Are you sure you want to log out?
        </p>

        {error && <div className="field__error">{error}</div>}

        <div className="button-stack logout-actions">
          <Button onClick={handleLogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Log out'}
          </Button>
          <Button variant="secondary" onClick={handleStay} disabled={loading}>
            Stay with Focus Pet
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LogoutPage;
