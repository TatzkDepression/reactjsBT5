import axios from "axios";
import React, { useEffect, useRef, useCallback, useReducer } from "react";
import { connect } from "react-redux";
import { setUserAction } from "../../redux/action/actionUser";
import { SET_DATA_FORM } from "../../redux/constant/user";

function Form({ user, handleSetUser, handleSetDataForm }) {
  const inputRef = useRef(null);
  const refReset = useRef(null);

  const initialState = {
    formReset: false,
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case "RESET_FORM":
        return { formReset: true };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.style.color = "red";
  }, []);

  useEffect(() => {
    if (state.formReset) {
      refReset.current.reset();
      dispatch({ type: "RESET_FORM" });
    }
  }, [state.formReset]);

  const handleChangeForm = useCallback(
    (event) => {
      const { value, name } = event.target;
      const newUser = { ...user, [name]: value };
      handleSetDataForm(newUser);
    },
    [user, handleSetDataForm]
  );

  const handleAddUser = useCallback(() => {
    axios
      .post("https://6517db88582f58d62d352b92.mockapi.io/users", user)
      .then((res) => {
        console.log(res);
        handleSetUser();
        dispatch({ type: "RESET_FORM" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, handleSetUser]);

  return (
    <div className="container mt-4">
      <form ref={refReset}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            ref={inputRef}
            onChange={handleChangeForm}
            value={user.name}
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="account">Account</label>
          <input
            onChange={handleChangeForm}
            value={user.account}
            type="text"
            className="form-control"
            name="account"
            placeholder="Account"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangeForm}
            value={user.password}
            type="text"
            className="form-control"
            name="password"
            placeholder="Password"
          />
        </div>
        <button onClick={handleAddUser} type="button" className="btn btn-dark">
          Thêm
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  handleSetUser: setUserAction,
  handleSetDataForm: (user) => ({
    type: SET_DATA_FORM,
    payload: user,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
