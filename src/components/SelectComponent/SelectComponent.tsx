import React, { FC } from "react";
import Select, { OnChangeValue } from "react-select";

import { OptionsType, OptionType, SelectProps } from "../../@types";

import "./SelectComponent.scss";

// import styles from "./SelectComponent.module.scss";

const SelectComponent: FC<SelectProps> = ({
  title,
  placeholder,
  options,
  components,
  value,
  onChange,
  isMulti,
  isDisabled,
}) => {
  const getValue = () => {
    if (value) {
      return isMulti
        ? options.filter((option) => value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === value);
    }
  };

  const onSelectChange = (newValue: OnChangeValue<OptionType, boolean>) => {
    onChange(
      isMulti
        ? (newValue as OptionsType).map((option) => option.value)
        : newValue
        ? (newValue as OptionType).value
        : "",
    );
  };

  return (
    <div>
      <label htmlFor="select" className={"label"}>{title}</label>
      <Select
        id={"select"}
        options={options}
        components={components}
        value={getValue()}
        onChange={onSelectChange}
        closeMenuOnSelect={isMulti && false}
        escapeClearsValue
        placeholder={placeholder}
        isClearable
        isMulti={isMulti}
        isDisabled={isDisabled}
        classNamePrefix={"custom-select"}
      />
    </div>
  );
};

export default SelectComponent;
