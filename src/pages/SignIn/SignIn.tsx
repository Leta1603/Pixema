import React, { useEffect, useMemo, useState, KeyboardEvent } from "react";
import FormPagesContainer from "src/components/FormPagesContainer";
import classNames from "classnames";

import styles from "./SignIn.module.scss";
import Input from "src/components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutesList } from "src/components/Router";
import { useDispatch } from "react-redux";
import { createSession } from "src/redux/reducers/authSlice";
import { ACTIVE_USER_DATA, SESSION_ID, USERS_DATA } from "src/utils/constants";
import { UserListType } from "src/redux/@type";
import { HidePasswordIcon, ShowPasswordIcon } from "src/assets/icons";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isError, setError] = useState({
    email: "",
    passwordField: "",
  });

  const [isTouched, setTouched] = useState({
    email: false,
    passwordField: false,
  });

  const onSignUpClick = () => {
    navigate(RoutesList.SignUp);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestToken = searchParams.get("request_token");

  const onChangeEmail = (value: string) => {
    setEmail(value);
    setTouched((prevState) => ({ ...prevState, email: true }));
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };

  useEffect(() => {
    if (requestToken) {
      dispatch(createSession(requestToken));
    }
  }, []);

  useEffect(() => {
    if (isTouched.email) {
      const regex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (!regex.test(email)) {
        setError((prevState) => ({
          ...prevState,
          email: "Invalid email format",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
    }

    if (isTouched.passwordField) {
      if (password.length < 8) {
        setError((prevState) => ({
          ...prevState,
          passwordField: "Password length should be more than 8 characters",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          passwordField: "",
        }));
      }
    }
  }, [email, password, isTouched.email, isTouched.passwordField]);

  const isSubmitValid = useMemo(
    () =>
      isTouched.passwordField &&
      isTouched.email &&
      password.length &&
      email.length &&
      !isError.passwordField.length &&
      !isError.email.length,
    [
      password,
      isTouched.passwordField,
      isTouched.email,
      isError.email,
      isError.passwordField,
    ],
  );

  const onSubmit = () => {
    const users = localStorage.getItem(USERS_DATA);
    if (users) {
      let usersList: UserListType[] = JSON.parse(users);
      let isLoginSuccessful = false;
      usersList.map((user, index) => {
        if (user.email === email && user.password === password) {
          isLoginSuccessful = true;
          usersList[index].isLoggedIn = true;
          const sessionId = localStorage.getItem(SESSION_ID);
          if (sessionId) {
            usersList[index].session_id = sessionId;
            user.session_id = sessionId;
            localStorage.removeItem(SESSION_ID);
          }
          localStorage.setItem(USERS_DATA, JSON.stringify(usersList));
          localStorage.setItem(ACTIVE_USER_DATA, JSON.stringify(user));
          return user;
        }
      });
      if (isLoginSuccessful) {
        setLoginError("");
        const activeUserJSON = localStorage.getItem(ACTIVE_USER_DATA);
        if (activeUserJSON) {
          navigate(RoutesList.Home);
          document.location.reload();
        } else {
          localStorage.removeItem(ACTIVE_USER_DATA);
        }
      } else {
        setLoginError("There is no user with such data");
      }
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const onForgotPasswordClick = () => {
    navigate(RoutesList.ResetPassword);
  };

  const onIconClick = () => {
    setVisible(!visible);
  };

  return (
    <FormPagesContainer
      title={"Sign In"}
      btnTitle={"Sign In"}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      isSubmitDisabled={!isSubmitValid}
      additionalInfo={
        <div className={styles.additionalInfo}>
          {"Don’t have an account?"}&nbsp;&nbsp;
          <span onClick={onSignUpClick} className={styles.signUp}>
            Sign Up
          </span>
        </div>
      }
    >
      <Input
        title={"Email"}
        placeholder={"Your email"}
        onChange={onChangeEmail}
        value={email}
        errorText={isError.email}
      />
      <div>
        <div className={styles.containerInputAndIcon}>
          <Input
            title={"Password"}
            placeholder={"Your password"}
            onChange={onChangePassword}
            value={password}
            type={visible ? "text" : "password"}
            errorText={isError.passwordField}
          />
          <div
            onClick={onIconClick}
            className={classNames(styles.icon, {
              [styles.iconError]: isError.passwordField,
            })}
          >
            {visible ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </div>
        </div>
        <div
          className={classNames(styles.forgotPassword)}
          onClick={onForgotPasswordClick}
        >
          Forgot password?
        </div>
        {loginError && <div className={styles.error}>{loginError}</div>}
      </div>
    </FormPagesContainer>
  );
};

export default SignIn;
