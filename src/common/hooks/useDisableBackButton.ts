import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useCallback } from 'react';

/**
 * Hook to disable the hardware back button on Android
 * @param enabled - Whether to disable the back button (default: true)
 */
export const useDisableBackButton = (enabled: boolean = true) => {
  useFocusEffect(
    useCallback(() => {
      if (!enabled) return;

      const onBackPress = () => {
        return true; // Prevents default back behavior
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [enabled]),
  );
};
