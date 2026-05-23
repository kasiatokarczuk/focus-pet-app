import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { initialAppState } from '../data/initialState';
import { saveAppState, saveCurrentUser } from '../utils/storage';

function RegisterPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = {
      id: crypto.randomUUID(),
      fullName: formData.get('fullName') || 'New Guardian',
      email: formData.get('email') || '',
      coins: initialAppState.coins,
      level: initialAppState.user.level,
      title: initialAppState.user.title,
    };

    saveCurrentUser(user);
    saveAppState(initialAppState);
    navigate('/onboarding');
  }

  return (
    <main className="auth-page auth-page--center">
      <section className="auth-card">
        <div className="egg-preview" aria-hidden="true" />
        <h1>Join the Sanctuary</h1>
        <p>Create an account to start your focus journey with your new pet.</p>

        <form className="form-stack" onSubmit={handleSubmit}>
          <Input id="fullName" label="Full name" name="fullName" placeholder="Enter your full name" />
          <Input id="email" label="Email address" name="email" placeholder="email@sanctuary.com" type="email" />
          <Input id="password" label="Create password" name="password" placeholder="Password" type="password" />
          <Button type="submit">Create Account</Button>
        </form>

        <p className="auth-small">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
