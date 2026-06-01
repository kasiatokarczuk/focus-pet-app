import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

// Importy komponentów stron
import FocusSessionPage from './pages/FocusSessionPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import OnboardingPage from './pages/OnboardingPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import TasksPage from './pages/TasksPage';
import NotFoundPage from './pages/NotFoundPage';
import NewTaskPage from './pages/NewTaskPage';
import FilterTasksPage from './pages/FilterTasksPage';
import FilterProjectsPage from './pages/FilterProjectsPage';
import ShopFoodPage from './pages/ShopFoodPage';
import ShopAccessoriesPage from './pages/ShopAccessoriesPage';
import SessionPausedPage from './pages/SessionPausedPage';
import SessionCompletePage from './pages/SessionCompletePage';

// Importy związane z autoryzacją
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Trasa główna przekierowująca do logowania */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Trasy publiczne */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Trasy chronione */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
          <Route path="/tasks/new" element={<ProtectedRoute><NewTaskPage /></ProtectedRoute>} />
          <Route path="/tasks/filter/tasks" element={<ProtectedRoute><FilterTasksPage /></ProtectedRoute>} />
          <Route path="/tasks/filter/projects" element={<ProtectedRoute><FilterProjectsPage /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          <Route path="/shop/food" element={<ProtectedRoute><ShopFoodPage /></ProtectedRoute>} />
          <Route path="/shop/accessories" element={<ProtectedRoute><ShopAccessoriesPage /></ProtectedRoute>} />
          <Route path="/session" element={<ProtectedRoute><FocusSessionPage /></ProtectedRoute>} />
          <Route path="/session/paused" element={<ProtectedRoute><SessionPausedPage /></ProtectedRoute>} />
          <Route path="/session/complete" element={<ProtectedRoute><SessionCompletePage /></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><LogoutPage /></ProtectedRoute>} />

          {/* Trasa nieznaleziona (404) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
