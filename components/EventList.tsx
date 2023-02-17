import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, HintText } from './Themed';
import { useThemeColor } from "./Themed";
import { supabase } from "../supabase";
import { Database } from '../types';

type Event = Database['public']['Tables']['events']['Row']

export default function EventList(props) {
  const { onItemPress, ...otherProps } = props;
  const [events, setEvents] = useState<Array<Event>>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let { data: events, error } = await supabase
      .from('events')
      .select('*');

    if (error) console.log('error', error);
    else setEvents(events!);
    setLoading(false);

    return events;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (<Text>Loading...</Text>);

  return (
    <FlatList
      style={styles.List}
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        return (
          <Item item={item} onItemPress={onItemPress} />
        );
      }
      } />
  );
}

export function Item(props) {
  const { style, lightColor, darkColor, item, onItemPress, ...otherProps } = props;
  const { icon, title, description } = item;
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'eventBorderColor');

  return (
    <TouchableOpacity
      style={[{ borderBottomColor: borderColor }, styles.item]}
      onPress={() => onItemPress(item.id)}
    >
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <HintText style={styles.description}>{description}</HintText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    marginHorizontal: 10,
    // padding: 10,
    width: 30,
  },
  details: {
    marginHorizontal: 10,
    // padding: 10,
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 12
  }
});
