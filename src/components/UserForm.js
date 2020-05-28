import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Button, LinearProgress } from "@material-ui/core";
import AddressField from "./Fields/AddressField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    "& > button": {
      marginRight: theme.spacing(1),
    },
  },
}));

const UserForm = ({ user, onSubmit, onCancel }) => {
  const classes = useStyles();

  const { firstName, lastName, email, address } = user;

  const initialValues = {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    email: email ?? "",
    address: address ?? "",
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
          <Box className={classes.actions}>
            <Button
              variant="contained"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

UserForm.defaultProps = {
  user: {},
  onSubmit: () => {},
};

UserForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default UserForm;
