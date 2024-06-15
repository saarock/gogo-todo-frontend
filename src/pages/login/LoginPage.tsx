import React, { useState } from "react";
import { Button, Input, LoginAndRegisterSideDiv } from "../../components"
import { useForm } from "react-hook-form";
import "./login.css";
import serverAuth from "../../services/authServer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtUtil, localStore } from "../../utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN__NAME, USER_LOCALSTORAGE_DATA_NAME } from "../../constant";
import { login as Login } from "../../features/authSlice";
import { motion } from "framer-motion"

const LoginPage = () => {
  const [loginButtonText, setLoginButtonText] = useState<string>("login");
  const [isloginButtonDisable, setLoginButtonDisable] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function login(formData: any) {
    try {
      setLoginButtonText("Processing...");
      setLoginButtonDisable(true);
      const { email, password } = formData;
      const userResponseData = await serverAuth.login(email, password);
      if (!userResponseData) {
        throw new Error("Something went wrong, try again");
      }

      console.log("userResponseData:", userResponseData); // Debugging: Log the response

      if (userResponseData.type === "error") {
        throw new Error(userResponseData.message);
      } else if (userResponseData.type === "success") {

        if (!userResponseData.user || !userResponseData.tokens) {
          throw new Error("Invalid response structure");
        }

        const isAccessTokenSaved = jwtUtil.storeToken(ACCESS_TOKEN_NAME, userResponseData.tokens.accessToken);
        const isRefreshTokenSaved = jwtUtil.storeToken(REFRESH_TOKEN__NAME, userResponseData.tokens.refreshToken);

        if (isAccessTokenSaved && isRefreshTokenSaved) {
          dispatch(Login({ user: userResponseData.user, refreshToken: userResponseData.tokens.refreshToken, accessToken: userResponseData.tokens.accessToken }));
          localStore.setData(USER_LOCALSTORAGE_DATA_NAME, userResponseData.user);
        }
      }

      navigate("/dash");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("UnKnown message")
      }
      reset();
      setLoginButtonText("login");
      setLoginButtonDisable(false);
    }
  }

  return (
    <div className="login__page" 
    >
      <LoginAndRegisterSideDiv />
      <motion.form className="gogo__form" onSubmit={handleSubmit(login)}  whileHover={{ scale: 1.1 }} >
        <div className="gogo__form__inputs">
          <label htmlFor="email">Email</label>
          <br />
          {errors.email && (
            <p className="gogo__error__message">
              {errors.email.message + "***"}
            </p>
          )}
          <Input
            className="gogo__form__inputs__input"
            type="email"
            placeholder="email..."
            {...register("email", {
              required: "Email is requried!",
            })}
          />
        </div>
        <div className="gogo__form__inputs">
          <label htmlFor="password">Password</label>
          <br />
          {errors.password && (
            <p className="gogo__error__message">
              {errors.password.message + "***"}
            </p>
          )}
          <Input
            className="gogo__form__inputs__input"
            type="password"
            placeholder="password..."
            {...register("password", {
              required: "Password is required!",
            })}
          />
        </div>
        <div className="gogo__form__button">
          <Button
            text={loginButtonText}
            className="gogo__form__button__login__and__register__button"
            type="submit"
            disabled={isloginButtonDisable}
          />
        </div>
        <p>
          Forget Password ?{" "}
          <i>
            <strong>
              <Link to="/register">Reset password</Link>
            </strong>
          </i>

        </p>
        <p>
          Don't have Account ?{" "}
          <i>
            <strong>
              <Link to="/register">Register</Link>
            </strong>
          </i>

        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
