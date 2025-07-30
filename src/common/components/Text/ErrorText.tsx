import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText, TextProps } from 'react-native-paper';

import { Colors } from '@common/styles';

export const ErrorText: React.FC<TextProps<any>> = props => {
  const { style, children } = props;

  return (
    <PaperText
      variant="bodyMedium"
      style={[styles.errorText, style]}
      {...props}
    >
      {children}
    </PaperText>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: Colors.error,
  },
});
