import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { setUserAction } from "../../redux/action/actionUser";
import { message } from "antd";

function List({ users, handleSetUser }) {
  useEffect(() => {
    handleSetUser();
  }, [handleSetUser]);

  const handleDelete = useCallback(
    (id) => {
      axios
        .delete(`https://6517db88582f58d62d352b92.mockapi.io/users/${id}`)
        .then((res) => {
          console.log(res);
          message.success("Xóa Thành Công");
          handleSetUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [handleSetUser]
  );

  const handleGetDetail = useCallback((id) => {
    axios
      .get(`https://6517db88582f58d62d352b92.mockapi.io/users/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderTable = () => {
    return Array.from(users)
      .reverse()
      .map((user, index) => (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.account}</td>
          <td>{user.password}</td>
          <td>
            <button
              onClick={() => handleDelete(user.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              onClick={() => handleGetDetail(user.id)}
              className="btn btn-info ml-2"
            >
              Edit
            </button>
          </td>
        </tr>
      ));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Account</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
});

const mapDispatchToProps = {
  handleSetUser: setUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
