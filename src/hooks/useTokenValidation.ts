import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authClient, serverAuth } from "../services";
import { RegisterResponseSuccess, RootState } from "../types";
import toast from "react-hot-toast";
import { jwtUtil } from "../utils";
import { ACCESS_TOKEN_NAME } from "../constant";

const useTokenValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isUserLogin = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
  const userName = useSelector((state: RootState) => state.auth.user?.fullName);

  useEffect(() => {
    const validateTokens = async () => {
      setIsLoading(true);

      try {
        if (isUserLogin && accessToken && refreshToken) {
          const successResponse = await serverAuth.isTokenValid();

          if (successResponse) {
            toast.success(`Welcome ${userName}`);
          } else {
            await validateWithRefreshToken(refreshToken);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Access Token expired" && refreshToken) {
            await validateWithRefreshToken(refreshToken);
          } else {
            toast.error(error.message);
            authClient.logout();
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    const validateWithRefreshToken = async (token: string) => {
      try {
        const userDataWithNewAccessToken: RegisterResponseSuccess | null = await serverAuth.generateAnotherAccessToken(token);

        if (userDataWithNewAccessToken?.tokens?.accessToken) {
          jwtUtil.storeToken(ACCESS_TOKEN_NAME, userDataWithNewAccessToken.tokens.accessToken);
        } else {
          authClient.logout();
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          authClient.logout();
        }
      }
    };

    validateTokens();
  }, [isUserLogin, accessToken, refreshToken, userName]);

  return { isLoading, setIsLoading };
};

export default useTokenValidation;
