import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const FEEDBACK_KEY = "event_feedback";

export default function FeedbackSummaryScreen({ navigation }) {
  const [feedbackList, setFeedbackList] = useState([]);

  const loadFeedback = async () => {
    try {
      const stored = await AsyncStorage.getItem(FEEDBACK_KEY);

      if (stored) {
        setFeedbackList(JSON.parse(stored));
      } else {
        setFeedbackList([]);
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

  // Calculate average rating
  const averageRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce(
            (total, item) => total + Number(item.rating),
            0
          ) / feedbackList.length
        ).toFixed(1)
      : "0.0";

  // Count ratings
  const ratingCounts = {
    5: feedbackList.filter((item) => item.rating === 5).length,
    4: feedbackList.filter((item) => item.rating === 4).length,
    3: feedbackList.filter((item) => item.rating === 3).length,
    2: feedbackList.filter((item) => item.rating === 2).length,
    1: feedbackList.filter((item) => item.rating === 1).length,
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.smallStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={
              star <= Number(rating)
                ? "star"
                : "star-outline"
            }
            size={17}
            color="#F59E0B"
          />
        ))}
      </View>
    );
  };

  const renderFeedback = ({ item }) => (
    <View style={styles.feedbackCard}>
      <View style={styles.feedbackHeader}>
        <View style={styles.eventIcon}>
          <Ionicons
            name="calendar-outline"
            size={23}
            color="#2563EB"
          />
        </View>

        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>
            {item.eventName}
          </Text>

          <Text style={styles.feedbackDate}>
            Submitted: {item.date}
          </Text>
        </View>
      </View>

      <View style={styles.ratingRow}>
        {renderStars(item.rating)}

        <Text style={styles.ratingNumber}>
          {item.rating}/5
        </Text>
      </View>

      <View style={styles.commentBox}>
        <Ionicons
          name="chatbubble-outline"
          size={18}
          color="#64748B"
        />

        <Text style={styles.commentText}>
          {item.feedback}
        </Text>
      </View>
    </View>
  );

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
          Feedback Summary
        </Text>

        <TouchableOpacity onPress={loadFeedback}>
          <Ionicons
            name="refresh-outline"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.averageSection}>
          <Text style={styles.averageRating}>
            {averageRating}
          </Text>

          <View style={styles.averageStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={
                  star <= Math.round(Number(averageRating))
                    ? "star"
                    : "star-outline"
                }
                size={20}
                color="#F59E0B"
              />
            ))}
          </View>

          <Text style={styles.totalText}>
            {feedbackList.length} feedback
            {feedbackList.length !== 1 ? "s" : ""}
          </Text>
        </View>

        <View style={styles.distribution}>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating];

            const percentage =
              feedbackList.length > 0
                ? (count / feedbackList.length) * 100
                : 0;

            return (
              <View
                key={rating}
                style={styles.distributionRow}
              >
                <Text style={styles.ratingLabel}>
                  {rating}
                </Text>

                <Ionicons
                  name="star"
                  size={14}
                  color="#F59E0B"
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
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Submitted Feedback
        </Text>

        <Text style={styles.resultCount}>
          {feedbackList.length}
        </Text>
      </View>

      {/* Feedback List */}
      {feedbackList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="chatbubbles-outline"
            size={70}
            color="#CBD5E1"
          />

          <Text style={styles.emptyTitle}>
            No Feedback Yet
          </Text>

          <Text style={styles.emptyText}>
            Submit feedback for a registered event
            to see it here.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={feedbackList}
          keyExtractor={(item, index) =>
            `${item.eventId}-${index}`
          }
          renderItem={renderFeedback}
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

  summaryCard: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    elevation: 3,
    flexDirection: "row",
  },

  averageSection: {
    width: "38%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    paddingRight: 10,
  },

  averageRating: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#1E293B",
  },

  averageStars: {
    flexDirection: "row",
    marginTop: 4,
  },

  totalText: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 6,
  },

  distribution: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },

  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },

  ratingLabel: {
    width: 12,
    color: "#475569",
    fontSize: 12,
  },

  progressBackground: {
    flex: 1,
    height: 7,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    marginHorizontal: 7,
    overflow: "hidden",
  },

  progressBar: {
    height: 7,
    backgroundColor: "#F59E0B",
    borderRadius: 10,
  },

  countText: {
    width: 18,
    fontSize: 12,
    color: "#64748B",
    textAlign: "right",
  },

  sectionHeader: {
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },

  resultCount: {
    backgroundColor: "#DBEAFE",
    color: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "bold",
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  feedbackCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  feedbackHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  eventIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  eventInfo: {
    flex: 1,
    marginLeft: 10,
  },

  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },

  feedbackDate: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  smallStars: {
    flexDirection: "row",
  },

  ratingNumber: {
    marginLeft: 8,
    color: "#D97706",
    fontWeight: "bold",
  },

  commentBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  commentText: {
    flex: 1,
    marginLeft: 8,
    color: "#475569",
    lineHeight: 20,
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#334155",
    marginTop: 15,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 8,
    lineHeight: 21,
  },

  backButton: {
    marginTop: 18,
    backgroundColor: "#2563EB",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});