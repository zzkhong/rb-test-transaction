import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

import { Colors } from '@common/styles';

const Dropdown: React.FC<DropdownProps<any>> = props => {
  return (
    <RNDropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholder}
      itemTextStyle={styles.item}
      selectedTextStyle={styles.item}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    minHeight: 56,
    backgroundColor: Colors.backgroundSoft,
    borderRadius: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.grayscale,
  },
  item: {
    color: Colors.content,
  },
  placeholder: {
    color: Colors.placeholder,
  },
});

export default Dropdown;
