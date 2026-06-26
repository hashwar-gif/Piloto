const API_URL = 'http://localhost:3001/api';

const HashwarAPI = {
  getToken() {
    return localStorage.getItem('hashwar_token');
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  setToken(token) {
    localStorage.setItem('hashwar_token', token);
  },

  logout() {
    localStorage.removeItem('hashwar_token');
    localStorage.removeItem('hashwar_user');
  },

  async fetch(path, options = {}) {
    const token = this.getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error del servidor');
    return data;
  },

  async register(username, email, password) {
    const data = await this.fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    this.setToken(data.token);
    localStorage.setItem('hashwar_user', JSON.stringify(data.user));
    return data;
  },

  async login(email, password) {
    const data = await this.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    localStorage.setItem('hashwar_user', JSON.stringify(data.user));
    return data;
  },

  async getMe() {
    return this.fetch('/auth/me');
  },

  async getModules() {
    return this.fetch('/modules');
  },

  async answerQuestion(moduleKey, questionIndex, isCorrect) {
    return this.fetch(`/modules/${moduleKey}/answer`, {
      method: 'POST',
      body: JSON.stringify({ questionIndex, isCorrect }),
    });
  },

  async completeModule(moduleKey) {
    return this.fetch(`/modules/${moduleKey}/complete`, { method: 'POST' });
  },

  async getRanking() {
    return this.fetch('/ranking');
  },
};
