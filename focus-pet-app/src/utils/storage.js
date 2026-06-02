import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Zapisuje lub aktualizuje dane użytkownika w bazie Firestore.
 * @param {string} userId - Identyfikator użytkownika (z Firebase Auth)
 * @param {object} data - Dane do zapisania/zaktualizowania
 */
export const saveUserData = async (userId, data) => {
  if (!userId) return false;

  try {
    const userRef = doc(db, 'users', userId);
    // { merge: true } zapobiega nadpisywaniu całego dokumentu,
    // jeśli aktualizujemy tylko konkretne pole, np. same coins.
    await setDoc(userRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error("Błąd podczas zapisywania danych w Firestore:", error);
    return false;
  }
};

/**
 * Pobiera dane użytkownika z bazy Firestore.
 * @param {string} userId - Identyfikator użytkownika (z Firebase Auth)
 * @returns {object|null} - Dane użytkownika lub null w przypadku braku dokumentu
 */
export const getUserData = async (userId) => {
  if (!userId) return null;

  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Dokument nie istnieje
      return null;
    }
  } catch (error) {
    console.error("Błąd podczas pobierania danych z Firestore:", error);
    return null;
  }
};
