import axios from "axios";

import { setAlert } from "./alertAction";
import {
  DELETE_USERS,
  EDIT_USERS,
  ADD_USERS,
  ADD_USERS_FAIL,
  GET_USER,
  GET_USER_FAIL,
  DELETE_USERS_FAIL,
} from "../Constants/actionsTypes";

export const handleEdit = ({ name, family_name, password, id }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, family_name, password });

  try {
    const res = await axios.put(`/api/users/update/${id}`, body, config);

    dispatch({
      type: EDIT_USERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_USERS_FAIL,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/users");

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: GET_USER_FAIL,
    });
  }
};

export const addNewUser = ({ name, family_name, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, family_name, password });

  try {
    const res = await axios.post("/api/users/add-user", body, config);

    dispatch({
      type: ADD_USERS,
      payload: res.data,
    });
    dispatch(getUsers());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ADD_USERS_FAIL,
    });
  }
};

export const handlDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/delete/${id}`);

    dispatch({
      type: DELETE_USERS,
      payload: id,
    });
    dispatch(getUsers());
    dispatch(setAlert("User removed", "success"));
  } catch (err) {
    dispatch({
      type: DELETE_USERS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
