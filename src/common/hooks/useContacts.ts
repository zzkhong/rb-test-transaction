import { useState, useCallback } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let permissionGranted = false;

      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonPositive: 'Allow',
          },
        );
        permissionGranted = result === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await Contacts.requestPermission();
        permissionGranted = result === 'authorized';
      }

      if (!permissionGranted) {
        setError('Permission denied');
        return;
      }

      const result = await Contacts.getAll();
      setContacts(result.filter(contact => contact.phoneNumbers.length > 0));
    } catch (err: any) {
      setError(err.message || 'Unable to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    contacts,
    loading,
    error,
    loadContacts,
  };
}
