import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signOut 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

// Utworzenie kontekstu autoryzacji
const AuthContext = createContext();

// Niestandardowy hook ułatwiający dostęp do kontekstu
export const useAuth = () => {
  return useContext(AuthContext);
};

// FLAGA DEWELOPERSKA: Zmień na false, gdy poprawnie skonfigurujesz Firebase!
const BYPASS_FIREBASE = true;

export const AuthProvider = ({ children }) => {
  // Jeśli omijamy Firebase, od razu "jesteśmy zalogowani"
  const [currentUser, setCurrentUser] = useState(
    BYPASS_FIREBASE ? { uid: 'dev-user', email: 'dev@focuspet.local' } : null
  );
  const [loading, setLoading] = useState(!BYPASS_FIREBASE);

  // Funkcja rejestracji
  const register = async (email, password) => {
    if (BYPASS_FIREBASE) {
      setCurrentUser({ uid: 'dev-user', email });
      return Promise.resolve();
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Funkcja logowania
  const login = async (email, password) => {
    if (BYPASS_FIREBASE) {
      setCurrentUser({ uid: 'dev-user', email });
      return Promise.resolve();
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Funkcja logowania przez Google
  const loginWithGoogle = async () => {
    if (BYPASS_FIREBASE) {
      setCurrentUser({ uid: 'dev-user-google', email: 'google@dev.local' });
      return Promise.resolve();
    }
    return signInWithPopup(auth, googleProvider);
  };

  // Funkcja wylogowania
  const logout = async () => {
    if (BYPASS_FIREBASE) {
      setCurrentUser(null);
      return Promise.resolve();
    }
    return signOut(auth);
  };

  // Efekt nasłuchujący na zmiany stanu autoryzacji
  useEffect(() => {
    if (BYPASS_FIREBASE) return; // Pomijamy nasłuchiwanie w trybie dev

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Kończymy ładowanie, gdy otrzymamy stan
    });

    // Czyszczenie subskrypcji przy odmontowaniu komponentu
    return unsubscribe;
  }, []);

  // Wartości dostępne w kontekście
  const value = {
    currentUser,
    loading, // Dodano stan loading do udostępnienia dla PrivateRoute
    register,
    login,
    loginWithGoogle,
    logout
  };

  // Renderujemy dzieci bezwarunkowo, aby PrivateRoute mogło obsługiwać loading
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
