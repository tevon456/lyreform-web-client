import jwt_decode from "jwt-decode";

export class Auth {
  /**
   * Authenticate a user by setting auth token locally
   * @param {string} token
   */
  static authenticateUser(token) {
    try {
      if (
        this.isValidToken(token?.access?.token) &&
        this.isValidToken(token?.refresh?.token)
      ) {
        this.storeToken(token);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Check if user is authenticated.
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    try {
      return this.isValidToken(this.getToken().refresh);
    } catch {
      return false;
    }
  }

  /**
   * Deauthenticate a user and clears up credentials.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  }

  /**
   * Return the users tokens.
   * @returns {object}
   */
  static getToken() {
    return {
      access: localStorage.getItem("access"),
      refresh: localStorage.getItem("refresh"),
    };
  }

  /**
   * Checks if the token is valid or expired.
   * @returns {boolean}
   */
  static isValidToken(token) {
    try {
      const header = jwt_decode(token);
      const now = Math.floor(Date.now() / 1000);
      return header && header.exp > now;
    } catch {
      return false;
    }
  }

  /**
   * Stores the user's token.
   *
   */
  static storeToken(token) {
    localStorage.setItem("access", token.access.token);
    localStorage.setItem("refresh", token.refresh.token);
  }

  /**
   * Returns the user's data from token.
   * @returns {boolean}
   */
  static user() {
    if (this.isUserAuthenticated()) {
      const body = jwt_decode(this.getToken().access);
      return {
        name: body.name,
        email: body.email,
        role: body.role,
      };
    } else {
      return null;
    }
  }
}
