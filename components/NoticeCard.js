import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NoticeCard({ title, date, image, venue }) {
  return (
    <View style={styles.card}>
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.title}>{title}</Text>

      <View style={styles.dateContainer}>
        <Ionicons
          name="calendar"
          size={18}
          color="black"
        />
        <View style={styles.dateContainer}>
          <Ionicons
            name="location"
            size={18}
            color="red" />
          
        </View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.date}>{venue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  image: {
    width: "20%",
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  date: {
    marginLeft: 5,
    color: "grey",
    fontSize: 15,
  },
});