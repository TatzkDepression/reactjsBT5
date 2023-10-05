import axios from "axios";
import { SET_USER } from "../constant/user";

export const setUserAction = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://6517db88582f58d62d352b92.mockapi.io/users"
    );
    const data = response.data;

    dispatch({ type: SET_USER, payload: data });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
