import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { Button, LinearProgress } from "@material-ui/core";
import React from "react";

const UserForm = ({ onSubmit }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const onFormSubmit = (values, { setSubmitting }) => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    localStorage.setItem("users", JSON.stringify([values, ...users]));
    setSubmitting(false);
    onSubmit();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="firstName"
            label="First name"
            fullWidth
          />
          <Field
            component={TextField}
            label="Last name"
            name="lastName"
            fullWidth
          />
          <Field
            component={TextField}
            type="email"
            label="Email"
            name="email"
            fullWidth
          />
          {isSubmitting && <LinearProgress />}
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
