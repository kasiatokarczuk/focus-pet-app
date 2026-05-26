// Import niezbędnych funkcji z najnowszego SDK Firebase (v10+)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Konfiguracja Firebase dla aplikacji
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicjalizacja aplikacji Firebase przy użyciu powyższej konfiguracji
const app = initializeApp(firebaseConfig);

// Pobranie instancji uwierzytelniania, która posłuży do logowania i rejestracji użytkowników
const auth = getAuth(app);

// Eksport auth, by móc z niego korzystać w innych plikach (np. w kontekście uwierzytelniania lub komponentach)
export { auth };
