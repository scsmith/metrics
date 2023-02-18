import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from '../components/Avatar';

import { Customer, RootTabScreenProps } from '../types';
import { View, Text, useThemeColor, HintText, Error } from '../components/Themed';
import { underscoreToTitleCase } from '../lib/utilities';
import { supabase, PostgrestError } from '../supabase';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CustomersScreen({ navigation }: RootTabScreenProps<'Customers'>) {
  const onItemPress = (id: string, item: Customer) => {
    console.log(`Pressed customers screen id: ${id}`);
    // console.log(`Item: ${JSON.stringify(item)}`);
    navigation.navigate('CustomerDetails', { id });
  };

  return (
    <View style={styles.container}>
      <CustomerList onItemPress={onItemPress} />
    </View>
  );
}

export function CustomerList(props: any) {
  const onItemPress = props.onItemPress;
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchData = async () => {
    let { data: customers, error: callerror } = await supabase
      .from('customers')
      .select('*');

    if (callerror || !customers) setError(callerror);
    else setCustomers(customers!);
    setLoading(false);

    return customers;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return (<Error error={error} onReload={fetchData} />);
  if (loading) return (<Text>Loading...</Text>);

  return (
    <FlatList
      style={styles.List}
      data={customers}
      // keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        return (
          <CustomerItem item={item} onItemPress={onItemPress} />
        );
      }
      } />
  );
}

export function CustomerItem(props: any) {
  const borderColor = useThemeColor({}, 'eventBorderColor');

  const { item, onItemPress, ...otherProps }: { item: Customer; onItemPress: any; } = props;

  return (
    <TouchableOpacity
      style={[{ borderBottomColor: borderColor }, styles.item]}
      onPress={() => onItemPress(item.id, item)}
    >

      <Avatar email={item.email} name={item.name} style={styles.icon} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name || item.email}</Text>
        <HintText style={styles.description}>{item.name ? item.email : ''}</HintText>
      </View>
    </TouchableOpacity>
  );
}

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
    color: '#999',
    marginHorizontal: 10,
    borderRadius: 20,
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
