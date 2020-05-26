import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Button, LinearProgress } from "@material-ui/core";
import React from "react";
import AddressField from "./Fields/AddressField";

const UserForm = ({ onSubmit }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    address: Yup.string()
      .max(255, "Must be 255 characters or less")
      .required("Required"),
  });

  const onFormSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    onSubmit(values);
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
            margin="dense"
            fullWidth
          />
          <Field
            component={TextField}
            type="email"
            label="Email"
            name="email"
            margin="dense"
            fullWidth
          />
          <Field
            component={AddressField}
            type="address"
            label="Address"
            name="address"
          />
          {isSubmitting && <LinearProgress />}
          <Box display="flex" mt={2} mb={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
