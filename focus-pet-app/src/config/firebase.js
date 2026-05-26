// Import niezbędnych funkcji z najnowszego SDK Firebase (v10+)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Konfiguracja Firebase dla aplikacji
// Ponieważ projekt używa Create React App (CRA), zmienne środowiskowe muszą:
// 1. Zaczynać się od prefixu REACT_APP_
// 2. Być pobierane poprzez obiekt process.env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Inicjalizacja aplikacji Firebase przy użyciu powyższej konfiguracji
const app = initializeApp(firebaseConfig);

// Pobranie instancji uwierzytelniania, która posłuży do logowania i rejestracji użytkowników
const auth = getAuth(app);

// Eksport auth, by móc z niego korzystać w innych plikach (np. w kontekście uwierzytelniania lub komponentach)
export { auth };
