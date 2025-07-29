import React from 'react';

import { View } from 'react-native';

const VARIANT_UNIT_MAP = {
  small: 4,
  medium: 8,
  large: 16,
};

const Spacer: React.FC<{
  unit?: number;
  horizontal?: boolean;
  variant?: 'small' | 'medium' | 'large';
}> = ({ unit, horizontal, variant }) => {
  const getStyle = () => {
    const value = variant ? VARIANT_UNIT_MAP[variant] : unit || 8;
    return horizontal
      ? {
          paddingHorizontal: value,
        }
      : {
          paddingVertical: value,
        };
  };

  return <View style={getStyle()} />;
};

export default Spacer;
