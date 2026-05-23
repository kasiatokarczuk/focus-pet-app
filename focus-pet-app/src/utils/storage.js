import { initialAppState } from '../data/initialState';

const APP_STATE_KEY = 'focusPetState';
const CURRENT_USER_KEY = 'focusPetCurrentUser';

function readJson(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from localStorage`, error);
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadAppState() {
  return readJson(APP_STATE_KEY, initialAppState);
}

export function saveAppState(state) {
  writeJson(APP_STATE_KEY, state);
}

export function loadCurrentUser() {
  return readJson(CURRENT_USER_KEY, null);
}

export function saveCurrentUser(user) {
  writeJson(CURRENT_USER_KEY, user);
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function resetAppState() {
  localStorage.removeItem(APP_STATE_KEY);
}
