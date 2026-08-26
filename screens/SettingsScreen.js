import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotifications = (value) => {
    setNotifications(value);

    Alert.alert(
      "Notifications",
      value
        ? "Notifications enabled."
        : "Notifications disabled."
    );
  };

  const handleDarkMode = (value) => {
    setDarkMode(value);

    Alert.alert(
      "Appearance",
      value
        ? "Dark mode preference enabled."
        : "Light mode preference enabled."
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy",
      "Your profile information is only used inside the Campus Connect application."
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "Campus Connect",
      "Campus Connect is a student application for managing notices, events and profile information.\n\nVersion 1.0.0"
    );
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear App Data",
      "Are you sure you want to clear your local app data?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Completed",
              "Local app data has been cleared."
            );
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        darkMode && styles.darkContainer,
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Settings
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Preferences */}
        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Preferences
        </Text>

        <View style={styles.card}>

          {/* Notifications */}
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons
                name="notifications-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Notifications
              </Text>

              <Text style={styles.settingSubtitle}>
                Receive updates about notices and events
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={handleNotifications}
              trackColor={{
                false: "#D5D5D5",
                true: "#B9B5FF",
              }}
              thumbColor={
                notifications ? "#6C63FF" : "#FFFFFF"
              }
            />
          </View>

          {/* Dark Mode */}
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons
                name="moon-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Dark Mode
              </Text>

              <Text style={styles.settingSubtitle}>
                Change your appearance preference
              </Text>
            </View>

            <Switch
              value={darkMode}
              onValueChange={handleDarkMode}
              trackColor={{
                false: "#D5D5D5",
                true: "#B9B5FF",
              }}
              thumbColor={
                darkMode ? "#6C63FF" : "#FFFFFF"
              }
            />
          </View>

        </View>

        {/* Account */}
        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Account
        </Text>

        <View style={styles.card}>

          {/* Privacy */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={handlePrivacy}
          >
            <View style={styles.settingIcon}>
              <Ionicons
                name="lock-closed-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Privacy
              </Text>

              <Text style={styles.settingSubtitle}>
                Manage your privacy information
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color="#999"
            />
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              navigation.navigate("Profile")
            }
          >
            <View style={styles.settingIcon}>
              <Ionicons
                name="person-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                My Profile
              </Text>

              <Text style={styles.settingSubtitle}>
                View and edit your profile
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color="#999"
            />
          </TouchableOpacity>

        </View>

        {/* Application */}
        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Application
        </Text>

        <View style={styles.card}>

          {/* About */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleAbout}
          >
            <View style={styles.settingIcon}>
              <Ionicons
                name="information-circle-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                About Campus Connect
              </Text>

              <Text style={styles.settingSubtitle}>
                App information and version
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color="#999"
            />
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() =>
              Alert.alert(
                "Help & Support",
                "For support, contact your college administrator."
              )
            }
          >
            <View style={styles.settingIcon}>
              <Ionicons
                name="help-circle-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Help & Support
              </Text>

              <Text style={styles.settingSubtitle}>
                Get help with Campus Connect
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={21}
              color="#999"
            />
          </TouchableOpacity>

        </View>

        {/* Danger Zone */}
        <Text
          style={[
            styles.sectionTitle,
            styles.dangerTitle,
          ]}
        >
          Data Management
        </Text>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearData}
        >
          <Ionicons
            name="trash-outline"
            size={22}
            color="#D32F2F"
          />

          <Text style={styles.clearText}>
            Clear App Data
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>
          Campus Connect
        </Text>

        <Text style={styles.versionNumber}>
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

  darkContainer: {
    backgroundColor: "#202124",
  },

  header: {
    height: 90,
    backgroundColor: "#6C63FF",
    paddingTop: 25,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerSpace: {
    width: 42,
  },

  content: {
    padding: 18,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    marginBottom: 12,
  },

  darkText: {
    color: "#FFFFFF",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 22,
    elevation: 3,
  },

  settingRow: {
    minHeight: 75,
    flexDirection: "row",
    alignItems: "center",
  },

  optionRow: {
    minHeight: 75,
    flexDirection: "row",
    alignItems: "center",
  },

  settingIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  settingContent: {
    flex: 1,
    paddingRight: 8,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  settingSubtitle: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
    lineHeight: 16,
  },

  dangerTitle: {
    color: "#D32F2F",
  },

  clearButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D32F2F",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  clearText: {
    color: "#D32F2F",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },

  version: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 28,
  },

  versionNumber: {
    textAlign: "center",
    color: "#AAAAAA",
    fontSize: 11,
    marginTop: 4,
  },
});