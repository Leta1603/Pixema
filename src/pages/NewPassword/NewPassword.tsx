import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import Input from "src/components/Input";
import FormPagesContainer from "src/components/FormPagesContainer";
import { UserListType } from "src/redux/@type";
import { USERS_DATA } from "src/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "src/components/Router";
import styles from "src/pages/SignUp/SignUp.module.scss";
import classNames from "classnames";
import { HidePasswordIcon, ShowPasswordIcon } from "src/assets/icons";

const NewPassword = () => {
  const { email } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const [isError, setError] = useState({
    passwordField: "",
    confirm: "",
  });

  const [isTouched, setTouched] = useState({
    passwordField: false,
    confirm: false,
  });

  const onChangePassword = (value: string) => {
    setPassword(value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };

  const onChangePasswordConfirm = (value: string) => {
    setConfirmPassword(value);
    setTouched((prevState) => ({ ...prevState, confirm: true }));
  };

  useEffect(() => {
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
  }, [password, confirmPassword, isTouched.passwordField, isTouched.confirm]);

  const isSubmitValid = useMemo(
    () =>
      isTouched.passwordField &&
      isTouched.confirm &&
      password.length &&
      confirmPassword.length &&
      !isError.passwordField.length &&
      !isError.confirm.length,
    [
      password,
      confirmPassword,
      isTouched.passwordField,
      isTouched.confirm,
      isError.confirm,
      isError.passwordField,
    ],
  );

  const onSubmit = () => {
    const users: UserListType[] = JSON.parse(
      localStorage.getItem(USERS_DATA) || "",
    );
    users.forEach((user) => {
      if (user.email === email) {
        user.password = password;
        localStorage.setItem(USERS_DATA, JSON.stringify(users));
        navigate(RoutesList.SignIn);
      }
    });
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
      title={"New password"}
      btnTitle={"Set password"}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      isSubmitDisabled={!isSubmitValid}
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

export default NewPassword;
