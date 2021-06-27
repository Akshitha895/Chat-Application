import { createAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  users: [],
  posts: [],
  selectedUser: {},
};

const getUsers = createAction("users/getUsers");
const getUserPosts = createAction("users/getPosts");
const addUserPost = createAction("users/addPosts");

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setUserPosts(state, action) {
      state.posts = action.payload;
    },
    reset(state, action) {
      state.users = [];
      state.posts = [];
      state.selectedUser = {};
    },
  },
});

export { getUsers, getUserPosts, addUserPost };

export const { reducer, actions } = usersSlice;
