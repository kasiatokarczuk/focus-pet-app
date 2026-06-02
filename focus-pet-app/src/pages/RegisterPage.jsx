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
      return setError('Passwords do not match.');
    }
    
    try {
      setError('');
      setLoading(true);
      await register(email, password);
      // Po pomyślnej rejestracji kierujemy na onboarding, aby założył profil zwierzaka
      navigate('/onboarding'); 
    } catch (err) {
      setError('Failed to create account. Please try a different email address.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container auth-container--register">
      <header className="auth-topbar">
        <Link className="auth-brand" to="/login">Focus Pet</Link>
        <div className="auth-top-actions">
          <span>Already have an account?</span>
          <Link className="auth-top-button" to="/login">Log in</Link>
        </div>
      </header>

      <main className="auth-register-shell">
        <div className="auth-card glass-effect">
          <div className="auth-egg" aria-hidden="true">
            <span />
          </div>
        <h2 className="auth-title">Join us</h2>
        <p className="auth-subtitle">Create an account in Focus Pet</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              required 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Repeat password"
            />
          </div>
          
          <button disabled={loading} type="submit" className="auth-button">
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
