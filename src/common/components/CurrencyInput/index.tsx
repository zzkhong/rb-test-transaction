import * as React from 'react';
import { TextInput, NativeSyntheticEvent, StyleSheet } from 'react-native';

import { formatCurrency } from '@common/util/currency';
import { Colors } from '@common/styles';

interface CurrencyInputProps {
  value: string;
  autoFocus?: boolean;
  onChange?: (val: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxValue?: number;
  editable?: boolean;
}

export default function CurrencyInput({
  value,
  onChange,
  onBlur,
  autoFocus,
  placeholder = '0.00',
  maxValue = 10000000,
  editable = true,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = React.useState(formatCurrency(value));
  const [selection, setSelection] = React.useState({
    start: displayValue.length,
    end: displayValue.length,
  });
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    setDisplayValue(formatCurrency(value));
    setSelection({ start: displayValue.length, end: displayValue.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (text: string) => {
    const raw = text.replace(/[^0-9]/g, '');
    const numberValue = parseFloat(raw || '0') / 100;

    // Reject if value exceeds maxValue
    if (maxValue !== undefined && numberValue > maxValue) {
      return;
    }

    const formatted = formatCurrency(raw);
    setDisplayValue(formatted);
    if (onChange) onChange(raw);
    setSelection({ start: formatted.length, end: formatted.length });
  };

  const handleSelectionChange = (e: NativeSyntheticEvent<any>) => {
    // Always force caret to end
    const length = displayValue.length;
    if (
      e.nativeEvent.selection.start !== length ||
      e.nativeEvent.selection.end !== length
    ) {
      setSelection({ start: length, end: length });
    }
  };

  return (
    <TextInput
      caretHidden
      editable={editable}
      selectTextOnFocus={editable}
      ref={inputRef}
      autoFocus={autoFocus}
      keyboardType="numeric"
      placeholder={placeholder}
      style={styles.input}
      value={displayValue}
      onChangeText={handleChange}
      onBlur={onBlur}
      onSelectionChange={handleSelectionChange}
      selection={selection}
      selectionColor="transparent"
      placeholderTextColor={Colors.placeholder}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 48,
    color: Colors.content,
  },
});
