import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UsersList from "./components/UsersList";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Armandas Motuzas"}
    </Typography>
  );
}

export default function App() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          React user registration
        </Typography>
        <Box mb={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Add user
          </Button>

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Add user</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                }}
                validationSchema={Yup.object({
                  firstName: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  lastName: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  const users = JSON.parse(localStorage.getItem("users")) ?? [];
                  localStorage.setItem(
                    "users",
                    JSON.stringify([values, ...users])
                  );
                  setSubmitting(false);
                  setDialogOpen(false)
                }}
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
            </DialogContent>
          </Dialog>
        </Box>
        <UsersList />
        <Copyright />
      </Box>
    </Container>
  );
}
