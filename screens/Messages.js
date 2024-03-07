import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Dashboard = ({ navigation }) => {
  const router = useRouter();
  const tableHead = ["Name", "Roll No.", "Attendance"];
  const tableData = [
    ["John Doe", "123", "Present"],
    ["Jane Smith", "456", "Absent"],
    // Add more rows as needed
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.replace("Home")}
        style={{ marginTop: 25 }}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Attendance Dashboard</Text>
      <View style={styles.tableContainer}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#007FFF" }}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={{ ...styles.text, fontWeight: "bold", color: "#007FFF" }}
          />
          <Rows data={tableData} textStyle={styles.text} style={styles.row} />
        </Table>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 35,
    color: "#007FFF", // Title color
  },
  tableContainer: {
    marginTop: 20, // Adjust as needed
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, color: "black" },
  row: { height: 40, backgroundColor: "#E7F2F8" },
});

export default Dashboard;
