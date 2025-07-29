import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';
import { Colors } from '@common/styles';

const Button: React.FC<ButtonProps> = props => {
  const { mode, children } = props;

  const isFilled =
    mode === 'contained' || mode === 'elevated' || mode === 'contained-tonal';

  return (
    <PaperButton
      contentStyle={styles.buttonBase}
      buttonColor={isFilled ? Colors.primary : props.buttonColor}
      textColor={isFilled ? Colors.contentInverse : props.textColor}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
  },
});

export default Button;
