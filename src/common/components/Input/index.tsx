import * as React from 'react';
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';
import { Colors } from '@common/styles';

const Input: React.FC<TextInputProps> = props => {
  return (
    <PaperTextInput
      mode="outlined"
      placeholderTextColor={Colors.placeholder}
      {...props}
    />
  );
};

export default Input;
