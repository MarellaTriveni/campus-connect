import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  // Upcoming event date
  const eventDate = new Date(2026, 8, 15); // 15 September 2026

  useEffect(() => {
    calculateDaysLeft();

    const timer = setInterval(() => {
      calculateDaysLeft();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const calculateDaysLeft = () => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const difference = eventDate - today;
    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    setDaysLeft(Math.max(days, 0));
  };

  // Quick action navigation
  const openNotifications = () => {
    navigation.navigate("Notifications");
  };

  const openEvents = () => {
    navigation.navigate("Events");
  };

  const openNotices = () => {
    navigation.navigate("Notices");
  };

  const openProfile = () => {
    navigation.navigate("Profile");
  };

  const openRegistrations = () => {
    navigation.navigate("MyRegistrations");
  };

  const openSaved = () => {
    navigation.navigate("Saved");
  };

  const openReminders = () => {
    navigation.navigate("EventReminders");
  };

  const showEventDetails = () => {
    Alert.alert(
      "Coding Contest",
      "Date: 15 September 2026\nTime: 11:00 AM\nVenue: Computer Lab",
      [
        {
          text: "Open Events",
          onPress: () => navigation.navigate("Events"),
        },
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>CAMPUS CONNECT</Text>
          <Text style={styles.headerSubtitle}>Student Dashboard</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={openNotifications}
        >
          <Ionicons
            name="notifications-outline"
            size={25}
            color="white"
          />

          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIcon}>
            <Ionicons
              name="person"
              size={28}
              color="#6C63FF"
            />
          </View>

          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeSmall}>
              Welcome back 👋
            </Text>

            <Text style={styles.welcomeName}>
              Triveni
            </Text>

            <Text style={styles.welcomeMessage}>
              Stay updated with your campus activities.
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickActions}>

          {/* Notifications */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={openNotifications}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="notifications-outline"
                size={26}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Notifications
            </Text>
          </TouchableOpacity>

          {/* Events */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={openEvents}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="calendar-outline"
                size={26}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Events
            </Text>
          </TouchableOpacity>

          {/* Notices */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={openNotices}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="newspaper-outline"
                size={26}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Notices
            </Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={openProfile}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="person-outline"
                size={26}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Profile
            </Text>
          </TouchableOpacity>

        </View>

        {/* Upcoming Event */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Upcoming Event
          </Text>

          <TouchableOpacity onPress={openEvents}>
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.eventCard}
          onPress={showEventDetails}
        >

          <View style={styles.eventTop}>

            <View style={styles.eventIcon}>
              <Ionicons
                name="code-slash-outline"
                size={30}
                color="#6C63FF"
              />
            </View>

            <View style={styles.eventInfo}>
              <Text style={styles.eventCategory}>
                Technical
              </Text>

              <Text style={styles.eventTitle}>
                Coding Contest
              </Text>
            </View>

            <View style={styles.daysBox}>
              <Text style={styles.daysNumber}>
                {daysLeft}
              </Text>

              <Text style={styles.daysLabel}>
                DAYS
              </Text>
            </View>

          </View>

          <View style={styles.eventDivider} />

          <View style={styles.eventDetail}>
            <Ionicons
              name="calendar-outline"
              size={17}
              color="#777"
            />

            <Text style={styles.detailText}>
              15 September 2026
            </Text>
          </View>

          <View style={styles.eventDetail}>
            <Ionicons
              name="time-outline"
              size={17}
              color="#777"
            />

            <Text style={styles.detailText}>
              11:00 AM
            </Text>
          </View>

          <View style={styles.eventDetail}>
            <Ionicons
              name="location-outline"
              size={17}
              color="#777"
            />

            <Text style={styles.detailText}>
              Computer Lab
            </Text>
          </View>

          <View style={styles.eventButton}>
            <Text style={styles.eventButtonText}>
              View Event Details
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#6C63FF"
            />
          </View>

        </TouchableOpacity>

        {/* Event Reminders */}
        <TouchableOpacity
          style={styles.reminderCard}
          onPress={openReminders}
        >

          <View style={styles.reminderIcon}>
            <Ionicons
              name="alarm-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>
              Event Reminders
            </Text>

            <Text style={styles.reminderSubtitle}>
              Set reminders for upcoming events
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#777"
          />

        </TouchableOpacity>

        {/* Latest Notices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Latest Notices
          </Text>

          <TouchableOpacity onPress={openNotices}>
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notice 1 */}
        <TouchableOpacity
          style={styles.noticeCard}
          onPress={openNotices}
        >
          <View style={styles.noticeIcon}>
            <Ionicons
              name="school-outline"
              size={24}
              color="#6C63FF"
            />
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              React Native Workshop
            </Text>

            <Text style={styles.noticeDate}>
              30 July 2026
            </Text>

            <Text style={styles.noticeDescription}>
              Workshop information and registration details.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {/* Notice 2 */}
        <TouchableOpacity
          style={styles.noticeCard}
          onPress={openNotices}
        >
          <View style={styles.noticeIcon}>
            <Ionicons
              name="trophy-outline"
              size={24}
              color="#6C63FF"
            />
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              Hackathon
            </Text>

            <Text style={styles.noticeDate}>
              10 August 2026
            </Text>

            <Text style={styles.noticeDescription}>
              Participate in the upcoming college hackathon.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {/* Notice 3 */}
        <TouchableOpacity
          style={styles.noticeCard}
          onPress={openNotices}
        >
          <View style={styles.noticeIcon}>
            <Ionicons
              name="briefcase-outline"
              size={24}
              color="#6C63FF"
            />
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              Placement Drive
            </Text>

            <Text style={styles.noticeDate}>
              15 August 2026
            </Text>

            <Text style={styles.noticeDescription}>
              Placement drive details for eligible students.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {/* My Registrations */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={openRegistrations}
        >

          <View style={styles.actionIcon}>
            <Ionicons
              name="checkmark-circle-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>
              My Registrations
            </Text>

            <Text style={styles.actionSubtitle}>
              View your registered events
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#777"
          />

        </TouchableOpacity>

        {/* Saved Items */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={openSaved}
        >

          <View style={styles.actionIcon}>
            <Ionicons
              name="bookmark-outline"
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>
              Saved Items
            </Text>

            <Text style={styles.actionSubtitle}>
              View your saved notices and events
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#777"
          />

        </TouchableOpacity>

        {/* Bottom Space */}
        <View style={{ height: 30 }} />

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  header: {
    height: 75,
    backgroundColor: "#6C63FF",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  appName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  headerSubtitle: {
    color: "#E8E7FF",
    fontSize: 12,
    marginTop: 3,
  },

  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  notificationBadge: {
    position: "absolute",
    right: 1,
    top: 1,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  scrollContent: {
    padding: 15,
  },

  welcomeCard: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    marginBottom: 20,
  },

  welcomeIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeContent: {
    flex: 1,
    marginLeft: 13,
  },

  welcomeSmall: {
    fontSize: 12,
    color: "#777",
  },

  welcomeName: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222",
    marginTop: 2,
  },

  welcomeMessage: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },

  viewAll: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12,
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  quickIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  quickText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
  },

  eventCard: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
  },

  eventTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  eventIcon: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  eventInfo: {
    flex: 1,
    marginLeft: 12,
  },

  eventCategory: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "600",
  },

  eventTitle: {
    color: "#222",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 3,
  },

  daysBox: {
    backgroundColor: "#EEEEFF",
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: "center",
  },

  daysNumber: {
    color: "#6C63FF",
    fontSize: 20,
    fontWeight: "bold",
  },

  daysLabel: {
    color: "#6C63FF",
    fontSize: 8,
    fontWeight: "bold",
  },

  eventDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 13,
  },

  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  detailText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 13,
  },

  eventButton: {
    marginTop: 7,
    height: 42,
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  eventButtonText: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 7,
  },

  reminderCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  reminderIcon: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  reminderContent: {
    flex: 1,
    marginLeft: 12,
  },

  reminderTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },

  reminderSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  noticeCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  noticeIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  noticeContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  noticeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },

  noticeDate: {
    fontSize: 11,
    color: "#6C63FF",
    marginTop: 3,
    fontWeight: "600",
  },

  noticeDescription: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },

  actionCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  actionContent: {
    flex: 1,
    marginLeft: 12,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },

  actionSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

});