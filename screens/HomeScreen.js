import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  // Upcoming Event
  const upcomingEvent = {
    title: "Coding Contest",
    category: "Technical",
    date: "15 September 2026",
    time: "11:00 AM",
    venue: "Computer Lab",
  };

  // Calculate days remaining
  const calculateDaysLeft = () => {
    const eventDate = new Date(2026, 8, 15);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const difference = eventDate - today;
    return Math.max(
      Math.ceil(difference / (1000 * 60 * 60 * 24)),
      0
    );
  };

  const daysLeft = calculateDaysLeft();

  // Latest Notices
  const notices = [
    {
      id: "1",
      title: "React Native Workshop",
      date: "10 September 2026",
      icon: "code-slash-outline",
    },
    {
      id: "2",
      title: "Hackathon Registration Open",
      date: "12 September 2026",
      icon: "trophy-outline",
    },
    {
      id: "3",
      title: "Placement Drive",
      date: "15 September 2026",
      icon: "briefcase-outline",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallHeaderText}>
            CAMPUS CONNECT
          </Text>

          <Text style={styles.headerTitle}>
            Student Dashboard
          </Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() =>
            navigation.navigate("Notifications")
          }
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
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeSmall}>
              Welcome back 👋
            </Text>

            <Text style={styles.welcomeTitle}>
              Triveni
            </Text>

            <Text style={styles.welcomeDescription}>
              Stay updated with your campus activities.
            </Text>
          </View>

          <View style={styles.welcomeIcon}>
            <Ionicons
              name="school-outline"
              size={42}
              color="#6C63FF"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickGrid}>
          {/* Notifications */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() =>
              navigation.navigate("Notifications")
            }
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="notifications-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickTitle}>
              Notifications
            </Text>

            <Text style={styles.quickSub}>
              3 new
            </Text>
          </TouchableOpacity>

          {/* Events */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() =>
              navigation.navigate("Events")
            }
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="calendar-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickTitle}>
              Events
            </Text>

            <Text style={styles.quickSub}>
              Explore events
            </Text>
          </TouchableOpacity>

          {/* Notices */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() =>
              navigation.navigate("Notices")
            }
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="megaphone-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickTitle}>
              Notices
            </Text>

            <Text style={styles.quickSub}>
              Latest updates
            </Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() =>
              navigation.navigate("Profile")
            }
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="person-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickTitle}>
              Profile
            </Text>

            <Text style={styles.quickSub}>
              View profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Event */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Upcoming Event
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Events")
            }
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventCard}>
          <View style={styles.eventTop}>
            <View style={styles.eventIcon}>
              <Ionicons
                name="trophy-outline"
                size={30}
                color="#6C63FF"
              />
            </View>

            <View style={styles.eventInfo}>
              <Text style={styles.eventCategory}>
                {upcomingEvent.category}
              </Text>

              <Text style={styles.eventTitle}>
                {upcomingEvent.title}
              </Text>
            </View>

            <View style={styles.daysBox}>
              <Text style={styles.daysNumber}>
                {daysLeft}
              </Text>

              <Text style={styles.daysText}>
                DAYS
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.eventDetailRow}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color="#666"
            />

            <Text style={styles.eventDetail}>
              {upcomingEvent.date}
            </Text>
          </View>

          <View style={styles.eventDetailRow}>
            <Ionicons
              name="time-outline"
              size={18}
              color="#666"
            />

            <Text style={styles.eventDetail}>
              {upcomingEvent.time}
            </Text>
          </View>

          <View style={styles.eventDetailRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color="#666"
            />

            <Text style={styles.eventDetail}>
              {upcomingEvent.venue}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.eventButton}
            onPress={() =>
              navigation.navigate("Events")
            }
          >
            <Text style={styles.eventButtonText}>
              View Event
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Latest Notices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Latest Notices
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Notices")
            }
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {notices.map((notice) => (
          <TouchableOpacity
            key={notice.id}
            style={styles.noticeCard}
            onPress={() =>
              navigation.navigate("Notices")
            }
          >
            <View style={styles.noticeIcon}>
              <Ionicons
                name={notice.icon}
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>
                {notice.title}
              </Text>

              <Text style={styles.noticeDate}>
                {notice.date}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        ))}

        {/* My Registrations */}
        <TouchableOpacity
          style={styles.registrationCard}
          onPress={() =>
            navigation.navigate("MyRegistrations")
          }
        >
          <View style={styles.registrationIcon}>
            <Ionicons
              name="clipboard-outline"
              size={28}
              color="#6C63FF"
            />
          </View>

          <View style={styles.registrationContent}>
            <Text style={styles.registrationTitle}>
              My Registrations
            </Text>

            <Text style={styles.registrationSub}>
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
          style={styles.registrationCard}
          onPress={() =>
            navigation.navigate("Saved")
          }
        >
          <View style={styles.registrationIcon}>
            <Ionicons
              name="bookmark-outline"
              size={28}
              color="#6C63FF"
            />
          </View>

          <View style={styles.registrationContent}>
            <Text style={styles.registrationTitle}>
              Saved Items
            </Text>

            <Text style={styles.registrationSub}>
              View your saved notices and events
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#777"
          />
        </TouchableOpacity>

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
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallHeaderText: {
    color: "#DCD9FF",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 3,
  },

  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#5B53D6",
    justifyContent: "center",
    alignItems: "center",
  },

  notificationBadge: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#FF4D6D",
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
    paddingBottom: 30,
  },

  welcomeCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    marginBottom: 20,
  },

  welcomeText: {
    flex: 1,
  },

  welcomeSmall: {
    color: "#777",
    fontSize: 13,
  },

  welcomeTitle: {
    color: "#222",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 3,
  },

  welcomeDescription: {
    color: "#777",
    fontSize: 13,
    marginTop: 5,
  },

  welcomeIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },

  quickGrid: {
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
    elevation: 2,
  },

  quickIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  quickTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },

  quickSub: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 12,
  },

  eventCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 17,
    marginBottom: 22,
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
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginTop: 3,
  },

  daysBox: {
    backgroundColor: "#EEEEFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },

  daysNumber: {
    color: "#6C63FF",
    fontSize: 21,
    fontWeight: "bold",
  },

  daysText: {
    color: "#6C63FF",
    fontSize: 9,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 14,
  },

  eventDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  eventDetail: {
    color: "#666",
    fontSize: 13,
    marginLeft: 8,
  },

  eventButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 11,
    paddingVertical: 12,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  eventButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 7,
  },

  noticeCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  noticeIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },

  noticeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },

  noticeDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  registrationCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  registrationIcon: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  registrationContent: {
    flex: 1,
    marginLeft: 12,
  },

  registrationTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },

  registrationSub: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});