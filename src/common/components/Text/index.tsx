import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText, TextProps } from 'react-native-paper';
import { Colors } from '@common/styles';

const Text: React.FC<TextProps<any>> = props => {
  const { style, children } = props;

  return (
    <PaperText style={[styles.textBase, style]} {...props}>
      {children}
    </PaperText>
  );
};

const styles = StyleSheet.create({
  textBase: {
    color: Colors.content,
  },
});

export default Text;
