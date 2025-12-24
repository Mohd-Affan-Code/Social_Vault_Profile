import { account, ID } from "./config";

export const authService = {
  // User Registration
  async createAccount(email, password, name) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      console.log("Account created:", user);
    } catch (error) {
      console.error("Account creation error:", error);
      throw error;
    }
  },

  // Login User
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      await account.deleteSession("current");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // Get Current User
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Get user error:", error);
      return null;
    }
  },
};
