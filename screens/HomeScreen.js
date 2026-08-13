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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Good Morning </Text>
          <Text style={styles.title}>Campus Connect</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color="#4B3F72"
          />
        </TouchableOpacity>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeIcon}>
          <Ionicons
            name="school-outline"
            size={38}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>
            Welcome to Campus Connect!
          </Text>

          <Text style={styles.welcomeDescription}>
            Stay updated with your college notices, events and
            important campus information.
          </Text>
        </View>
      </View>

      {/* Campus Highlights */}
      <Text style={styles.sectionTitle}>
        Campus Highlights
      </Text>

      <View style={styles.highlightContainer}>
        {/* Notices */}
        <TouchableOpacity
          style={styles.highlightCard}
          onPress={() => navigation.navigate("Notice")}
        >
          <View style={styles.highlightIcon}>
            <Ionicons
              name="notifications-outline"
              size={28}
              color="#4B3F72"
            />
          </View>

          <Text style={styles.highlightNumber}>4</Text>
          <Text style={styles.highlightText}>Notices</Text>
        </TouchableOpacity>

        {/* Events */}
        <TouchableOpacity style={styles.highlightCard}>
          <View style={styles.highlightIcon}>
            <Ionicons
              name="calendar-outline"
              size={28}
              color="#4B3F72"
            />
          </View>

          <Text style={styles.highlightNumber}>2</Text>
          <Text style={styles.highlightText}>Events</Text>
        </TouchableOpacity>

        {/* Students */}
        <TouchableOpacity style={styles.highlightCard}>
          <View style={styles.highlightIcon}>
            <Ionicons
              name="people-outline"
              size={28}
              color="#4B3F72"
            />
          </View>

          <Text style={styles.highlightNumber}>120+</Text>
          <Text style={styles.highlightText}>Students</Text>
        </TouchableOpacity>

        {/* Updates */}
        <TouchableOpacity style={styles.highlightCard}>
          <View style={styles.highlightIcon}>
            <Ionicons
              name="sparkles-outline"
              size={28}
              color="#4B3F72"
            />
          </View>

          <Text style={styles.highlightNumber}>New</Text>
          <Text style={styles.highlightText}>Updates</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access */}
      <Text style={styles.sectionTitle}>
        Quick Access
      </Text>

      <View style={styles.quickContainer}>
        <TouchableOpacity
          style={styles.quickCard}
          onPress={() => navigation.navigate("Notice")}
        >
          <Ionicons
            name="megaphone-outline"
            size={30}
            color="#4B3F72"
          />
          <Text style={styles.quickText}>Notices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Ionicons
            name="calendar-outline"
            size={30}
            color="#4B3F72"
          />
          <Text style={styles.quickText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickCard}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons
            name="person-outline"
            size={30}
            color="#4B3F72"
          />
          <Text style={styles.quickText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Ionicons
            name="information-circle-outline"
            size={30}
            color="#4B3F72"
          />
          <Text style={styles.quickText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Update */}
      <Text style={styles.sectionTitle}>
        Today's Update
      </Text>

      <View style={styles.updateCard}>
        <View style={styles.updateIcon}>
          <Ionicons
            name="information-circle-outline"
            size={28}
            color="#4B3F72"
          />
        </View>

        <View style={styles.updateContent}>
          <Text style={styles.updateTitle}>
            Stay Updated
          </Text>

          <Text style={styles.updateText}>
            Check the latest notices and upcoming events regularly.
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

  welcomeIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#8172AD",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeContent: {
    flex: 1,
    marginLeft: 15,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  welcomeDescription: {
    color: "#F0EDF8",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  highlightContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  highlightCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },

  highlightIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  highlightNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B3F72",
  },

  highlightText: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
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

  updateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    elevation: 2,
  },

  updateIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  updateContent: {
    flex: 1,
    marginLeft: 14,
  },

  updateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  updateText: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
    lineHeight: 18,
  },
});