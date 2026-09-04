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

export default function SavedScreen() {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "React Native Workshop",
      type: "Notice",
      description: "Learn React Native app development.",
    },
    {
      id: 2,
      title: "Coding Contest",
      type: "Event",
      description: "Participate in the upcoming coding contest.",
    },
  ]);

  const removeItem = (id) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));

    Alert.alert("Removed", "Item removed from saved items.");
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Saved Items</Text>
          <Text style={styles.headerSubtitle}>
            Your saved notices and events
          </Text>
        </View>

        <View style={styles.countBox}>
          <Text style={styles.countText}>{savedItems.length}</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {savedItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="bookmark-outline"
              size={70}
              color="#6C63FF"
            />

            <Text style={styles.emptyTitle}>
              No Saved Items
            </Text>

            <Text style={styles.emptyText}>
              Save important notices and events to view them later.
            </Text>
          </View>
        ) : (
          savedItems.map((item) => (
            <View style={styles.card} key={item.id}>

              <View style={styles.iconBox}>
                <Ionicons
                  name={
                    item.type === "Event"
                      ? "calendar"
                      : "notifications"
                  }
                  size={28}
                  color="#6C63FF"
                />
              </View>

              <View style={styles.cardContent}>
                <View style={styles.topRow}>
                  <Text style={styles.type}>{item.type}</Text>

                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons
                      name="bookmark"
                      size={24}
                      color="#6C63FF"
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>
                  {item.title}
                </Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Text style={styles.removeText}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
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
    color: "#E8E7FF",
    marginTop: 5,
    fontSize: 14,
  },

  countBox: {
    backgroundColor: "#FFFFFF",
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 3,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  type: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6C63FF",
    textTransform: "uppercase",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
    marginTop: 5,
  },

  description: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
    lineHeight: 19,
  },

  removeButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
  },

  removeText: {
    color: "#555555",
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    color: "#333333",
  },

  emptyText: {
    textAlign: "center",
    color: "#777777",
    marginTop: 8,
    lineHeight: 20,
  },
});