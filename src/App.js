import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import UsersList from "./components/UsersList";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Armandas Motuzas"}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          React user registration
        </Typography>
        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
          >
            Register user
          </Button>
        </Box>
        <UsersList />
        <Copyright />
      </Box>
    </Container>
  );
}
