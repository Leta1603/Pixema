import React, { FC, useMemo, useState } from "react";

import styles from "./Username.module.scss";
import { ArrowDownIcon, ArrowRightIcon, UserIcon } from "../../assets/icons";

type UsernameProps = {
  username: string;
};

const Username: FC<UsernameProps> = ({ username }) => {
  const [isOpened, setOpened] = useState(false);

  const handleMenuOpened = () => {
    setOpened(!isOpened);
  };

  const dropDownList = [
    { title: "Edit profile", onClick: () => {} },
    { title: "Log Out", onClick: () => {} },
  ];

  let usernameArray: string[];
  if (username) {
    usernameArray = username.replace(/\s+/g, " ").trim().split(" ");
  } else {
    usernameArray = [];
  }

  return (
    <div className={styles.container} onClick={handleMenuOpened}>
      <div className={styles.initials}>
        {usernameArray.length > 0 ? (
          usernameArray.length > 1 ? (
            `${usernameArray[0][0].toUpperCase()}${usernameArray[1][0].toUpperCase()}`
          ) : (
            `${usernameArray[0][0].toUpperCase()}`
          )
        ) : (
          <UserIcon />
        )}
      </div>
      <div className={styles.username}>
        {username ? `${username}` : "Sign In"}
      </div>
      <div className={styles.icon}>
        {!isOpened ? <ArrowRightIcon /> : <ArrowDownIcon />}
      </div>

      {isOpened && (
        <div className={styles.list}>
          {dropDownList.map(({ title, onClick }, index) => {
            return <div className={styles.item} onClick={onClick} key={index}>{title}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Username;
