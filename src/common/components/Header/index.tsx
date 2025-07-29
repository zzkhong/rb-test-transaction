import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar } from 'react-native-paper';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Colors } from '@common/styles';

const Header: React.FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header style={styles.header}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default Header;
