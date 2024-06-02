import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ReducerState } from "react";
import { AuthState, LoginPayload } from "../types";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { user, refreshToken, accessToken } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      (state.user = null), (state.accessToken = null);
      state.refreshToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
