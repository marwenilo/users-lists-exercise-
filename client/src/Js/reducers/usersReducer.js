import {
  DELETE_USERS,
  EDIT_USERS,
  ADD_USERS,
  ADD_USERS_FAIL,
  GET_USER,
  GET_USER_FAIL,
  DELETE_USERS_FAIL,
} from "../Constants/actionsTypes";

const InitialState = { users: [] };

const userReducer = (state = InitialState, { type, payload, id }) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        users: payload,
      };
    case ADD_USERS:
      return {
        ...state,
        users: [...state.users, payload],
      };

    case DELETE_USERS:
      return {
        ...state,
        users: state.users.filter((el) => el.id === id),
      };
    case EDIT_USERS:
      return {
        ...state,
        users: state.users.map((el) => (el.id === payload.id ? payload : el)),
      };
    case GET_USER_FAIL:
    case DELETE_USERS_FAIL:
    case ADD_USERS_FAIL:
      return state;

    default:
      return state;
  }
};

export default userReducer;
