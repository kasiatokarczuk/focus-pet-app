import { Link } from 'react-router-dom';
import { Play, Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Header from '../components/Header';
import { initialAppState } from '../data/initialState';
import { mockTasks } from '../data/mockTasks';

function SessionPausedPage({
  appState = initialAppState,
  onResume,
  petImage = `${process.env.PUBLIC_URL}/assets/pets/fox/sleeping.png`,
  petName,
  task = mockTasks[0],
}) {
  const { coins, user } = appState;
  const displayName = petName || task.petName || appState.pet?.name || 'Finley';
  const resumeButton = (
    <Button className="session-state__button" onClick={onResume}>
      <Play aria-hidden="true" size={16} />
      Resume Focus
    </Button>
  );

  return (
    <main className="app-shell app-shell--session-state">
      <Header coins={coins} userLevel={user.title} userName={user.name} />

      <section className="session-state-card session-state-card--paused">
        <div className="session-state__pet">
          <img src={petImage} alt="" aria-hidden="true" />
        </div>
        <h1>Session Paused</h1>
        <p>{displayName} is waiting for you to return to the flow state. The timer is held in suspension.</p>

        {onResume ? resumeButton : <Link to="/session">{resumeButton}</Link>}

        <div className="session-state__hint">
          <Sparkles aria-hidden="true" size={16} />
          <span>A short break can recharge your flow.</span>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

export default SessionPausedPage;
