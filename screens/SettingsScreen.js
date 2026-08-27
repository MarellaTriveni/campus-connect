import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const showPrivacy = () => {
    Alert.alert(
      "Privacy",
      "Your personal information is kept private."
    );
  };

  const showProfile = () => {
    navigation.navigate("Main", {
      screen: "Profile",
    });
  };

  return (
    <View
      style={[
        styles.container,
        darkMode && styles.darkContainer,
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Settings
          </Text>

          <View style={{ width: 45 }} />
        </View>

        {/* Preferences */}
        <Text
          style={[
            styles.sectionTitle,
            darkMode && styles.darkText,
          ]}
        >
          Preferences
        </Text>

        {/* Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.iconBox}>
            <Ionicons
              name="notifications-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.settingText}>
            <Text style={styles.title}>
              Notifications
            </Text>

            <Text style={styles.subtitle}>
              Receive updates about notices and events
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{
              false: "#ccc",
              true: "#B7B0FF",
            }}
            thumbColor={
              notifications ? "#6C63FF" : "#fff"
            }
          />
        </View>

        {/* Dark Mode */}
        <View style={styles.settingItem}>
          <View style={styles.iconBox}>
            <Ionicons
              name="moon-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.settingText}>
            <Text style={styles.title}>
              Dark Mode
            </Text>

            <Text style={styles.subtitle}>
              Change your appearance preference
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{
              false: "#ccc",
              true: "#B7B0FF",
            }}
            thumbColor={
              darkMode ? "#6C63FF" : "#fff"
            }
          />
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

        {/* Privacy */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={showPrivacy}
        >
          <View style={styles.iconBox}>
            <Ionicons
              name="lock-closed-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.settingText}>
            <Text style={styles.title}>
              Privacy
            </Text>

            <Text style={styles.subtitle}>
              Manage your privacy information
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#999"
          />
        </TouchableOpacity>

        {/* My Profile */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={showProfile}
        >
          <View style={styles.iconBox}>
            <Ionicons
              name="person-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.settingText}>
            <Text style={styles.title}>
              My Profile
            </Text>

            <Text style={styles.subtitle}>
              View and edit your profile
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={24}
            color="#999"
          />
        </TouchableOpacity>

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
    backgroundColor: "#181818",
  },

  header: {
    height: 125,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 25,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 12,
  },

  darkText: {
    color: "#fff",
  },

  settingItem: {
    minHeight: 105,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  settingText: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#999",
  },
});