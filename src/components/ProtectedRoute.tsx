import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChildrenProps, RootState } from "../types";

const ProtectedRoute: React.FC<ChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate("/login");
    }
  }, [isUserAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
