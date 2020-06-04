import React, { useEffect, useState } from "react";
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
import UsersList from "components/UsersList";
import UserForm from "components/UserForm";
import useUsers from "hooks/useUsers";

function App() {
  const { users, actions } = useUsers();
  const { setUsers } = actions;

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editableUserId, setEditableUserId] = useState<number>();

  useEffect(() => {
    if (!users.length) {
      const usersList = JSON.parse(localStorage.getItem("users") ?? "") ?? [];
      setUsers(usersList);
    }
  }, [setUsers, users]);

  const onDialogClose = () => {
    setEditableUserId(undefined);
    setDialogOpen(false);
  };

  const editableUser = editableUserId ? users[editableUserId] : undefined;

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
            <DialogTitle>{`${editableUser ? "Edit" : "Add"} user`}</DialogTitle>
            <DialogContent>
              <UserForm
                user={editableUser}
                onSubmit={(values) => {
                  if (editableUser && editableUserId) {
                    users[editableUserId] = values;
                    localStorage.setItem("users", JSON.stringify(users));
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
          onEdit={(id: number) => {
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

export default App;
