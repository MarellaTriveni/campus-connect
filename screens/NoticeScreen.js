import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const SAVED_NOTICES_KEY = "saved_notices";

const noticesData = [
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
      "Students can participate in the college hackathon and develop innovative projects.",
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
      "Internal examinations will be conducted according to the examination schedule.",
  },
  {
    id: "5",
    title: "College Holiday Notice",
    category: "General",
    date: "28 August 2026",
    description:
      "The college will remain closed on the announced holiday.",
  },
];

const categories = [
  "All",
  "Academic",
  "Technical",
  "Placement",
  "General",
];

export default function NoticeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedNotices, setSavedNotices] = useState([]);

  // Load saved notices
  useEffect(() => {
    loadSavedNotices();
  }, []);

  const loadSavedNotices = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_NOTICES_KEY);

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
      let updatedSaved;

      const alreadySaved = savedNotices.some(
        (item) => item.id === notice.id
      );

      if (alreadySaved) {
        updatedSaved = savedNotices.filter(
          (item) => item.id !== notice.id
        );

        Alert.alert("Removed", "Notice removed from saved items.");
      } else {
        updatedSaved = [...savedNotices, notice];

        Alert.alert("Saved", "Notice saved successfully.");
      }

      setSavedNotices(updatedSaved);

      await AsyncStorage.setItem(
        SAVED_NOTICES_KEY,
        JSON.stringify(updatedSaved)
      );
    } catch (error) {
      console.log("Error saving notice:", error);
    }
  };

  // Filter notices
  const filteredNotices = noticesData.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Render each notice
  const renderNotice = ({ item }) => {
    const isSaved = savedNotices.some(
      (notice) => notice.id === item.id
    );

    return (
      <TouchableOpacity
        style={styles.noticeCard}
        onPress={() =>
          navigation.navigate("NoticeDetails", {
            notice: item,
          })
        }
      >
        <View style={styles.cardTop}>
          <View style={styles.iconBox}>
            <Ionicons
              name="notifications-outline"
              size={25}
              color="#2563EB"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.noticeTitle}>{item.title}</Text>

            <Text style={styles.date}>
              {item.date}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => toggleSaveNotice(item)}
            style={styles.bookmarkButton}
          >
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={25}
              color={isSaved ? "#2563EB" : "#777"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>
            {item.category}
          </Text>
        </View>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        {isSaved && (
          <Text style={styles.savedText}>
            ✓ Saved
          </Text>
        )}
      </TouchableOpacity>
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
            College announcements
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Saved")}
        >
          <Ionicons
            name="bookmark-outline"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#777"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search notices..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === item &&
                styles.activeFilterButton,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === item &&
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
        {filteredNotices.length} notice
        {filteredNotices.length !== 1 ? "s" : ""} found
      </Text>

      {/* Notices */}
      {filteredNotices.length === 0 ? (
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
            Try another search or category.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotices}
          keyExtractor={(item) => item.id}
          renderItem={renderNotice}
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#DCE7FF",
    marginTop: 4,
    fontSize: 14,
  },

  searchContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  categoryList: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  activeFilterButton: {
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

  noticeCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E8F0FF",
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },

  noticeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  date: {
    marginTop: 4,
    color: "#777",
    fontSize: 13,
  },

  bookmarkButton: {
    padding: 5,
  },

  categoryContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 12,
  },

  categoryText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "bold",
  },

  description: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },

  savedText: {
    marginTop: 8,
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginTop: 12,
  },

  emptyText: {
    color: "#777",
    marginTop: 5,
  },
});