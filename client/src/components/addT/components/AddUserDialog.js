import React, { useState } from "react";
import { connect } from "react-redux";
import {addNewUser } from "../../../Js/actions/usersAction";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

const initialUser = {
  name: "",
  family_name: "",
  password: "",
  
};

const AddUserDialog = (props) => {
  const [user, setUser] = useState(initialUser);
  const { addUserHandler,addNewUser } = props;
  const [open, setOpen] = React.useState(false);


console.log(user,'user')




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const handleAdd = (event) => {
    addNewUser(user)  
    addUserHandler(user);
    setUser(initialUser);
    
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Demo add item to react table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={user.name}
            onChange={handleChange("name")}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={user.family_name}
            onChange={handleChange("family_name")}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={user.password}
            onChange={handleChange("password")}
          />
         
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired,
};


export default connect(null, {addNewUser })(AddUserDialog);