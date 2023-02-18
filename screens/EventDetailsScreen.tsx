import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, HintText, useThemeColor } from '../components/Themed';
import { EventWithCustomers } from '../types';
import { underscoreToTitleCase } from '../lib/utilities';

export default function EventDetailsScreen({ route, navigation }: any) {
  const { id, item }: { id: string, item: EventWithCustomers; } = route.params;
  console.log(id);
  console.log(item);
  // TODO add the abilty to customize lightColor and darkColor
  const borderColor = useThemeColor({}, 'eventBorderColor');
  const backgroundColor = useThemeColor({}, 'eventBackgroundColor');

  const onPress = () => {
    console.log("Goto customers?");
    // Go back to all events to prevent this page from being open if we come back
    navigation.popToTop();
    // Now head to the customers
    navigation.getParent()?.navigate('Root', {
      'screen': 'Customers',
      params: {
        screen: 'CustomerDetails',
        params: { id: item.customer_id },
        initial: false,
      }
    });
  };

  return (
    <View style={styles.container}>
      {item.customer_id && item.customers && (
        <TouchableOpacity style={[{ borderColor, backgroundColor }, styles.customer]} onPress={onPress}>
          <Text style={styles.title}>{item.customers.name}</Text>
          <Text style={styles.description}>Email: {item.customers.email}</Text>
          <HintText style={styles.description}>Customer: {item.customer_id}</HintText>
          {/* <Button title="Customer" onPress={onPress} /> */}
        </TouchableOpacity>
      )}

      <View style={[{ borderColor }, styles.event]}>
        <View>
          <Text style={styles.title}>{underscoreToTitleCase(item.key)}</Text>

        </View>
        <Text style={styles.description}>{item.description}</Text>
        <HintText style={styles.details}>{JSON.stringify(item.custom_data)}</HintText>
        <HintText style={styles.description}>ID: {id}</HintText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  event: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
  },
  details: {

  },
  title: {
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    // textAlign: 'center',
  },
  customer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
