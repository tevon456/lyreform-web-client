import { nanoid } from "nanoid";
export default class Lyreform {
  #model = {
    name: "New Form",
    logo_url: `https://dummyimage.com/400x400/3052a6/fff.png&text=logo`,
    published: false,
    header_foreground: "#ffffff",
    header_background: "#2035BD",
    body_foreground: "#232323",
    body_background: "#ffffff",
    controls_foreground: "#ffffff",
    controls_background: "#2940d3",
    page_background: "#d8e3e7",
    fields: [],
  };

  #historical = {
    entries: [],
    current: 0,
  };

  constructor() {
    this.#historical.entries.push(this.#model);
  }

  /**
   * returns the model details as an object
   */
  getModel() {
    return this.#model;
  }

  /**
   * returns the model details as an object
   * @param {object} modelObject new model that mutates the old model
   */
  setModel(modelObject) {
    this.#model = modelObject;
  }

  /**
   * returns a field and details by its unique id
   * @param {string} id unique field id
   */
  getFieldById(id) {
    return this.util.fieldDetails(id);
  }

  /**
   * returns all field as an array
   * @param {string} id unique field id
   */
  getAllFields() {
    return this.#model.fields;
  }

  /**
   * Create a field
   * @param {string} fieldType - Type of field to create
   * @param {object} fieldData - Field object with details of the field
   */
  createField(fieldType, fieldData) {
    let validTypes = [
      "SHORT_ANSWER",
      "LONG_ANSWER",
      "DATE",
      "NUMBER",
      "EMAIL",
      "DROPDOWN_SELECT",
      "RADIO_GROUP",
      "CHECKBOX_GROUP",
      "FILE",
      "SIGNATURE",
      "RICH_TEXT",
    ];
    if (validTypes.includes(fieldType)) {
      let data = { id: nanoid(12), ...fieldData, field_type: fieldType };
      this.#model.fields.push(data);
      return data;
    }
    return null;
  }

  /**
   * Duplicate a field
   * @param {string} fieldId - Id of field to duplicate
   */
  duplicateField(fieldId) {
    let field = this.getFieldById(fieldId);
    let index = field.details.index;
    let payload = { ...this.#model.fields[index] };
    payload.id = nanoid(12);
    payload.label = payload.label + " (copy)";
    if (payload.options) {
      let parts = payload.name.split("_");
      payload.name = parts[0] + "_" + nanoid(8);
    }
    this.#model.fields.push(payload);
    if (field.details.nextIndex !== null) {
      this.util.moveArrayEntry(
        this.getAllFields(),
        this.getAllFields().length - 1,
        field.details.nextIndex
      );
    }
  }

  /**
   * Updates a field data by its id
   * @param {string} fieldId - Id of the field to select
   * @param {object} data - Object to update field with, should contain the id as well
   */
  updateFieldById(fieldId, data) {
    let field = this.getFieldById(fieldId);
    this.#model.fields[field.details.index] = data;
  }

  /**
   * Remove a field by id
   * @param {string} fieldId - Id of field to delete
   */
  deleteFieldById(fieldId) {
    let field = this.getFieldById(fieldId);
    this.#model.fields.splice(field.details.index, 1);
  }

  /**
   * clear all fields
   */
  clearAllFields() {
    this.#model.fields = [];
    return this.#model.fields;
  }

  /**
   * Load an existing form model object
   * @param {object} modelObject - object to be loaded
   */
  loadSchema(modelObject) {
    this.#model = { ...this.#model, ...modelObject };
    return this.#model;
  }

  /**
   * helper methods
   */
  util = {
    /**
     * find a field object from field array
     * @param {array} arr - array containing objects
     * @param {string} atr - attribute to select
     * @param {any} value - value to search for on attribute
     */
    selectField: (arr, atr, value) => {
      return arr.filter((obj) => {
        return obj[atr] === value;
      });
    },

    /**
     * information about a field's index
     * @param {array} array - array to search
     * @param {string} index - Index of element to return information about
     */
    indexDetails: (array, index) => {
      let details = {};
      details.length = array.length;
      details.index = index;
      details.lastIndex = array.length - 1;
      if (index === 0) {
        details.previousIndex = null;
      } else if (index === details.lastIndex && array.length > 1) {
        details.previousIndex = index - 1;
      } else {
        details.previousIndex = index - 1;
      }
      if (index === details.lastIndex) {
        details.nextIndex = null;
      } else if (index === 0 && array.length > 1) {
        details.nextIndex = index + 1;
      } else {
        details.nextIndex = index + 1;
      }
      return details;
    },

    /**
     * Move an array item using indexes
     * @param {array} arr - array containing values to be moved
     * @param {number} old_index - the original index of array item
     * @param {number} new_index - target index to move array item to
     */
    moveArrayEntry: (arr, old_index, new_index) => {
      while (old_index < 0) {
        old_index += arr.length;
      }
      while (new_index < 0) {
        new_index += arr.length;
      }
      if (new_index >= arr.length) {
        let k = new_index - arr.length;
        while (k-- + 1) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    },

    /**
     * Return information about a field
     * @param {string} fieldId - id of field to query
     */
    fieldDetails: (fieldId) => {
      let fields = this.getAllFields();
      let selectedField = this.util.selectField(fields, "id", fieldId);
      let index = fields.indexOf(selectedField[0]);
      let details = this.util.indexDetails(fields, index);
      return {
        field: selectedField,
        details: details,
      };
    },
  };

  history = {
    createEntry: () => {
      this.#historical.entries.push(this.#model);
    },
  };
}
