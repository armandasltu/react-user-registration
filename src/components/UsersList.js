import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const rows = [
  {
    name: "Harry",
    surname: "Gloop",
    email: "harry.gloop@gmail.com",
  },
];

const UsersList = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Users list">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
