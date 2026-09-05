import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const notices = [
    {
      id: 1,
      title: "React Native Workshop",
      description: "Learn React Native app development.",
      category: "Technical",
    },
    {
      id: 2,
      title: "Hackathon 2026",
      description: "Register for the upcoming college hackathon.",
      category: "Events",
    },
    {
      id: 3,
      title: "Placement Drive",
      description: "New placement drive announced for students.",
      category: "Placement",
    },
    {
      id: 4,
      title: "Exams by Tomorrow",
      description: "Check the latest examination schedule.",
      category: "Academic",
    },
  ];

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase())
  );

  const openScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Welcome Back 👋</Text>

          <Text style={styles.headerTitle}>
            Campus Connect
          </Text>
        </View>

        {/* Notification Button */}
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => openScreen("Notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={26}
            color="#6C63FF"
          />

          {/* Notification Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>
              Hello, Student! 🎓
            </Text>

            <Text style={styles.welcomeDescription}>
              Stay updated with college notices,
              events and announcements.
            </Text>
          </View>

          <Ionicons
            name="school-outline"
            size={55}
            color="#FFFFFF"
          />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#777777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search notices..."
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
            >
              <Ionicons
                name="close-circle"
                size={21}
                color="#999999"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>
        </View>

        <View style={styles.quickActions}>

          {/* Notices */}
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => openScreen("Notice")}
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
            style={styles.quickButton}
            onPress={() => openScreen("Event")}
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
            style={styles.quickButton}
            onPress={() => openScreen("Profile")}
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
            style={styles.quickButton}
            onPress={() => openScreen("Saved")}
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

        {/* Latest Notices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Latest Notices
          </Text>

          <TouchableOpacity
            onPress={() => openScreen("Notice")}
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {filteredNotices.length === 0 ? (

          <View style={styles.noResults}>
            <Ionicons
              name="search-outline"
              size={40}
              color="#999999"
            />

            <Text style={styles.noResultsText}>
              No notices found
            </Text>
          </View>

        ) : (

          filteredNotices.map((notice) => (

            <TouchableOpacity
              key={notice.id}
              style={styles.noticeCard}
              onPress={() => openScreen("Notice")}
            >

              <View style={styles.noticeIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={25}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.noticeContent}>

                <Text style={styles.noticeTitle}>
                  {notice.title}
                </Text>

                <Text
                  style={styles.noticeDescription}
                  numberOfLines={2}
                >
                  {notice.description}
                </Text>

                <Text style={styles.noticeCategory}>
                  {notice.category}
                </Text>

              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#999999"
              />

            </TouchableOpacity>

          ))
        )}

        {/* Upcoming Event */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Upcoming Event
          </Text>
        </View>

        <TouchableOpacity
          style={styles.eventCard}
          onPress={() => openScreen("Event")}
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
              Technical Fest 2026
            </Text>

            <View style={styles.eventInfo}>
              <Ionicons
                name="calendar-outline"
                size={15}
                color="#777777"
              />

              <Text style={styles.eventInfoText}>
                15 September 2026
              </Text>
            </View>

            <View style={styles.eventInfo}>
              <Ionicons
                name="location-outline"
                size={15}
                color="#777777"
              />

              <Text style={styles.eventInfoText}>
                College Auditorium
              </Text>
            </View>

          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999999"
          />

        </TouchableOpacity>

        {/* Notification Center */}
        <TouchableOpacity
          style={styles.notificationCard}
          onPress={() => openScreen("Notifications")}
        >

          <View style={styles.notificationIcon}>
            <Ionicons
              name="notifications"
              size={25}
              color="#6C63FF"
            />
          </View>

          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>
              Notification Center
            </Text>

            <Text style={styles.notificationText}>
              You have 2 unread notifications
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999999"
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

  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallText: {
    fontSize: 13,
    color: "#777777",
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222222",
  },

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    right: -1,
    top: -2,
    backgroundColor: "#FF5252",
    width: 19,
    height: 19,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 35,
  },

  welcomeCard: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  welcomeTextContainer: {
    flex: 1,
    marginRight: 10,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  welcomeDescription: {
    color: "#E8E7FF",
    fontSize: 13,
    marginTop: 7,
    lineHeight: 19,
  },

  searchContainer: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 22,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333333",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222222",
  },

  viewAll: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "600",
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  quickButton: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  quickIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  quickText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
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
    marginRight: 12,
  },

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },

  noticeDescription: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
    lineHeight: 17,
  },

  noticeCategory: {
    fontSize: 11,
    color: "#6C63FF",
    fontWeight: "600",
    marginTop: 5,
  },

  noResults: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginBottom: 15,
  },

  noResultsText: {
    color: "#777777",
    marginTop: 8,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginBottom: 15,
  },

  eventIcon: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  eventContent: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 6,
  },

  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  eventInfoText: {
    fontSize: 12,
    color: "#777777",
    marginLeft: 5,
  },

  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginBottom: 15,
  },

  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },

  notificationText: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
  },
});