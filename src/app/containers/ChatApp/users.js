import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";
import styled from "styled-components/macro";
import { selectUsers } from "../../../store/ducks/chatApp/selector";
import {
  actions,
  getUserPosts,
  getUsers,
} from "../../../store/ducks/chatApp/slice";

function UserList() {
  const dispatch = useDispatch();
  const { users, selectedUser } = useSelector(selectUsers);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [formData, setFormData] = useState();

  useEffect(() => {
    //Fetching the users list
    dispatch(getUsers());
    return () => {
      // Reset Store state on unmount
      dispatch(actions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    //Fetching selected user's post
    if (Object.keys(selectedUser)?.length) dispatch(getUserPosts());
  }, [dispatch, selectedUser]);

  const onItemSelect = ({ id, username }) => {
    // add active class to selected item and remove it on sibilings
    const selectedUserEle = document.getElementById(`${username}_${id}`);
    [...selectedUserEle.parentElement.children].forEach((sib) =>
      sib.classList.remove("listActive")
    );
    selectedUserEle.classList.add("listActive");
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    // Using store state to add users as post users call is not in https://jsonplaceholder.typicode.com/
    dispatch(
      actions.setUsers([...users, { id: users.length - 1, ...formData }])
    );
    setIsAddUserOpen(false);
  };

  return (
    <UserListDiv>
      <div id="user-heading">
        <h4>Users</h4>
        <Button onClick={() => setIsAddUserOpen(true)}>Add user</Button>
      </div>
      <ul id="usersList" className="custom-scrollbar">
        {users?.map((user, i) => {
          const { id, name, username } = user;
          return (
            <li
              key={`${username}_${i}`}
              className=""
              id={`${username}_${id}`}
              onClick={() => {
                dispatch(actions.setSelectedUser(user));
                onItemSelect(user);
              }}
            >
              <img src="img/userFilled.png" alt="" />
              {name}
            </li>
          );
        })}
      </ul>
      {isAddUserOpen && (
        <Modal
          css={`
            .modal-content {
              width: inherit;
            }
            input {
              margin: 5px 0;
            }
          `}
          centered
          isOpen={isAddUserOpen}
          toggle={() => setIsAddUserOpen(false)}
        >
          <ModalHeader toggle={() => setIsAddUserOpen(false)}>
            Add New User
          </ModalHeader>
          <ModalBody
            css={`
              button {
                background: #0b9fe5 !important;
                float: right;
              }
            `}
          >
            <form action={onSubmit} method="post" id="addUser">
              <label htmlFor="username">UserName</label>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={handleChange}
              />
              <label htmlFor="name">Full Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
              />
              <Button onClick={onSubmit}>Add</Button>
            </form>
          </ModalBody>
        </Modal>
      )}
    </UserListDiv>
  );
}

export default UserList;

const UserListDiv = styled.div`
  width: 30%;
  color: #103195;
  border-right: 1px solid grey;

  #user-heading {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  ul {
    margin: 0;
    padding: 0 !important;
    height: calc(80vh - 80px);
    overflow-y: auto;
  }

  li {
    cursor: pointer;
    padding: 10px 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    :hover {
      box-shadow: 0 2px 7px -4px rgba(0, 0, 0, 0.5);
    }
    img {
      margin-right: 10px;
    }
  }
  .listActive {
    background-color: #add8e67d;
  }
`;
