import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import EventList from '../components/EventList';
import { RootTabScreenProps } from '../types';

export default function EventsScreen({ navigation }: RootTabScreenProps<'Events'>) {
  const onItemPress = (id: string) => {
    console.log(`Pressed: ${id}`);
    navigation.navigate('EventDetails', { id });
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
});
