import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileCircle}>
          <Ionicons name="person" size={55} color="#6C63FF" />
        </View>

        <Text style={styles.name}>Triveni Marella</Text>
        <Text style={styles.role}>B.Tech CSE Student</Text>
      </View>

      {/* Student Information */}
      <View style={styles.card}>
        <Text style={styles.title}>Student Information</Text>

        <View style={styles.infoRow}>
          <Ionicons name="id-card-outline" size={24} color="#6C63FF" />
          <View>
            <Text style={styles.label}>Roll Number</Text>
            <Text style={styles.value}>25NN5A0512</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={24} color="#6C63FF" />
          <View>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>Computer Science Engineering</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={24} color="#6C63FF" />
          <View>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>student@example.com</Text>
          </View>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="create-outline" size={22} color="white" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={22} color="#FF4D4D" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5FF",
  },

  header: {
    alignItems: "center",
    paddingVertical: 35,
    backgroundColor: "#6C63FF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  profileCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  role: {
    fontSize: 15,
    color: "#E8E7FF",
    marginTop: 5,
  },

  card: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 18,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    color: "#777",
    marginLeft: 15,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginLeft: 15,
    marginTop: 3,
  },

  editButton: {
    flexDirection: "row",
    backgroundColor: "#6C63FF",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  logoutButton: {
    flexDirection: "row",
    margin: 20,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF4D4D",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#FF4D4D",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});