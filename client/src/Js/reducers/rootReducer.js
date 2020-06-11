import { SET_THEME } from "../Constants/actionsTypes";
const initState = {
  theme: "light",
};

const rootReducer = (state = initState, { type, theme }) => {
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        theme: theme,
      };
    default:
      return state;
  }
};

export default rootReducer;
