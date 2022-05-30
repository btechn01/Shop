import axios, { AxiosInstance } from "axios";

// HTTP client abstraction for singleton instance
export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
}
