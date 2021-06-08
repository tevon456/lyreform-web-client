import { toast } from "react-toastify";

class Notification {
  /**
   * @param  {string} message
   */
  static info(message, close) {
    toast(message, {
      className: "toast-info",
      autoClose: close || 8000,
    });
  }

  /**
   * @param  {string} message
   */
  static warning(message, close) {
    toast(message, {
      className: "toast-warning",
      autoClose: close || 8000,
    });
  }

  /**
   * @param  {string} message
   */
  static success(message, close) {
    toast(message, {
      className: "toast-success",
      autoClose: close || 8000,
    });
  }

  /**
   * @param  {string} message
   */
  static danger(message, close) {
    toast(message, {
      className: "toast-danger",
      autoClose: close || 8000,
    });
  }

  /**
   * @param  {string} message
   */
  static black(message, close) {
    toast(message, {
      className: "toast-black",
      autoClose: close || 8000,
    });
  }
}
export default Notification;
