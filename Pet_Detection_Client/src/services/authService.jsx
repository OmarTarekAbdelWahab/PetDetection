import api from './apiService';
import { storageHandler } from './storageHandler';

export const authService = {
  async login(credentials) {
    const response = await api.post('/login', credentials);
    const { token, user } = response.data;
    
    storageHandler.setTokenInStorage(token);
    storageHandler.setUserInStorage(user);
    
    return user;
  },
  async register(credentials) {
    console.log("Sending api");
    const response = await api.post("/register", credentials);
    const { token, user } = response.data;
    console.log("Response data:", user);
    
    storageHandler.setTokenInStorage(token);
    storageHandler.setUserInStorage(user);
    console.log("Done Sending api");

    return user;
  },
  async googleLogAuth(idToken){
    const response = await api.post("/auth/google", {
      credential: idToken,
    });

    const data = response.data;
    const { token, user } = data;

    storageHandler.setTokenInStorage(token);
    storageHandler.setUserInStorage(user);
    return user;
    
  },

  async logout(){
    // try {
    //   await api.post('/logout');
    // } catch (error) {
    //   console.error('Logout failed:', error);
    // } finally {
    storageHandler.clearAllFromStorage();  
    // }
  },
};