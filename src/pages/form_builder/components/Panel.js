import React from "react";
import { UICore } from "../../../components";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Select from "./Select";

export default function Panel() {
  return (
    <UICore.Box
      height="100vh"
      width="160px"
      minWidth="130px"
      border="1px solid var(--neutral-300)"
      bg="#FFF"
      pd="8px"
      z="0"
      pt="60px"
      style={{ flexGrow: 1 }}
    >
      <Input label="Label" mb="16px" width="140px" />
      <Input label="Placeholder" mb="16px" width="140px" />
      <Input type="number" label="Max length" mb="16px" width="140px" />
      <Select
        label="Required"
        mb="16px"
        width="150px"
        options={["yes", "no"]}
      />
      <Checkbox baseColor="var(--primary)" label="Required" />

      <UICore.Line
        style={{ display: "block" }}
        variant="h"
        thickness="1px"
        length="94%"
        color="var(--neutral-350)"
      />
    </UICore.Box>
  );
}
