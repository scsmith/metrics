import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, HintText } from './Themed';
import { useThemeColor } from "./Themed";

export default function EventList(props) {
  const { onItemPress, ...otherProps } = props;
  const data = [
    { id: '1', icon: "💰", title: "Received Revenue", description: "received $25 for subscription starter" },
    { id: '2', icon: "✍️", title: "Plan Change", description: "upgraded plan to starter from free" },
    { id: '3', icon: "📝", title: "Address Update", description: "Updated their address" },
    { id: '4', icon: "🥳", title: "Address Created", description: "upgraded plan to starter from free" },
  ];

  return (
    <FlatList style={styles.List} data={data} renderItem={({ item, index }) => {
      return (
        <Item item={item} onItemPress={onItemPress} />
      );
    }} />
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
