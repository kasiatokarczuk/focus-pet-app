import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Header from '../components/Header';
import PetCard from '../components/PetCard';
import { loadAppState } from '../utils/storage';

function HomePage() {
  const { coins, pet, tasks, user } = loadAppState();

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
