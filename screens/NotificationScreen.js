import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const initialNotifications = [
  {
    id: "1",
    title: "New Event Added",
    message: "Coding Contest has been added to upcoming events.",
    time: "Today, 10:30 AM",
    type: "Event",
    read: false,
  },
  {
    id: "2",
    title: "New Notice",
    message: "A new college notice has been published.",
    time: "Today, 09:15 AM",
    type: "Notice",
    read: false,
  },
  {
    id: "3",
    title: "Registration Successful",
    message: "Your event registration was completed successfully.",
    time: "Yesterday, 05:20 PM",
    type: "Registration",
    read: true,
  },
  {
    id: "4",
    title: "Event Reminder",
    message: "Coding Contest is coming soon. Check event details.",
    time: "Yesterday, 02:10 PM",
    type: "Reminder",
    read: true,
  },
  {
    id: "5",
    title: "Placement Drive",
    message: "Placement Drive information is now available.",
    time: "2 days ago",
    type: "Placement",
    read: false,
  },
];

const filters = ["All", "Unread", "Event", "Notice", "Registration"];

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

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

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const filteredNotifications = notifications.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.message.toLowerCase().includes(searchText) ||
      item.type.toLowerCase().includes(searchText);

    let matchesFilter = true;

    if (selectedFilter === "Unread") {
      matchesFilter = !item.read;
    } else if (selectedFilter !== "All") {
      matchesFilter = item.type === selectedFilter;
    }

    return matchesSearch && matchesFilter;
  });

  const getIcon = (type) => {
    switch (type) {
      case "Event":
        return "calendar-outline";

      case "Notice":
        return "megaphone-outline";

      case "Registration":
        return "checkmark-circle-outline";

      case "Reminder":
        return "alarm-outline";

      case "Placement":
        return "briefcase-outline";

      default:
        return "notifications-outline";
    }
  };

  const renderNotification = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.read && styles.unreadCard,
        ]}
        onPress={() => markAsRead(item.id)}
      >
        <View
          style={[
            styles.iconBox,
            !item.read && styles.unreadIconBox,
          ]}
        >
          <Ionicons
            name={getIcon(item.type)}
            size={25}
            color="#2563EB"
          />
        </View>

        <View style={styles.notificationContent}>
          <View style={styles.titleRow}>
            <Text style={styles.notificationTitle}>
              {item.title}
            </Text>

            {!item.read && (
              <View style={styles.unreadDot} />
            )}
          </View>

          <Text style={styles.message}>
            {item.message}
          </Text>

          <View style={styles.bottomRow}>
            <Text style={styles.time}>
              {item.time}
            </Text>

            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <Text style={styles.headerSubtitle}>
            {unreadCount} unread
          </Text>
        </View>

        <TouchableOpacity
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Ionicons
            name="checkmark-done-outline"
            size={27}
            color={
              unreadCount === 0
                ? "#9DB7EF"
                : "#fff"
            }
          />
        </TouchableOpacity>
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
          placeholder="Search notifications..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter Buttons */}
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === item &&
                styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === item &&
                  styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Result Count */}
      <Text style={styles.resultText}>
        {filteredNotifications.length} notification
        {filteredNotifications.length !== 1 ? "s" : ""}
      </Text>

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={70}
            color="#aaa"
          />

          <Text style={styles.emptyTitle}>
            No Notifications
          </Text>

          <Text style={styles.emptyText}>
            No notifications match your search or filter.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#2563EB",
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerCenter: {
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#DCE7FF",
    fontSize: 13,
    marginTop: 3,
  },

  searchBox: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  filterList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 17,
    paddingVertical: 8,
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterText: {
    color: "#555",
    fontSize: 14,
  },

  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },

  resultText: {
    marginHorizontal: 18,
    marginBottom: 8,
    color: "#666",
    fontSize: 14,
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    elevation: 2,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F0F2F5",
    justifyContent: "center",
    alignItems: "center",
  },

  unreadIconBox: {
    backgroundColor: "#E8F0FF",
  },

  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#2563EB",
    marginLeft: 8,
  },

  message: {
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },

  time: {
    color: "#888",
    fontSize: 12,
  },

  typeBadge: {
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
  },

  typeText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 80,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#444",
    marginTop: 15,
  },

  emptyText: {
    color: "#777",
    fontSize: 14,
    textAlign: "center",
    marginTop: 7,
  },
});