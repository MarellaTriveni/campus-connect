import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "email_notification_settings";

const defaultSettings = {
  emailNotifications: true,
  registrationEmails: true,
  noticeEmails: true,
  reminderEmails: true,
};

const SettingsScreen = ({ navigation }) => {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [registrationEmails, setRegistrationEmails] =
    useState(true);

  const [noticeEmails, setNoticeEmails] =
    useState(true);

  const [reminderEmails, setReminderEmails] =
    useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  // Load saved settings
  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(
        SETTINGS_KEY
      );

      if (saved) {
        const settings = JSON.parse(saved);

        setEmailNotifications(
          settings.emailNotifications
        );

        setRegistrationEmails(
          settings.registrationEmails
        );

        setNoticeEmails(
          settings.noticeEmails
        );

        setReminderEmails(
          settings.reminderEmails
        );
      }
    } catch (error) {
      console.log("Load error:", error);
    }
  };

  // Save settings
  const saveSettings = async () => {
    try {
      const settings = {
        emailNotifications,
        registrationEmails,
        noticeEmails,
        reminderEmails,
      };

      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
      );

      Alert.alert(
        "Success",
        "Notification settings saved successfully."
      );
    } catch (error) {
      console.log("Save error:", error);

      Alert.alert(
        "Error",
        "Unable to save settings."
      );
    }
  };

  // Main notification switch
  const toggleEmailNotifications = (value) => {
    setEmailNotifications(value);

    if (!value) {
      setRegistrationEmails(false);
      setNoticeEmails(false);
      setReminderEmails(false);
    }
  };

  // Test notification
  const testNotification = () => {
    if (!emailNotifications) {
      Alert.alert(
        "Notifications Disabled",
        "Please turn ON Email Notifications first."
      );
      return;
    }

    Alert.alert(
      "Test Notification",
      "Test notification is working successfully! 📧"
    );
  };

  // Reset settings
  const resetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "Do you want to reset all notification settings?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: async () => {
            try {
              await AsyncStorage.setItem(
                SETTINGS_KEY,
                JSON.stringify(defaultSettings)
              );

              setEmailNotifications(true);
              setRegistrationEmails(true);
              setNoticeEmails(true);
              setReminderEmails(true);

              Alert.alert(
                "Reset Complete",
                "Notification settings restored to default."
              );
            } catch (error) {
              console.log("Reset error:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Settings
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Email Notifications */}
        <Text style={styles.sectionTitle}>
          Email Notifications
        </Text>

        <View style={styles.card}>

          {/* Main switch */}
          <View style={styles.settingRow}>

            <View style={styles.iconBox}>
              <Ionicons
                name="mail-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Email Notifications
              </Text>

              <Text style={styles.settingSubtitle}>
                Receive important updates through email
              </Text>
            </View>

            <Switch
              value={emailNotifications}
              onValueChange={
                toggleEmailNotifications
              }
            />

          </View>

          <View style={styles.divider} />

          {/* Registration */}
          <View style={styles.settingRow}>

            <View style={styles.iconBox}>
              <Ionicons
                name="checkmark-circle-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Registration Emails
              </Text>

              <Text style={styles.settingSubtitle}>
                Email after successful event registration
              </Text>
            </View>

            <Switch
              value={registrationEmails}
              onValueChange={setRegistrationEmails}
              disabled={!emailNotifications}
            />

          </View>

          <View style={styles.divider} />

          {/* Notice */}
          <View style={styles.settingRow}>

            <View style={styles.iconBox}>
              <Ionicons
                name="megaphone-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Notice Updates
              </Text>

              <Text style={styles.settingSubtitle}>
                Receive important college notices
              </Text>
            </View>

            <Switch
              value={noticeEmails}
              onValueChange={setNoticeEmails}
              disabled={!emailNotifications}
            />

          </View>

          <View style={styles.divider} />

          {/* Event reminders */}
          <View style={styles.settingRow}>

            <View style={styles.iconBox}>
              <Ionicons
                name="alarm-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Event Reminders
              </Text>

              <Text style={styles.settingSubtitle}>
                Receive reminders before events
              </Text>
            </View>

            <Switch
              value={reminderEmails}
              onValueChange={setReminderEmails}
              disabled={!emailNotifications}
            />

          </View>

        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>

          <Ionicons
            name={
              emailNotifications
                ? "checkmark-circle"
                : "close-circle"
            }
            size={25}
            color={
              emailNotifications
                ? "#2E9B5B"
                : "#D64545"
            }
          />

          <View style={styles.statusContent}>

            <Text style={styles.statusTitle}>
              Email Status
            </Text>

            <Text style={styles.statusText}>
              {emailNotifications
                ? "Email notifications are enabled"
                : "Email notifications are disabled"}
            </Text>

          </View>

        </View>

        {/* Test Notification */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={testNotification}
        >
          <Ionicons
            name="mail-open-outline"
            size={21}
            color="#6C63FF"
          />

          <Text style={styles.testButtonText}>
            Test Notification
          </Text>
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveSettings}
        >
          <Ionicons
            name="save-outline"
            size={21}
            color="white"
          />

          <Text style={styles.saveText}>
            Save Settings
          </Text>
        </TouchableOpacity>

        {/* Reset */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetSettings}
        >
          <Ionicons
            name="refresh-outline"
            size={20}
            color="#D64545"
          />

          <Text style={styles.resetText}>
            Reset Settings
          </Text>
        </TouchableOpacity>

        {/* Information */}
        <View style={styles.infoCard}>

          <Ionicons
            name="information-circle-outline"
            size={23}
            color="#6C63FF"
          />

          <Text style={styles.infoText}>
            You can change these preferences anytime.
            Actual email delivery will require a backend
            email service.
          </Text>

        </View>

      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  header: {
    height: 65,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  headerTitle: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },

  content: {
    padding: 15,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 18,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  settingContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },

  settingSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    lineHeight: 17,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  statusCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginBottom: 15,
  },

  statusContent: {
    marginLeft: 10,
  },

  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },

  statusText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  testButton: {
    height: 48,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#6C63FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  testButtonText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },

  saveButton: {
    height: 50,
    borderRadius: 11,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  saveText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },

  resetButton: {
    height: 48,
    borderRadius: 11,
    backgroundColor: "#FFF0F0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  resetText: {
    color: "#D64545",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 7,
  },

  infoCard: {
    backgroundColor: "#EEEEFF",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    color: "#555",
    fontSize: 13,
    lineHeight: 19,
  },
});