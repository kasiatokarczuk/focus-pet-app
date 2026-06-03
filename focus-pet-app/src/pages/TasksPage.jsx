import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Header from '../components/Header';
import PetCard from '../components/PetCard';
import { getUserData, saveUserData } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { initialAppState } from '../data/initialState';

const filters = ['All', 'Tasks', 'Projects'];

function TasksPage() {
  const { currentUser } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');
  const [appState, setAppState] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;
      const data = await getUserData(currentUser.uid);
      setAppState(data || initialAppState);
    }
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    if (!selectedTaskId && appState?.tasks?.length) {
      setSelectedTaskId(appState.tasks[0].id);
    }
  }, [appState, selectedTaskId]);

  if (!appState) {
    return (
      <main className="app-shell">
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loading-spinner"></div>
        </div>
      </main>
    );
  }

  const { coins, pet, user } = appState;
  const tasks = appState.tasks || [];

  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === 'All') return true;
    return task.type === activeFilter.toLowerCase();
  });
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || tasks[0];

  function persistTasks(nextTasks) {
    const nextState = {
      ...appState,
      tasks: nextTasks,
    };

    setAppState(nextState);

    if (currentUser) {
      saveUserData(currentUser.uid, nextState);
    }
  }

  function handleToggleTaskDone(taskId, event) {
    event.stopPropagation();
    const nextTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    );

    persistTasks(nextTasks);
  }

  function handleDeleteTask(taskId, event) {
    event.stopPropagation();

    if (!window.confirm('Delete this task?')) {
      return;
    }

    const nextTasks = tasks.filter((task) => task.id !== taskId);
    const nextSelectedTaskId = selectedTaskId === taskId ? nextTasks[0]?.id || '' : selectedTaskId;

    persistTasks(nextTasks);
    setSelectedTaskId(nextSelectedTaskId);
  }

  return (
    <main className="app-shell">
      <Header coins={coins} userLevel={user.title} userName={user.name} />
      <section className="page-content page-content--two-columns tasks-layout">
        <div className="tasks-main">
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
            {visibleTasks.length ? visibleTasks.map((task) => (
              <article
                className={`task-card ${selectedTaskId === task.id ? 'task-card--selected' : ''} ${task.isDone ? 'task-card--done' : ''}`.trim()}
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
              >
                <input
                  aria-label={`Complete ${task.title}`}
                  checked={task.isDone}
                  onChange={(event) => handleToggleTaskDone(task.id, event)}
                  onClick={(event) => event.stopPropagation()}
                  type="checkbox"
                />
                <div className="task-card__body">
                  <h3>{task.title}</h3>
                  <p>
                    {task.category} · {task.sessionLength} min session
                  </p>
                </div>
                <div className="task-card__actions">
                  <Link
                    className="task-card__action"
                    onClick={(event) => event.stopPropagation()}
                    to={`/tasks/new?edit=${task.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="task-card__action task-card__action--danger"
                    onClick={(event) => handleDeleteTask(task.id, event)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </article>
            )) : (
              <div className="task-empty-state">
                <h2>No tasks here yet.</h2>
                <p>Add a task or project to prepare your next focus session.</p>
              </div>
            )}
          </div>

          <Link className="tasks-add-action" to="/tasks/new">
            <Button>+ Add Task</Button>
          </Link>
        </div>

        <aside className="tasks-pet-panel">
          <PetCard compact pet={pet} />
        </aside>
      </section>

      <Link className="floating-action" state={{ task: selectedTask, taskId: selectedTask?.id }} to="/session">
        <Button>Start Session</Button>
      </Link>
      <BottomNav />
    </main>
  );
}

export default TasksPage;
