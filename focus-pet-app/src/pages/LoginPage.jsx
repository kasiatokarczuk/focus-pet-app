import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError('Nie udało się zalogować. Sprawdź e-mail i hasło.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/home');
    } catch (err) {
      setError('Logowanie przez Google nie powiodło się.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container auth-container--login">
      <header className="auth-topbar">
        <Link className="auth-brand" to="/login">Focus Pet</Link>
        <div className="auth-top-actions">
          <Link className="auth-top-button" to="/register">Stwórz konto</Link>
        </div>
      </header>

      <main className="auth-login-shell">
        <section className="auth-visual-panel" aria-label="Focus Pet preview">
          <div className="auth-pet-orb" aria-hidden="true">
            <div className="auth-pet-face">
              <span className="auth-pet-ear auth-pet-ear--left" />
              <span className="auth-pet-ear auth-pet-ear--right" />
            </div>
          </div>
          <p className="auth-eyebrow">Strefa skupienia</p>
          <h2>Spokojna przestrzeń do pracy, nauki i budowania dobrych nawyków.</h2>
        </section>

        <div className="auth-card glass-effect">
        <h2 className="auth-title">Witaj ponownie</h2>
        <p className="auth-subtitle">Zaloguj się do Focus Pet</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Wpisz swój email"
            />
          </div>
          <div className="form-group">
            <label>Hasło</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wpisz hasło"
            />
          </div>
          
          <button disabled={loading} type="submit" className="auth-button">
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <span style={{ color: '#a0a0b0', fontSize: '0.85rem' }}>LUB</span>
          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="auth-button"
            style={{ background: '#DB4437', marginTop: '15px', width: '100%' }}
          >
            {loading ? 'Ładowanie...' : 'Zaloguj przez Google'}
          </button>
        </div>
        
        <div className="auth-links">
          <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
        </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
