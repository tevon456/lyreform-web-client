import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "../components/Input";
import ColorInput from "../components/ColorInput";
import { FormFieldSeparator, FormSubmit } from ".";
import Checkbox from "../components/Checkbox";

const schema = yup.object().shape({
  name: yup.string().required(),
  published: yup.boolean().required(),
  header_foreground: yup.string().required(),
  header_background: yup.string().required(),
  body_foreground: yup.string().required(),
  body_background: yup.string().required(),
  controls_foreground: yup.string().required(),
  controls_background: yup.string().required(),
  page_background: yup.string().required(),
});

export default function BaseForm({ form, triggerRender }) {
  return (
    <Formik
      initialValues={{
        name: form.getModel().name,
        published: form.getModel().published,
        header_foreground: form.getModel().header_foreground,
        header_background: form.getModel().header_background,
        body_foreground: form.getModel().body_foreground,
        body_background: form.getModel().body_background,
        controls_foreground: form.getModel().controls_foreground,
        controls_background: form.getModel().controls_background,
        page_background: form.getModel().page_background,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        form.setModel({ ...form.getModel(), ...values });
        triggerRender();
      }}
    >
      {({ handleChange, errors, values }) => (
        <Form>
          <Input
            name="name"
            helper={errors?.name}
            label="Name"
            onChange={handleChange}
            value={values?.name}
            mb="16px"
            width="140px"
          />
          <Checkbox
            name="published"
            label="Published"
            onChange={handleChange}
            checked={values?.published}
            mb="16px"
            width="140px"
          />
          <FormFieldSeparator />
          <ColorInput
            name="header_foreground"
            helper={errors.header_foreground}
            label="Header Text"
            onChange={handleChange}
            value={values?.header_foreground}
            mb="16px"
            width="100px"
          />
          <ColorInput
            name="header_background"
            helper={errors.header_background}
            label="Header Base"
            onChange={handleChange}
            value={values?.header_background}
            mb="16px"
            width="100px"
          />
          <ColorInput
            name="body_foreground"
            helper={errors.body_foreground}
            label="Form Text"
            onChange={handleChange}
            value={values?.body_foreground}
            mb="16px"
            width="100px"
          />
          <ColorInput
            name="body_background"
            helper={errors.body_background}
            label="Form Base"
            onChange={handleChange}
            value={values?.body_background}
            mb="16px"
            width="100px"
          />
          <ColorInput
            name="controls_foreground"
            helper={errors.controls_foreground}
            label="Control Color"
            onChange={handleChange}
            value={values?.controls_foreground}
            mb="16px"
            width="100px"
          />

          <ColorInput
            name="controls_background"
            helper={errors.controls_background}
            label="Control Base"
            onChange={handleChange}
            value={values?.controls_background}
            mb="16px"
            width="100px"
          />
          <ColorInput
            name="page_background"
            helper={errors.page_background}
            label="Page Base"
            onChange={handleChange}
            value={values?.page_background}
            mb="48px"
            width="100px"
          />
          <FormSubmit />
        </Form>
      )}
    </Formik>
  );
}
