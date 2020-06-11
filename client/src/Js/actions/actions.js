import {
  SET_THEME
  } from '../Constants/actionsTypes';


  export const setTheme = (theme) => {
    return {
      type: SET_THEME,
      theme
    }
  }