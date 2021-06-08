import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormField, UICore } from "../../../components";
import { Notification } from "../../../utils";
import { Api } from "../../../utils/";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function ResendConfirmationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    Api.requestConfirmation(data.email)
      .then((res) => {
        Notification.success(res.data.message, 20 * 1000);
      })
      .catch((error) => {
        if (error.response.status === 429) {
          Notification.warning("Too many request, please try agin later");
        }
        if (error.response) {
          Notification.warning(error.response.data.message);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField.Input
        {...register("email")}
        label="Email"
        type="email"
        helper={errors.email?.message}
        helperColor="var(--danger)"
        required
        width="91%"
        mb="24px"
      />
      <UICore.Button
        size="lg"
        fullWidth
        type="submit"
        className="margin-top--lg"
      >
        Submit
      </UICore.Button>
    </form>
  );
}
