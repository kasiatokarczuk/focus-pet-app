# Focus Pet

Aplikacja wspomagająca skupienie z elementami grywalizacji, w której opiekujesz się wirtualnym zwierzakiem wykonując zadania.

## Uwierzytelnianie (Firebase Authentication)

Aplikacja wykorzystuje **Firebase Authentication (SDK v10+)** do zarządzania autoryzacją użytkowników. Cały mechanizm oparty jest na architekturze nowoczesnego Reacta i wykorzystuje kilka kluczowych wzorców:

* **AuthContext (`src/context/AuthContext.jsx`)**  
  Stan zalogowanego użytkownika (oraz status ładowania) przechowywany jest globalnie przy pomocy React Context API. W tym miejscu nasłuchujemy w czasie rzeczywistym na zmiany za pomocą funkcji `onAuthStateChanged`. Udostępnia on również asynchroniczne metody `login()`, `register()` oraz `logout()`.
  
* **ProtectedRoute (`src/components/ProtectedRoute.jsx`)**  
  Bezpieczeństwo tras zapewnia komponent chroniony (HOC), który owija wszystkie prywatne ścieżki w aplikacji. Automatycznie sprawdza, czy `currentUser` jest dostępny w kontekście, a w razie jego braku wymusza natychmiastowe przekierowanie (zastępując historię, `replace`) na stronę `/login`.

* **Ekrany Logowania i Rejestracji (`LoginPage`, `RegisterPage`)**  
  Nowoczesne formularze (wykorzystujące m.in. efekt glassmorphismu z pliku `AuthPages.css`) używają własnych stanów (hooks) do zarządzania cyklem życia formularza, kontrolą błędów po stronie Firebase oraz asynchronicznym wczytywaniem (loadery). Wylogowanie realizuje asynchroniczny `LogoutPage`, używający efektu by upewnić się o wykonaniu akcji i natychmiast przekierować użytkownika.

### Konfiguracja środowiska

Aby autoryzacja działała poprawnie, musisz podłączyć projekt do swojej bazy Firebase. W głównym katalogu znajduje się plik `.env.example`. Skopiuj go, zmień nazwę na `.env` (lub `.env.local`) i uzupełnij kluczami ze swojej konsoli Firebase:

```env
VITE_FIREBASE_API_KEY=twój-klucz
VITE_FIREBASE_AUTH_DOMAIN=twój-projekt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=twój-projekt
VITE_FIREBASE_STORAGE_BUCKET=twój-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=twoje-id
VITE_FIREBASE_APP_ID=twój-app-id
```

## Dostępne skrypty

Aby uruchomić projekt lokalnie, w głównym katalogu wykonaj: `npm start`

Uruchamia aplikację w trybie deweloperskim.
Otwórz [http://localhost:3000](http://localhost:3000), by ją zobaczyć w przeglądarce.
