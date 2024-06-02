import { useEffect, useState } from "react";
import { Input, Button } from "../../components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./register.css";
import serverAuth from "../../services/authServer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import Toast from "../../components/toast/Toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [registerButtonText, setRegisterButtonText] =
    useState<string>("Register");
  const [isRegisterButtonDisable, setRegisterButtonDisable] =
    useState<boolean>(false);
  const [isOtpSend, setIsOtpSend] = useState<boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(6);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isOtpSend) {
      return;
    }

    const decrementTime = () => {
      setRemainingTime((prevTime) => prevTime - 1);
    };

    const interval = setInterval(() => {
      decrementTime();
    }, 1000); // 1000 milliseconds = 1 second

    if (remainingTime === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isOtpSend, remainingTime]);

  /**
   *
   * @param data userForm data
   * method to send the otp
   */
  const sendOtp: SubmitHandler<FieldValues> = async (data): Promise<void> => {
    setRegisterButtonText("Processing...");
    setRegisterButtonDisable(true);
    const responseMessage = await serverAuth.sendMailForOtp(data.email);
    if (responseMessage.type == "success") {
      setIsOtpSend(true);
      setRegisterButtonDisable(false);
      setRegisterButtonText("send");
    }
  };

  /**
   *
   * @param data userForm data
   * Method for register the user after user verify the otp
   */

  const signup: SubmitHandler<FieldValues> = async (data): Promise<void> => {

    if (!data.otp && remainingTime === 0) {
      setIsOtpSend(false);
      setRemainingTime(6);
      sendOtp(data);
      return;
    }

    if (!data.otp) {
      alert("Otp required")
      return;
    }

    if (remainingTime === 0) {
      setIsOtpSend(false);
      setRemainingTime(6);

      sendOtp(data);
      return;
    }
    setRegisterButtonText("Processing...");
    setRegisterButtonDisable(true);
    const userData = await serverAuth.register(data);
    dispatch(
      login({ user: userData, refreshToken: "da", accessToken: "daefd" })
    );

    setIsUserLoggedIn(true);
    navigate("/dash");
  };

  return (
    <div className="register__page flex items-center justify-center">
      <form
        className="gogo__form"
        onSubmit={isOtpSend ? handleSubmit(signup) : handleSubmit(sendOtp)}
      >
        <div className="gogo__form__inputs">
          <label htmlFor="fullName">Full Name</label>
          <br />
          {errors.fullName && (
            <p className="gogo__error__message">
              {errors.fullName.message + "***"}
            </p>
          )}
          <Input
            className="gogo__form__inputs__input"
            type="text"
            placeholder="Full Name..."
            disabled={isOtpSend}
            {...register("fullName", { required: "Full Name is required" })}
          />
        </div>
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
            placeholder="Email..."
            disabled={isOtpSend}
            {...register("email", { required: "Email is required" })}
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
            placeholder="Password..."
            disabled={isOtpSend}
            {...register("password", { required: "Password is required" })}
          />
        </div>

        {isOtpSend ? (
          <div className="gogo__form__inputs">
            <label htmlFor="password">Send Otp</label>
            <br />
            {errors.password && (
              <p className="gogo__error__message">
                {errors.otp?.message + "***"}
              </p>
            )}
            <Input
              className="gogo__form__inputs__input"
              type="text"
              placeholder="Provide Otp..."
              disabled={!isOtpSend}
              {...register("otp")}
            />
          </div>
        ) : (
          ""
        )}

        <div className="gogo__form__button">
          <Button
            text={
              registerButtonText === "send" && remainingTime > 0
                ? registerButtonText + "   " + remainingTime
                : remainingTime === 0
                ? "Resend otp"
                : registerButtonText
            }
            className={`gogo__form__button__login__and__register__button ${
              isRegisterButtonDisable
                ? "gogo__form__button__login__and__register__button__make__not__clickable"
                : ""
            }`}
            type={"submit"}
            disabled={isRegisterButtonDisable}
          />
        </div>
        <p>
          Already have Account ?{" "}
          <i>
          <strong>
            <Link to="/login">Login</Link>
          </strong>
          </i>

        </p>
      </form>

      {/* toast */}
      {isUserLoggedIn ? (
        <Toast message="Welcome and Enjoy thanks for joining us!" />
      ) : (
        ""
      )}

      {isOtpSend ? (
        <Toast message="Otp is send to your mail pleased enter the Otp under 1 minute" />
      ) : (
        ""
      )}
    </div>
  );
};

export default RegisterPage;
