import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const notices = [
    {
      id: "1",
      title: "React Native Workshop",
      category: "Events",
      description: "Workshop on React Native development.",
    },
    {
      id: "2",
      title: "Placement Drive",
      category: "Placement",
      description: "Placement drive for final year students.",
    },
    {
      id: "3",
      title: "Semester Exams",
      category: "Academic",
      description: "Semester examination schedule announced.",
    },
  ];

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.welcomeText}>
              Welcome Back 
            </Text>

            <Text style={styles.appTitle}>
              Campus Connect
            </Text>
          </View>

          {/* ONLY NOTIFICATION ICON */}
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={27}
              color="#6C63FF"
            />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* WELCOME CARD */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.helloText}>
              Hello, Student!
            </Text>

            <Text style={styles.welcomeDescription}>
              Stay updated with college notices, events and announcements.
            </Text>
          </View>

          <Ionicons
            name="school-outline"
            size={65}
            color="white"
          />
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search notices..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickGrid}>

          {/* Notices */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Notices")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="notifications-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Notices
            </Text>
          </TouchableOpacity>

          {/* Events */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Events")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="calendar-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Events
            </Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="person-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Profile
            </Text>
          </TouchableOpacity>

          {/* Saved */}
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Saved")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="bookmark-outline"
                size={25}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickText}>
              Saved
            </Text>
          </TouchableOpacity>

        </View>

        {/* MY REGISTRATIONS */}
        <TouchableOpacity
          style={styles.registrationCard}
          onPress={() =>
            navigation.navigate("MyRegistrations")
          }
        >
          <View style={styles.registrationIcon}>
            <Ionicons
              name="clipboard-outline"
              size={26}
              color="#6C63FF"
            />
          </View>

          <View style={styles.registrationContent}>
            <Text style={styles.registrationTitle}>
              My Registrations
            </Text>

            <Text style={styles.registrationSubtitle}>
              View your registered events
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={23}
            color="#777"
          />
        </TouchableOpacity>

        {/* LATEST NOTICES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Latest Notices
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Notice")}
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {filteredNotices.map((notice) => (
          <TouchableOpacity
            key={notice.id}
            style={styles.noticeCard}
            onPress={() => navigation.navigate("Notice")}
          >
            <View style={styles.noticeIcon}>
              <Ionicons
                name="megaphone-outline"
                size={23}
                color="#6C63FF"
              />
            </View>

            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>
                {notice.title}
              </Text>

              <Text style={styles.noticeCategory}>
                {notice.category}
              </Text>

              <Text
                style={styles.noticeDescription}
                numberOfLines={1}
              >
                {notice.description}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        ))}

        {/* UPCOMING EVENT */}
        <Text style={styles.sectionTitle}>
          Upcoming Event
        </Text>

        <TouchableOpacity
          style={styles.eventCard}
          onPress={() => navigation.navigate("Event")}
        >
          <View style={styles.eventIcon}>
            <Ionicons
              name="calendar"
              size={30}
              color="#6C63FF"
            />
          </View>

          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>
              React Native Workshop
            </Text>

            <Text style={styles.eventDate}>
              10 September 2026
            </Text>

            <Text style={styles.eventVenue}>
              Seminar Hall
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#777"
          />
        </TouchableOpacity>

        <View style={{ height: 25 }} />

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
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flex: 1,
  },

  welcomeText: {
    color: "#777",
    fontSize: 16,
    marginBottom: 5,
  },

  appTitle: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    right: -2,
    top: -3,
    backgroundColor: "#FF4D5A",
    width: 19,
    height: 19,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },

  welcomeCard: {
    margin: 20,
    padding: 25,
    backgroundColor: "#6C63FF",
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeContent: {
    flex: 1,
    marginRight: 10,
  },

  helloText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },

  welcomeDescription: {
    color: "white",
    fontSize: 15,
    lineHeight: 22,
  },

  searchBox: {
    backgroundColor: "white",
    marginHorizontal: 20,
    height: 55,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 17,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  quickText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  registrationCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 2,
    padding: 16,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  registrationIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  registrationContent: {
    flex: 1,
    marginLeft: 12,
  },

  registrationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  registrationSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
  },

  viewAll: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginTop: 25,
  },

  noticeCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
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
  },

  noticeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  noticeCategory: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  noticeDescription: {
    color: "#777",
    fontSize: 12,
    marginTop: 3,
  },

  eventCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  eventIcon: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  eventContent: {
    flex: 1,
    marginLeft: 12,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  eventDate: {
    color: "#6C63FF",
    marginTop: 5,
    fontSize: 13,
  },

  eventVenue: {
    color: "#777",
    marginTop: 3,
    fontSize: 12,
  },
});