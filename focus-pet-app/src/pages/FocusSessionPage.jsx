import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { mockTasks } from '../data/mockTasks';
import { calculateSessionRewards } from '../utils/rewards';
import { formatSeconds } from '../utils/timer';
import SessionCompletePage from './SessionCompletePage';
import SessionPausedPage from './SessionPausedPage';

const sessionLengthSeconds = 25 * 60;

function FocusSessionPage() {
  const [sessionState, setSessionState] = useState('running');
  const rewards = calculateSessionRewards(sessionLengthSeconds);
  const task = mockTasks[0];

  if (sessionState === 'paused') {
    return <SessionPausedPage onResume={() => setSessionState('running')} task={task} />;
  }

  if (sessionState === 'complete') {
    return (
      <SessionCompletePage
        onRestart={() => setSessionState('running')}
        rewards={rewards}
      />
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
