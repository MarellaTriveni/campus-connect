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
  const handleEditProfile = () => {
    Alert.alert(
      "Edit Profile",
      "Profile editing feature will be available soon."
    );
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
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Logged Out",
              "You have been logged out successfully."
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSmall}>
            Campus Connect
          </Text>

          <Text style={styles.headerTitle}>
            My Profile
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="person-outline"
            size={27}
            color="#6C63FF"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Profile Card */}
        <View style={styles.profileCard}>

          {/* Profile Circle */}
          <View style={styles.profileImage}>
            <Ionicons
              name="person"
              size={55}
              color="#6C63FF"
            />
          </View>

          <Text style={styles.profileName}>
            Triveni
          </Text>

          <Text style={styles.profileRole}>
            Computer Science Engineering
          </Text>

          <Text style={styles.profileCollege}>
            Student
          </Text>

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.editButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>

        </View>

        {/* Student Information */}
        <Text style={styles.sectionTitle}>
          Student Information
        </Text>

        <View style={styles.infoCard}>

          {/* Name */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="person-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Full Name
              </Text>

              <Text style={styles.infoValue}>
                Triveni
              </Text>
            </View>
          </View>

          {/* Roll Number */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="card-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Roll Number
              </Text>

              <Text style={styles.infoValue}>
                25NN5A0512
              </Text>
            </View>
          </View>

          {/* Department */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="school-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Department
              </Text>

              <Text style={styles.infoValue}>
                Computer Science & Engineering
              </Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="mail-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Email
              </Text>

              <Text style={styles.infoValue}>
                student@example.com
              </Text>
            </View>
          </View>

          {/* Phone */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="call-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Phone
              </Text>

              <Text style={styles.infoValue}>
                +91 XXXXX XXXXX
              </Text>
            </View>
          </View>

        </View>

        {/* Academic Information */}
        <Text style={styles.sectionTitle}>
          Academic Information
        </Text>

        <View style={styles.statsContainer}>

          {/* Year */}
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons
                name="school-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.statNumber}>
              3rd
            </Text>

            <Text style={styles.statLabel}>
              Year
            </Text>
          </View>

          {/* Semester */}
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons
                name="book-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.statNumber}>
              2-1
            </Text>

            <Text style={styles.statLabel}>
              Semester
            </Text>
          </View>

          {/* Attendance */}
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons
                name="checkmark-circle-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.statNumber}>
              82%
            </Text>

            <Text style={styles.statLabel}>
              Attendance
            </Text>
          </View>

        </View>

        {/* Quick Options */}
        <Text style={styles.sectionTitle}>
          Quick Options
        </Text>

        <View style={styles.optionsCard}>

          {/* Events */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              navigation.navigate("Event")
            }
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="calendar-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                My Events
              </Text>

              <Text style={styles.optionSubtitle}>
                View upcoming college events
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#999"
            />
          </TouchableOpacity>

          {/* Notices */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              navigation.navigate("Notice")
            }
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="notifications-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Notices
              </Text>

              <Text style={styles.optionSubtitle}>
                Check latest college notices
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#999"
            />
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              navigation.navigate("Settings")
            }
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="settings-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Settings
              </Text>

              <Text style={styles.optionSubtitle}>
                Manage app preferences
              </Text>
            </View>

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
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#D32F2F"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Campus Connect
        </Text>

        <Text style={styles.version}>
          Version 1.0.0
        </Text>

      </ScrollView>
    </View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerSmall: {
    color: "#E8E7FF",
    fontSize: 12,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    elevation: 4,
    marginBottom: 22,
  },

  profileImage: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  profileRole: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },

  profileCollege: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  editButton: {
    marginTop: 15,
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 7,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 22,
    elevation: 3,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 70,
  },

  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: "#999",
  },

  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginTop: 3,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  statCard: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 3,
  },

  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  statLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 3,
  },

  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
  },

  optionRow: {
    minHeight: 75,
    flexDirection: "row",
    alignItems: "center",
  },

  optionIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  optionContent: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  optionSubtitle: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },

  logoutButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D32F2F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  logoutText: {
    color: "#D32F2F",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },

  footer: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 25,
  },

  version: {
    textAlign: "center",
    color: "#AAA",
    fontSize: 11,
    marginTop: 4,
  },
});