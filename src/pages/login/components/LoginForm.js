import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormField, UICore } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SessionContext } from "../../../context/Session";
import { Notification } from "../../../utils";
import { Api } from "../../../utils/";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches("\\d", "password must contain at least one digit"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { createSession } = useContext(SessionContext);

  const onSubmit = (data) => {
    Api.login(data)
      .then((res) => {
        createSession(res.data.tokens);
      })
      .catch((error) => {
        if (error.response?.status === 429) {
          Notification.warning("Too many request, please try agin later");
        }
        if (error.response) {
          Notification.danger(error.response.data.message);
        } else {
          Notification.danger(
            "We're having an issue logging into your account please try again later"
          );
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField.Input
        {...register("email")}
        label="Email"
        type="email"
        required
        helper={errors.email?.message}
        helperColor="var(--danger)"
        width="91%"
        mb="24px"
      />
      <FormField.Input
        {...register("password")}
        label="Password"
        type="password"
        required
        helper={errors.password?.message}
        helperColor="var(--danger)"
        width="91%"
      />
      <Link to="/forgot-password" style={{ color: "var(--primary)" }}>
        Forgot password?
      </Link>
      <UICore.Button
        size="lg"
        fullWidth
        type="submit"
        className="margin-top--lg margin-bottom--sm"
      >
        Submit
      </UICore.Button>
      <UICore.Text>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "var(--primary)" }}>
          Create one
        </Link>
      </UICore.Text>
    </form>
  );
}
