class ApiService {
  constructor() {
    this._baseUrl = 'https://pokeapi.co/api/v2';
  }

  get(url) {
    return this.call(url);
  }

  call(url, options = {}) {
    return fetch(url, options).then(response => response.json());
  }
}

export const service = new ApiService();
