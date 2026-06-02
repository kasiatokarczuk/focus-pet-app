import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import PetCard from '../components/PetCard';
import { getUserData } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { initialAppState } from '../data/initialState';

const filters = ['All', 'Tasks', 'Projects'];

function TasksPage() {
  const { currentUser } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAddingTask, setIsAddingTask] = useState(false);
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

  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === 'All') return true;
    return task.type === activeFilter.toLowerCase();
  });

  return (
    <main className="app-shell">
      <Header coins={coins} userLevel={user.title} userName={user.name} />
      <section className="page-content page-content--two-columns">
        <div>
          <h1>Tasks</h1>
          <div className="segmented-control">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? 'is-active' : ''}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="task-list">
            {visibleTasks.map((task) => (
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

            {isAddingTask ? (
              <article className="task-card task-card--draft">
                <input aria-label="New task checkbox" disabled type="checkbox" />
                <Input id="newTask" label="New task" placeholder="Enter task name..." />
              </article>
            ) : null}
          </div>

          <Button onClick={() => setIsAddingTask(true)}>+ Add Task</Button>
        </div>

        <aside>
          <PetCard compact pet={pet} />
        </aside>
      </section>

      <Link className="floating-action" to="/session">
        <Button>Start Session</Button>
      </Link>
      <BottomNav />
    </main>
  );
}

export default TasksPage;
