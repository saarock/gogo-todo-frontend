import React, { useState } from "react";
import  {Button, Input} from "../../components"
import { useForm } from "react-hook-form";
import "./login.css";
import serverAuth from "../../services/authServer";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [loginButtonText, setLoginButtonText] = useState("login");
  const [isloginButtonDisable, setLoginButtonDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function login(formData:any) {
    setLoginButtonText("Processing...");
    setLoginButtonDisable(true);
    const { email, password } = formData;
    serverAuth.login(email, password);
  }

  return (
    <div className="login__page">
      <form className="gogo__form" onSubmit={handleSubmit(login)}>
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
      </form>
    </div>
  );
};

export default LoginPage;
