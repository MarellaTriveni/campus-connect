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

export default function NoticeScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const notices = [
    {
      id: 1,
      title: "React Native Workshop",
      description:
        "Learn React Native development with practical examples.",
      date: "Today",
      category: "Academic",
      icon: "code-slash-outline",
    },
    {
      id: 2,
      title: "Hackathon",
      description:
        "Participate in the upcoming college hackathon.",
      date: "Yesterday",
      category: "Events",
      icon: "trophy-outline",
    },
    {
      id: 3,
      title: "Placement Drive",
      description:
        "New placement opportunities are available for students.",
      date: "2 days ago",
      category: "Placement",
      icon: "briefcase-outline",
    },
    {
      id: 4,
      title: "Semester Exams",
      description:
        "Semester examination schedule has been updated.",
      date: "3 days ago",
      category: "Academic",
      icon: "book-outline",
    },
    {
      id: 5,
      title: "College Cultural Event",
      description:
        "Students can participate in the upcoming cultural event.",
      date: "5 days ago",
      category: "Events",
      icon: "musical-notes-outline",
    },
    {
      id: 6,
      title: "Internship Opportunities",
      description:
        "New internship opportunities are available for students.",
      date: "1 week ago",
      category: "Placement",
      icon: "business-outline",
    },
  ];

  const categories = [
    "All",
    "Academic",
    "Placement",
    "Events",
  ];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      notice.description
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            Campus Connect
          </Text>

          <Text style={styles.headerTitle}>
            Notices 📢
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="notifications"
            size={27}
            color="#6C63FF"
          />
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
                size={21}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category */}
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
          <Text style={styles.sectionTitle}>
            Latest Notices
          </Text>

          <Text style={styles.resultCount}>
            {filteredNotices.length} found
          </Text>
        </View>

        {/* Notices */}
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <TouchableOpacity
              key={notice.id}
              style={styles.noticeCard}
              activeOpacity={0.8}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={notice.icon}
                  size={27}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.noticeContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.noticeTitle}>
                    {notice.title}
                  </Text>

                  <View style={styles.categoryBadge}>
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
                    name="time-outline"
                    size={14}
                    color="#999"
                  />

                  <Text style={styles.date}>
                    {notice.date}
                  </Text>
                </View>
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
              size={50}
              color="#aaa"
            />

            <Text style={styles.emptyTitle}>
              No Notices Found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or category.
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

  smallTitle: {
    color: "#E5E3FF",
    fontSize: 13,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  searchBox: {
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 3,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },

  categoryTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  categoryScroll: {
    marginBottom: 20,
  },

  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selectedCategory: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  categoryText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },

  selectedCategoryText: {
    color: "#fff",
  },

  resultRow: {
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

  resultCount: {
    fontSize: 12,
    color: "#777",
  },

  noticeCard: {
    backgroundColor: "#fff",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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

  categoryBadge: {
    backgroundColor: "#EEEDFF",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 5,
  },

  badgeText: {
    color: "#6C63FF",
    fontSize: 9,
    fontWeight: "bold",
  },

  description: {
    fontSize: 12,
    color: "#888",
    lineHeight: 17,
    marginTop: 6,
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

  emptyBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 35,
    alignItems: "center",
    marginTop: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: "#999",
    marginTop: 5,
  },
});