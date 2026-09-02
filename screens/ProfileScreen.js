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

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Triveni");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [email, setEmail] = useState("triveni@gmail.com");
  const [phone, setPhone] = useState("9876543210");

  const [tempName, setTempName] = useState(name);
  const [tempDepartment, setTempDepartment] =
    useState(department);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPhone, setTempPhone] = useState(phone);

  const startEditing = () => {
    setTempName(name);
    setTempDepartment(department);
    setTempEmail(email);
    setTempPhone(phone);

    setIsEditing(true);
  };

  const saveProfile = () => {
    if (
      tempName.trim() === "" ||
      tempDepartment.trim() === "" ||
      tempEmail.trim() === "" ||
      tempPhone.trim() === ""
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill all fields."
      );
      return;
    }

    setName(tempName);
    setDepartment(tempDepartment);
    setEmail(tempEmail);
    setPhone(tempPhone);

    setIsEditing(false);

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully."
    );
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          My Profile
        </Text>

        {!isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={startEditing}
          >
            <Ionicons
              name="create-outline"
              size={21}
              color="#6C63FF"
            />

            <Text style={styles.editText}>
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Profile Avatar */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.profileName}>
            {name}
          </Text>

          <Text style={styles.profileDepartment}>
            {department}
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Personal Information
          </Text>

          {/* Name */}
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.fieldContent}>
              <Text style={styles.label}>
                Full Name
              </Text>

              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter your name"
                />
              ) : (
                <Text style={styles.value}>
                  {name}
                </Text>
              )}
            </View>
          </View>

          {/* Department */}
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="school-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.fieldContent}>
              <Text style={styles.label}>
                Department
              </Text>

              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={tempDepartment}
                  onChangeText={setTempDepartment}
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
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="mail-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.fieldContent}>
              <Text style={styles.label}>
                Email
              </Text>

              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={tempEmail}
                  onChangeText={setTempEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
          <View style={styles.fieldContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="call-outline"
                size={21}
                color="#6C63FF"
              />
            </View>

            <View style={styles.fieldContent}>
              <Text style={styles.label}>
                Phone Number
              </Text>

              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={tempPhone}
                  onChangeText={setTempPhone}
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                />
              ) : (
                <Text style={styles.value}>
                  {phone}
                </Text>
              )}
            </View>
          </View>

        </View>

        {/* Edit Buttons */}
        {isEditing && (
          <View style={styles.actionContainer}>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelEditing}
            >
              <Ionicons
                name="close-outline"
                size={20}
                color="#555"
              />

              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveProfile}
            >
              <Ionicons
                name="checkmark-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.saveText}>
                Save Changes
              </Text>
            </TouchableOpacity>

          </View>
        )}

        {/* Student Information */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Student Information
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="id-card-outline"
                size={22}
                color="#6C63FF"
              />
            </View>

            <View>
              <Text style={styles.label}>
                Student ID
              </Text>

              <Text style={styles.value}>
                CC2026
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color="#6C63FF"
              />
            </View>

            <View>
              <Text style={styles.label}>
                Year
              </Text>

              <Text style={styles.value}>
                3rd Year
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="book-outline"
                size={22}
                color="#6C63FF"
              />
            </View>

            <View>
              <Text style={styles.label}>
                Course
              </Text>

              <Text style={styles.value}>
                B.Tech CSE
              </Text>
            </View>
          </View>

        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Campus Connect • Student Profile
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

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
  },

  editButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  editText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 5,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "bold",
  },

  profileName: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },

  profileDepartment: {
    color: "#888",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 18,
  },

  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  fieldContent: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#6C63FF",
    paddingVertical: 4,
    fontSize: 15,
    color: "#333",
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 7,
  },

  cancelText: {
    color: "#555",
    fontWeight: "bold",
    marginLeft: 5,
  },

  saveButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 7,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 5,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 5,
  },
});