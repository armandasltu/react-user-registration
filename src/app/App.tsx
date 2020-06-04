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
import { User } from "types";
import { getRandomNumber } from "utils";
import { usersList } from "mocks/users";

function App() {
  const { users, actions } = useUsers();
  const { setUsers, addUser, editUser } = actions;

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editableUserId, setEditableUserId] = useState<number>();

  useEffect(() => {
    if (!users.length) {
      setUsers(usersList);
    }
  }, [setUsers, users]);

  const onDialogClose = () => {
    setEditableUserId(undefined);
    setDialogOpen(false);
  };

  const editableUser = users.find(({ id }) => editableUserId === id);

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
            <DialogTitle>{`${
              editableUserId ? "Edit" : "Add"
            } user`}</DialogTitle>
            <DialogContent>
              <UserForm
                user={editableUser}
                onSubmit={(values) => {
                  if (editableUser) {
                    const user: User = {
                      ...editableUser,
                      ...values,
                    };
                    editUser(user);
                  } else {
                    const userId = getRandomNumber(1, 10000);
                    const user: User = {
                      ...values,
                      id: userId,
                    };
                    addUser(user);
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
