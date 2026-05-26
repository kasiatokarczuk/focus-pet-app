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
import NotFoundPage from './pages/NotFoundPage'; // Nowy komponent 404

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
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ProtectedRoute>
                <ShopPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/session" 
            element={
              <ProtectedRoute>
                <FocusSessionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/logout" 
            element={
              <ProtectedRoute>
                <LogoutPage />
              </ProtectedRoute>
            } 
          />

          {/* Trasa nieznaleziona (404) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
