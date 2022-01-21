export const helpers = {
  /**
   * @param {object} obj object of properties to be converted into a query string.
   * @returns {string} string that has been formatted for url usage
   */
  objectToQueryString: (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },
};
