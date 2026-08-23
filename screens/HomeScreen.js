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

export default function HomeScreen({ navigation }) {
  const attendance = 82;
  const noticesCount = 4;
  const eventsCount = 3;
  const semesterProgress = 68;

  const showAttendance = () => {
    Alert.alert(
      "Attendance",
      `Your current attendance is ${attendance}%.`
    );
  };

  const showSemesterProgress = () => {
    Alert.alert(
      "Semester Progress",
      `You have completed ${semesterProgress}% of the semester.`
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.name}>Triveni</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate("Notice")}
        >
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#6C63FF"
          />

          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>4</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>
            Welcome to Campus Connect
          </Text>

          <Text style={styles.welcomeText}>
            Manage your college activities,
            notices and events in one place.
          </Text>
        </View>

        <Ionicons
          name="school-outline"
          size={65}
          color="#FFFFFF"
        />
      </View>

      {/* Dashboard */}
      <Text style={styles.sectionTitle}>
        My Dashboard
      </Text>

      <View style={styles.statsContainer}>

        {/* Attendance */}
        <TouchableOpacity
          style={styles.statCard}
          onPress={showAttendance}
        >
          <View style={styles.statIcon}>
            <Ionicons
              name="checkmark-circle-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <Text style={styles.statNumber}>
            {attendance}%
          </Text>

          <Text style={styles.statTitle}>
            Attendance
          </Text>
        </TouchableOpacity>

        {/* Notices */}
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate("Notice")}
        >
          <View style={styles.statIcon}>
            <Ionicons
              name="notifications-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <Text style={styles.statNumber}>
            {noticesCount}
          </Text>

          <Text style={styles.statTitle}>
            New Notices
          </Text>
        </TouchableOpacity>

        {/* Events */}
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate("Event")}
        >
          <View style={styles.statIcon}>
            <Ionicons
              name="calendar-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <Text style={styles.statNumber}>
            {eventsCount}
          </Text>

          <Text style={styles.statTitle}>
            Events
          </Text>
        </TouchableOpacity>

        {/* Semester */}
        <TouchableOpacity
          style={styles.statCard}
          onPress={showSemesterProgress}
        >
          <View style={styles.statIcon}>
            <Ionicons
              name="school-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <Text style={styles.statNumber}>
            {semesterProgress}%
          </Text>

          <Text style={styles.statTitle}>
            Semester
          </Text>
        </TouchableOpacity>

      </View>

      {/* Attendance Progress */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>
              Attendance Progress
            </Text>

            <Text style={styles.progressSubtitle}>
              Current semester
            </Text>
          </View>

          <Text style={styles.progressPercentage}>
            {attendance}%
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${attendance}%` },
            ]}
          />
        </View>

        <Text style={styles.progressMessage}>
          Keep attending classes regularly!
        </Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.quickContainer}>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => navigation.navigate("Notice")}
        >
          <Ionicons
            name="megaphone-outline"
            size={25}
            color="#6C63FF"
          />

          <Text style={styles.quickText}>
            Notices
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => navigation.navigate("Event")}
        >
          <Ionicons
            name="calendar-outline"
            size={25}
            color="#6C63FF"
          />

          <Text style={styles.quickText}>
            Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons
            name="person-outline"
            size={25}
            color="#6C63FF"
          />

          <Text style={styles.quickText}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>

      {/* Today's Reminder */}
      <View style={styles.reminderCard}>
        <View style={styles.reminderIcon}>
          <Ionicons
            name="alarm-outline"
            size={28}
            color="#6C63FF"
          />
        </View>

        <View style={styles.reminderContent}>
          <Text style={styles.reminderTitle}>
            Today's Reminder
          </Text>

          <Text style={styles.reminderText}>
            Check the latest college notices
            and upcoming events.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Campus Connect • Dashboard
      </Text>

    </ScrollView>
  );
}

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

  greeting: {
    fontSize: 13,
    color: "#888",
  },

  name: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#333",
    marginTop: 3,
  },

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    position: "relative",
  },

  notificationBadge: {
    position: "absolute",
    right: 4,
    top: 3,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#FF4D4D",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  welcomeCard: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  welcomeContent: {
    flex: 1,
    paddingRight: 10,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  welcomeText: {
    color: "#E8E7FF",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 13,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },

  statIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  statTitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 17,
    marginBottom: 25,
    elevation: 3,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  progressSubtitle: {
    fontSize: 11,
    color: "#888",
    marginTop: 3,
  },

  progressPercentage: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#E8E8EE",
    borderRadius: 5,
    marginTop: 15,
    overflow: "hidden",
  },

  progressFill: {
    height: 10,
    backgroundColor: "#6C63FF",
    borderRadius: 5,
  },

  progressMessage: {
    fontSize: 11,
    color: "#888",
    marginTop: 9,
  },

  quickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  quickButton: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
  },

  quickText: {
    color: "#555",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 7,
  },

  reminderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },

  reminderIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  reminderContent: {
    flex: 1,
  },

  reminderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  reminderText: {
    fontSize: 12,
    color: "#777",
    lineHeight: 18,
    marginTop: 4,
  },

  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginBottom: 30,
  },
});