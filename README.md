# Focus Pet

Aplikacja wspomagająca skupienie z elementami grywalizacji, w której opiekujesz się wirtualnym zwierzakiem wykonując zadania.

## Uwierzytelnianie (Firebase Authentication)

Aplikacja wykorzystuje **Firebase Authentication (SDK v10+)** oraz bazę **Firestore** do zarządzania autoryzacją i danymi użytkowników. Cały mechanizm oparty jest na architekturze nowoczesnego Reacta i wykorzystuje kilka kluczowych wzorców:

* **AuthContext (`src/context/AuthContext.jsx`)**  
  Stan zalogowanego użytkownika (oraz status ładowania `loading`) przechowywany jest globalnie przy pomocy React Context API. Nasłuchujemy w czasie rzeczywistym na zmiany za pomocą funkcji `onAuthStateChanged`. Kontekst udostępnia asynchroniczne metody `login()`, `register()`, `loginWithGoogle()` oraz `logout()`. Zawiera również wbudowany tryb deweloperski (`BYPASS_FIREBASE`), umożliwiający testowanie widoków bez połączenia z chmurą.
  
* **PrivateRoute (`src/components/PrivateRoute.jsx`)**  
  Bezpieczeństwo tras zapewnia komponent chroniony, który owija wszystkie prywatne ścieżki w aplikacji. Automatycznie wyświetla wskaźnik ładowania podczas weryfikacji sesji (korzystając z flagi `loading`), a w razie braku sesji po weryfikacji wymusza twarde przekierowanie (`replace`) na stronę `/login`.

* **Ekrany Logowania i Rejestracji (`LoginPage`, `RegisterPage`)**  
  Nowoczesne formularze używają własnych stanów do zarządzania cyklem życia formularza, kontrolą błędów po stronie Firebase oraz wczytywaniem. Udostępniają logowanie zarówno za pomocą loginu/hasła, jak i dedykowany przycisk do logowania poprzez konto Google.

### Konfiguracja środowiska

Projekt bazuje na **Create React App**. Aby autoryzacja działała poprawnie z Twoim backendem, utwórz w głównym katalogu plik `.env` (wzorując się na `.env.example`) i uzupełnij kluczami ze swojej konsoli Firebase:

```env
REACT_APP_FIREBASE_API_KEY=twój-klucz
REACT_APP_FIREBASE_AUTH_DOMAIN=twój-projekt.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=twój-projekt
REACT_APP_FIREBASE_STORAGE_BUCKET=twój-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=twoje-id
REACT_APP_FIREBASE_APP_ID=twój-app-id
```

## Dostępne skrypty

Aby uruchomić projekt lokalnie, w głównym katalogu wykonaj: `npm start`

Uruchamia aplikację w trybie deweloperskim.
Otwórz [http://localhost:3000](http://localhost:3000), by ją zobaczyć w przeglądarce.
