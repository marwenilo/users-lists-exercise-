import {
  DELETE_USERS,
  EDIT_USERS,
  ADD_USERS,
  ADD_USERS_FAIL,
  GET_USER,
  GET_USER_FAIL,
  DELETE_USERS_FAIL
} from "../Constants/actionsTypes";
// import { user } from "./data";
const InitialState = { user: [] };

const userReducer = (state = InitialState, { type, payload, id }) => {
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: [...payload],
      };
    case ADD_USERS:
      return {
        ...state,
        user: [...state.user, payload],
        //this payload is obj {} full of the info from modal
      };

    case DELETE_USERS:
      return {
        ...state,
        user: state.user.filter((el) => el.id === id),
        //this payload is full of the id from the click of the movie delete btn
      };
    case EDIT_USERS:
      return {
        ...state,
        user: state.user.map(
          (el) => (el.id === payload.id ? payload : el)
          //this payload is and obj with the id of the movie that we want to change and the rest of the new info from modal
        ),
      };
      case GET_USER_FAIL:
      case DELETE_USERS_FAIL:
      case ADD_USERS_FAIL:
        return state
        
    default:
      return state;
  }
};

export default userReducer;
