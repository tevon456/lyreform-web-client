import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { FormSubmit, FormFieldSeparator } from ".";
import { UICore } from "../../../components";
import Lyreform from "../../../utils/lyreform";

const schema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  field_type: yup.string().required(),
  label: yup.string().required(),
  options: yup.array(),
  required: yup.string().required(),
});

export default function OptionForm({ form, id, triggerRender }) {
  let [field, setField] = useState(form.getFieldById(id)?.field[0] || {});
  let [options, setOptions] = useState(
    form.getFieldById(id)?.field[0]?.options || []
  );

  useEffect(() => {
    setField(form.getFieldById(id)?.field[0]);
    setOptions(form.getFieldById(id)?.field[0]?.options || []);
    // eslint-disable-next-line
  }, [id, field]);

  return (
    <Formik
      initialValues={{ ...field }}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={(values) => {
        values.options = options;
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
          <Checkbox
            name="required"
            label="Required"
            onChange={handleChange}
            defaultChecked={field.required}
            mb="16px"
            width="140px"
          />
          <Options options={options} setOptions={setOptions} id={id} />
          <FormSubmit />
        </Form>
      )}
    </Formik>
  );
}

function Options({ options = [], setOptions, id }) {
  let [error, setError] = useState(null);
  let util = new Lyreform().util;

  function change(e) {
    let queryResult = util.selectField(options, "value", e.target.value);
    if (queryResult.length === 0) {
      setError(null);
    }
  }

  function handleEnter(e) {
    if (e.code === "Enter") {
      //Ensure that only unique values are passed back
      let newOption = [...options, { value: e.target.value }];
      let queryResult = util.selectField(options, "value", e.target.value);

      if (queryResult.length === 0) {
        setOptions(newOption);
      } else {
        setError(`Duplicates not allowed`);
      }
    }
  }

  function deleteOption(options, index) {
    let newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  }

  return (
    <UICore.Box pd="0px" mg="0px" mb="24px" mt="-10px">
      <Input
        name="placeholder"
        placeholder="Enter to submit"
        label="Add option"
        helper={error}
        helperColor="var(--danger)"
        onChange={(e) => {
          e.persist();
          change(e);
        }}
        onKeyDown={(e) => {
          e.persist();
          handleEnter(e);
        }}
        mb="16px"
        width="140px"
      />
      <FormFieldSeparator />
      <UICore.Text mb="8px" mt="2px" weight="300" color="var(--text-dark)">
        Options{" "}
        <UICore.Badge bg="var(--neutral-500)">{options.length}</UICore.Badge>
      </UICore.Text>
      {options.map((option, index) => (
        <UICore.Box
          mg="0px"
          key={option.key}
          mb="8px"
          pd="4px"
          radius="4px"
          border="1px solid var(--neutral-400)"
        >
          <UICore.Flex justify="space-between" align="center">
            <UICore.Text
              className="truncate"
              width="240px"
              mb="2px"
              weight="300"
              mt="2px"
              color="var(--text-dark)"
            >
              {option.value}
            </UICore.Text>
            <UICore.Button
              size="sm"
              kind="secondary"
              type="button"
              onClick={() => {
                deleteOption(options, index);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20px"
                height="20px"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </UICore.Button>
          </UICore.Flex>
        </UICore.Box>
      ))}
    </UICore.Box>
  );
}
