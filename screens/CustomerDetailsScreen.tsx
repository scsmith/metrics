import { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, HintText, useThemeColor, Error } from '../components/Themed';
import { Customer } from '../types';
import { underscoreToTitleCase } from '../lib/utilities';
import { PostgrestError, supabase } from '../supabase';
import Avatar from '../components/Avatar';

export default function EventDetailsScreen({ route, navigation }: any) {
  const { id }: { id: string; } = route.params;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchData = async () => {
    let { data: customer, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !customer) setError(error);
    else setCustomer(customer);
    setLoading(false);

    return customer;
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (error) return (<Error error={error} onReload={fetchData} />);
  if (loading || !customer) return (<Text>Loading...</Text>);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Customer ID: {customer.id}</Text>
      <Text style={styles.description}>ID: {id}</Text>
      <View style={styles.customer}>
        <Avatar email={customer.email} name={customer.name} />
        <Text style={styles.title}>{customer.name || customer.email}</Text>
        <Text style={styles.description}>Email: {customer.email}</Text>
        <HintText style={styles.description}>ID: {customer.id}</HintText>
        <HintText style={styles.description}>Created: {customer.created_at}</HintText>
        <HintText style={styles.description}>{JSON.stringify(customer.custom_data)}</HintText>
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
  customer: {
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
    marginVertical: 10,
  },
  description: {
    // textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
