import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Utworzenie kontekstu autoryzacji
const AuthContext = createContext();

// Niestandardowy hook ułatwiający dostęp do kontekstu
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funkcja rejestracji
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Funkcja logowania
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Funkcja wylogowania
  const logout = () => {
    return signOut(auth);
  };

  // Efekt nasłuchujący na zmiany stanu autoryzacji
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Zatrzymujemy ładowanie, gdy otrzymamy stan
    });

    // Czyszczenie subskrypcji przy odmontowaniu komponentu
    return unsubscribe;
  }, []);

  // Wartości dostępne w kontekście
  const value = {
    currentUser,
    register,
    login,
    logout
  };

  // Renderujemy dzieci dopiero po pobraniu początkowego stanu autoryzacji
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
