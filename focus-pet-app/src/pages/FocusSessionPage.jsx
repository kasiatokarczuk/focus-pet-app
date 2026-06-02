import { useEffect, useState } from 'react';
import { Pause, Square, Volume2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { initialAppState } from '../data/initialState';
import { mockTasks } from '../data/mockTasks';
import { calculateSessionRewards } from '../utils/rewards';
import { getUserData } from '../utils/storage';
import { formatSeconds } from '../utils/timer';
import SessionCompletePage from './SessionCompletePage';
import SessionPausedPage from './SessionPausedPage';

const sessionLengthSeconds = 25 * 60;

function FocusSessionPage() {
  const { currentUser } = useAuth();
  const [appState, setAppState] = useState(null);
  const [sessionState, setSessionState] = useState('running');
  const [remainingSeconds, setRemainingSeconds] = useState(sessionLengthSeconds);
  const rewards = calculateSessionRewards(sessionLengthSeconds);
  const task = mockTasks[0];

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;
      const data = await getUserData(currentUser.uid);
      setAppState(data || initialAppState);
    }

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    if (sessionState !== 'running') {
      return undefined;
    }

    const timerId = setInterval(() => {
      setRemainingSeconds((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [sessionState]);

  useEffect(() => {
    if (sessionState === 'running' && remainingSeconds === 0) {
      setSessionState('complete');
    }
  }, [remainingSeconds, sessionState]);

  function handleRestart() {
    setRemainingSeconds(sessionLengthSeconds);
    setSessionState('running');
  }

  if (!appState) {
    return (
      <main className="session-page">
        <div className="loading-spinner" />
      </main>
    );
  }

  const petType = appState.pet?.type || 'fox';
  const petName = task.petName || appState.pet?.name || 'Finley';
  const petImage = `${process.env.PUBLIC_URL}/assets/pets/${petType}/sleeping.png`;
  const focusTime = formatSeconds(sessionLengthSeconds);

  if (sessionState === 'paused') {
    return (
      <SessionPausedPage
        appState={appState}
        onResume={() => setSessionState('running')}
        petImage={petImage}
        petName={petName}
        task={task}
      />
    );
  }

  if (sessionState === 'complete') {
    return (
      <SessionCompletePage
        appState={appState}
        focusTime={focusTime}
        onRestart={handleRestart}
        petName={petName}
        rewards={rewards}
      />
    );
  }

  return (
    <main className="session-page">
      <section className="session-card session-card--focus">
        <p className="session-task">
          <span>Task:</span>
          <strong>{task.title}</strong>
        </p>

        <div className="session-timer-shell">
          <strong className="session-timer">{formatSeconds(remainingSeconds)}</strong>
        </div>

        <div className="session-pet-frame">
          <img src={petImage} alt="" aria-hidden="true" />
        </div>

        <h1>{petName} is resting while you work</h1>
        <p>Don't leave the app or {petName} will wake up</p>

        <div className="session-controls session-controls--icon">
          <button className="session-icon-action" onClick={() => setSessionState('complete')} type="button">
            <span>
              <Square aria-hidden="true" size={18} />
            </span>
            <strong>End Session</strong>
          </button>

          <button className="session-icon-action session-icon-action--primary" onClick={() => setSessionState('paused')} type="button">
            <span>
              <Pause aria-hidden="true" size={22} />
            </span>
            <strong>Take a Breath</strong>
          </button>

          <button className="session-icon-action" type="button">
            <span>
              <Volume2 aria-hidden="true" size={18} />
            </span>
            <strong>Zen Sounds</strong>
          </button>
        </div>
      </section>
    </main>
  );
}

export default FocusSessionPage;
