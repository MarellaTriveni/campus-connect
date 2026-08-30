import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function NoticeScreen() {
  const [readNotices, setReadNotices] = useState([]);

  const notices = [
    {
      id: 1,
      title: "React Native Workshop",
      description:
        "Learn React Native development with practical examples.",
      date: "Today",
      icon: "code-slash-outline",
    },
    {
      id: 2,
      title: "Hackathon",
      description:
        "Participate in the upcoming college hackathon.",
      date: "Yesterday",
      icon: "trophy-outline",
    },
    {
      id: 3,
      title: "Placement Drive",
      description:
        "New placement opportunities are available for students.",
      date: "2 days ago",
      icon: "briefcase-outline",
    },
    {
      id: 4,
      title: "Semester Exams",
      description:
        "Semester examination schedule has been updated.",
      date: "3 days ago",
      icon: "book-outline",
    },
    {
      id: 5,
      title: "College Holiday",
      description:
        "The college will remain closed on the announced holiday.",
      date: "5 days ago",
      icon: "calendar-outline",
    },
  ];

  const toggleRead = (id, title) => {
    if (readNotices.includes(id)) {
      setReadNotices(
        readNotices.filter((item) => item !== id)
      );
    } else {
      setReadNotices([...readNotices, id]);

      Alert.alert(
        "Notice Opened",
        `${title} marked as read.`
      );
    }
  };

  const unreadCount =
    notices.length - readNotices.length;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSmall}>
            Campus Connect
          </Text>

          <Text style={styles.headerTitle}>
            Notices
          </Text>
        </View>

        <View style={styles.notificationCircle}>
          <Ionicons
            name="notifications"
            size={28}
            color="#6C63FF"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryTitle}>
              Latest Updates 📢
            </Text>

            <Text style={styles.summaryText}>
              {unreadCount} unread notice
              {unreadCount !== 1 ? "s" : ""}
            </Text>
          </View>

          <View style={styles.countCircle}>
            <Text style={styles.countText}>
              {unreadCount}
            </Text>
          </View>
        </View>

        {/* Section */}
        <Text style={styles.sectionTitle}>
          All Notices
        </Text>

        {/* Notice List */}
        {notices.map((notice) => {
          const isRead = readNotices.includes(notice.id);

          return (
            <TouchableOpacity
              key={notice.id}
              style={[
                styles.noticeCard,
                isRead && styles.readCard,
              ]}
              onPress={() =>
                toggleRead(notice.id, notice.title)
              }
              activeOpacity={0.7}
            >
              {/* Icon */}
              <View
                style={[
                  styles.iconContainer,
                  isRead && styles.readIcon,
                ]}
              >
                <Ionicons
                  name={notice.icon}
                  size={27}
                  color={isRead ? "#999" : "#6C63FF"}
                />
              </View>

              {/* Content */}
              <View style={styles.noticeContent}>
                <View style={styles.titleRow}>
                  <Text
                    style={[
                      styles.noticeTitle,
                      isRead && styles.readTitle,
                    ]}
                  >
                    {notice.title}
                  </Text>

                  {!isRead && (
                    <View style={styles.unreadDot} />
                  )}
                </View>

                <Text
                  style={styles.description}
                  numberOfLines={2}
                >
                  {notice.description}
                </Text>

                <View style={styles.dateRow}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="#999"
                  />

                  <Text style={styles.date}>
                    {notice.date}
                  </Text>

                  <Text style={styles.status}>
                    {isRead ? "Read" : "Unread"}
                  </Text>
                </View>
              </View>

              {/* Arrow */}
              <Ionicons
                name="chevron-forward"
                size={21}
                color="#999"
              />
            </TouchableOpacity>
          );
        })}

        {/* Bottom Information */}
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={23}
            color="#6C63FF"
          />

          <Text style={styles.infoText}>
            Tap any notice to mark it as read or unread.
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

  headerSmall: {
    color: "#E7E5FF",
    fontSize: 13,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 3,
  },

  notificationCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 16,
    paddingBottom: 35,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
  },

  summaryText: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },

  countCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EEEDFF",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 13,
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  readCard: {
    backgroundColor: "#F0F0F0",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  readIcon: {
    backgroundColor: "#E1E1E1",
  },

  noticeContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  noticeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },

  readTitle: {
    color: "#777",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6C63FF",
    marginLeft: 5,
  },

  description: {
    fontSize: 12,
    color: "#888",
    lineHeight: 17,
    marginTop: 5,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  date: {
    fontSize: 11,
    color: "#999",
    marginLeft: 4,
  },

  status: {
    fontSize: 11,
    color: "#6C63FF",
    marginLeft: 10,
    fontWeight: "600",
  },

  infoBox: {
    backgroundColor: "#EEEDFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#666",
    marginLeft: 9,
  },
});