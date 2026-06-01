import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';

function SessionCompletePage({ onRestart, rewards }) {
  return (
    <main className="session-page">
      <Modal title="Session Complete">
        <p>Your sanctuary has evolved through your discipline.</p>
        <div className="reward-list">
          <span>Focus time: 25:00</span>
          <span>Resilience gained: +{rewards.hp} HP</span>
          <strong>Currency accrued: {rewards.coins} Coins</strong>
        </div>
        <div className="button-row">
          <Link to="/home">
            <Button>Return to Focus Pet</Button>
          </Link>
          <Button onClick={onRestart} variant="secondary">
            Start New Session
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default SessionCompletePage;
