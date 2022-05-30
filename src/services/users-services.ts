import { environments } from "configs";
import { User } from "types";
import { HttpClient } from "./http-client";

// Users services class extends HttpClient
export class UsersServices extends HttpClient {
  private static classInstance?: UsersServices;

  private constructor() {
    // Call super class constructor with base url
    super(environments.API_URL);
  }

  // Get singleton instance
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UsersServices();
    }

    return this.classInstance;
  }

  // Get user by id
  public getUserById = (id: number) => this.instance.get<User>(`/users/${id}`);
}
