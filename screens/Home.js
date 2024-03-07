import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View
      style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>STUDENT DATA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242760",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default Home;
