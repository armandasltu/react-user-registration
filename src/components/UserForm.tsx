import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Button, LinearProgress } from "@material-ui/core";
import AddressField from "./Fields/AddressField";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { User } from "types";

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

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface UserFormProps {
  user?: User;
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const classes = useStyles();

  const initialValues: UserFormValues = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    street: user?.street ?? "",
    city: user?.city ?? "",
    country: user?.country ?? "",
    postalCode: user?.postalCode ?? "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    street: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    city: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    country: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    postalCode: Yup.string()
      .max(30, "Must be 30 characters or less"),
  });

  const onFormSubmit = (
    values: UserFormValues,
    { setSubmitting }: FormikHelpers<UserFormValues>
  ) => {
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
            type="street"
            label="Address (Street/House)"
            name="street"
          />
          <Field
            component={AddressField}
            type="city"
            label="City"
            name="city"
          />
          <Field
            component={AddressField}
            type="country"
            label="Country"
            name="country"
          />
          <Field
            component={TextField}
            type="postalCode"
            label="Postal code"
            name="postalCode"
            fullWidth
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

export default UserForm;
