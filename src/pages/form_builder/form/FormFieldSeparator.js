import React from "react";
import { UICore } from "../../../components";

export default function FormFieldSeparator() {
  return (
    <UICore.Flex justify="center" align="center">
      <UICore.Line
        thickness="1px"
        variant="h"
        length="270px"
        color="var(--neutral-300)"
        mb="40px"
      />
    </UICore.Flex>
  );
}
