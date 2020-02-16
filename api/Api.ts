export default class Api {
  static prefix = "http://localhost:9000";
  static url(endpoint) {
    return `${this.prefix}${endpoint}`;
  }
  static get(endpoint) {
    return fetch(this.url(endpoint))
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  static post(endpoint, body) {
    return fetch(this.url(endpoint), {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  }
}
