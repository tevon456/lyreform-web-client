import axios from "axios";
import { Auth } from ".";
import config from "./config";

const axios_api = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

axios_api.interceptors.request.use(
  (config) => {
    const token = Auth.getToken()?.access;
    console.log("interceptor ", Auth.getToken()?.access);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
    const res = await axios_api.post("auth/register", data);
    return res;
  }

  /**
   * Activate user account using a token.
   * @param {string} token - token sent to user email for verification
   */
  static async verifyAccount(token) {
    const res = await axios_api.post(
      `auth/account-confirmation/?token=${token}`
    );
    return res;
  }

  /**
   * Request a new account confirmation email if the token has expired
   * @param {string} email
   */
  static async requestConfirmation(email) {
    const res = await axios_api.post("auth/resend-confirmation", email);
    return res;
  }

  /**
   * Send post request with user login credentials.
   * @param {email} data.email - user email
   * @param {string} data.password - user password
   */
  static async login(data) {
    const res = await axios_api.post("auth/login", data);
    return res;
  }

  /**
   * Send post request with refresh token for a new access token.
   * @param {string} refreshToken
   */
  static async refreshToken(refreshToken) {
    const res = await axios_api.post("auth/refresh-tokens", { refreshToken });
    return res;
  }

  /**
   * Revoke user's active token.
   * @param refreshToken - token used to revoke user session
   */
  static async logout(refreshToken) {
    const res = await axios_api.post("auth/logout", { refreshToken });
    return res;
  }

  /**
   * Request a forgot password email
   * @param {string} email
   */
  static async forgotPassword(email) {
    const res = await axios_api.post("auth/forgot-password", { email });
    return res;
  }

  /**
   * Update user password using a token to verify the attempt
   * @param {string} token
   * @param {string} password
   */
  static async resetPassword(token, password) {
    const res = await axios_api.post(`auth/reset-password?token=${token}`, {
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
    const res = await axios_api.get("/form");
    return res;
  }

  /**
   * Retrieve a single form
   */
  static async getForm(id) {
    if (id) {
      const res = await axios_api.get(`/form/${id}`);
      return res;
    }
  }

  /**
   * Retrieve a form's submissions
   */
  static async getFormSubmissions(id) {
    if (id) {
      const res = await axios_api.get(`/submission/?formId=${id}`);
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
    const res = await axios_api.post("/form", data);
    return res;
  }

  /**
   * Delete a single form
   */
  static async deleteForm(id) {
    const res = await axios_api({
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
    const res = await axios_api({ method: "patch", url: `/form/${id}`, data });
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
   * Delete a form submission
   * @param {string} id
   */
  static async deleteSubmission(id) {
    const res = await axios_api.delete(`/submissions/${id}`);
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
    const res = await axios_api.get("/user");
    return res;
  }
}
