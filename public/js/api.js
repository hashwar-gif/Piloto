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

  async getGameState() {
    return this.fetch('/game/state');
  },

  async saveGameState(state) {
    return this.fetch('/game/state', {
      method: 'POST',
      body: JSON.stringify({ state }),
    });
  },

  async deleteGameState() {
    return this.fetch('/game/state', { method: 'DELETE' });
  },

  async syncHash(hashBalance) {
    return this.fetch('/auth/hash', {
      method: 'PATCH',
      body: JSON.stringify({ hashBalance }),
    });
  },

  // Blog
  async getPosts(category) {
    const query = category ? `?category=${category}` : '';
    return this.fetch(`/blog/posts${query}`);
  },

  async getPost(slug) {
    return this.fetch(`/blog/posts/${slug}`);
  },

  async getCategories() {
    return this.fetch('/blog/categories');
  },

  // Paquetes
  async getPackages() {
    return this.fetch('/packages');
  },

  async getMySubscription() {
    return this.fetch('/packages/my-subscription');
  },

  async subscribe(packageId) {
    return this.fetch(`/packages/subscribe/${packageId}`, { method: 'POST' });
  },

  // Marketplace
  async getProducts(category) {
    const query = category ? `?category=${category}` : '';
    return this.fetch(`/marketplace/products${query}`);
  },

  async buyProduct(productId) {
    return this.fetch(`/marketplace/buy/${productId}`, { method: 'POST' });
  },

  async getInventory() {
    return this.fetch('/marketplace/inventory');
  },

  // Contacto
  async sendContactMessage(name, email, subject, message) {
    return this.fetch('/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, subject, message }),
    });
  },

  // Roadmap
  async getRoadmap() {
    return this.fetch('/roadmap');
  },
};
