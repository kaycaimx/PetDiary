import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { styles } from "../styles";

const DropdownMenu = ({ pickerMenu, placeHolder, selectHandler }) => {
  const [open, setOpen] = useState(false);
  const [pickedValue, setPickedValue] = useState("");

  return (
    <>
      <DropDownPicker
        containerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        open={open}
        items={pickerMenu}
        setOpen={setOpen}
        value={pickedValue}
        setValue={setPickedValue}
        searchable={true}
        placeholder={placeHolder}
        placeholderStyle={styles.dropdownPlaceholder}
        onSelectItem={(item) => {
          selectHandler(item);
        }}
      />
    </>
  );
};

export default DropdownMenu;
