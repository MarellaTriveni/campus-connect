import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const FEEDBACK_KEY = "event_feedback";

export default function EventFeedbackScreen({ navigation, route }) {
  const event = route?.params?.event;

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const loadFeedback = async () => {
    try {
      const stored = await AsyncStorage.getItem(FEEDBACK_KEY);

      if (stored && event) {
        const feedbackList = JSON.parse(stored);

        const existing = feedbackList.find(
          (item) => item.eventId === event.id
        );

        if (existing) {
          setRating(existing.rating);
          setFeedback(existing.feedback);
          setSubmitted(true);
        }
      }
    } catch (error) {
      console.log("Error loading feedback:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFeedback();
    }, [])
  );

  const submitFeedback = async () => {
    if (rating === 0) {
      Alert.alert(
        "Select Rating",
        "Please select a rating before submitting."
      );
      return;
    }

    if (feedback.trim().length === 0) {
      Alert.alert(
        "Enter Feedback",
        "Please write some feedback."
      );
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(FEEDBACK_KEY);

      const feedbackList = stored ? JSON.parse(stored) : [];

      const newFeedback = {
        eventId: event?.id || "unknown",
        eventName: event?.eventName || "Campus Event",
        rating: rating,
        feedback: feedback.trim(),
        date: new Date().toLocaleDateString(),
      };

      const existingIndex = feedbackList.findIndex(
        (item) => item.eventId === newFeedback.eventId
      );

      if (existingIndex !== -1) {
        feedbackList[existingIndex] = newFeedback;
      } else {
        feedbackList.push(newFeedback);
      }

      await AsyncStorage.setItem(
        FEEDBACK_KEY,
        JSON.stringify(feedbackList)
      );

      setSubmitted(true);

      Alert.alert(
        "Feedback Submitted",
        "Thank you for sharing your feedback!"
      );
    } catch (error) {
      console.log("Feedback error:", error);

      Alert.alert(
        "Error",
        "Unable to save feedback."
      );
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => {
              setRating(star);
              setSubmitted(false);
            }}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={42}
              color="#F59E0B"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
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
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Event Feedback
        </Text>

        <Ionicons
          name="chatbubble-ellipses-outline"
          size={25}
          color="#fff"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Event Card */}
        <View style={styles.eventCard}>
          <View style={styles.eventIcon}>
            <Ionicons
              name="calendar"
              size={32}
              color="#2563EB"
            />
          </View>

          <Text style={styles.eventTitle}>
            {event?.eventName || "Campus Event"}
          </Text>

          {event?.date && (
            <Text style={styles.eventInfo}>
              {event.date}
            </Text>
          )}

          {event?.venue && (
            <Text style={styles.eventInfo}>
              {event.venue}
            </Text>
          )}
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How was your experience?
          </Text>

          <Text style={styles.sectionSubtitle}>
            Please rate this event from 1 to 5 stars.
          </Text>

          {renderStars()}

          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </Text>
          )}
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your Feedback
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Write your feedback here..."
            placeholderTextColor="#94A3B8"
            value={feedback}
            onChangeText={(text) => {
              setFeedback(text);
              setSubmitted(false);
            }}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <Text style={styles.characterCount}>
            {feedback.length} characters
          </Text>
        </View>

        {/* Submitted Message */}
        {submitted && (
          <View style={styles.submittedCard}>
            <Ionicons
              name="checkmark-circle"
              size={25}
              color="#16A34A"
            />

            <View style={styles.submittedTextContainer}>
              <Text style={styles.submittedTitle}>
                Feedback Submitted
              </Text>

              <Text style={styles.submittedText}>
                Your feedback has been saved successfully.
              </Text>
            </View>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitFeedback}
        >
          <Ionicons
            name="send-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.submitText}>
            {submitted ? "Update Feedback" : "Submit Feedback"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Your feedback helps improve future campus events.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    backgroundColor: "#2563EB",
    paddingTop: 45,
    paddingBottom: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    marginBottom: 20,
  },

  eventIcon: {
    backgroundColor: "#EFF6FF",
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  eventTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
  },

  eventInfo: {
    color: "#64748B",
    marginTop: 5,
    fontSize: 14,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },

  sectionSubtitle: {
    color: "#64748B",
    marginTop: 5,
    marginBottom: 15,
  },

  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  star: {
    marginHorizontal: 5,
  },

  ratingText: {
    textAlign: "center",
    color: "#F59E0B",
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 16,
  },

  textInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    minHeight: 130,
    fontSize: 15,
    color: "#1E293B",
    backgroundColor: "#F8FAFC",
  },

  characterCount: {
    textAlign: "right",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 5,
  },

  submittedCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  submittedTextContainer: {
    marginLeft: 10,
    flex: 1,
  },

  submittedTitle: {
    color: "#15803D",
    fontWeight: "bold",
    fontSize: 15,
  },

  submittedText: {
    color: "#166534",
    marginTop: 3,
    fontSize: 13,
  },

  submitButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  note: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    marginTop: 12,
  },
});