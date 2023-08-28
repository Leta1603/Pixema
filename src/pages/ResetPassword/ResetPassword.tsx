import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import FormPagesContainer from "src/components/FormPagesContainer";
import Input from "src/components/Input";

import styles from "./ResetPassword.module.scss";
import { UserListType } from "src/redux/@type";
import { USERS_DATA } from "src/utils/constants";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSent, setSent] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isError, setError] = useState({
    email: "",
  });

  const [isTouched, setTouched] = useState({
    email: false,
  });

  const onChangeEmail = (value: string) => {
    setEmail(value);
    setTouched((prevState) => ({ ...prevState, email: true }));
  };

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
  }, [email, isTouched.email]);

  const isSubmitValid = useMemo(
    () => isTouched.email && email.length && !isError.email.length,
    [isTouched.email, isError.email],
  );

  const onSubmit = () => {
    const users: UserListType[] = JSON.parse(
      localStorage.getItem(USERS_DATA) || "",
    );
    users.forEach((user) => {
      if (user.email === email) {
        setSent(true);
        setLoginError("");
        navigate(`/newPassword/${email}`);
      } else {
        setLoginError("There is no user with this email");
      }
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <FormPagesContainer
      title={"Reset password"}
      btnTitle={"Reset"}
      isSubmitDisabled={!isSubmitValid}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      className={styles.fieldsContainer}
    >
      <div>
        {isSent &&
          `You will receive an email ${email} with a link to reset your password!`}
      </div>
      <Input
        title={"Email"}
        placeholder={"Your email"}
        onChange={onChangeEmail}
        value={email}
        errorText={isError.email}
      />
      <div className={styles.loginError}>{loginError && `${loginError} `}</div>
    </FormPagesContainer>
  );
};

export default ResetPassword;
