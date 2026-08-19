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

const notices = [
  {
    id: 1,
    title: "React Native Workshop",
    category: "Workshop",
    date: "18 Aug 2026",
    description: "Learn React Native and build mobile applications.",
  },
  {
    id: 2,
    title: "Placement Drive",
    category: "Placement",
    date: "20 Aug 2026",
    description: "Campus placement drive for final year students.",
  },
  {
    id: 3,
    title: "Hackathon Registration",
    category: "Event",
    date: "22 Aug 2026",
    description: "Registration is open for the upcoming college hackathon.",
  },
  {
    id: 4,
    title: "Semester Examination",
    category: "Exam",
    date: "25 Aug 2026",
    description: "Semester examination schedule has been announced.",
  },
  {
    id: 5,
    title: "Holiday Announcement",
    category: "General",
    date: "28 Aug 2026",
    description: "College will remain closed on the announced holiday.",
  },
];

export default function NoticeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Workshop", "Placement", "Event", "Exam"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase());

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
          <Text style={styles.headerTitle}>College Notices</Text>
          <Text style={styles.headerSubtitle}>
            Latest campus updates
          </Text>
        </View>

        <Ionicons
          name="notifications-outline"
          size={30}
          color="#fff"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Search Box */}
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
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={21}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
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
              onPress={() => setSelectedCategory(category)}
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

        {/* Notice Count */}
        <Text style={styles.resultText}>
          {filteredNotices.length} notice
          {filteredNotices.length !== 1 ? "s" : ""} found
        </Text>

        {/* Notices */}
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <View key={notice.id} style={styles.card}>

              <View style={styles.cardTop}>
                <View style={styles.iconBox}>
                  <Ionicons
                    name="megaphone-outline"
                    size={25}
                    color="#6C63FF"
                  />
                </View>

                <View style={styles.titleContainer}>
                  <Text style={styles.noticeTitle}>
                    {notice.title}
                  </Text>

                  <Text style={styles.date}>
                    {notice.date}
                  </Text>
                </View>
              </View>

              <View style={styles.categoryBadge}>
                <Text style={styles.badgeText}>
                  {notice.category}
                </Text>
              </View>

              <Text style={styles.description}>
                {notice.description}
              </Text>

              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>
                  View Details
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color="#6C63FF"
                />
              </TouchableOpacity>

            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-text-outline"
              size={60}
              color="#aaa"
            />

            <Text style={styles.emptyTitle}>
              No Notices Found
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

  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#E8E7FF",
    fontSize: 13,
    marginTop: 4,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  searchBox: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: "#333",
  },

  categoryScroll: {
    marginTop: 15,
  },

  categoryButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selectedCategory: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  categoryText: {
    color: "#555",
    fontSize: 13,
    fontWeight: "500",
  },

  selectedCategoryText: {
    color: "#fff",
  },

  resultText: {
    fontSize: 14,
    color: "#777",
    marginTop: 18,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  titleContainer: {
    flex: 1,
  },

  noticeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEEDFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 12,
  },

  badgeText: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "bold",
  },

  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginTop: 10,
  },

  viewButton: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  viewButtonText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginRight: 5,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#555",
    marginTop: 12,
  },

  emptyText: {
    color: "#888",
    marginTop: 5,
  },
});