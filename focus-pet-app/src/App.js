/*
  Stary startowy kod Reacta zostawiony celowo jako komentarz.
  Gdyby trzeba bylo porownac, co bylo na poczatku projektu, jest tutaj:

  import logo from './logo.svg';
  import './App.css';

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
*/

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import FocusSessionPage from './pages/FocusSessionPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import OnboardingPage from './pages/OnboardingPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/session" element={<FocusSessionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
