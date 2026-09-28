import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const FEEDBACK_KEY = "event_feedback";

export default function FeedbackSummaryScreen({ navigation }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadFeedback = async () => {
    try {
      const stored = await AsyncStorage.getItem(FEEDBACK_KEY);

      if (stored) {
        const data = JSON.parse(stored);

        if (Array.isArray(data)) {
          setFeedbackList(data);
        } else {
          setFeedbackList([]);
        }
      } else {
        setFeedbackList([]);
      }
    } catch (error) {
      console.log("Error loading feedback:", error);
      setFeedbackList([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFeedback();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFeedback();
    setRefreshing(false);
  };

  const deleteFeedback = (feedbackId) => {
    Alert.alert(
      "Delete Feedback",
      "Are you sure you want to delete this feedback?",
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
              const updatedList = feedbackList.filter(
                (item) => item.id !== feedbackId
              );

              await AsyncStorage.setItem(
                FEEDBACK_KEY,
                JSON.stringify(updatedList)
              );

              setFeedbackList(updatedList);
            } catch (error) {
              console.log("Delete error:", error);
            }
          },
        },
      ]
    );
  };

  const totalFeedback = feedbackList.length;

  const totalRating = feedbackList.reduce(
    (sum, item) => sum + Number(item.rating || 0),
    0
  );

  const averageRating =
    totalFeedback > 0
      ? (totalRating / totalFeedback).toFixed(1)
      : "0.0";

  const getRatingCount = (rating) => {
    return feedbackList.filter(
      (item) => Number(item.rating) === rating
    ).length;
  };

  const getPercentage = (rating) => {
    if (totalFeedback === 0) {
      return 0;
    }

    return (getRatingCount(rating) / totalFeedback) * 100;
  };

  const renderStars = (rating, size = 18) => {
    return (
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={size}
            style={styles.star}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>
            Feedback Summary
          </Text>

          <Text style={styles.headerSubtitle}>
            Event feedback overview
          </Text>
        </View>

        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Overall Rating */}
      <View style={styles.overallCard}>
        <Text style={styles.overallLabel}>
          Overall Rating
        </Text>

        <Text style={styles.averageRating}>
          {averageRating}
        </Text>

        {renderStars(Number(averageRating), 25)}

        <Text style={styles.totalText}>
          Based on {totalFeedback} feedback
          {totalFeedback !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Rating Distribution */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Rating Distribution
        </Text>

        {[5, 4, 3, 2, 1].map((rating) => {
          const count = getRatingCount(rating);
          const percentage = getPercentage(rating);

          return (
            <View
              key={rating}
              style={styles.distributionRow}
            >
              <Text style={styles.ratingNumber}>
                {rating}
              </Text>

              <Ionicons
                name="star"
                size={16}
                style={styles.smallStar}
              />

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${percentage}%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.countText}>
                {count}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Feedback List */}
      <View style={styles.feedbackSection}>
        <Text style={styles.sectionTitle}>
          Submitted Feedback
        </Text>

        {feedbackList.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={55}
              color="#aaa"
            />

            <Text style={styles.emptyTitle}>
              No Feedback Yet
            </Text>

            <Text style={styles.emptyText}>
              Event feedback submitted by students
              will appear here.
            </Text>

            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => navigation.navigate("Events")}
            >
              <Text style={styles.browseButtonText}>
                Browse Events
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          feedbackList.map((item) => (
            <View
              key={item.id}
              style={styles.feedbackCard}
            >
              <View style={styles.feedbackHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eventName}>
                    {item.eventName}
                  </Text>

                  <Text style={styles.category}>
                    {item.category || "General"}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    deleteFeedback(item.id)
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    size={21}
                    color="#d32f2f"
                  />
                </TouchableOpacity>
              </View>

              {renderStars(Number(item.rating), 19)}

              <Text style={styles.feedbackText}>
                {item.feedback}
              </Text>

              <View style={styles.dateRow}>
                <Ionicons
                  name="time-outline"
                  size={15}
                  color="#777"
                />

                <Text style={styles.dateText}>
                  {item.submittedAt || "Recently submitted"}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  header: {
    backgroundColor: "#1976d2",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    marginRight: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#e3f2fd",
    marginTop: 3,
    fontSize: 13,
  },

  overallCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
    elevation: 3,
  },

  overallLabel: {
    color: "#666",
    fontSize: 15,
  },

  averageRating: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#1976d2",
    marginTop: 5,
  },

  starRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  star: {
    color: "#f5a623",
    marginHorizontal: 2,
  },

  totalText: {
    marginTop: 10,
    color: "#777",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 14,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
  },

  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },

  ratingNumber: {
    width: 18,
    fontWeight: "bold",
    color: "#444",
  },

  smallStar: {
    color: "#f5a623",
    marginHorizontal: 5,
  },

  progressBackground: {
    flex: 1,
    height: 9,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#1976d2",
    borderRadius: 10,
  },

  countText: {
    width: 30,
    textAlign: "right",
    color: "#555",
  },

  feedbackSection: {
    margin: 16,
  },

  feedbackCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 14,
    elevation: 2,
  },

  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  eventName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  category: {
    marginTop: 3,
    color: "#1976d2",
    fontSize: 13,
  },

  feedbackText: {
    marginTop: 12,
    color: "#444",
    fontSize: 15,
    lineHeight: 22,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  dateText: {
    color: "#777",
    fontSize: 12,
    marginLeft: 5,
  },

  emptyCard: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 12,
    color: "#333",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 8,
    lineHeight: 20,
  },

  browseButton: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 18,
  },

  browseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});