import React from "react";
import { useForm } from "react-hook-form";
import { Link, useRouteMatch } from "react-router-dom";
import { FormField, UICore } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Notification } from "../../../utils";
import { Api } from "../../../utils/";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .matches("\\d", "password must contain at least one digit")
    .required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

export default function NewPasswordForm() {
  const token = useRouteMatch().params.token;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    Api.resetPassword(token, data.password)
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
        {...register("password")}
        label="Password"
        type="password"
        required
        helper={errors.password?.message}
        helperColor="var(--danger)"
        mb="18px"
        width="91%"
      />
      <FormField.Input
        {...register("password_confirmation")}
        label="Password confirmation"
        type="password"
        required
        helper={
          errors.password_confirmation?.message ||
          "so you don't enter the wrong password by accident"
        }
        helperColor={
          errors.password_confirmation ? "var(--danger)" : "var(--text-grey)"
        }
        width="91%"
      />

      <UICore.Button
        size="lg"
        fullWidth
        type="submit"
        className="margin-top--lg margin-bottom--sm"
      >
        Submit
      </UICore.Button>
      <UICore.Text>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "var(--primary)" }}>
          Login
        </Link>
      </UICore.Text>
    </form>
  );
}
