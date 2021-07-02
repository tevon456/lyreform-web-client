export function fieldDescription(field_type) {
  switch (field_type) {
    case "EMAIL":
      return "For email addresses.";
    case "NUMBER":
      return "For accepting numerical values.";
    case "DATE":
      return "Use for dates for example birthdays and appointments.";
    case "SHORT_ANSWER":
      return "For accepting short text like names.";
    case "LONG_ANSWER":
      return "For longer text such as a product descriptions.";
    case "DROPDOWN_SELECT":
      return "Best used for more than 5 options of which one is selected.";
    case "RADIO_GROUP":
      return "Best used for 5 or less options where only one option can be selected.";
    case "CHECKBOX_GROUP":
      return "Used for selecting multiple options from a list of options.";
    case "FILE":
      return "A field for accepting file uploads such as Word documents, images and Excel sheets.";
    case "RICH_TEXT":
      return "A space to write freely, great for descriptions, instructions etc.";
    default:
      return null;
  }
}
