import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { FormSubmit } from ".";

const schema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  field_type: yup.string().required(),
  label: yup.string().required(),
  placeholder: yup.string(),
  required: yup.string().required(),
});

export default function GeneralForm({ form, id, triggerRender }) {
  let [field, setField] = useState(form.getFieldById(id)?.field[0] || {});

  useEffect(() => {
    setField(form.getFieldById(id)?.field[0]);
    // eslint-disable-next-line
  }, [id, field]);

  return (
    <Formik
      initialValues={{ ...field }}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={(values) => {
        form.updateFieldById(field.id, values);
        triggerRender();
      }}
    >
      {({ handleChange, errors, values }) => (
        <Form style={{ paddingBottom: "24px" }}>
          <Input
            name="label"
            helper={errors?.label}
            label="Label"
            onChange={handleChange}
            value={values?.label}
            mb="16px"
            width="140px"
          />
          <Input
            name="placeholder"
            helper={errors?.placeholder}
            label="Placeholder"
            onChange={handleChange}
            defaultValue={values?.placeholder}
            mb="16px"
            width="140px"
          />
          <Checkbox
            name="required"
            label="Required"
            onChange={handleChange}
            defaultChecked={field.required}
            mb="var(--space-xxl)"
            width="140px"
          />
          <FormSubmit triggerRender={triggerRender} />
        </Form>
      )}
    </Formik>
  );
}
