import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { mockTasks } from '../data/mockTasks';
import { calculateSessionRewards } from '../utils/rewards';
import { formatSeconds } from '../utils/timer';

const sessionLengthSeconds = 25 * 60;

function FocusSessionPage() {
  const [sessionState, setSessionState] = useState('running');
  const rewards = calculateSessionRewards(sessionLengthSeconds);
  const task = mockTasks[0];

  if (sessionState === 'paused') {
    return (
      <main className="session-page">
        <Modal title="Session Paused">
          <div className="session-pet" aria-hidden="true" />
          <p>{task.petName} is waiting for you to return to the flow state.</p>
          <Button onClick={() => setSessionState('running')}>Resume Focus</Button>
        </Modal>
      </main>
    );
  }

  if (sessionState === 'complete') {
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
            <Button onClick={() => setSessionState('running')} variant="secondary">
              Start New Session
            </Button>
          </div>
        </Modal>
      </main>
    );
  }

  return (
    <main className="session-page">
      <section className="session-card">
        <p className="session-task">Task: {task.title}</p>
        <strong className="session-timer">{formatSeconds(sessionLengthSeconds)}</strong>
        <div className="session-pet" aria-hidden="true" />
        <h1>{task.petName} is resting while you work</h1>
        <p>Do not leave the app or your pet will wake up.</p>

        <div className="session-controls">
          <Button onClick={() => setSessionState('complete')} variant="secondary">
            End Session
          </Button>
          <Button onClick={() => setSessionState('paused')}>Take a Breath</Button>
          <Link to="/home">
            <Button variant="secondary">Back Home</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default FocusSessionPage;
