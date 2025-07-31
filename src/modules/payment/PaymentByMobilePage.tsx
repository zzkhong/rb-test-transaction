import * as React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Divider, Searchbar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Contact } from 'react-native-contacts';

import { RootStackParamList } from '@common/constants/routes';
import Text, { ErrorText } from '@common/components/Text';
import Spacer from '@common/components/Spacer';
import { useContacts } from '@common/hooks';
import { formatPhoneToAccountNo } from '@common/util/string';

function ContactItem({
  contact,
  onPress,
}: {
  contact: Contact;
  onPress: (contact: Contact) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress(contact)}
      style={styles.contactItem}
    >
      <Text variant="labelLarge">{contact.displayName}</Text>
      <Text>{contact.phoneNumbers[0].number}</Text>
    </TouchableOpacity>
  );
}

function EmptyContactContent() {
  return (
    <View style={styles.listEmptyContent}>
      <Text>No contact found</Text>
    </View>
  );
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymentByMobile'
>;

export default function PaymentByMobilePage() {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = React.useState('');
  const { contacts, loadContacts, loading, error } = useContacts();

  React.useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handlePressContact = React.useCallback(
    (contact: Contact) => {
      navigation.navigate('PaymentDetail', {
        recipientName: String(contact.displayName),
        bankName: 'Duitnow',
        accountNo: formatPhoneToAccountNo(contact.phoneNumbers[0].number),
      });
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Contact }) => (
      <ContactItem contact={item} onPress={handlePressContact} />
    ),
    [handlePressContact],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <Searchbar
            placeholder="Search by Contact"
            onChangeText={setQuery}
            value={query}
          />
          <Spacer />

          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={contacts || []}
              keyExtractor={item => item.recordID}
              renderItem={renderItem}
              ItemSeparatorComponent={Divider}
              ListEmptyComponent={
                error ? (
                  <ErrorText style={styles.errorText}>{error}</ErrorText>
                ) : (
                  <EmptyContactContent />
                )
              }
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listEmptyContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
  contactItem: {
    flex: 1,
    minHeight: 48,
    marginVertical: 4,
    justifyContent: 'center',
  },
});
