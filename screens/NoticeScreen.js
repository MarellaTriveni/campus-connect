import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NoticeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "React Native Workshop",
      description:
        "A workshop on React Native app development will be conducted for students.",
      category: "Academic",
      date: "04 September 2026",
      read: false,
    },
    {
      id: 2,
      title: "Hackathon 2026",
      description:
        "Students can register for the upcoming college hackathon.",
      category: "Events",
      date: "08 September 2026",
      read: false,
    },
    {
      id: 3,
      title: "Placement Drive",
      description:
        "A placement drive is being organized for eligible students.",
      category: "Placement",
      date: "12 September 2026",
      read: true,
    },
    {
      id: 4,
      title: "Semester Examination",
      description:
        "The semester examination schedule has been updated.",
      category: "Academic",
      date: "20 September 2026",
      read: true,
    },
    {
      id: 5,
      title: "Cultural Fest",
      description:
        "Students are invited to participate in the annual cultural fest.",
      category: "Events",
      date: "25 September 2026",
      read: false,
    },
  ]);

  const categories = [
    "All",
    "Academic",
    "Placement",
    "Events",
  ];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const unreadCount = notices.filter(
    (notice) => !notice.read
  ).length;

  const markAsRead = (id) => {
    setNotices((currentNotices) =>
      currentNotices.map((notice) =>
        notice.id === id
          ? { ...notice, read: true }
          : notice
      )
    );
  };

  const openNotice = (notice) => {
    markAsRead(notice.id);

    Alert.alert(
      notice.title,
      `${notice.description}\n\nCategory: ${notice.category}\nDate: ${notice.date}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            Notices
          </Text>

          <Text style={styles.headerSubtitle}>
            College announcements and updates
          </Text>
        </View>

        <View style={styles.countBox}>
          <Ionicons
            name="notifications"
            size={20}
            color="#6C63FF"
          />

          <Text style={styles.countText}>
            {unreadCount}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Search */}
        <View style={styles.searchBox}>
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
                size={20}
                color="#999999"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <Text style={styles.categoryTitle}>
          Categories
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category &&
                  styles.selectedCategory,
              ]}
              onPress={() =>
                setSelectedCategory(category)
              }
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category &&
                    styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Result Count */}
        <View style={styles.resultRow}>
          <Text style={styles.resultText}>
            {filteredNotices.length} notice
            {filteredNotices.length !== 1 ? "s" : ""} found
          </Text>

          {unreadCount > 0 && (
            <Text style={styles.unreadText}>
              {unreadCount} unread
            </Text>
          )}
        </View>

        {/* Notices */}
        {filteredNotices.length === 0 ? (

          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-text-outline"
              size={65}
              color="#6C63FF"
            />

            <Text style={styles.emptyTitle}>
              No Notices Found
            </Text>

            <Text style={styles.emptyText}>
              Try a different search or category.
            </Text>
          </View>

        ) : (

          filteredNotices.map((notice) => (

            <TouchableOpacity
              key={notice.id}
              style={[
                styles.noticeCard,
                !notice.read && styles.unreadCard,
              ]}
              onPress={() => openNotice(notice)}
            >

              {/* Notice Icon */}
              <View style={styles.iconBox}>
                <Ionicons
                  name={
                    notice.category === "Events"
                      ? "calendar-outline"
                      : notice.category === "Placement"
                      ? "briefcase-outline"
                      : "document-text-outline"
                  }
                  size={27}
                  color="#6C63FF"
                />
              </View>

              {/* Notice Content */}
              <View style={styles.noticeContent}>

                <View style={styles.titleRow}>

                  <Text
                    style={[
                      styles.noticeTitle,
                      !notice.read &&
                        styles.unreadTitle,
                    ]}
                  >
                    {notice.title}
                  </Text>

                  {!notice.read && (
                    <View style={styles.unreadDot} />
                  )}

                </View>

                <Text
                  style={styles.description}
                  numberOfLines={2}
                >
                  {notice.description}
                </Text>

                <View style={styles.bottomRow}>

                  <View style={styles.dateRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#888888"
                    />

                    <Text style={styles.dateText}>
                      {notice.date}
                    </Text>
                  </View>

                  <Text style={styles.categoryLabel}>
                    {notice.category}
                  </Text>

                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#999999"
              />

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
    fontSize: 27,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#E8E7FF",
    marginTop: 5,
  },

  countBox: {
    backgroundColor: "#FFFFFF",
    minWidth: 50,
    height: 45,
    borderRadius: 23,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 5,
  },

  content: {
    padding: 16,
    paddingBottom: 35,
  },

  searchBox: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333333",
  },

  categoryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },

  categoryScroll: {
    marginBottom: 15,
  },

  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 9,
    paddingHorizontal: 17,
    borderRadius: 20,
    marginRight: 8,
    elevation: 1,
  },

  selectedCategory: {
    backgroundColor: "#6C63FF",
  },

  categoryText: {
    color: "#666666",
    fontSize: 13,
    fontWeight: "600",
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  resultText: {
    fontSize: 13,
    color: "#777777",
  },

  unreadText: {
    fontSize: 13,
    color: "#6C63FF",
    fontWeight: "bold",
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
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

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  noticeContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  noticeTitle: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },

  unreadTitle: {
    fontWeight: "bold",
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
    color: "#777777",
    lineHeight: 18,
    marginTop: 5,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    fontSize: 10,
    color: "#888888",
    marginLeft: 4,
  },

  categoryLabel: {
    fontSize: 10,
    color: "#6C63FF",
    fontWeight: "bold",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 40,
    alignItems: "center",
    marginTop: 20,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 13,
    color: "#777777",
    marginTop: 7,
    textAlign: "center",
  },
});