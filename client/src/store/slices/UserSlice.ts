"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  passages: string[];
  token: string | null;
}

const initialState: User = {
  name: "",
  email: "",
  passages: [],
  token: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      return { ...initialState };
    },
    login: (state, action: PayloadAction<User>) => {
      return { ...action.payload };
    },
  },
});

export const { logout, login } = UserSlice.actions;

export default UserSlice;
