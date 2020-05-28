import React, { useState } from "react";
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

export default function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editableUserId, setEditableUserId] = useState(null);
  const users = JSON.parse(localStorage.getItem("users")) ?? [];

  const onDialogClose = () => {
    setEditableUserId(null);
    setDialogOpen(false);
  };

  const editableUser = users[editableUserId];

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          React user registration
        </Typography>

        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Add user
          </Button>

          <Dialog open={isDialogOpen} onClose={onDialogClose}>
            <DialogTitle>
              {`${editableUserId ? "Edit" : "Add"} user`}
            </DialogTitle>
            <DialogContent>
              <UserForm
                user={editableUser}
                onSubmit={(values) => {
                  if (editableUser) {
                    users[editableUserId] = values;
                    localStorage.setItem(
                        "users",
                        JSON.stringify(users)
                    );
                  } else {
                    localStorage.setItem(
                      "users",
                      JSON.stringify([values, ...users])
                    );
                  }
                  onDialogClose();
                }}
                onCancel={onDialogClose}
              />
            </DialogContent>
          </Dialog>
        </Box>

        <UsersList
          users={users}
          onEdit={(id) => {
            setEditableUserId(id);
            setDialogOpen(true);
          }}
        />

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © Armandas Motuzas"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
