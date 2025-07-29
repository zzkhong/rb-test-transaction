import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';
import { Colors } from '@common/styles';

const Button: React.FC<ButtonProps> = props => {
  const { style, children } = props;

  return (
    <PaperButton
      style={[styles.buttonBase, style]}
      buttonColor={Colors.primary}
      textColor={Colors.contentInverse}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    minHeight: 24,
  },
});

export default Button;
