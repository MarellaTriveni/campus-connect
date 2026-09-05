import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Workshop Available",
      message: "React Native Workshop registration is now open.",
      type: "Workshop",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Coding Contest",
      message: "Coding Contest will be conducted this Saturday.",
      type: "Event",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Placement Drive",
      message: "A new company has announced a placement drive.",
      type: "Placement",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Exam Notice",
      message: "Semester examination schedule has been updated.",
      type: "Academic",
      time: "Yesterday",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const deleteNotification = (id) => {
    Alert.alert(
      "Delete Notification",
      "Do you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setNotifications((current) =>
              current.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const getIcon = (type) => {
    if (type === "Workshop") {
      return "school";
    }

    if (type === "Event") {
      return "calendar";
    }

    if (type === "Placement") {
      return "briefcase";
    }

    return "document-text";
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <View>
          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <Text style={styles.headerSubtitle}>
            Stay updated with Campus Connect
          </Text>
        </View>

        <View style={styles.countCircle}>
          <Text style={styles.countText}>
            {unreadCount}
          </Text>
        </View>

      </View>

      {/* Mark All Read */}
      {unreadCount > 0 && (
        <TouchableOpacity
          style={styles.markAllButton}
          onPress={markAllAsRead}
        >
          <Ionicons
            name="checkmark-done"
            size={18}
            color="#6C63FF"
          />

          <Text style={styles.markAllText}>
            Mark all as read
          </Text>
        </TouchableOpacity>
      )}

      {/* Notification List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {notifications.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Ionicons
              name="notifications-off-outline"
              size={70}
              color="#6C63FF"
            />

            <Text style={styles.emptyTitle}>
              No Notifications
            </Text>

            <Text style={styles.emptyText}>
              You are all caught up!
            </Text>

          </View>

        ) : (

          notifications.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={[
                styles.notificationCard,
                !item.read && styles.unreadCard,
              ]}
              onPress={() => markAsRead(item.id)}
            >

              {/* Icon */}
              <View
                style={[
                  styles.iconContainer,
                  !item.read && styles.unreadIcon,
                ]}
              >
                <Ionicons
                  name={getIcon(item.type)}
                  size={26}
                  color="#6C63FF"
                />
              </View>

              {/* Notification Content */}
              <View style={styles.notificationContent}>

                <View style={styles.titleRow}>

                  <Text
                    style={[
                      styles.notificationTitle,
                      !item.read && styles.boldTitle,
                    ]}
                  >
                    {item.title}
                  </Text>

                  {!item.read && (
                    <View style={styles.dot} />
                  )}

                </View>

                <Text style={styles.message}>
                  {item.message}
                </Text>

                <View style={styles.bottomRow}>

                  <Text style={styles.time}>
                    {item.time}
                  </Text>

                  <Text style={styles.type}>
                    {item.type}
                  </Text>

                </View>

              </View>

              {/* Delete */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  deleteNotification(item.id)
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#888888"
                />
              </TouchableOpacity>

            </TouchableOpacity>

          ))

        )}

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
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#E8E7FF",
    marginTop: 5,
  },

  countCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  markAllButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 15,
    marginRight: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#EEEEFF",
    borderRadius: 10,
  },

  markAllText: {
    color: "#6C63FF",
    fontWeight: "600",
    marginLeft: 5,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 2,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#6C63FF",
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F1F1F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  unreadIcon: {
    backgroundColor: "#EEEEFF",
  },

  notificationContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationTitle: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },

  boldTitle: {
    fontWeight: "bold",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6C63FF",
    marginLeft: 5,
  },

  message: {
    fontSize: 13,
    color: "#777777",
    lineHeight: 19,
    marginTop: 5,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  time: {
    fontSize: 11,
    color: "#999999",
  },

  type: {
    fontSize: 11,
    color: "#6C63FF",
    fontWeight: "600",
  },

  deleteButton: {
    padding: 5,
    marginLeft: 5,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 120,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 14,
    color: "#777777",
    marginTop: 7,
  },
});