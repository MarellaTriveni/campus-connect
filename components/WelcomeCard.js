import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Button } from "react-native";

export default function WelcomeCard(){
  
  const[name,setName]=useState("Trivenireddy");
  const[department,setDepartment]=useState("cse");
  const[year,setYear]=useState("btech");
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Welcome {name}
      </Text>
      <Text style={styles.subtitle}>
        Have a great learning!
      </Text>
      <Text style={styles.subtitle}>
        Department: {department}
      </Text>
      <Text style={styles.subtitle}>
        year: {year}
      </Text>
      <Button
          title="Change Name"
          onPress={() => setName("Chinnu")}
      />
      <Button
          title="Change department"
          onPress={() => setDepartment("ece")}
      />
      <Button
          title="year"
          onPress={() => setYear("btech 3rd")}
      />
             
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#d489d6",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
});