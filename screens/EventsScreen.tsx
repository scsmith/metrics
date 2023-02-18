import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import EventList from '../components/EventList';
import { EventWithCustomers, RootTabScreenProps } from '../types';

export default function EventsScreen({ navigation }: RootTabScreenProps<'Events'>) {
  const onItemPress = (id: string, item: EventWithCustomers) => {
    console.log(`Pressed: ${id}`);
    console.log(`Item: ${JSON.stringify(item)}`);
    navigation.navigate('EventDetails', { id, item });
  };

  return (
    <View style={styles.container}>
      <EventList onItemPress={onItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});;
