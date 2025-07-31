import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, TextInput, StyleSheet, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';

import { Colors } from '@common/styles';
import { useDisableBackButton } from '@common/hooks';

import Text, { ErrorText } from '../Text';

interface PinModalProps {
  visible: boolean;
  error?: string;
  onConfirm: (pin: string) => void;
  onCancel: () => void;
}

export const STORED_PIN = '111111';

const PinModal = ({ visible, onConfirm, onCancel, error }: PinModalProps) => {
  const [pin, setPin] = useState('');
  const inputRef = useRef<TextInput>(null);

  useDisableBackButton();

  const handleCancel = () => {
    setPin('');
    onCancel();
  };

  const handleChangeText = (input: string) => {
    if (input.length <= STORED_PIN.length) {
      setPin(input);
      if (input.length === STORED_PIN.length) {
        onConfirm(input);
        setPin('');
      }
    }
  };

  return (
    <Modal
      visible={visible}
      onShow={() => inputRef.current?.focus()}
      onDismiss={() => setPin('')}
      transparent
      animationType="slide"
    >
      <View style={styles.fullscreen}>
        <IconButton icon="close" size={20} onPress={handleCancel} />

        <View style={styles.content}>
          <Text style={styles.title}>Enter your PIN</Text>
          <TextInput
            ref={inputRef}
            value={pin}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            secureTextEntry
            maxLength={6}
            placeholder={Platform.OS === 'ios' ? '••••••' : undefined}
            style={styles.input}
          />
          {error && <ErrorText>{error}</ErrorText>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: Colors.backgroundSoft,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
  },
  input: {
    borderWidth: 0,
    padding: 16,
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
    letterSpacing: 12,
    color: Colors.content,
  },
});

export default PinModal;
