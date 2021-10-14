import React from "react";
import { Formik, Form } from "formik";
import { UICore } from "../../../components";
import * as yup from "yup";
import Input from "../components/Input";
import ColorInput from "../components/ColorInput";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function BaseForm({ form, triggerRender }) {
  return (
    <Formik
      initialValues={{
        name: form.getModel().name,
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
      {({ handleChange, errors }) => (
        <Form>
          <Input
            name="name"
            helper={errors?.name}
            label="Name"
            onChange={handleChange}
            defaultValue={form.getModel().name}
            mb="16px"
            width="140px"
          />
          <UICore.Flex justify="center" align="center">
            <UICore.Line
              thickness="1px"
              variant="h"
              length="270px"
              color="var(--neutral-300)"
              mb="40px"
            />
          </UICore.Flex>

          <ColorInput
            name="header_foreground"
            helper={errors.header_foreground}
            label="Header Text"
            onChange={handleChange}
            defaultValue={form.getModel().header_foreground}
            mb="16px"
            width="114px"
          />
          <ColorInput
            name="header_background"
            helper={errors.header_background}
            label="Header Base"
            onChange={handleChange}
            defaultValue={form.getModel().header_background}
            mb="16px"
            width="114px"
          />
          <ColorInput
            name="body_foreground"
            helper={errors.body_foreground}
            label="Form Text"
            onChange={handleChange}
            defaultValue={form.getModel().body_foreground}
            mb="16px"
            width="114px"
          />
          <ColorInput
            name="body_background"
            helper={errors.body_background}
            label="Form Base"
            onChange={handleChange}
            defaultValue={form.getModel().body_background}
            mb="16px"
            width="114px"
          />
          <ColorInput
            name="controls_foreground"
            helper={errors.controls_foreground}
            label="Control Color"
            onChange={handleChange}
            defaultValue={form.getModel().controls_foreground}
            mb="16px"
            width="114px"
          />

          <ColorInput
            name="controls_background"
            helper={errors.controls_background}
            label="Control Base"
            onChange={handleChange}
            defaultValue={form.getModel().controls_background}
            mb="16px"
            width="114px"
          />
          <ColorInput
            name="page_background"
            helper={errors.page_background}
            label="Page Base"
            onChange={handleChange}
            defaultValue={form.getModel().page_background}
            mb="16px"
            width="114px"
          />
          <UICore.Button
            type="submit"
            variant="outline"
            kind="secondary"
            hover="var(--primary-hovered)"
            fullWidth
            className="margin-top--lg"
          >
            Apply Changes
          </UICore.Button>
        </Form>
      )}
    </Formik>
  );
}
