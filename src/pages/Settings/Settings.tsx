import React, { useEffect, useMemo, useState } from "react";

import styles from "./Settings.module.scss";
import Input from "src/components/Input";
import classNames from "classnames";
import { HidePasswordIcon, ShowPasswordIcon } from "src/assets/icons";
import Button from "src/components/Button";
import { ButtonTypes, Theme } from "src/@types";
import { ACTIVE_USER_DATA, USERS_DATA } from "src/utils/constants";
import { UserListType } from "src/redux/@type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChanged } from "src/redux/reducers/authSlice";
import { useThemeContext } from "src/context/Theme";
import ThemeSwitcher from "src/components/ThemeSwitcher";

const Settings = () => {
  let activeUser: UserListType = JSON.parse(
    localStorage.getItem(ACTIVE_USER_DATA) || "",
  );

  let usersList: UserListType[] = JSON.parse(
    localStorage.getItem(USERS_DATA) || "",
  );

  const { themeValue } = useThemeContext();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(activeUser.username);
  const [email, setEmail] = useState(activeUser.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [isError, setError] = useState({
    name: "",
    email: "",
    newPasswordField: "",
    passwordField: "",
    confirm: "",
  });

  const [isTouched, setTouched] = useState({
    name: true,
    email: true,
    newPasswordField: false,
    passwordField: false,
    confirm: false,
  });

  useEffect(() => {
    dispatch(setChanged(isChanged));
  }, [isChanged]);

  const onChangeName = (value: string) => {
    setName(value);
    if (value) {
      setTouched((prevState) => ({ ...prevState, name: true }));
    } else {
      setTouched((prevState) => ({ ...prevState, name: false }));
    }
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
    if (value) {
      setTouched((prevState) => ({ ...prevState, email: true }));
    } else {
      setTouched((prevState) => ({ ...prevState, email: false }));
    }
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };

  const onChangeNewPassword = (value: string) => {
    setNewPassword(value);
    setTouched((prevState) => ({ ...prevState, newPasswordField: true }));
  };

  const onChangePasswordConfirm = (value: string) => {
    setConfirmPassword(value);
    setTouched((prevState) => ({ ...prevState, confirm: true }));
  };

  const onIconClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const existingUser = usersList.find(
      (user) => user.username === name || user.email === email,
    );
    if (isTouched.name && activeUser.username !== name) {
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
      } else if (existingUser && activeUser.email !== email) {
        if (existingUser.email === email) {
          setError((prevState) => ({
            ...prevState,
            email: "Email already exists",
          }));
        }
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
      } else if (activeUser.password !== password) {
        setError((prevState) => ({
          ...prevState,
          passwordField: "Invalid password",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          passwordField: "",
        }));
      }
    }

    if (isTouched.newPasswordField) {
      if (newPassword.length < 8) {
        setError((prevState) => ({
          ...prevState,
          newPasswordField: "Password length should be more than 8 characters",
        }));
      } else if (activeUser.password === newPassword) {
        setError((prevState) => ({
          ...prevState,
          newPasswordField: "You have entered an existing password",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          newPasswordField: "",
        }));
      }
    }

    if (isTouched.confirm) {
      if (confirmPassword.length < 8) {
        setError((prevState) => ({
          ...prevState,
          confirm: "Confirm password length should be more than 8 characters",
        }));
      } else if (newPassword !== confirmPassword) {
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
    newPassword,
    confirmPassword,
    isTouched.name,
    isTouched.email,
    isTouched.passwordField,
    isTouched.newPasswordField,
    isTouched.confirm,
  ]);

  const isSubmitValid = useMemo(
    () =>
      isTouched.name &&
      isTouched.email &&
      email.length &&
      name.length &&
      !isError.passwordField.length &&
      !isError.name.length &&
      !isError.email.length &&
      !isError.confirm.length &&
      !isError.newPasswordField.length,
    [
      email,
      name,
      isTouched.name,
      isTouched.email,
      isTouched.passwordField,
      isTouched.confirm,
      isTouched.newPasswordField,
      isError.name,
      isError.email,
      isError.confirm,
      isError.passwordField,
      isError.newPasswordField,
    ],
  );

  const onSubmit = () => {
    usersList.forEach((user) => {
      if (
        user.username === activeUser.username &&
        user.email === activeUser.email
      ) {
        if (isTouched.name) {
          user.username = name;
          activeUser.username = name;
        }
        if (isTouched.email) {
          user.email = email;
          activeUser.email = email;
        }
        if (
          isTouched.passwordField &&
          isTouched.newPasswordField &&
          isTouched.confirm
        ) {
          user.password = newPassword;
          activeUser.password = newPassword;
        }
        localStorage.setItem(ACTIVE_USER_DATA, JSON.stringify(activeUser));
        localStorage.setItem(USERS_DATA, JSON.stringify(usersList));
        toast.success("User data changed", {
          autoClose: 2000,
          theme: "dark",
        });
        setIsChanged(!isChanged);
      }
    });
  };

  return (
    <div className={styles.settingContainer}>
      <div className={styles.item}>
        <div
          className={classNames(styles.title, {
            [styles.lightTitle]: themeValue === Theme.Light,
          })}
        >
          Profile
        </div>
        <div
          className={classNames(styles.inputsContainer, {
            [styles.lightInputsContainer]: themeValue === Theme.Light,
          })}
        >
          <Input
            title={"Name"}
            placeholder={"Your name"}
            onChange={onChangeName}
            value={name}
          />
          <Input
            title={"Email"}
            placeholder={"Your email"}
            onChange={onChangeEmail}
            value={email}
            errorText={isError.email}
          />
        </div>
      </div>
      <div className={styles.item}>
        <div
          className={classNames(styles.title, {
            [styles.lightTitle]: themeValue === Theme.Light,
          })}
        >
          Password
        </div>
        <div
          className={classNames(styles.passwordsContainer, {
            [styles.lightPasswordsContainer]: themeValue === Theme.Light,
          })}
        >
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
          <div className={styles.passwordsLeft}>
            <Input
              title={"New password"}
              placeholder={"New password"}
              onChange={onChangeNewPassword}
              value={newPassword}
              type={visible ? "text" : "password"}
              errorText={isError.newPasswordField}
            />

            <Input
              title={"Confirm Password"}
              placeholder={"Confirm password"}
              onChange={onChangePasswordConfirm}
              value={confirmPassword}
              type={visible ? "text" : "password"}
              errorText={isError.confirm}
            />
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <div
          className={classNames(styles.title, {
            [styles.lightTitle]: themeValue === Theme.Light,
          })}
        >
          Color mode
        </div>
        <div
          className={classNames(styles.colorWrap, {
            [styles.lightColorWrap]: themeValue === Theme.Light,
          })}
        >
          <div
            className={classNames(styles.colorText, {
              [styles.lightColorText]: themeValue === Theme.Light,
            })}
          >
            <div>{themeValue === Theme.Light ? "Light" : "Dark"}</div>
            <div className={classNames(styles.colorUseText, {
              [styles.lightColorUseText]: themeValue === Theme.Light,
            })}>
              Use {themeValue === Theme.Light ? "light" : "dark"} theme
            </div>
          </div>
          {/*Доделать*/}
          {/*<SwitchComponent />*/}
          <ThemeSwitcher />
        </div>
      </div>
      <div className={styles.settingsBtns}>
        <Button
          type={ButtonTypes.Secondary}
          title={"Cancel"}
          onClick={() => {}}
        />
        <Button
          type={ButtonTypes.Primary}
          title={"Save"}
          onClick={onSubmit}
          disabled={!isSubmitValid}
        />
      </div>
    </div>
  );
};

export default Settings;
