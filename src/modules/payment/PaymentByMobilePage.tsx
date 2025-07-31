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
import { Searchbar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@common/constants/routes';
import Text from '@common/components/Text';
import Spacer from '@common/components/Spacer';

function ContactItem({
  contact,
  onPress,
}: {
  contact: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.contactItem}>
      <Text>
        a{/* {transaction.recipientName} ({transaction.accountNo}) */}
      </Text>
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

  const handlePressContact = React.useCallback(() => {
    navigation.navigate('PaymentDetail', {
      recipientName: 'John Doe',
      bankName: '',
      accountNo: '',
    });
  }, [navigation]);

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

          <FlatList
            data={[]}
            keyExtractor={item => item.id}
            renderItem={item => (
              <ContactItem contact={item} onPress={handlePressContact} />
            )}
            ListEmptyComponent={<EmptyContactContent />}
          />
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
});
