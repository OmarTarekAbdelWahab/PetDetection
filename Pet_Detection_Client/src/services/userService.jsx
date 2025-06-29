import api from './apiService';

export const userService = {
  async getUserData() {
    const response = await api.get('/user');
    const user = response.data.user;
    return user;
  },

  async analyzeImage(imageBase64) {
    const response = await api.post('/analyzeImage', { image_base64: imageBase64 });
    return response.data;
  },
};