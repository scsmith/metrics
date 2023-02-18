import { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, HintText, useThemeColor } from '../components/Themed';
import { Customer } from '../types';
import { underscoreToTitleCase } from '../lib/utilities';
import { supabase } from '../supabase';

export default function EventDetailsScreen({ route, navigation }: any) {
  const { id }: { id: string; } = route.params;
  console.log(id);

  const [customer, setCustomer] = useState<Customer>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    let { data: customer, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id);

    if (error || !customer) console.log('error', error);
    else setCustomer(customer[0]);
    setLoading(false);

    return customer;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (<Text>Loading...</Text>);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer: {customer.name}</Text>
      <Text style={styles.description}>Email: {customer.email}</Text>
      <Text style={styles.description}>ID: {id}</Text>
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
