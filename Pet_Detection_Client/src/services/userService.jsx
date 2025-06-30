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

  async getAnalysisHistory() {
    const response = await api.get('/analysisHistory');
    return response.data.history;
  },

  async getAnalysisDetails(analysisId) {
    const response = await api.get(`/analysisHistory/${analysisId}`);
    return response.data;
  },
};