import React, { FC, useState } from "react";
import Switch from "react-switch";
import { useThemeContext } from "src/context/Theme";
import { ButtonTypes, Theme } from "src/@types";
import Button from "src/components/Button";

type SwitchProps = {
  disabled?: boolean;
};
const SwitchComponent: FC<SwitchProps> = ({ disabled }) => {
  const { themeValue, onChangeTheme } = useThemeContext();
  const [checked, setChecked] = useState(themeValue === Theme.Dark);

  const onChangeClick = (isChecked: boolean) => {
    setChecked(isChecked);
    const newTheme = isChecked ? Theme.Dark : Theme.Light;
    onChangeTheme(newTheme);
    console.log(themeValue);
  };

  return (
    <div>
      <Switch
        onChange={onChangeClick}
        checked={checked}
        offColor={"#80858B"}
        onColor={"#7B61FF"}
        handleDiameter={16}
        height={20}
        width={32}
        uncheckedIcon
        checkedIcon
        disabled={disabled}
      />
      <Button
        type={ButtonTypes.Primary}
        title={"Dark"}
        onClick={onChangeTheme(Theme.Dark)}
      />
      <Button
        type={ButtonTypes.Secondary}
        title={"Light"}
        onClick={onChangeTheme(Theme.Light)}
      />
    </div>
  );
};

export default SwitchComponent;
