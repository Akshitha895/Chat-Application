import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

const selectDomain = (state) => state.users || initialState;

export const selectUsers = createSelector([selectDomain], (users) => users);
