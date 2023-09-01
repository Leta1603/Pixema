import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import FormPagesContainer from "src/components/FormPagesContainer";
import Input from "src/components/Input";
import classNames from "classnames";

import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/components/Router";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthSelectors,
  createRequestToken,
} from "src/redux/reducers/authSlice";
import { USERS_DATA } from "src/utils/constants";
import { UserListType } from "src/redux/@type";
import { HidePasswordIcon, ShowPasswordIcon } from "src/assets/icons";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const [isError, setError] = useState({
    name: "",
    email: "",
    passwordField: "",
    confirm: "",
  });

  const [isTouched, setTouched] = useState({
    name: false,
    email: false,
    passwordField: false,
    confirm: false,
  });

  const users = localStorage.getItem(USERS_DATA);
  let usersList: UserListType[] = users ? JSON.parse(users) : [];

  const onChangeName = (value: string) => {
    setName(value);
    setTouched((prevState) => ({ ...prevState, name: true }));
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
    setTouched((prevState) => ({ ...prevState, email: true }));
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };

  const onChangePasswordConfirm = (value: string) => {
    setConfirmPassword(value);
    setTouched((prevState) => ({ ...prevState, confirm: true }));
  };

  const onSignInClick = () => {
    navigate(RoutesList.SignIn);
  };

  useEffect(() => {
    dispatch(createRequestToken());
  }, []);

  useEffect(() => {
    const existingUser = usersList.find(
      (user) => user.username === name || user.email === email,
    );
    if (isTouched.name) {
      if (existingUser) {
        if (existingUser.username === name) {
          setError((prevState) => ({
            ...prevState,
            name: "Username already exists",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            name: "",
          }));
        }
      } else {
        setError((prevState) => ({
          ...prevState,
          name: "",
          email: "",
        }));
      }
    }

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
      if (existingUser) {
        if (existingUser.email === email) {
          setError((prevState) => ({
            ...prevState,
            email: "Email already exists",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            email: "",
          }));
        }
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

    if (isTouched.confirm) {
      if (confirmPassword.length < 8) {
        setError((prevState) => ({
          ...prevState,
          confirm: "Confirm password length should be more than 8 characters",
        }));
      } else if (password !== confirmPassword) {
        setError((prevState) => ({
          ...prevState,
          confirm: "Passwords must match",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          confirm: "",
        }));
      }
    }
  }, [
    name,
    email,
    password,
    confirmPassword,
    isTouched.name,
    isTouched.email,
    isTouched.passwordField,
    isTouched.confirm,
  ]);

  const requestToken = useSelector(AuthSelectors.createRequestToken);

  const isSubmitValid = useMemo(
    () =>
      isTouched.passwordField &&
      isTouched.confirm &&
      isTouched.name &&
      isTouched.email &&
      password.length &&
      email.length &&
      name.length &&
      confirmPassword.length &&
      !isError.passwordField.length &&
      !isError.name.length &&
      !isError.email.length &&
      !isError.confirm.length,
    [
      password,
      confirmPassword,
      email,
      name,
      isTouched.passwordField,
      isTouched.confirm,
      isTouched.name,
      isTouched.email,
      isError.name,
      isError.email,
      isError.confirm,
      isError.passwordField,
    ],
  );

  const onSubmit = () => {
    const newUser: UserListType = {
      username: name,
      password: password,
      email: email,
      isLoggedIn: false,
      session_id: "",
    };

    usersList.push(newUser);
    localStorage.setItem(USERS_DATA, JSON.stringify(usersList));
    const url = `https://www.themoviedb.org/authenticate/${requestToken}`;
    window.open(url, "_blank");
    navigate(`/sign-in?requestToken=${requestToken}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const onIconClick = () => {
    setVisible(!visible);
  };

  return (
    <FormPagesContainer
      title={"Sign Up"}
      btnTitle={"Sign Up"}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      isSubmitDisabled={!isSubmitValid}
      additionalInfo={
        <div className={classNames(styles.additionalInfo)}>
          {`Already have an account?`}&nbsp;&nbsp;
          <span onClick={onSignInClick} className={styles.signIn}>
            Sign In
          </span>
        </div>
      }
    >
      <Input
        title={"Name"}
        placeholder={"Your name"}
        onChange={onChangeName}
        value={name}
        errorText={isError.name}
      />
      <Input
        title={"Email"}
        placeholder={"Your email"}
        onChange={onChangeEmail}
        value={email}
        errorText={isError.email}
      />
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
      <Input
        title={"Confirm Password"}
        placeholder={"Confirm password"}
        onChange={onChangePasswordConfirm}
        value={confirmPassword}
        type={visible ? "text" : "password"}
        errorText={isError.confirm}
      />
    </FormPagesContainer>
  );
};

export default SignUp;
