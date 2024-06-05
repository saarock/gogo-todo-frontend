import React, { useEffect } from "react";
import { jwtUtil, localStore } from "../utils";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN__NAME,
  USER_LOCALSTORAGE_DATA_NAME,
} from "../constant";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/authSlice";

const useWhenPageMount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = localStore.getData(USER_LOCALSTORAGE_DATA_NAME);
    const refreshToken = jwtUtil.getToken(REFRESH_TOKEN__NAME);
    const accessToken = jwtUtil.getToken(ACCESS_TOKEN_NAME);
  
    if (userData && accessToken && refreshToken) {
      dispatch(
        login({
          user: userData,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    } else {
      dispatch(logout())
      //Clear all the cache
    }
  }, []);
};

export default useWhenPageMount;
