import React, { useState } from "react";
import { connect } from "react-redux";
import { addNewUser, handleEdit } from "../../Js/actions/usersAction";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const UserModal = (props) => {
  const initialUser = {
    name: props.userInfo ? props.userInfo.name : "",
    family_name: props.userInfo ? props.userInfo.family_name : "",
    password: props.userInfo ? props.userInfo.password : "",
  };

  if (props.userInfo) {
    initialUser["id"] = props.userInfo.id;
  }

  const [user, setUser] = useState(initialUser);
  const { addNewUser, handleEdit } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (event) => {
    const { name, family_name, password, id } = user;

    props.userInfo
      ? handleEdit({ name, family_name, password, id })
      : addNewUser({ name, family_name, password });

    setUser(initialUser);
    setOpen(false);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <Tooltip title="Add">
        {props.userInfo ? (
          <IconButton aria-label="Edit" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        )}
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
            name="name"
            type="text"
            fullWidth
            value={user.name}
            onChange={handleChange("name")}
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="family_name"
            type="text"
            fullWidth
            value={user.family_name}
            onChange={handleChange("family_name")}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            name="password"
            fullWidth
            value={user.password}
            onChange={handleChange("password")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {props.userInfo ? (
            <Link onClick={handleAdd} to={`/`}>
              <Button color="primary">Add</Button>
            </Link>
          ) : (
            <Button color="primary" onClick={handleAdd}>
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, { addNewUser, handleEdit })(UserModal);
