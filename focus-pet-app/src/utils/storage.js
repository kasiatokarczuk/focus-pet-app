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
