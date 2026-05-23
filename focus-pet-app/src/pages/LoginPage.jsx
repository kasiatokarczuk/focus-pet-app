import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { mockUsers } from '../data/mockUsers';
import { saveCurrentUser } from '../utils/storage';

function LoginPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    saveCurrentUser(mockUsers[0]);
    navigate('/home');
  }

  return (
    <main className="auth-page auth-page--split">
      <section className="auth-visual">
        <Link className="brand" to="/login">
          Focus Pet
        </Link>
        <div className="auth-visual__pet" aria-hidden="true" />
        <p className="eyebrow">Deep Work Sanctuary</p>
        <h2>Designed for cosmic flow and quiet productivity.</h2>
      </section>

      <section className="auth-panel">
        <div className="auth-panel__top">
          <span>Support</span>
          <Link className="pill-link" to="/register">
            Create Account
          </Link>
        </div>
        <h1>Welcome Back</h1>
        <p>Re-enter your focus chamber.</p>

        <form className="form-stack" onSubmit={handleSubmit}>
          <Input id="email" label="Email address" placeholder="cosmic@focuspet.com" type="email" />
          <Input id="password" label="Password" placeholder="Password" type="password" />
          <Button type="submit">Login to Focus Pet</Button>
        </form>

        <div className="auth-links">
          <span>Or continue with</span>
          <div className="auth-links__buttons">
            <Button variant="secondary">Google</Button>
            <Button variant="secondary">Apple</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
