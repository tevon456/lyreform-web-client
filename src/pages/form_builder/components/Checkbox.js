import React from "react";
import { UICore } from "../../../components/";

function Checkbox({ parentLabel, field_type, mb, mt, label, ...rest }) {
  return (
    <UICore.Box mg="0px" pd="0px" mb={mb} mt={mt} textAlign="left">
      <label>
        <UICore.Flex justify="space-between" wrap="wrap" align="center">
          <UICore.Text weight="300">{label}</UICore.Text> <span />
          <input
            type="checkbox"
            data-label={parentLabel}
            data-field-type={field_type}
            {...rest}
          />
        </UICore.Flex>
      </label>
    </UICore.Box>
  );
}

export default Checkbox;
