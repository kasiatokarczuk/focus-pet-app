import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Header from '../components/Header';
import PetCard from '../components/PetCard';
import { getUserData } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { initialAppState } from '../data/initialState';

function HomePage() {
  const { currentUser } = useAuth();
  const [appState, setAppState] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;
      const data = await getUserData(currentUser.uid);
      setAppState(data || initialAppState);
    }
    fetchData();
  }, [currentUser]);

  if (!appState) {
    return (
      <main className="app-shell">
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loading-spinner"></div>
        </div>
      </main>
    );
  }

  const { coins, pet, tasks, user } = appState;

  return (
    <main className="app-shell">
      <Header coins={coins} userLevel={user.title} userName={user.name} />
      <section className="page-content">
        <h1>Welcome!</h1>
        <PetCard pet={pet} />

        <div className="section-heading">
          <h2>Tasks</h2>
          <Link to="/tasks">View all</Link>
        </div>

        <div className="task-list">
          {tasks.slice(0, 2).map((task) => (
            <article className="task-card" key={task.id}>
              <input aria-label={`Complete ${task.title}`} type="checkbox" />
              <div>
                <h3>{task.title}</h3>
                <p>
                  {task.category} · {task.sessionLength} min session
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Link className="floating-action" to="/session">
        <Button>Start Session</Button>
      </Link>
      <BottomNav />
    </main>
  );
}

export default HomePage;
