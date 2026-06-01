import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      return setError('Hasła nie są identyczne.');
    }
    
    try {
      setError('');
      setLoading(true);
      await register(email, password);
      // Po pomyślnej rejestracji przekierowujemy na stronę główną (lub onboarding)
      navigate('/home'); 
    } catch (err) {
      setError('Nie udało się utworzyć konta. Spróbuj innego adresu email.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-effect">
        <h2 className="auth-title">Dołącz do nas</h2>
        <p className="auth-subtitle">Zarejestruj się w Focus Pet</p>
        
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
              placeholder="Minimum 6 znaków"
            />
          </div>
          <div className="form-group">
            <label>Potwierdź hasło</label>
            <input 
              type="password" 
              required 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Powtórz hasło"
            />
          </div>
          
          <button disabled={loading} type="submit" className="auth-button">
            {loading ? 'Rejestracja...' : 'Zarejestruj się'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
