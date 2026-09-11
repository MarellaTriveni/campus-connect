import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Triveni");
  const [department, setDepartment] = useState("Computer Science Engineering");
  const [email, setEmail] = useState("triveni@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [rollNo] = useState("23A81A05XX");

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
      !tempName.trim() ||
      !tempDepartment.trim() ||
      !tempEmail.trim() ||
      !tempPhone.trim()
    ) {
      Alert.alert("Error", "Please fill all fields.");
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

  const logout = () => {
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
          onPress: () =>
            navigation.replace("Login"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
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
                size={20}
                color="white"
              />

              <Text style={styles.editButtonText}>
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Avatar */}
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={48}
            color="#6C63FF"
          />
        </View>

        <Text style={styles.profileName}>
          {name}
        </Text>

        <Text style={styles.profileRole}>
          Student
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {isEditing ? (
          /* EDIT PROFILE */
          <View>
            <Text style={styles.sectionTitle}>
              Edit Information
            </Text>

            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>
                Full Name
              </Text>

              <View style={styles.inputBox}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#777"
                />

                <TextInput
                  style={styles.input}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Enter name"
                />
              </View>

              <Text style={styles.inputLabel}>
                Department
              </Text>

              <View style={styles.inputBox}>
                <Ionicons
                  name="school-outline"
                  size={20}
                  color="#777"
                />

                <TextInput
                  style={styles.input}
                  value={tempDepartment}
                  onChangeText={setTempDepartment}
                  placeholder="Enter department"
                />
              </View>

              <Text style={styles.inputLabel}>
                Email
              </Text>

              <View style={styles.inputBox}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#777"
                />

                <TextInput
                  style={styles.input}
                  value={tempEmail}
                  onChangeText={setTempEmail}
                  keyboardType="email-address"
                  placeholder="Enter email"
                />
              </View>

              <Text style={styles.inputLabel}>
                Phone
              </Text>

              <View style={styles.inputBox}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color="#777"
                />

                <TextInput
                  style={styles.input}
                  value={tempPhone}
                  onChangeText={setTempPhone}
                  keyboardType="phone-pad"
                  placeholder="Enter phone"
                />
              </View>

              {/* Save */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveProfile}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={21}
                  color="white"
                />

                <Text style={styles.buttonText}>
                  Save Changes
                </Text>
              </TouchableOpacity>

              {/* Cancel */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelEditing}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* PROFILE DETAILS */
          <View>
            <Text style={styles.sectionTitle}>
              Student Information
            </Text>

            <View style={styles.infoCard}>
              {/* Roll Number */}
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Ionicons
                    name="card-outline"
                    size={22}
                    color="#6C63FF"
                  />
                </View>

                <View>
                  <Text style={styles.infoLabel}>
                    Roll Number
                  </Text>

                  <Text style={styles.infoValue}>
                    {rollNo}
                  </Text>
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

                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>
                    Department
                  </Text>

                  <Text style={styles.infoValue}>
                    {department}
                  </Text>
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

                <View>
                  <Text style={styles.infoLabel}>
                    Email
                  </Text>

                  <Text style={styles.infoValue}>
                    {email}
                  </Text>
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

                <View>
                  <Text style={styles.infoLabel}>
                    Phone
                  </Text>

                  <Text style={styles.infoValue}>
                    {phone}
                  </Text>
                </View>
              </View>
            </View>

            {/* Account Options */}
            <Text style={styles.sectionTitle}>
              Account
            </Text>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() =>
                navigation.navigate("MyRegistrations")
              }
            >
              <View style={styles.optionIcon}>
                <Ionicons
                  name="clipboard-outline"
                  size={22}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  My Registrations
                </Text>

                <Text style={styles.optionSubtitle}>
                  View registered events
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={21}
                color="#999"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionCard}
              onPress={() =>
                navigation.navigate("Saved")
              }
            >
              <View style={styles.optionIcon}>
                <Ionicons
                  name="bookmark-outline"
                  size={22}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  Saved Items
                </Text>

                <Text style={styles.optionSubtitle}>
                  View saved content
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={21}
                color="#999"
              />
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={logout}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#D64545"
              />

              <Text style={styles.logoutText}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  header: {
    backgroundColor: "#6C63FF",
    paddingTop: 45,
    paddingBottom: 25,
    alignItems: "center",
  },

  headerTop: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5750D6",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },

  editButtonText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "600",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  profileName: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
  },

  profileRole: {
    color: "#DDD9FF",
    fontSize: 13,
    marginTop: 3,
  },

  content: {
    padding: 15,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    elevation: 2,
    marginBottom: 22,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  infoIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoLabel: {
    color: "#888",
    fontSize: 12,
  },

  infoValue: {
    color: "#222",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 3,
  },

  optionCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  optionIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  optionContent: {
    flex: 1,
    marginLeft: 12,
  },

  optionTitle: {
    color: "#222",
    fontSize: 15,
    fontWeight: "bold",
  },

  optionSubtitle: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  logoutButton: {
    marginTop: 15,
    backgroundColor: "#FFF0F0",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#D64545",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },

  inputCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    elevation: 2,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 7,
    marginTop: 8,
  },

  inputBox: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#222",
  },

  saveButton: {
    backgroundColor: "#6C63FF",
    height: 48,
    borderRadius: 11,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 7,
  },

  cancelButton: {
    height: 45,
    borderRadius: 11,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "600",
  },
});