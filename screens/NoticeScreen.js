import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_NOTICES_KEY = "saved_notices";

const NoticeScreen = ({ navigation }) => {
  const [notices, setNotices] = useState([]);
  const [savedNotices, setSavedNotices] = useState({});
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Academic",
    "Technical",
    "Placement",
    "General",
  ];

  const noticeData = [
    {
      id: "1",
      title: "React Native Workshop",
      category: "Technical",
      date: "30 July 2026",
      description:
        "A workshop on React Native development will be conducted for students.",
    },
    {
      id: "2",
      title: "Hackathon 2026",
      category: "Technical",
      date: "10 August 2026",
      description:
        "Students can participate in the upcoming college hackathon.",
    },
    {
      id: "3",
      title: "Placement Drive",
      category: "Placement",
      date: "15 August 2026",
      description:
        "A placement drive will be conducted for eligible students.",
    },
    {
      id: "4",
      title: "Internal Examinations",
      category: "Academic",
      date: "23 August 2026",
      description:
        "Students are requested to check the examination schedule.",
    },
    {
      id: "5",
      title: "College Holiday Notice",
      category: "General",
      date: "28 August 2026",
      description:
        "The college has announced a holiday for students.",
    },
  ];

  useEffect(() => {
    setNotices(noticeData);
    loadSavedNotices();
  }, []);

  // Load saved notices
  const loadSavedNotices = async () => {
    try {
      const saved = await AsyncStorage.getItem(
        SAVED_NOTICES_KEY
      );

      if (saved) {
        setSavedNotices(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Error loading saved notices:", error);
    }
  };

  // Save or remove notice
  const toggleSaveNotice = async (notice) => {
    try {
      const updatedSaved = {
        ...savedNotices,
        [notice.id]: !savedNotices[notice.id],
      };

      setSavedNotices(updatedSaved);

      await AsyncStorage.setItem(
        SAVED_NOTICES_KEY,
        JSON.stringify(updatedSaved)
      );
    } catch (error) {
      console.log("Save notice error:", error);
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    if (category === "Technical") {
      return "code-slash-outline";
    }

    if (category === "Placement") {
      return "briefcase-outline";
    }

    if (category === "Academic") {
      return "school-outline";
    }

    return "information-circle-outline";
  };

  // Filter notices
  const filteredNotices = notices.filter((notice) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      notice.title.toLowerCase().includes(search) ||
      notice.category.toLowerCase().includes(search) ||
      notice.description.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Notice card
  const renderNotice = ({ item }) => {
    const isSaved = savedNotices[item.id] === true;

    return (
      <View style={styles.noticeCard}>

        {/* Top section */}
        <View style={styles.noticeTop}>

          <View style={styles.iconBox}>
            <Ionicons
              name={getCategoryIcon(item.category)}
              size={27}
              color="#6C63FF"
            />
          </View>

          <View style={styles.noticeInfo}>

            <Text style={styles.category}>
              {item.category}
            </Text>

            <Text style={styles.noticeTitle}>
              {item.title}
            </Text>

          </View>

          {/* Bookmark */}
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() =>
              toggleSaveNotice(item)
            }
          >
            <Ionicons
              name={
                isSaved
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={24}
              color="#6C63FF"
            />
          </TouchableOpacity>

        </View>

        {/* Date */}
        <View style={styles.dateRow}>

          <Ionicons
            name="calendar-outline"
            size={16}
            color="#777"
          />

          <Text style={styles.dateText}>
            {item.date}
          </Text>

        </View>

        {/* Description */}
        <Text style={styles.description}>
          {item.description}
        </Text>

        {/* Saved label */}
        {isSaved && (
          <View style={styles.savedLabel}>
            <Ionicons
              name="checkmark-circle"
              size={15}
              color="#6C63FF"
            />

            <Text style={styles.savedText}>
              Saved
            </Text>
          </View>
        )}

      </View>
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
            size={26}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Notices
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Saved")
          }
        >
          <Ionicons
            name="bookmark-outline"
            size={25}
            color="white"
          />
        </TouchableOpacity>

      </View>

      <FlatList
        data={filteredNotices}
        keyExtractor={(item) => item.id}
        renderItem={renderNotice}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}

        ListHeaderComponent={
          <>

            {/* Search */}
            <View style={styles.searchContainer}>

              <Ionicons
                name="search-outline"
                size={20}
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
                  onPress={() =>
                    setSearchText("")
                  }
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color="#999"
                  />
                </TouchableOpacity>
              )}

            </View>

            {/* Categories */}
            <Text style={styles.filterTitle}>
              Categories
            </Text>

            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === item &&
                      styles.categorySelected,
                  ]}
                  onPress={() =>
                    setSelectedCategory(item)
                  }
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item &&
                        styles.categorySelectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.categoryList}
            />

            {/* Result count */}
            <Text style={styles.resultText}>
              {filteredNotices.length} notice
              {filteredNotices.length !== 1
                ? "s"
                : ""}{" "}
              found
            </Text>

          </>
        }

        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <Ionicons
              name="newspaper-outline"
              size={55}
              color="#BBBBBB"
            />

            <Text style={styles.emptyTitle}>
              No Notices Found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>

          </View>
        }
      />

    </View>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  header: {
    height: 65,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  list: {
    padding: 15,
    paddingBottom: 30,
  },

  searchContainer: {
    height: 48,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginBottom: 15,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 9,
  },

  filterTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 9,
  },

  categoryList: {
    marginBottom: 12,
  },

  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 8,
    elevation: 1,
  },

  categorySelected: {
    backgroundColor: "#6C63FF",
  },

  categoryText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },

  categorySelectedText: {
    color: "white",
  },

  resultText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },

  noticeCard: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 15,
    marginBottom: 13,
    elevation: 2,
  },

  noticeTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 53,
    height: 53,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  noticeInfo: {
    flex: 1,
    marginLeft: 12,
  },

  category: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "600",
  },

  noticeTitle: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
  },

  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  dateText: {
    fontSize: 12,
    color: "#777",
    marginLeft: 7,
  },

  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 19,
    marginTop: 10,
  },

  savedLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  savedText: {
    fontSize: 12,
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 5,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#444",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },

});