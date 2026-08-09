import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Welcome back </Text>
          <Text style={styles.title}>Campus Connect</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color="#4B3F72" />
        </TouchableOpacity>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Ionicons name="school-outline" size={40} color="#FFFFFF" />

        <View style={styles.welcomeText}>
          <Text style={styles.welcomeTitle}>
            Stay Connected!
          </Text>

          <Text style={styles.welcomeDescription}>
            Check the latest college updates, events and notices.
          </Text>
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
      </View>

      {/* Quick Access */}
      <View style={styles.quickContainer}>

        <TouchableOpacity style={styles.quickCard}>
          <Ionicons name="notifications-outline" size={30} color="#4B3F72" />
          <Text style={styles.quickText}>Notices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Ionicons name="calendar-outline" size={30} color="#4B3F72" />
          <Text style={styles.quickText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Ionicons name="person-outline" size={30} color="#4B3F72" />
          <Text style={styles.quickText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Ionicons name="information-circle-outline" size={30} color="#4B3F72" />
          <Text style={styles.quickText}>About</Text>
        </TouchableOpacity>

      </View>

      {/* Latest Notices */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Notices</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Notice")}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noticeCard}>
        <Ionicons name="megaphone-outline" size={28} color="#4B3F72" />

        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>
            React Native Workshop
          </Text>

          <Text style={styles.noticeDate}>
            August 10, 2026
          </Text>
        </View>
      </View>

      <View style={styles.noticeCard}>
        <Ionicons name="code-slash-outline" size={28} color="#4B3F72" />

        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>
            Hackathon Registration
          </Text>

          <Text style={styles.noticeDate}>
            Registration is now open
          </Text>
        </View>
      </View>

      {/* Upcoming Events */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
      </View>

      <View style={styles.eventCard}>
        <View style={styles.dateBox}>
          <Text style={styles.dateNumber}>15</Text>
          <Text style={styles.dateMonth}>AUG</Text>
        </View>

        <View>
          <Text style={styles.eventTitle}>Technical Fest</Text>
          <Text style={styles.eventDescription}>
            College Auditorium
          </Text>
        </View>
      </View>

      <View style={styles.eventCard}>
        <View style={styles.dateBox}>
          <Text style={styles.dateNumber}>20</Text>
          <Text style={styles.dateMonth}>AUG</Text>
        </View>

        <View>
          <Text style={styles.eventTitle}>Coding Contest</Text>
          <Text style={styles.eventDescription}>
            Computer Lab
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FC",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  smallText: {
    fontSize: 14,
    color: "#777",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4B3F72",
    marginTop: 4,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeCard: {
    backgroundColor: "#6C5B9B",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  welcomeText: {
    flex: 1,
    marginLeft: 15,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  welcomeDescription: {
    color: "#F0EDF8",
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  viewAll: {
    color: "#6C5B9B",
    fontWeight: "600",
  },

  quickContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },

  quickText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  noticeContent: {
    marginLeft: 15,
    flex: 1,
  },

  noticeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  noticeDate: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  dateBox: {
    backgroundColor: "#E9E4F7",
    borderRadius: 12,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  dateNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B3F72",
  },

  dateMonth: {
    fontSize: 11,
    color: "#4B3F72",
    fontWeight: "bold",
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  eventDescription: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },
});