import ReactNativeBiometrics from 'react-native-biometrics';

export const useBiometricAuth = () => {
  const authenticate = async (): Promise<boolean> => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });

    const { available } = await rnBiometrics.isSensorAvailable();

    if (!available) {
      console.warn('Biometrics not available');
      return false;
    }

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm your ID',
        cancelButtonText: 'Cancel',
      });

      return success;
    } catch (e) {
      console.warn('Biometric auth failed or cancelled', e);
      return false;
    }
  };

  return { authenticate };
};
