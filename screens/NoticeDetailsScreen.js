import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const SAVED_NOTICES_KEY = "saved_notices";

export default function NoticeDetailsScreen({ route, navigation }) {
  const { notice } = route.params;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    checkSavedStatus();
  }, []);

  const checkSavedStatus = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_NOTICES_KEY);

      if (saved) {
        const savedNotices = JSON.parse(saved);

        const exists = savedNotices.some(
          (item) => item.id === notice.id
        );

        setIsSaved(exists);
      }
    } catch (error) {
      console.log("Error checking saved status:", error);
    }
  };

  const toggleSave = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_NOTICES_KEY);

      let savedNotices = saved ? JSON.parse(saved) : [];

      const alreadySaved = savedNotices.some(
        (item) => item.id === notice.id
      );

      if (alreadySaved) {
        savedNotices = savedNotices.filter(
          (item) => item.id !== notice.id
        );

        setIsSaved(false);

        Alert.alert(
          "Removed",
          "Notice removed from saved items."
        );
      } else {
        savedNotices.push(notice);

        setIsSaved(true);

        Alert.alert(
          "Saved",
          "Notice saved successfully."
        );
      }

      await AsyncStorage.setItem(
        SAVED_NOTICES_KEY,
        JSON.stringify(savedNotices)
      );
    } catch (error) {
      console.log("Error saving notice:", error);
    }
  };

  // Day 40: Actual Share Feature
  const shareNotice = async () => {
    try {
      const message =
        `College Notice\n\n` +
        `${notice.title}\n\n` +
        `Category: ${notice.category}\n` +
        `Date: ${notice.date}\n\n` +
        `${notice.description}`;

      await Share.share({
        message: message,
        title: notice.title,
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to share this notice."
      );
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Notice Details
        </Text>

        <TouchableOpacity
          onPress={shareNotice}
          style={styles.shareIcon}
        >
          <Ionicons
            name="share-social-outline"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Notice Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name="notifications-outline"
            size={45}
            color="#2563EB"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {notice.title}
        </Text>

        {/* Category */}
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>
            {notice.category}
          </Text>
        </View>

        {/* Date */}
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={21}
            color="#2563EB"
          />

          <Text style={styles.infoText}>
            {notice.date}
          </Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {notice.description}
          </Text>
        </View>

        {/* Important Information */}
        <View style={styles.importantCard}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#2563EB"
          />

          <View style={styles.importantContent}>
            <Text style={styles.importantTitle}>
              Important Information
            </Text>

            <Text style={styles.importantText}>
              Please check the college notice board
              or contact the concerned department
              for additional information.
            </Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={toggleSave}
        >
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={22}
            color="#fff"
          />

          <Text style={styles.buttonText}>
            {isSaved ? "Remove from Saved" : "Save Notice"}
          </Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={shareNotice}
        >
          <Ionicons
            name="share-social-outline"
            size={22}
            color="#2563EB"
          />

          <Text style={styles.shareButtonText}>
            Share Notice
          </Text>
        </TouchableOpacity>

      </ScrollView>
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

  backButton: {
    width: 40,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  shareIcon: {
    width: 40,
    alignItems: "flex-end",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  iconContainer: {
    width: 85,
    height: 85,
    borderRadius: 20,
    backgroundColor: "#E8F0FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 12,
  },

  categoryBox: {
    alignSelf: "center",
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 18,
  },

  categoryText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 13,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
  },

  infoText: {
    marginLeft: 10,
    color: "#555",
    fontSize: 15,
  },

  section: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 23,
  },

  importantCard: {
    backgroundColor: "#E8F0FF",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    marginBottom: 20,
  },

  importantContent: {
    flex: 1,
    marginLeft: 10,
  },

  importantTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 5,
  },

  importantText: {
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
  },

  saveButton: {
    backgroundColor: "#2563EB",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  shareButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  shareButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});