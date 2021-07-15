import React from "react";
import { useForm } from "react-hook-form";
import { UICore } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import ColorInput from "../components/ColorInput";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function BaseForm({ form, id, triggerRender }) {
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: form.getModel().name,
      header_foreground: form.getModel().header_foreground,
      header_background: form.getModel().header_background,
      body_foreground: form.getModel().body_foreground,
      body_background: form.getModel().body_background,
      controls_foreground: form.getModel().controls_foreground,
      controls_background: form.getModel().controls_background,
      page_background: form.getModel().page_foreground,
    },
  });

  const onSubmit = (data) => console.log("-", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        helper={errors.name?.message}
        label="Name"
        defaultValue={form.getModel().name}
        mb="16px"
        width="140px"
      />
      <ColorInput
        {...register("header_foreground")}
        helper={errors.name?.message}
        label="Header Text"
        defaultValue={form.getModel().header_foreground}
        mb="16px"
        width="114px"
      />
      <ColorInput
        {...register("header_background")}
        helper={errors.name?.message}
        label="Header Base"
        defaultValue={form.getModel().header_background}
        mb="16px"
        width="114px"
      />
      <ColorInput
        {...register("body_foreground")}
        helper={errors.name?.message}
        label="Form Text"
        defaultValue={form.getModel().body_foreground}
        mb="16px"
        width="114px"
      />
      <ColorInput
        {...register("body_background")}
        helper={errors.name?.message}
        label="Form Base"
        defaultValue={form.getModel().body_background}
        mb="16px"
        width="114px"
      />
      <ColorInput
        {...register("controls_foreground")}
        helper={errors.name?.message}
        label="Control Color"
        defaultValue={form.getModel().controls_foreground}
        mb="16px"
        width="114px"
      />

      <ColorInput
        {...register("controls_background")}
        helper={errors.name?.message}
        label="Control Base"
        defaultValue={form.getModel().controls_background}
        mb="16px"
        width="114px"
      />
      <ColorInput
        {...register("page_background")}
        helper={errors.name?.message}
        label="Page Base"
        defaultValue={form.getModel().page_background}
        mb="16px"
        width="114px"
      />

      <UICore.Button
        type="submit"
        variant="outline"
        kind="secondary"
        fullWidth
        className="margin-top--lg"
      >
        Apply Changes
      </UICore.Button>
    </form>
  );
}
