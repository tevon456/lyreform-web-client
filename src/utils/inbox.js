export class InboxUtil {
  /**
   * Fill in missing keys in an array of abject with a default value
   * @param {*} arr an array with missing keys
   * @param {*} defaultValue the default value to set on properties being filled
   */
  static MissingKeys = (arr, defaultValue) => {
    let obj = arr.reduce((res, item) => ({ ...res, ...item }));
    // Get those keys as an array
    let keys = Object.keys(obj.data);
    // Create an object with all keys set to the default value (0)
    let def = keys.reduce((result, key) => {
      result[key] = defaultValue;
      return result;
    }, {});
    // Use object destructuring to replace all default values with the ones we have
    let result = arr.map((item) => ({
      ...item,
      data: { ...def, ...item.data },
    }));
    return result;
  };

  static ReduceColumns = (arr, defaultValue) => {
    let obj = arr.reduce((res, item) => ({ ...res, ...item }));
    // Get those keys as an array
    let keys = Object.keys(obj.data);
    // Create an object with all keys set to the default value (0)
    let def = keys.reduce((result, key) => {
      result[key] = defaultValue;
      return result;
    }, {});
    // Use object destructuring to replace all default values with the ones we have
    let result = arr.map((item) => ({
      ...def,
      ...item.data,
    }));

    let next = [...result];
    let temp = [...result];

    let newKeys = {};
    let keysBag = {};
    next.forEach((el) =>
      Object.keys(el).forEach((k) => {
        newKeys[k] = defaultValue;
      })
    );

    temp.forEach((el) =>
      Object.keys(el).forEach((k) => {
        keysBag[k] = el[k].label;
      })
    );

    // and update the array by overwriting each element with a
    // new object that's built from the null map and the original object
    next.forEach((el, ix, a) => (a[ix] = Object.assign({}, newKeys, el)));
    return { keysBag, next };
  };
}
