import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { EventWithCustomers, RootTabScreenProps } from '../types';
import { View, Text, useThemeColor, HintText, Error } from '../components/Themed';
import { underscoreToTitleCase } from '../lib/utilities';
import { supabase, PostgrestError } from '../supabase';

export default function EventsScreen({ navigation }: RootTabScreenProps<'Events'>) {
  const onItemPress = (id: string, item: EventWithCustomers) => {
    console.log(`Pressed events screen id: ${id}`);
    // console.log(`Item: ${JSON.stringify(item)}`);
    navigation.navigate('EventDetails', { id });
  };

  return (
    <View style={styles.container}>
      <EventList onItemPress={onItemPress} />
    </View>
  );
}

export function EventList(props: any) {
  const onItemPress = props.onItemPress;
  const [events, setEvents] = useState<Array<EventWithCustomers>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchData = async () => {
    let { data: events, error: callerror } = await supabase
      .from('events')
      .select('*, customers(id, name, email)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (callerror || !events) setError(callerror);
    else setEvents(events);
    setLoading(false);

    return events;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return (<Error error={error} onReload={fetchData} />);
  if (loading) return (<Text>Loading...</Text>);

  return (
    <FlatList
      style={styles.List}
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        return (
          <EventItem item={item} onItemPress={onItemPress} />
        );
      }
      } />
  );
}

export function EventItem(props: any) {
  const { style, lightColor, darkColor, item, onItemPress, ...otherProps } = props;
  const { icon, key, description, customers }: EventWithCustomers = item;
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'eventBorderColor');
  const title = underscoreToTitleCase(key);
  // console.log(`Item: ${ JSON.stringify(item) }`);
  // console.log(`Customers: ${ JSON.stringify(customers) }`);

  return (
    <TouchableOpacity
      style={[{ borderBottomColor: borderColor }, styles.item]}
      onPress={() => onItemPress(item.id, item)}
    >
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.description}>
          {customers && customers.name && (
            <HintText style={styles.name}>{customers.name}</HintText>)}
          {customers && customers.email && !customers.name && (
            <HintText style={styles.name}>{customers.email}</HintText>)}
          <HintText>{description}</HintText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  List: {
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    // borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  icon: {
    fontSize: 32,
    marginHorizontal: 6,
    // padding: 10,
    width: 40,
  },
  details: {
    marginHorizontal: 10,
    // padding: 10,
  },
  title: {
    fontSize: 18,
  },
  description: {
    flex: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
    marginRight: 4,
  }
});
