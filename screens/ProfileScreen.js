import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>Account</Text>
          <Text style={styles.title}>My Profile 👤</Text>
        </View>

        <View style={styles.settingsButton}>
          <Ionicons
            name="settings-outline"
            size={24}
            color="#4B3F72"
          />
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={55}
            color="#6C5B9B"
          />
        </View>

        <Text style={styles.name}>
          Triveni Marella
        </Text>

        <Text style={styles.role}>
          B.Tech Computer Science Student
        </Text>

        <View style={styles.studentBadge}>
          <Ionicons
            name="school-outline"
            size={15}
            color="#6C5B9B"
          />

          <Text style={styles.studentBadgeText}>
            Student
          </Text>
        </View>
      </View>

      {/* Student Information */}
      <Text style={styles.sectionTitle}>
        Student Information
      </Text>

      <View style={styles.infoCard}>

        {/* Email */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#6C5B9B"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Email
            </Text>

            <Text style={styles.infoValue}>
              trivenimarella9@gmail.com
            </Text>
          </View>
        </View>

        {/* Phone */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="call-outline"
              size={22}
              color="#6C5B9B"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Phone
            </Text>

            <Text style={styles.infoValue}>
              {/* Add your phone number */}
              965280749
            </Text>
          </View>
        </View>

        {/* Department */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="book-outline"
              size={22}
              color="#6C5B9B"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Department
            </Text>

            <Text style={styles.infoValue}>
              Computer Science and Engineering
            </Text>
          </View>
        </View>

        {/* Year */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="calendar-outline"
              size={22}
              color="#6C5B9B"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Course
            </Text>

            <Text style={styles.infoValue}>
              B.Tech - CSE
            </Text>
          </View>
        </View>

      </View>

      {/* Account Options */}
      <Text style={styles.sectionTitle}>
        Account
      </Text>

      <View style={styles.optionsCard}>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIcon}>
            <Ionicons
              name="settings-outline"
              size={22}
              color="#6C5B9B"
            />
          </View>

          <Text style={styles.optionText}>
            Settings
          </Text>

          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIcon}>
            <Ionicons
              name="help-circle-outline"
              size={22}
              color="#6C5B9B"
            />
          </View>

          <Text style={styles.optionText}>
            Help & Support
          </Text>

          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#999"
          />
        </TouchableOpacity>

      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace("Login")}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#FFFFFF"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      <Text style={styles.version}>
        Campus Connect v1.0
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  smallTitle: {
    fontSize: 14,
    color: "#777",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4B3F72",
    marginTop: 3,
  },

  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 25,
    marginBottom: 25,
    elevation: 3,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  role: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },

  studentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEAF8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 12,
  },

  studentBadgeText: {
    color: "#6C5B9B",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 25,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  infoIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  optionText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: "#6C5B9B",
    height: 52,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginBottom: 30,
  },
});