import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Armandas Motuzas"}
    </Typography>
  );
}

export default function App() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const users = JSON.parse(localStorage.getItem("users")) ?? [];

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
              <UserForm
                onSubmit={(values) => {
                  localStorage.setItem(
                    "users",
                    JSON.stringify([values, ...users])
                  );
                  setDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </Box>
        <UsersList users={users} />
        <Copyright />
      </Box>
    </Container>
  );
}
