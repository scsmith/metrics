import { useState, useEffect } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import { EventWithCustomers, RootTabScreenProps } from '../types';
import { View, Text, HintText, Error, useThemeColor } from '../components/Themed';
import { PostgrestError, supabase } from '../supabase';
import { underscoreToTitleCase } from '../lib/utilities';

export default function EventDetailsScreen({ route, navigation }: any) {
  const { id }: { id: string; } = route.params;

  // console.log(id);
  // TODO add the abilty to customize lightColor and darkColor
  const borderColor = useThemeColor({}, 'eventBorderColor');
  const backgroundColor = useThemeColor({}, 'eventBackgroundColor');

  const [event, setEvent] = useState<EventWithCustomers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchData = async () => {
    let { data: event, error } = await supabase
      .from('events')
      .select('*, customers(*)')
      .eq('id', id)
      .single();

    if (error || !event) setError(error);
    else setEvent(event);
    console.log(JSON.stringify(event));
    setLoading(false);

    return event;
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onPress = () => {
    console.log("Goto customers?", event.customer_id);
    // Go back to all events to prevent this page from being open if we come back
    navigation.popToTop();
    // Now head to the customers
    navigation.getParent()?.navigate('Root', {
      screen: 'Customers',
      params: {
        screen: 'CustomerDetails',
        params: { id: event.customer_id },
        // initial false so that we show the customers screen on a back button
        initial: false,
      }
    });
  };

  if (error || !event) return (<Error error={error} onReload={fetchData} />);
  if (loading) return (<Text>Loading...</Text>);

  return (
    <View style={styles.container}>
      {event.customer_id && event.customers && (
        <TouchableOpacity style={[{ borderColor, backgroundColor }, styles.customer]} onPress={onPress}>
          <Text style={styles.title}>{event.customers.name}</Text>
          <Text style={styles.description}>Email: {event.customers.email}</Text>
          <HintText style={styles.description}>Customer: {event.customer_id}</HintText>
          {/* <Button title="Customer" onPress={onPress} /> */}
        </TouchableOpacity>
      )}

      <View style={[{ borderColor }, styles.event]}>
        <View>
          <Text style={styles.title}>{underscoreToTitleCase(event.key)}</Text>

        </View>
        <Text style={styles.description}>{event.description}</Text>
        <HintText style={styles.details}>{JSON.stringify(event.custom_data)}</HintText>
        <HintText style={styles.description}>ID: {id}</HintText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignevents: 'center',
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
