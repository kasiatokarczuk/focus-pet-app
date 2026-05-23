import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { clearCurrentUser } from '../utils/storage';

function LogoutPage() {
  const navigate = useNavigate();

  function handleLogout() {
    clearCurrentUser();
    navigate('/login');
  }

  return (
    <main className="center-page">
      <a className="brand center-page__brand" href="/home">
        Focus Pet
      </a>
      <Modal title="Before you go...">
        <div className="logout-avatar" aria-hidden="true" />
        <p>Your pet will be waiting for you. Are you sure you want to log out?</p>
        <div className="button-stack">
          <Button onClick={handleLogout}>Log out</Button>
          <Button onClick={() => navigate('/home')} variant="secondary">
            Stay with Focus Pet
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default LogoutPage;
