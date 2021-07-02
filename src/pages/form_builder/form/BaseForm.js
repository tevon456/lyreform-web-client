import React from "react";
import { useForm } from "react-hook-form";
import { UICore } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";

const schema = yup.object().shape({
  label: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches("\\d", "password must contain at least one digit"),
});

export default function BaseForm() {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form>
      <Input
        {...register("label", { required: true, maxLength: 20 })}
        onBlur={async (e) => {
          let r = await trigger("label");
          console.log(e.target.value, r);
        }}
        helper={errors.label?.message}
        label="Email"
        mb="16px"
        width="140px"
      />
    </form>
  );
}
