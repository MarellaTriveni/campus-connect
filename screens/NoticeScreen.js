import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NoticeScreen() {
  const [search, setSearch] = useState("");

  const notices = [
    {
      title: "React Native Workshop",
      description:
        "A workshop on React Native development will be conducted for students.",
      date: "10 Aug 2026",
      category: "Workshop",
      icon: "code-slash-outline",
    },
    {
      title: "Hackathon Registration",
      description:
        "Students can register for the upcoming college hackathon.",
      date: "12 Aug 2026",
      category: "Event",
      icon: "trophy-outline",
    },
    {
      title: "Placement Drive",
      description:
        "Placement drive details and registration information are available.",
      date: "15 Aug 2026",
      category: "Placement",
      icon: "briefcase-outline",
    },
    {
      title: "Semester Examinations",
      description:
        "Students are requested to check the examination schedule.",
      date: "20 Aug 2026",
      category: "Examination",
      icon: "school-outline",
    },
  ];

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>Campus Updates</Text>
          <Text style={styles.title}>Notices 📢</Text>
        </View>

        <View style={styles.iconCircle}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#4B3F72"
          />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#777"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search notices..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Notice Count */}
      <View style={styles.countRow}>
        <Text style={styles.sectionTitle}>
          Latest Notices
        </Text>

        <Text style={styles.countText}>
          {filteredNotices.length} Notices
        </Text>
      </View>

      {/* Notices */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, index) => (
            <TouchableOpacity
              key={index}
              style={styles.noticeCard}
              activeOpacity={0.8}
            >

              {/* Icon */}
              <View style={styles.noticeIcon}>
                <Ionicons
                  name={notice.icon}
                  size={27}
                  color="#6C5B9B"
                />
              </View>

              {/* Content */}
              <View style={styles.noticeContent}>

                <View style={styles.titleRow}>
                  <Text
                    style={styles.noticeTitle}
                    numberOfLines={2}
                  >
                    {notice.title}
                  </Text>

                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {notice.category}
                    </Text>
                  </View>
                </View>

                <Text
                  style={styles.description}
                  numberOfLines={2}
                >
                  {notice.description}
                </Text>

                <View style={styles.dateRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={15}
                    color="#777"
                  />

                  <Text style={styles.dateText}>
                    {notice.date}
                  </Text>
                </View>

              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#999"
              />

            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={50}
              color="#aaa"
            />

            <Text style={styles.emptyTitle}>
              No notices found
            </Text>

            <Text style={styles.emptyText}>
              Try searching with a different keyword.
            </Text>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  smallTitle: {
    fontSize: 14,
    color: "#777",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4B3F72",
    marginTop: 3,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    height: 52,
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
    fontSize: 15,
    marginLeft: 10,
    color: "#333",
  },

  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  countText: {
    fontSize: 13,
    color: "#6C5B9B",
    fontWeight: "600",
  },

  list: {
    paddingBottom: 30,
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 3,
  },

  noticeIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#E9E4F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  noticeContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  noticeTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },

  badge: {
    backgroundColor: "#EEEAF8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 10,
    color: "#6C5B9B",
    fontWeight: "bold",
  },

  description: {
    fontSize: 13,
    color: "#777",
    lineHeight: 18,
    marginTop: 7,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  dateText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 5,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },
});