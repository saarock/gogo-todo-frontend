import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authClient, serverAuth } from "../services";
import { RegisterResponseSuccess, RootState } from "../types";
import toast from "react-hot-toast";
import { jwtUtil } from "../utils";
import { ACCESS_TOKEN_NAME } from "../constant";
const useTokenValidation = () => {
  const isUserLogin = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken
  );
  const userName = useSelector((state: RootState) => state.auth.user?.fullName);
  useEffect(() => {
    async function validateWithRefreshToken(refreshToken: string) {
      try {
    
        const userDataWithNewAccessToken: RegisterResponseSuccess | null =
          await serverAuth.generateAnotherAccessToken(refreshToken);
        if (userDataWithNewAccessToken === null) {
          authClient.logout();
          return;
        }
        if (
          userDataWithNewAccessToken.tokens?.accessToken === undefined ||
          userDataWithNewAccessToken === null
        ) {
          authClient.logout();
          return;
        }

        // along withe accessToken whole user data with refreshTokens also comes but for now i only user the accessToken

        jwtUtil.storeToken(
          ACCESS_TOKEN_NAME,
          userDataWithNewAccessToken.tokens?.accessToken
        );
        // window.location.reload();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
          console.error(error.message);
          authClient.logout();
        }
      }
    }

    (async () => {
      try {
        if (isUserLogin && accessToken && refreshToken) {
          const successResponse = await serverAuth.isTokenValid();
          if (successResponse) {
            toast.success("Welcome  " + userName);
          } else {
            await validateWithRefreshToken(refreshToken);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Access Token expired" && refreshToken) {
            await validateWithRefreshToken(refreshToken);
            return;
          }
          console.log(error.message);
          toast.error(error.message);
        }

        authClient.logout();
      }
    })();
  }, [isUserLogin]);
};

export default useTokenValidation;
