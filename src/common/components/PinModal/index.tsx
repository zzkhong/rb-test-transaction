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

  useEffect(() => {
    if (visible) {
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setPin('');
    }
  }, [visible]);

  useEffect(() => {
    if (pin.length === 6) {
      onConfirm(pin);
    }
  }, [onConfirm, pin]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.fullscreen}>
        <IconButton icon="close" size={20} onPress={onCancel} />

        <View style={styles.content}>
          <Text style={styles.title}>Enter your PIN</Text>
          <TextInput
            ref={inputRef}
            value={pin}
            onChangeText={setPin}
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
