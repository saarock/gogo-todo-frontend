import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { act, ReducerState } from "react";
import { AuthState, LoginPayload, UserNewNameAndId } from "../types";
import userService from "../services/userService";
import { localStore } from "../utils";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};



export const updateFullName = createAsyncThunk(
  "changeFUllName",
  async (boardIdAndProjectIndex: UserNewNameAndId, thunkAPI) => {
    try {
  const user =  await userService.changeUserFullName(boardIdAndProjectIndex.id, boardIdAndProjectIndex.fullName);
  localStore.updateFullName(user.fullName);
  return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error
        ? error.message
        : "Error while updating the user FullName"
    );
  }
  }

)




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
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    userGitUserNameChange: (state, action :PayloadAction<string>) => {
      state.user.userGithubUserName = action.payload;
      localStore.updateGitUserName(action.payload);
    }


    }
    ,
    extraReducers: (builder) => {
      builder.addCase(updateFullName.fulfilled, (state,action) => {
        if (!action.payload) throw new Error("Something wrong while updating the user fullname try again")
          if (state.user) {
          state.user.fullName = action.payload.fullName
          }
      });
      builder.addCase(updateFullName.rejected, (state,action) => {
        throw new Error(
          action.payload
            ? action.payload.toString()
            : "Sorry can't update the user FullName try again"
        );  
    })
    }
  },

 );


export const { login, logout, userGitUserNameChange } = authSlice.actions;

export default authSlice.reducer;
