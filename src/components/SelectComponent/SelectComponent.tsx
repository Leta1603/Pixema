import React, { FC } from "react";
import Select, { OnChangeValue } from "react-select";
import classNames from "classnames";

import { OptionsType, OptionType, SelectProps, Theme } from "src/@types";
import "./SelectComponent.scss";
import { useThemeContext } from "src/context/Theme";

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
  const { themeValue } = useThemeContext();

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
      <label htmlFor="select" className={"label"}>
        {title}
      </label>
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
