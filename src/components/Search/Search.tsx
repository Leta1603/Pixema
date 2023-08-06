import React, { FC, useState } from "react";
import classNames from "classnames";
import Input from "../Input";
import { FilterIcon } from "../../assets/icons";

import styles from "./Search.module.scss";

type Search = {
  disabled?: boolean;
  className?: string;
};
const Search: FC<Search> = ({ disabled, className }) => {
  const [input, setInput] = useState("");
  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.disabled]: disabled,
        },
        className,
      )}
    >
      <Input
        className={styles.searchInput}
        placeholder={"Search"}
        onChange={setInput}
        value={input}
      />
      <div className={styles.icon} onClick={() => console.log("1")}>
        {disabled ? <FilterIcon fill={"#AFB2B6"} /> : <FilterIcon />}
      </div>
    </div>
  );
};

export default Search;
