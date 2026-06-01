// Używamy async/await dla zachowania asynchronicznego charakteru, co ułatwi ewentualne 
// przejście na bardziej zaawansowane mechanizmy przechowywania danych w przyszłości (np. IndexedDB czy zapis w Cloud Firestore).

/**
 * Zapisuje dane postępu użytkownika dla danego UID.
 * @param {string} uid Identyfikator użytkownika.
 * @param {object} data Obiekt z danymi do zapisania.
 */
export const saveUserProgress = async (uid, data) => {
  try {
    const key = `progress_${uid}`;
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error("Błąd podczas zapisywania postępu:", error);
    return false;
  }
};

/**
 * Odczytuje dane postępu użytkownika dla danego UID.
 * @param {string} uid Identyfikator użytkownika.
 * @returns {object|null} Obiekt z danymi lub null, jeśli brak danych.
 */
export const getUserProgress = async (uid) => {
  try {
    const key = `progress_${uid}`;
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Błąd podczas odczytywania postępu:", error);
    return null;
  }
};

/**
 * Usuwa dane postępu użytkownika dla danego UID.
 * Przydatne np. przy resetowaniu konta lub pełnym wylogowaniu z czyszczeniem danych.
 * @param {string} uid Identyfikator użytkownika.
 */
export const clearUserProgress = async (uid) => {
  try {
    const key = `progress_${uid}`;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Błąd podczas usuwania postępu:", error);
    return false;
  }
};

// --- Dodane funkcje synchroniczne dla kompatybilności wstecznej komponentów ---
const DEFAULT_SHOP_ITEMS = [
  { id: 'item1', name: 'Pyszna Karma', category: 'food', price: 10, owned: false, effect: { stat: 'hp', value: 20 } },
  { id: 'item2', name: 'Energetyk dla Psa', category: 'food', price: 15, owned: false, effect: { stat: 'energy', value: 25 } },
  { id: 'item3', name: 'Czerwona Obroża', category: 'accessories', price: 50, owned: false },
  { id: 'item4', name: 'Piszcząca Zabawka', category: 'accessories', price: 30, owned: false, effect: { stat: 'happiness', value: 15 } }
];

const DEFAULT_STATE = {
  coins: 100, // Na start dajemy trochę monet na testy
  pet: { level: 1, happiness: 100, health: 100, energy: 100, hp: 100, type: 'dog' },
  tasks: [],
  user: { name: 'Użytkownik', title: 'Początkujący' },
  shopItems: DEFAULT_SHOP_ITEMS,
  inventory: []
};

export const loadAppState = () => {
  try {
    const data = localStorage.getItem('app_state');
    if (data) {
      const parsed = JSON.parse(data);
      // Łączymy z zapisanymi danymi na wypadek, gdyby brakowało nowych pól (np. shopItems) w starym zapisie
      return { ...DEFAULT_STATE, ...parsed };
    }
    return DEFAULT_STATE;
  } catch (error) {
    console.error("Błąd podczas odczytywania stanu aplikacji:", error);
    return DEFAULT_STATE;
  }
};

export const saveAppState = (state) => {
  try {
    localStorage.setItem('app_state', JSON.stringify(state));
  } catch (error) {
    console.error("Błąd podczas zapisywania stanu aplikacji:", error);
  }
};
