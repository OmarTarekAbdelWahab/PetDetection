const TOKEN_KEY = 'pet_auth_token';
const USER_KEY = 'pet_user';

export const storageHandler = {
  getTokenFromStorage() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setTokenInStorage(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeTokenFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUserFromStorage() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  setUserInStorage(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUserFromStorage() {
    localStorage.removeItem(USER_KEY);
  },

  clearAllFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};