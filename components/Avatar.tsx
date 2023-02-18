
import { View, Text, Image, StyleSheet, ViewProps } from 'react-native';
var gravatarApi = require('gravatar-api');

export default function Avatar(props: any) {
  const { email, name, style, ...otherProps } = props;

  // console.log(style);
  let { width, height, color, backgroundColor, ...otherStyles } = style || {};
  width = width || 40;
  height = height || 40;

  const text = name?.[0]?.toUpperCase() || email?.[0].toUpperCase() || '?';

  const options = {
    email,
    parameters: { "size": `${width}x${height}`, "d": "404" },
    secure: true
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: height,
      width: width,
      flexDirection: "column",
      margin: 0,
      padding: 0,
      backgroundColor: backgroundColor || "#eee",
      borderRadius: width / 2,
    },
    text: {
      color: color || '#fff',
      // backgroundColor: '#999',
      textAlign: "center",
      margin: 0,
      padding: 0,
      // fontFamily: "space-mono",
      // height: height,
      fontWeight: "bold",
      width: width,
      fontSize: height * 0.5
    },
    image: {
      margin: 0,
      marginTop: height * -1,
      height: height,
      width: width,
      borderRadius: width / 2,
    }
  });

  return (
    <View style={[{ height: height, width: width }, otherStyles]}>
      <View style={[styles.container]}>
        <Text style={styles.text}>{text}</Text>
      </View >
      <Image style={styles.image} source={{ uri: gravatarApi.imageUrl(options) }} />
    </View >
  );
}

export { Avatar };
