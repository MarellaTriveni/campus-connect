import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const student = {
    name: "Triveni Marella",
    rollNo: "23NN5A0512",
    department: "Computer Science Engineering",
    email: "trivenimarella9@gmail.com",
    phone: "9876543210",
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            if (navigation) {
              navigation.navigate("Login");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Ionicons name="person-circle-outline" size={32} color="#fff" />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileCircle}>
          <Ionicons name="person" size={55} color="#6C63FF" />
        </View>

        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.department}>{student.department}</Text>
      </View>

      {/* Information Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Information</Text>

        {/* Roll Number */}
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Ionicons name="id-card-outline" size={22} color="#6C63FF" />
          </View>

          <View>
            <Text style={styles.label}>Roll Number</Text>
            <Text style={styles.value}>{student.rollNo}</Text>
          </View>
        </View>

        {/* Department */}
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Ionicons name="school-outline" size={22} color="#6C63FF" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{student.department}</Text>
          </View>
        </View>

        {/* Email */}
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Ionicons name="mail-outline" size={22} color="#6C63FF" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{student.email}</Text>
          </View>
        </View>

        {/* Phone */}
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Ionicons name="call-outline" size={22} color="#6C63FF" />
          </View>

          <View>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{student.phone}</Text>
          </View>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEditProfile}
      >
        <Ionicons name="create-outline" size={21} color="#fff" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={21} color="#D32F2F" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Campus Connect • Student App</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  header: {
    backgroundColor: "#6C63FF",
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  profileSection: {
    alignItems: "center",
    paddingVertical: 25,
  },

  profileCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  name: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#222",
  },

  department: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 15,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 3,
  },

  value: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },

  editButton: {
    backgroundColor: "#6C63FF",
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 13,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  logoutButton: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D32F2F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    marginVertical: 25,
  },
});