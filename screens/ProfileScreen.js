import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Triveni Marella");
  const [rollNo, setRollNo] = useState("25NN5A0512");
  const [email, setEmail] = useState("student@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [department, setDepartment] = useState(
    "Computer Science Engineering"
  );

  // Save profile
  const handleSave = () => {
    setIsEditing(false);

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully!"
    );
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Logout
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
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View>
          <Text style={styles.headerSmallText}>
            Account
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

      {/* ================= PROFILE CARD ================= */}

      <View style={styles.profileCard}>

        <View style={styles.avatarContainer}>
          <Ionicons
            name="person"
            size={58}
            color="#6C63FF"
          />

          {/* Online Dot */}
          <View style={styles.onlineDot} />
        </View>

        <Text style={styles.profileName}>
          {name}
        </Text>

        <Text style={styles.profileRole}>
          B.Tech • CSE Student
        </Text>

        <View style={styles.studentBadge}>
          <Ionicons
            name="school-outline"
            size={15}
            color="#6C63FF"
          />

          <Text style={styles.studentBadgeText}>
            Student
          </Text>
        </View>

      </View>

      {/* ================= PERSONAL INFORMATION ================= */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>

        {!isEditing && (
          <TouchableOpacity
            style={styles.smallEditButton}
            onPress={() => setIsEditing(true)}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color="#6C63FF"
            />

            <Text style={styles.smallEditText}>
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoCard}>

        {/* Name */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="person-outline"
              size={22}
              color="#6C63FF"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.label}>
              Full Name
            </Text>

            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
              />
            ) : (
              <Text style={styles.value}>
                {name}
              </Text>
            )}
          </View>
        </View>

        {/* Roll Number */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="id-card-outline"
              size={22}
              color="#6C63FF"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.label}>
              Roll Number
            </Text>

            {isEditing ? (
              <TextInput
                style={styles.input}
                value={rollNo}
                onChangeText={setRollNo}
                placeholder="Enter roll number"
              />
            ) : (
              <Text style={styles.value}>
                {rollNo}
              </Text>
            )}
          </View>
        </View>

        {/* Department */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="school-outline"
              size={22}
              color="#6C63FF"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.label}>
              Department
            </Text>

            {isEditing ? (
              <TextInput
                style={styles.input}
                value={department}
                onChangeText={setDepartment}
                placeholder="Enter department"
              />
            ) : (
              <Text style={styles.value}>
                {department}
              </Text>
            )}
          </View>
        </View>

        {/* Email */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#6C63FF"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.label}>
              Email
            </Text>

            {isEditing ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Enter email"
              />
            ) : (
              <Text style={styles.value}>
                {email}
              </Text>
            )}
          </View>
        </View>

        {/* Phone */}
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="call-outline"
              size={22}
              color="#6C63FF"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.label}>
              Phone Number
            </Text>

            {isEditing ? (
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="Enter phone"
              />
            ) : (
              <Text style={styles.value}>
                {phone}
              </Text>
            )}
          </View>
        </View>

      </View>

      {/* ================= SAVE / CANCEL ================= */}

      {isEditing && (
        <View style={styles.editActions}>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={21}
              color="#FFFFFF"
            />

            <Text style={styles.saveText}>
              Save Changes
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {/* ================= ACCOUNT OPTIONS ================= */}

      {!isEditing && (
        <>
          <Text style={styles.sectionTitle}>
            Account Settings
          </Text>

          <View style={styles.optionsCard}>

            {/* Notifications */}
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() =>
                Alert.alert(
                  "Notifications",
                  "Notification settings coming soon!"
                )
              }
            >
              <View style={styles.optionIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  Notifications
                </Text>

                <Text style={styles.optionSubtitle}>
                  Manage your notifications
                </Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            {/* Help */}
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() =>
                Alert.alert(
                  "Help & Support",
                  "Help and support feature coming soon!"
                )
              }
            >
              <View style={styles.optionIcon}>
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  Help & Support
                </Text>

                <Text style={styles.optionSubtitle}>
                  Get help with the application
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
        </>
      )}

      {/* Footer */}
      <Text style={styles.footer}>
        Campus Connect
      </Text>

      <Text style={styles.version}>
        Version 1.0.0
      </Text>

    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 20,
  },

  headerSmallText: {
    fontSize: 13,
    color: "#888",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#6C63FF",
    borderRadius: 22,
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 25,
  },

  avatarContainer: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },

  onlineDot: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#35C759",
    right: 4,
    bottom: 5,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  profileName: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
  },

  profileRole: {
    color: "#E8E7FF",
    fontSize: 13,
    marginTop: 5,
  },

  studentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 18,
    marginTop: 12,
  },

  studentBadgeText: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  smallEditButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEDFF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 12,
  },

  smallEditText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 5,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },

  infoIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#F5F6FA",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 14,
    color: "#333",
  },

  editActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  cancelButton: {
    width: "34%",
    height: 50,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 15,
  },

  saveButton: {
    width: "62%",
    height: 50,
    borderRadius: 13,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 7,
  },

  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  optionIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
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
    marginTop: 3,
  },

  logoutButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D32F2F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  logoutText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  footer: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    fontWeight: "bold",
  },

  version: {
    textAlign: "center",
    color: "#AAA",
    fontSize: 11,
    marginTop: 4,
    marginBottom: 30,
  },
});