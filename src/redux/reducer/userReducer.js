import { SET_DATA_FORM, SET_USER } from "../constant/user";

const initialState = {
  users: [],
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        users: payload,
      };
    case SET_DATA_FORM:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
