import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const FEEDBACK_KEY = "event_feedback";

export default function EventFeedbackScreen({ route, navigation }) {
  const { event } = route.params || {};

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState(null);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const stored = await AsyncStorage.getItem(FEEDBACK_KEY);

      if (stored) {
        const feedbackList = JSON.parse(stored);

        const found = feedbackList.find(
          (item) =>
            item.eventId === event?.id ||
            item.eventName === event?.eventName
        );

        if (found) {
          setExistingFeedback(found);
          setRating(found.rating);
          setFeedback(found.feedback);
          setSubmitted(true);
        }
      }
    } catch (error) {
      console.log("Error loading feedback:", error);
    }
  };

  const saveFeedback = async () => {
    if (rating === 0) {
      Alert.alert("Rating Required", "Please select a rating.");
      return;
    }

    if (!feedback.trim()) {
      Alert.alert("Feedback Required", "Please enter your feedback.");
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(FEEDBACK_KEY);
      let feedbackList = stored ? JSON.parse(stored) : [];

      const feedbackData = {
        id: existingFeedback?.id || Date.now().toString(),
        eventId: event?.id || event?.eventName,
        eventName: event?.eventName || "Event",
        category: event?.category || "General",
        rating: rating,
        feedback: feedback.trim(),
        submittedAt:
          existingFeedback?.submittedAt || new Date().toLocaleString(),
      };

      const existingIndex = feedbackList.findIndex(
        (item) =>
          item.eventId === feedbackData.eventId ||
          item.eventName === feedbackData.eventName
      );

      if (existingIndex !== -1) {
        feedbackList[existingIndex] = feedbackData;
      } else {
        feedbackList.push(feedbackData);
      }

      await AsyncStorage.setItem(
        FEEDBACK_KEY,
        JSON.stringify(feedbackList)
      );

      setExistingFeedback(feedbackData);
      setSubmitted(true);

      Alert.alert(
        existingIndex !== -1 ? "Feedback Updated" : "Thank You!",
        existingIndex !== -1
          ? "Your feedback has been updated successfully."
          : "Your feedback has been submitted successfully."
      );
    } catch (error) {
      console.log("Error saving feedback:", error);
      Alert.alert("Error", "Unable to save feedback.");
    }
  };

  const deleteFeedback = async () => {
    Alert.alert(
      "Delete Feedback",
      "Are you sure you want to delete your feedback?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem(FEEDBACK_KEY);

              if (!stored) return;

              const feedbackList = JSON.parse(stored);

              const updatedList = feedbackList.filter(
                (item) =>
                  item.eventId !== existingFeedback?.eventId
              );

              await AsyncStorage.setItem(
                FEEDBACK_KEY,
                JSON.stringify(updatedList)
              );

              setRating(0);
              setFeedback("");
              setSubmitted(false);
              setExistingFeedback(null);

              Alert.alert(
                "Deleted",
                "Your feedback has been deleted."
              );
            } catch (error) {
              console.log("Delete error:", error);
            }
          },
        },
      ]
    );
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={42}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Event Feedback</Text>
          <Text style={styles.headerSubtitle}>
            Share your experience
          </Text>
        </View>
      </View>

      {/* Event Card */}
      <View style={styles.eventCard}>
        <Ionicons name="calendar" size={32} style={styles.eventIcon} />

        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>
            {event?.eventName || "Event"}
          </Text>

          <Text style={styles.eventCategory}>
            {event?.category || "General"}
          </Text>

          {event?.date && (
            <Text style={styles.eventDate}>
              {event.date}
            </Text>
          )}
        </View>
      </View>

      {/* Feedback Status */}
      {submitted && (
        <View style={styles.statusCard}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color="#2e7d32"
          />

          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>
              Feedback Submitted
            </Text>

            <Text style={styles.statusText}>
              You can edit your feedback below.
            </Text>
          </View>
        </View>
      )}

      {/* Rating */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          How was your experience?
        </Text>

        <Text style={styles.sectionSubtitle}>
          Select a rating from 1 to 5
        </Text>

        {renderStars()}

        {rating > 0 && (
          <Text style={styles.ratingText}>
            {rating === 1 && "Very Poor"}
            {rating === 2 && "Poor"}
            {rating === 3 && "Average"}
            {rating === 4 && "Good"}
            {rating === 5 && "Excellent"}
          </Text>
        )}
      </View>

      {/* Feedback */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Your Feedback
        </Text>

        <Text style={styles.sectionSubtitle}>
          Tell us about your experience
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Write your feedback here..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={6}
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />

        <Text style={styles.characterCount}>
          {feedback.length} characters
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={saveFeedback}
      >
        <Ionicons
          name={submitted ? "create-outline" : "send-outline"}
          size={20}
          color="#fff"
        />

        <Text style={styles.submitText}>
          {submitted ? "Update Feedback" : "Submit Feedback"}
        </Text>
      </TouchableOpacity>

      {submitted && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteFeedback}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color="#d32f2f"
          />

          <Text style={styles.deleteText}>
            Delete Feedback
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.summaryButton}
        onPress={() => navigation.navigate("FeedbackSummary")}
      >
        <Ionicons
          name="bar-chart-outline"
          size={20}
          style={styles.summaryIcon}
        />

        <Text style={styles.summaryText}>
          View Feedback Summary
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    backgroundColor: "#1976d2",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    marginRight: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#e3f2fd",
    marginTop: 3,
    fontSize: 13,
  },

  eventCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 18,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  eventIcon: {
    marginRight: 15,
    color: "#1976d2",
  },

  eventInfo: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  eventCategory: {
    marginTop: 5,
    color: "#1976d2",
    fontWeight: "600",
  },

  eventDate: {
    marginTop: 4,
    color: "#666",
  },

  statusCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#e8f5e9",
    flexDirection: "row",
    alignItems: "center",
  },

  statusTextContainer: {
    marginLeft: 10,
  },

  statusTitle: {
    fontWeight: "bold",
    color: "#2e7d32",
  },

  statusText: {
    color: "#555",
    marginTop: 2,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 18,
    borderRadius: 14,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  sectionSubtitle: {
    color: "#777",
    marginTop: 5,
  },

  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },

  star: {
    color: "#f5a623",
    marginHorizontal: 5,
  },

  ratingText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
  },

  input: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    minHeight: 130,
    fontSize: 15,
    color: "#222",
    backgroundColor: "#fafafa",
  },

  characterCount: {
    textAlign: "right",
    marginTop: 5,
    color: "#888",
    fontSize: 12,
  },

  submitButton: {
    marginHorizontal: 16,
    backgroundColor: "#1976d2",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  deleteButton: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d32f2f",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteText: {
    color: "#d32f2f",
    fontWeight: "bold",
    marginLeft: 8,
  },

  summaryButton: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1976d2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryIcon: {
    color: "#1976d2",
  },

  summaryText: {
    color: "#1976d2",
    fontWeight: "bold",
    marginLeft: 8,
  },
});