import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_NOTICES_KEY = "saved_notices";

const NoticeDetailsScreen = ({ route, navigation }) => {
  const { notice } = route.params;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadSavedStatus();
  }, []);

  const loadSavedStatus = async () => {
    try {
      const saved = await AsyncStorage.getItem(
        SAVED_NOTICES_KEY
      );

      if (saved) {
        const savedData = JSON.parse(saved);

        setIsSaved(savedData[notice.id] === true);
      }
    } catch (error) {
      console.log("Load saved status error:", error);
    }
  };

  const toggleSave = async () => {
    try {
      const saved = await AsyncStorage.getItem(
        SAVED_NOTICES_KEY
      );

      const savedData = saved
        ? JSON.parse(saved)
        : {};

      const updatedData = {
        ...savedData,
        [notice.id]: !savedData[notice.id],
      };

      await AsyncStorage.setItem(
        SAVED_NOTICES_KEY,
        JSON.stringify(updatedData)
      );

      setIsSaved(!isSaved);

      Alert.alert(
        !isSaved
          ? "Notice Saved"
          : "Notice Removed",
        !isSaved
          ? "This notice has been added to your saved items."
          : "This notice has been removed from your saved items."
      );
    } catch (error) {
      console.log("Save error:", error);

      Alert.alert(
        "Error",
        "Unable to update saved notice."
      );
    }
  };

  const shareNotice = () => {
    Alert.alert(
      "Share Notice",
      "Sharing feature can be connected to a sharing service later.",
      [
        {
          text: "OK",
        },
      ]
    );
  };

  const getCategoryIcon = () => {
    if (notice.category === "Technical") {
      return "code-slash-outline";
    }

    if (notice.category === "Placement") {
      return "briefcase-outline";
    }

    if (notice.category === "Academic") {
      return "school-outline";
    }

    return "information-circle-outline";
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Notice Details
        </Text>

        <TouchableOpacity
          onPress={toggleSave}
          style={styles.headerButton}
        >
          <Ionicons
            name={
              isSaved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={25}
            color="white"
          />
        </TouchableOpacity>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Notice Icon */}
        <View style={styles.largeIcon}>

          <Ionicons
            name={getCategoryIcon()}
            size={48}
            color="#6C63FF"
          />

        </View>

        {/* Category */}
        <View style={styles.categoryBadge}>

          <Text style={styles.categoryText}>
            {notice.category}
          </Text>

        </View>

        {/* Title */}
        <Text style={styles.title}>
          {notice.title}
        </Text>

        {/* Date */}
        <View style={styles.dateContainer}>

          <Ionicons
            name="calendar-outline"
            size={19}
            color="#777"
          />

          <Text style={styles.dateText}>
            {notice.date}
          </Text>

        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description Heading */}
        <Text style={styles.descriptionHeading}>
          Notice Information
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          {notice.description}
        </Text>

        {/* Important Information */}
        <View style={styles.infoCard}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#6C63FF"
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoTitle}>
              Important
            </Text>

            <Text style={styles.infoText}>
              Students are advised to check this notice
              carefully and follow the instructions
              provided by the college.
            </Text>

          </View>

        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaved && styles.savedButton,
          ]}
          onPress={toggleSave}
        >

          <Ionicons
            name={
              isSaved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={20}
            color={
              isSaved
                ? "white"
                : "#6C63FF"
            }
          />

          <Text
            style={[
              styles.saveButtonText,
              isSaved &&
                styles.savedButtonText,
            ]}
          >
            {isSaved
              ? "Notice Saved"
              : "Save Notice"}
          </Text>

        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={shareNotice}
        >

          <Ionicons
            name="share-social-outline"
            size={20}
            color="#6C63FF"
          />

          <Text style={styles.shareButtonText}>
            Share Notice
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </View>
  );
};

export default NoticeDetailsScreen;

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
    paddingHorizontal: 15,
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    padding: 18,
    paddingBottom: 35,
  },

  largeIcon: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  categoryBadge: {
    alignSelf: "center",
    backgroundColor: "#EEEEFF",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 15,
  },

  categoryText: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 31,
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  dateText: {
    fontSize: 13,
    color: "#777",
    marginLeft: 7,
  },

  divider: {
    height: 1,
    backgroundColor: "#DDDDDD",
    marginVertical: 22,
  },

  descriptionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 24,
  },

  infoCard: {
    backgroundColor: "#EEEEFF",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    marginTop: 22,
  },

  infoContent: {
    flex: 1,
    marginLeft: 10,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  infoText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    marginTop: 4,
  },

  saveButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 12,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  savedButton: {
    backgroundColor: "#6C63FF",
  },

  saveButtonText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },

  savedButtonText: {
    color: "white",
  },

  shareButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  shareButtonText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },

});