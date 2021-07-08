import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UICore } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

const schema = yup.object().shape({
  label: yup.string().required(),
  placeholder: yup.string(),
  required: yup.boolean(),
});

export default function GeneralForm({ form, id, triggerRender }) {
  let current = form.getFieldById(id)[0];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { label: current.label, placeholder: "" },
  });

  const onSubmit = (data) => console.log("-", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("label")}
        helper={errors.label?.message}
        label="Label"
        mb="16px"
        width="140px"
      />
      <Input
        {...register("placeholder")}
        helper={errors.placeholder?.message}
        label="Placeholder"
        mb="16px"
        width="140px"
      />

      <Checkbox
        {...register("required")}
        onChange={(e) => {
          setValue("required", e.target.checked);
        }}
        baseColor="var(--neutral-500)"
        label="Required"
      />

      <UICore.Button
        type="submit"
        variant="outline"
        fullWidth
        className="margin-top--md"
      >
        Save Changes
      </UICore.Button>
    </form>
  );
}
