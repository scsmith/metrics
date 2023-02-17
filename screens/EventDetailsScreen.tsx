import { Button, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';

// : {navigation: RootTabScreenProps<'Customers'>}
export default function EventDetailsScreen({route, navigation}) {
  const { id } = route.params;
  console.log(id);

  const onPress = () => {
    console.log("Goto customers?");
    // Go back to all events to prevent this page from being open if we come back
    navigation.popToTop();
    // Now head to the customers
    // navigation.navigate('Customers');
    navigation.getParent()?.navigate('Customers');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Details: {id}</Text>
      <Button title="Customers" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
