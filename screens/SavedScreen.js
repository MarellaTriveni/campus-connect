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

const categories = [
  "All",
  "Academic",
  "Technical",
  "Placement",
  "General",
];

export default function SavedScreen({ navigation }) {
  const [savedNotices, setSavedNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadSavedNotices();
    });

    return unsubscribe;
  }, [navigation]);

  const loadSavedNotices = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_NOTICES_KEY);

      if (saved) {
        setSavedNotices(JSON.parse(saved));
      } else {
        setSavedNotices([]);
      }
    } catch (error) {
      console.log("Error loading saved notices:", error);
    }
  };

  const removeNotice = async (id) => {
    try {
      const updatedNotices = savedNotices.filter(
        (item) => item.id !== id
      );

      setSavedNotices(updatedNotices);

      await AsyncStorage.setItem(
        SAVED_NOTICES_KEY,
        JSON.stringify(updatedNotices)
      );

      Alert.alert(
        "Removed",
        "Notice removed from saved items."
      );
    } catch (error) {
      console.log("Error removing notice:", error);
    }
  };

  const filteredNotices = savedNotices.filter((notice) => {
    const matchesSearch =
      notice.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      notice.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderNotice = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.noticeCard}
        onPress={() =>
          navigation.navigate("NoticeDetails", {
            notice: item,
          })
        }
      >
        <View style={styles.topRow}>
          <View style={styles.iconBox}>
            <Ionicons
              name="bookmark"
              size={25}
              color="#2563EB"
            />
          </View>

          <View style={styles.titleBox}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.date}>
              {item.date}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => removeNotice(item.id)}
          >
            <Ionicons
              name="trash-outline"
              size={23}
              color="#E53935"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryBox}>
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

        <Text style={styles.viewText}>
          Tap to view details →
        </Text>
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
            Saved Notices
          </Text>

          <Text style={styles.headerSubtitle}>
            {savedNotices.length} saved notice
            {savedNotices.length !== 1 ? "s" : ""}
          </Text>
        </View>

        <Ionicons
          name="bookmark"
          size={27}
          color="#fff"
        />
      </View>

      {/* Search */}
      {savedNotices.length > 0 && (
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search saved notices..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      )}

      {/* Categories */}
      {savedNotices.length > 0 && (
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
                  styles.activeFilter,
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
      )}

      {/* Result count */}
      {savedNotices.length > 0 && (
        <Text style={styles.resultText}>
          {filteredNotices.length} saved notice
          {filteredNotices.length !== 1 ? "s" : ""}
          {" "}found
        </Text>
      )}

      {/* Saved Notices */}
      {savedNotices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="bookmark-outline"
            size={75}
            color="#B5B5B5"
          />

          <Text style={styles.emptyTitle}>
            No Saved Notices
          </Text>

          <Text style={styles.emptyText}>
            Save important notices to view them later.
          </Text>

          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate("Notices")}
          >
            <Text style={styles.browseText}>
              Browse Notices
            </Text>
          </TouchableOpacity>
        </View>
      ) : filteredNotices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="search-outline"
            size={60}
            color="#aaa"
          />

          <Text style={styles.emptyTitle}>
            No Results
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
    margin: 15,
    marginBottom: 5,
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

  categoryList: {
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

  noticeCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  topRow: {
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

  titleBox: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  date: {
    color: "#777",
    fontSize: 13,
    marginTop: 4,
  },

  categoryBox: {
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
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },

  viewText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
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

  browseButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  browseText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});