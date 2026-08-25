import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const initialNotices = [
  {
    id: 1,
    title: "React Native Workshop",
    description:
      "Registration is now open for the React Native workshop.",
    category: "Workshop",
    date: "18 Aug 2026",
  },
  {
    id: 2,
    title: "Placement Drive",
    description:
      "Placement drive registration is available for eligible students.",
    category: "Placement",
    date: "20 Aug 2026",
  },
  {
    id: 3,
    title: "Hackathon Registration",
    description:
      "Students can register for the upcoming campus hackathon.",
    category: "Event",
    date: "22 Aug 2026",
  },
  {
    id: 4,
    title: "Exam Schedule",
    description:
      "The examination schedule has been published.",
    category: "Exam",
    date: "25 Aug 2026",
  },
  {
    id: 5,
    title: "Technical Seminar",
    description:
      "A technical seminar will be conducted in the seminar hall.",
    category: "Seminar",
    date: "28 Aug 2026",
  },
];

const categories = [
  "All",
  "Workshop",
  "Placement",
  "Event",
  "Exam",
  "Seminar",
];

export default function NoticeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [readNotices, setReadNotices] = useState([]);

  const filteredNotices = useMemo(() => {
    return initialNotices.filter((notice) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        notice.title.toLowerCase().includes(text) ||
        notice.description.toLowerCase().includes(text) ||
        notice.category.toLowerCase().includes(text);

      const matchesCategory =
        selectedCategory === "All" ||
        notice.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const markAsRead = (id) => {
    if (!readNotices.includes(id)) {
      setReadNotices((current) => [
        ...current,
        id,
      ]);
    }
  };

  const unreadCount =
    initialNotices.length - readNotices.length;

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

        <View style={styles.headerIcon}>
          <Ionicons
            name="notifications-outline"
            size={27}
            color="#6C63FF"
          />

          {unreadCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="mail-unread-outline"
              size={30}
              color="#6C63FF"
            />
          </View>

          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>
              Notice Updates
            </Text>

            <Text style={styles.summarySubtitle}>
              {unreadCount} unread notice
              {unreadCount !== 1 ? "s" : ""}
            </Text>
          </View>

          <Text style={styles.summaryNumber}>
            {unreadCount}
          </Text>
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

        {/* Heading */}
        <View style={styles.resultRow}>
          <Text style={styles.sectionTitle}>
            Latest Notices
          </Text>

          <Text style={styles.resultCount}>
            {filteredNotices.length} found
          </Text>
        </View>

        {/* Notice Cards */}
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => {
            const isRead = readNotices.includes(
              notice.id
            );

            return (
              <TouchableOpacity
                key={notice.id}
                style={[
                  styles.noticeCard,
                  !isRead && styles.unreadCard,
                ]}
                activeOpacity={0.8}
                onPress={() =>
                  markAsRead(notice.id)
                }
              >

                {/* Icon */}
                <View
                  style={[
                    styles.noticeIcon,
                    isRead &&
                      styles.readNoticeIcon,
                  ]}
                >
                  <Ionicons
                    name={
                      isRead
                        ? "mail-open-outline"
                        : "mail-unread-outline"
                    }
                    size={27}
                    color="#6C63FF"
                  />
                </View>

                <View style={styles.noticeContent}>

                  <View style={styles.titleRow}>
                    <Text style={styles.noticeTitle}>
                      {notice.title}
                    </Text>

                    {!isRead && (
                      <View style={styles.unreadDot} />
                    )}
                  </View>

                  {/* Category */}
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {notice.category}
                    </Text>
                  </View>

                  <Text style={styles.description}>
                    {notice.description}
                  </Text>

                  <View style={styles.dateRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#888"
                    />

                    <Text style={styles.dateText}>
                      {notice.date}
                    </Text>

                    <Text style={styles.statusText}>
                      {isRead ? "Read" : "Unread"}
                    </Text>
                  </View>

                </View>

                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#999"
                />

              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="documents-outline"
              size={65}
              color="#AAA"
            />

            <Text style={styles.emptyTitle}>
              No Notices Found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        )}

        <Text style={styles.footer}>
          Campus Connect • Notices
        </Text>

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

  headerSmall: {
    color: "#E8E7FF",
    fontSize: 12,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  headerBadge: {
    position: "absolute",
    top: 1,
    right: 1,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF4D4D",
    justifyContent: "center",
    alignItems: "center",
  },

  headerBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  summaryContent: {
    flex: 1,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  summarySubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  summaryNumber: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  searchBox: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 15,
    color: "#333",
  },

  categoryScroll: {
    marginTop: 14,
  },

  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 8,
  },

  selectedCategory: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  categoryText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
  },

  resultCount: {
    fontSize: 12,
    color: "#888",
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    elevation: 3,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#6C63FF",
  },

  noticeIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EEEDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  readNoticeIcon: {
    backgroundColor: "#F1F1F1",
  },

  noticeContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  noticeTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#6C63FF",
    marginLeft: 5,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEEDFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    marginTop: 7,
  },

  categoryBadgeText: {
    fontSize: 10,
    color: "#6C63FF",
    fontWeight: "bold",
  },

  description: {
    fontSize: 12,
    color: "#777",
    lineHeight: 18,
    marginTop: 7,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  dateText: {
    fontSize: 11,
    color: "#888",
    marginLeft: 5,
  },

  statusText: {
    fontSize: 10,
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: "auto",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 70,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#555",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },

  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 15,
  },
});