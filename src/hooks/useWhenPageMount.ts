import React, {useEffect, useState} from "react";
import { jwtUtil, localStore } from "../utils";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN__NAME,
  USER_LOCALSTORAGE_DATA_NAME,
} from "../constant";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/authSlice";
import { authClient } from "../services";
import { Project, User } from "../types";

const useWhenPageMount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      try {
        setIsLoading(true)
        const userData: User | null | Project[] = localStore.getData(
            USER_LOCALSTORAGE_DATA_NAME
        );
        const refreshToken = jwtUtil.getToken(REFRESH_TOKEN__NAME);
        const accessToken = jwtUtil.getToken(ACCESS_TOKEN_NAME);

        if (userData && !Array.isArray(userData) && accessToken && refreshToken) {
          dispatch(
              login({
                user: userData as User,
                accessToken: accessToken,
                refreshToken: refreshToken,
              })
          );
        } else {
          dispatch(logout());
          authClient.logout();
        }
      } catch (error) {

      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  localStore.updateIsMore(true)
  return {isLoading, setIsLoading}
};

export default useWhenPageMount;
