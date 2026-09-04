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
  const [searchText, setSearchText] = useState("");

  const notices = [
    {
      id: 1,
      title: "React Native Workshop",
      description: "Learn React Native development.",
      icon: "code-slash-outline",
    },
    {
      id: 2,
      title: "Placement Drive",
      description: "New placement opportunities available.",
      icon: "briefcase-outline",
    },
    {
      id: 3,
      title: "Hackathon",
      description: "Participate in the upcoming hackathon.",
      icon: "trophy-outline",
    },
  ];

  const filteredNotices = notices.filter((notice) =>
    notice.title
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
  <TouchableOpacity
    style={styles.quickButton}
    onPress={() => navigation.navigate("Saved")}
  >
    <Ionicons name="bookmark" size={24} color="#6C63FF" />
    <Text style={styles.quickButtonText}>Saved</Text>
  </TouchableOpacity>

  const openScreen = (screenName) => {
    if (navigation) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>
            Welcome back 👋
          </Text>

          <Text style={styles.headerTitle}>
            Campus Connect
          </Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => alert("You have 3 notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={26}
            color="#6C63FF"
          />

          <View style={styles.notificationBadge}>
            <Text style={styles.badgeNumber}>
              3
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>
              Hello, Student! 🎓
            </Text>

            <Text style={styles.welcomeText}>
              Stay updated with your campus activities.
            </Text>
          </View>

          <Ionicons
            name="school-outline"
            size={55}
            color="#FFFFFF"
          />
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search notices..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchText("")}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickActions}>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openScreen("Notice")}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="notifications-outline"
                size={27}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.actionText}>
              Notices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openScreen("Event")}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="calendar-outline"
                size={27}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.actionText}>
              Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openScreen("Profile")}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="person-outline"
                size={27}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.actionText}>
              Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => alert("More features coming soon")}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="apps-outline"
                size={27}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.actionText}>
              More
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

        {/* Notice Cards */}
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <TouchableOpacity
              key={notice.id}
              style={styles.noticeCard}
              activeOpacity={0.8}
              onPress={() => openScreen("Notice")}
            >
              <View style={styles.noticeIcon}>
                <Ionicons
                  name={notice.icon}
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
                  numberOfLines={1}
                >
                  {notice.description}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyBox}>
            <Ionicons
              name="search-outline"
              size={40}
              color="#AAA"
            />

            <Text style={styles.emptyText}>
              No notices found
            </Text>
          </View>
        )}

        {/* Upcoming Event */}
        <Text style={styles.sectionTitle}>
          Upcoming Event
        </Text>

        <TouchableOpacity
          style={styles.eventCard}
          onPress={() => openScreen("Event")}
          activeOpacity={0.8}
        >
          <View style={styles.eventDate}>
            <Text style={styles.eventDay}>
              05
            </Text>

            <Text style={styles.eventMonth}>
              SEP
            </Text>
          </View>

          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>
              Technical Fest
            </Text>

            <View style={styles.eventInfo}>
              <Ionicons
                name="time-outline"
                size={14}
                color="#777"
              />

              <Text style={styles.eventText}>
                10:00 AM
              </Text>
            </View>

            <View style={styles.eventInfo}>
              <Ionicons
                name="location-outline"
                size={14}
                color="#777"
              />

              <Text style={styles.eventText}>
                College Auditorium
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons
            name="heart-outline"
            size={16}
            color="#999"
          />

          <Text style={styles.footerText}>
            Campus Connect • Stay Connected
          </Text>
        </View>

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
    backgroundColor: "#6C63FF",
    paddingTop: 50,
    paddingBottom: 22,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallText: {
    color: "#E5E3FF",
    fontSize: 13,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 4,
  },

  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationBadge: {
    position: "absolute",
    right: 3,
    top: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF4D67",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeNumber: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  welcomeCard: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    elevation: 4,
  },

  welcomeContent: {
    flex: 1,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  welcomeText: {
    color: "#E7E5FF",
    fontSize: 12,
    marginTop: 7,
    lineHeight: 18,
  },

  searchBox: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 22,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  actionText: {
    color: "#444",
    fontSize: 13,
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: "#6C63FF",
    fontSize: 13,
    fontWeight: "bold",
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
    elevation: 2,
  },

  noticeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  noticeDescription: {
    fontSize: 11,
    color: "#888",
    marginTop: 5,
  },

  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
  },

  emptyText: {
    color: "#999",
    fontSize: 13,
    marginTop: 8,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },

  eventDate: {
    width: 55,
    height: 62,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  eventDay: {
    color: "#6C63FF",
    fontSize: 22,
    fontWeight: "bold",
  },

  eventMonth: {
    color: "#6C63FF",
    fontSize: 10,
    fontWeight: "bold",
  },

  eventContent: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 5,
  },

  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  eventText: {
    fontSize: 11,
    color: "#888",
    marginLeft: 5,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  footerText: {
    color: "#999",
    fontSize: 11,
    marginLeft: 5,
  },
});