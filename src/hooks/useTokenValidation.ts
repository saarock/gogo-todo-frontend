import { useEffect } from "react";
import { useSelector } from "react-redux";
import { serverAuth } from "../services";
import { RootState } from "../types";

const useTokenValidation = () => {
  const isUserLogin = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const accessToken = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  useEffect(() => {
    isTokenValidate();

    async function isTokenValidate() {
      if (isUserLogin && accessToken) {
        await serverAuth.isTokenValid(accessToken);
      }
    }

  
  }, []);
};

export default useTokenValidation;
