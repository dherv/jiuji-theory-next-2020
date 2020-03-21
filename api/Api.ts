export default class Api {
  static prefix = "http://localhost:9000";
  static url(endpoint) {
    return `${this.prefix}${endpoint}`;
  }
  static headers(): Headers {
    const requestHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });

    return requestHeaders;
  }

  static get<T>(endpoint: string): Promise<T[]> {
    return fetch(this.url(endpoint), {
      headers: this.headers()
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<T[]>;
      })
      .catch((error: Error) => {
        // ADD LOGGER HERE
        throw error; // rethrow the error so consumer can still catch it
      });
  }

  static post<B, T>(endpoint: string, body: B): Promise<void | T> {
    return fetch(this.url(endpoint), {
      method: "POST",
      body: JSON.stringify(body),
      headers: this.headers()
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
      })
      .catch((error: Error) => {
        // ADD LOGGER HERE
        throw error; // rethrow the error so consumer can still catch it
      });
  }
}
