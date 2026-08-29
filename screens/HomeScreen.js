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
      description:
        "Learn React Native development with practical examples.",
      icon: "code-slash-outline",
    },
    {
      id: 2,
      title: "Hackathon",
      description:
        "Participate in the upcoming college hackathon.",
      icon: "trophy-outline",
    },
    {
      id: 3,
      title: "Placement Drive",
      description:
        "New placement opportunities are available.",
      icon: "briefcase-outline",
    },
    {
      id: 4,
      title: "Exams",
      description:
        "Semester examinations are scheduled soon.",
      icon: "book-outline",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Technical Fest",
      date: "September 5, 2026",
      icon: "calendar-outline",
    },
    {
      id: 2,
      title: "Coding Contest",
      date: "September 10, 2026",
      icon: "code-outline",
    },
    {
      id: 3,
      title: "Cultural Event",
      date: "September 15, 2026",
      icon: "musical-notes-outline",
    },
  ];

  const filteredNotices = notices.filter((notice) =>
    notice.title
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const filteredEvents = events.filter((event) =>
    event.title
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            Welcome back 👋
          </Text>

          <Text style={styles.headerTitle}>
            Campus Connect
          </Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() =>
            navigation.navigate("Profile")
          }
        >
          <Ionicons
            name="person"
            size={25}
            color="#6C63FF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={23}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search notices or events..."
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
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>
              Hello, Student! 🎓
            </Text>

            <Text style={styles.welcomeDescription}>
              Stay updated with the latest college
              notices and events.
            </Text>
          </View>

          <Ionicons
            name="school-outline"
            size={60}
            color="#FFFFFF"
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Access
        </Text>

        <View style={styles.quickContainer}>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() =>
              navigation.navigate("Notices")
            }
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="notifications-outline"
                size={27}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickTitle}>
              Notices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() =>
              navigation.navigate("Events")
            }
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="calendar-outline"
                size={27}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickTitle}>
              Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() =>
              navigation.navigate("Profile")
            }
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="person-outline"
                size={27}
                color="#6C63FF"
              />
            </View>

            <Text style={styles.quickTitle}>
              Profile
            </Text>
          </TouchableOpacity>

        </View>

        {/* Notices */}
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

        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
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
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons
              name="search-outline"
              size={40}
              color="#999"
            />

            <Text style={styles.emptyText}>
              No notices found
            </Text>
          </View>
        )}

        {/* Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Upcoming Events
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

        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() =>
                navigation.navigate("Events")
              }
            >
              <View style={styles.eventIcon}>
                <Ionicons
                  name={event.icon}
                  size={26}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>
                  {event.title}
                </Text>

                <Text style={styles.eventDate}>
                  {event.date}
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
          <View style={styles.emptyCard}>
            <Ionicons
              name="calendar-outline"
              size={40}
              color="#999"
            />

            <Text style={styles.emptyText}>
              No events found
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Campus Connect
          </Text>

          <Text style={styles.footerText}>
            Stay connected with your campus.
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeText: {
    color: "#E7E5FF",
    fontSize: 13,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 4,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  searchContainer: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 18,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },

  welcomeCard: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  welcomeContent: {
    flex: 1,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 7,
  },

  welcomeDescription: {
    color: "#E7E5FF",
    fontSize: 13,
    lineHeight: 19,
    paddingRight: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },

  viewAll: {
    color: "#6C63FF",
    fontWeight: "bold",
    fontSize: 13,
  },

  quickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 22,
  },

  quickCard: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    elevation: 3,
  },

  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  quickTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  noticeIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  noticeDescription: {
    fontSize: 12,
    color: "#888",
    lineHeight: 17,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  eventContent: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  eventDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    marginBottom: 15,
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
    marginTop: 8,
  },

  footer: {
    alignItems: "center",
    marginTop: 20,
  },

  footerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#777",
  },

  footerText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});