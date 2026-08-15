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

      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello Student </Text>
          <Text style={styles.heading}>Campus Connect</Text>
        </View>

        <TouchableOpacity style={styles.notification}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#4B3F72"
          />
        </TouchableOpacity>
      </View>

      {/* Welcome Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>
            Welcome Back!
          </Text>

          <Text style={styles.bannerDescription}>
            Stay updated with everything happening on your campus.
          </Text>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate("Notice")}
          >
            <Text style={styles.exploreText}>
              Explore Notices
            </Text>

            <Ionicons
              name="arrow-forward"
              size={16}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bannerIcon}>
          <Ionicons
            name="school"
            size={55}
            color="#FFFFFF"
          />
        </View>
      </View>

      {/* Dashboard */}
      <Text style={styles.sectionTitle}>
        Dashboard
      </Text>

      <View style={styles.dashboard}>

        {/* Notices */}
        <TouchableOpacity
          style={styles.dashboardCard}
          onPress={() => navigation.navigate("Notice")}
        >
          <View style={styles.cardIcon}>
            <Ionicons
              name="notifications"
              size={26}
              color="#6C5B9B"
            />
          </View>

          <Text style={styles.cardNumber}>04</Text>
          <Text style={styles.cardTitle}>Notices</Text>
        </TouchableOpacity>

        {/* Events */}
        <TouchableOpacity
          style={styles.dashboardCard}
        >
          <View style={styles.cardIcon}>
            <Ionicons
              name="calendar"
              size={26}
              color="#6C5B9B"
            />
          </View>

          <Text style={styles.cardNumber}>02</Text>
          <Text style={styles.cardTitle}>Events</Text>
        </TouchableOpacity>

        {/* Tasks */}
        <TouchableOpacity
          style={styles.dashboardCard}
        >
          <View style={styles.cardIcon}>
            <Ionicons
              name="checkmark-circle"
              size={26}
              color="#6C5B9B"
            />
          </View>

          <Text style={styles.cardNumber}>06</Text>
          <Text style={styles.cardTitle}>Tasks</Text>
        </TouchableOpacity>

        {/* Students */}
        <TouchableOpacity
          style={styles.dashboardCard}
        >
          <View style={styles.cardIcon}>
            <Ionicons
              name="people"
              size={26}
              color="#6C5B9B"
            />
          </View>

          <Text style={styles.cardNumber}>120+</Text>
          <Text style={styles.cardTitle}>Students</Text>
        </TouchableOpacity>

      </View>

      {/* Latest Notice */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Latest Notice
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Notice")}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noticeCard}>

        <View style={styles.noticeIcon}>
          <Ionicons
            name="megaphone-outline"
            size={25}
            color="#6C5B9B"
          />
        </View>

        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>
            React Native Workshop
          </Text>

          <Text style={styles.noticeDescription}>
            Workshop registration is now open for students.
          </Text>

          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color="#777"
            />

            <Text style={styles.dateText}>
              10 August 2026
            </Text>
          </View>
        </View>

      </View>

      {/* Upcoming Event */}
      <Text style={styles.sectionTitle}>
        Upcoming Event
      </Text>

      <View style={styles.eventCard}>

        <View style={styles.eventDate}>
          <Text style={styles.eventDay}>
            20
          </Text>

          <Text style={styles.eventMonth}>
            AUG
          </Text>
        </View>

        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>
            Coding Contest
          </Text>

          <View style={styles.eventInfo}>
            <Ionicons
              name="time-outline"
              size={15}
              color="#777"
            />

            <Text style={styles.eventText}>
              11:00 AM
            </Text>
          </View>

          <View style={styles.eventInfo}>
            <Ionicons
              name="location-outline"
              size={15}
              color="#777"
            />

            <Text style={styles.eventText}>
              Computer Lab
            </Text>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#999"
        />

      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.actions}>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="calendar-outline"
            size={22}
            color="#6C5B9B"
          />
          <Text style={styles.actionText}>
            Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="person-outline"
            size={22}
            color="#6C5B9B"
          />
          <Text style={styles.actionText}>
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="help-circle-outline"
            size={22}
            color="#6C5B9B"
          />
          <Text style={styles.actionText}>
            Help
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  hello: {
    fontSize: 14,
    color: "#777",
  },

  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#4B3F72",
    marginTop: 4,
  },

  notification: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    backgroundColor: "#6C5B9B",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  bannerText: {
    flex: 1,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerDescription: {
    color: "#EEEAF8",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 7,
  },

  bannerIcon: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: "#8172AD",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  exploreButton: {
    backgroundColor: "#4B3F72",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 12,
  },

  exploreText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  dashboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  dashboardCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },

  cardIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  cardNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4B3F72",
    marginTop: 10,
  },

  cardTitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: "#6C5B9B",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12,
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    marginBottom: 25,
    elevation: 2,
  },

  noticeIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  noticeDescription: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
    lineHeight: 18,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  dateText: {
    fontSize: 11,
    color: "#777",
    marginLeft: 5,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    elevation: 2,
  },

  eventDate: {
    width: 58,
    height: 62,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  eventDay: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4B3F72",
  },

  eventMonth: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#6C5B9B",
  },

  eventContent: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },

  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  eventText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 5,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  actionButton: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    marginTop: 7,
  },
});