import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';
import { Colors } from '@common/styles';

const Input: React.FC<TextInputProps> = props => {
  return (
    <PaperTextInput
      mode="outlined"
      outlineColor={Colors.grayscale}
      textColor={Colors.content}
      activeOutlineColor={Colors.primary}
      placeholderTextColor={Colors.placeholder}
      style={styles.inputBase}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputBase: {
    minHeight: 48,
    backgroundColor: Colors.backgroundSoft,
  },
});

export default Input;
