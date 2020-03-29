export class TestUtils {
  static mockFetch<T>(data: T): jest.Mock {
    return jest.fn().mockImplementation((url: String) => {
      const fetch = Promise.resolve({
        ok: true,
        json() {
          return data;
        }
      });
      return fetch;
    });
  }
}
