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

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem(
        SETTINGS_KEY
      );

      if (savedSettings) {
        const settings = JSON.parse(savedSettings);

        setEmailNotifications(
          settings.emailNotifications
        );

        setRegistrationEmails(
          settings.registrationEmails
        );

        setNoticeEmails(settings.noticeEmails);

        setReminderEmails(settings.reminderEmails);
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    }
  };

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
        "Settings Saved",
        "Your notification settings have been saved."
      );
    } catch (error) {
      console.log("Error saving settings:", error);

      Alert.alert(
        "Error",
        "Unable to save settings."
      );
    }
  };

  const toggleEmailNotifications = (value) => {
    setEmailNotifications(value);

    if (!value) {
      setRegistrationEmails(false);
      setNoticeEmails(false);
      setReminderEmails(false);
    }
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
        {/* Email Section */}
        <Text style={styles.sectionTitle}>
          Email Notifications
        </Text>

        <View style={styles.card}>
          {/* Main Email Switch */}
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

          {/* Registration Emails */}
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
                Get an email after event registration
              </Text>
            </View>

            <Switch
              value={registrationEmails}
              onValueChange={setRegistrationEmails}
              disabled={!emailNotifications}
            />
          </View>

          <View style={styles.divider} />

          {/* Notice Emails */}
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

          {/* Reminder Emails */}
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
                Get reminders before registered events
              </Text>
            </View>

            <Switch
              value={reminderEmails}
              onValueChange={setReminderEmails}
              disabled={!emailNotifications}
            />
          </View>
        </View>

        {/* Information */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={23}
            color="#6C63FF"
          />

          <Text style={styles.infoText}>
            These settings control which email updates
            you want to receive from Campus Connect.
          </Text>
        </View>

        {/* Save Button */}
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

  infoCard: {
    backgroundColor: "#EEEEFF",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    color: "#555",
    fontSize: 13,
    lineHeight: 19,
  },

  saveButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },
});