import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "my_registrations";

const MyRegistrationsScreen = ({ navigation }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      const savedData = await AsyncStorage.getItem(
        STORAGE_KEY
      );

      if (savedData) {
        setRegistrations(JSON.parse(savedData));
      } else {
        setRegistrations([]);
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to load registrations."
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelRegistration = (id, title) => {
    Alert.alert(
      "Cancel Registration",
      `Do you want to cancel registration for ${title}?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const updatedData = registrations.filter(
                (item) => item.id !== id
              );

              await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedData)
              );

              setRegistrations(updatedData);

              Alert.alert(
                "Cancelled",
                "Registration cancelled successfully."
              );
            } catch (error) {
              console.log(error);

              Alert.alert(
                "Error",
                "Unable to cancel registration."
              );
            }
          },
        },
      ]
    );
  };

  const renderRegistration = ({ item }) => (
    <View style={styles.card}>

      {/* NEW ICON */}
      <View style={styles.iconBox}>
        <Ionicons
          name="clipboard-outline"
          size={28}
          color="#6C63FF"
        />
      </View>

      <View style={styles.content}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.category}>
          {item.category}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color="#555"
          />

          <Text style={styles.info}>
            {item.date}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color="#555"
          />

          <Text style={styles.info}>
            {item.time}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color="#555"
          />

          <Text style={styles.info}>
            {item.venue}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            cancelRegistration(
              item.id,
              item.title
            )
          }
        >
          <Ionicons
            name="close-circle-outline"
            size={18}
            color="white"
          />

          <Text style={styles.cancelText}>
            Cancel Registration
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
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
          My Registrations
        </Text>

        <View style={styles.countBox}>
          <Ionicons
            name="clipboard-outline"
            size={15}
            color="#6C63FF"
          />

          <Text style={styles.countText}>
            {registrations.length}
          </Text>
        </View>

      </View>

      {loading ? (
        <View style={styles.loadingContainer}>

          <ActivityIndicator
            size="large"
            color="#6C63FF"
          />

          <Text style={styles.loadingText}>
            Loading registrations...
          </Text>

        </View>
      ) : (
        <FlatList
          data={registrations}
          keyExtractor={(item) => item.id}
          renderItem={renderRegistration}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>

              <Ionicons
                name="clipboard-outline"
                size={70}
                color="#aaa"
              />

              <Text style={styles.emptyTitle}>
                No Registrations
              </Text>

              <Text style={styles.emptyText}>
                You have not registered for any events yet.
              </Text>

              <TouchableOpacity
                style={styles.eventButton}
                onPress={() =>
                  navigation.navigate("Event")
                }
              >
                <Text style={styles.eventButtonText}>
                  Browse Events
                </Text>
              </TouchableOpacity>

            </View>
          }
        />
      )}

    </View>
  );
};

export default MyRegistrationsScreen;

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

  countBox: {
    backgroundColor: "white",
    minWidth: 45,
    height: 30,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  countText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 4,
  },

  list: {
    padding: 15,
    flexGrow: 1,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  category: {
    color: "#6C63FF",
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  info: {
    marginLeft: 7,
    color: "#555",
    fontSize: 13,
  },

  cancelButton: {
    backgroundColor: "#E74C3C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 8,
    marginTop: 10,
  },

  cancelText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    minHeight: 500,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 8,
  },

  eventButton: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  eventButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});