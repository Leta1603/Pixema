import React, { FC, useState } from "react";
import Switch from "react-switch";

type SwitchProps = {
  disabled?: boolean;
};
const SwitchComponent: FC<SwitchProps> = ({ disabled }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Switch
        onChange={setChecked}
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
    </div>
  );
};

export default SwitchComponent;
