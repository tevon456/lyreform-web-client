import axios from "axios";
import config from "./config";
import { Auth } from "./auth";

const tokens = Auth.getToken();
axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.common = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  Authorization: `Bearer ${tokens.access}`,
};

/**
 * Contains all api call methods
 */
export class Api {
  /*
  |--------------------------------------------------------------------------
  | Authentication and Authorization endpoints
  |--------------------------------------------------------------------------
  |
  |
  */

  /**
   * Send post request with user signup information.
   * @param {string} data.name - user name
   * @param {string} data.email - user email
   * @param {string} data.password - user password
   */
  static async signUp(data) {
    const res = await axios.post("auth/register", data);
    return res;
  }

  /**
   * Activate user account using a token.
   * @param {string} token - token sent to user email for verification
   */
  static async verifyAccount(token) {
    const res = await axios.post(`auth/account-confirmation/?token=${token}`);
    return res;
  }

  /**
   * Request a new account confirmation email if the token has expired
   * @param {string} email
   */
  static async requestConfirmation(email) {
    const res = await axios.post("auth/resend-confirmation", email);
    return res;
  }

  /**
   * Send post request with user login credentials.
   * @param {email} data.email - user email
   * @param {string} data.password - user password
   */
  static async login(data) {
    const res = await axios.post("auth/login", data);
    return res;
  }

  /**
   * Send post request with refresh token for a new access token.
   * @param {string} refreshToken
   */
  static async refreshToken(refreshToken) {
    const res = await axios.post("auth/refresh-tokens", { refreshToken });
    return res;
  }

  /**
   * Revoke user's active token.
   * @param refreshToken - token used to revoke user session
   */
  static async logout(refreshToken) {
    const res = await axios.post("auth/logout", { refreshToken });
    return res;
  }

  /**
   * Request a forgot password email
   * @param {string} email
   */
  static async forgotPassword(email) {
    const res = await axios.post("auth/forgot-password", { email });
    return res;
  }

  /**
   * Update user password using a token to verify the attempt
   * @param {string} token
   * @param {string} password
   */
  static async resetPassword(token, password) {
    const res = await axios.post(`auth/reset-password?token=${token}`, {
      password,
    });
    return res;
  }

  /*
  |--------------------------------------------------------------------------
  | Form endpoints
  |--------------------------------------------------------------------------
  |
  |
  */

  /**
   * Retrieve all form that belong to the authenticated user
   */
  static async getAllForms() {
    const res = await axios.get("/form");
    return res;
  }

  /**
   * Retrieve a single form
   */
  static async getForm(id) {
    if (id) {
      const res = await axios.get(`/form/${id}`, id);
      return res;
    }
  }

  /**
   * Retrieve a form's submissions
   */
  static async getFormSubmissions(id) {
    if (id) {
      const res = await axios.get(`/form/${id}/submissions`);
      return res;
    }
  }

  /**
   * Post a form schema for saving
   */
  static async createForm(data) {
    if (data?.user) {
      delete data.user;
      delete data.id;
    }
    const res = await axios.post("/form", data);
    return res;
  }

  /**
   * Delete a single form
   */
  static async deleteForm(id) {
    const res = await axios({
      method: "delete",
      url: `/form/${id}`,
      data: { id },
    });
    return res;
  }

  /**
   * Update a form
   */
  static async updateForm(id, data) {
    if (data?.user) {
      delete data.user;
      delete data.id;
    }
    const res = await axios({ method: "patch", url: `/form/${id}`, data });
    return res;
  }

  /*
  |--------------------------------------------------------------------------
  | Form Submission endpoints
  |--------------------------------------------------------------------------
  |
  |
  */

  /**
   * Create a post submission
   */
  static async postSubmission(data, formId) {
    const res = await axios.post("/submissions", { data, formId });
    return res;
  }

  /*
  |--------------------------------------------------------------------------
  | User endpoints
  |--------------------------------------------------------------------------
  |
  |
  */

  /**
   * Retrieve logged in User
   */
  static async getUser() {
    const res = await axios.get("/user");
    return res;
  }
}
