import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const STORAGE_KEY = "my_registrations";

const categories = [
  "All",
  "Technical",
  "Workshop",
  "Cultural",
  "Sports",
];

export default function MyRegistrationsScreen({ navigation }) {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadRegistrations();
    });

    return unsubscribe;
  }, [navigation]);

  const loadRegistrations = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        setRegistrations(JSON.parse(data));
      } else {
        setRegistrations([]);
      }
    } catch (error) {
      console.log("Error loading registrations:", error);
    }
  };

  const cancelRegistration = (registrationId) => {
    Alert.alert(
      "Cancel Registration",
      "Are you sure you want to cancel this registration?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              const updated = registrations.filter(
                (item) => item.id !== registrationId
              );

              setRegistrations(updated);

              await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updated)
              );

              Alert.alert(
                "Cancelled",
                "Registration cancelled successfully."
              );
            } catch (error) {
              console.log(
                "Error cancelling registration:",
                error
              );
            }
          },
        },
      ]
    );
  };

  const filteredRegistrations = registrations.filter(
    (item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.eventName
          ?.toLowerCase()
          .includes(searchText) ||
        item.category
          ?.toLowerCase()
          .includes(searchText) ||
        item.venue
          ?.toLowerCase()
          .includes(searchText) ||
        item.id
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  const renderRegistration = ({ item }) => {
    return (
      <View style={styles.card}>

        {/* Header */}
        <View style={styles.topRow}>
          <View style={styles.iconBox}>
            <Ionicons
              name="ticket-outline"
              size={27}
              color="#2563EB"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.eventTitle}>
              {item.eventName}
            </Text>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {item.category}
              </Text>
            </View>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              Registered
            </Text>
          </View>
        </View>

        {/* Event Details */}
        <View style={styles.infoContainer}>

          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={19}
              color="#2563EB"
            />

            <Text style={styles.infoText}>
              {item.date}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={19}
              color="#2563EB"
            />

            <Text style={styles.infoText}>
              {item.time}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={19}
              color="#2563EB"
            />

            <Text style={styles.infoText}>
              {item.venue}
            </Text>
          </View>

        </View>

        {/* Registration ID */}
        <View style={styles.registrationBox}>
          <View>
            <Text style={styles.registrationLabel}>
              Registration ID
            </Text>

            <Text style={styles.registrationId}>
              {item.id}
            </Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={25}
            color="#16A34A"
          />
        </View>

        {/* Registration Date */}
        {item.registrationDate && (
          <Text style={styles.registeredDate}>
            Registered on: {item.registrationDate}
          </Text>
        )}

        {/* Cancel */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            cancelRegistration(item.id)
          }
        >
          <Ionicons
            name="close-circle-outline"
            size={20}
            color="#DC2626"
          />

          <Text style={styles.cancelText}>
            Cancel Registration
          </Text>
        </TouchableOpacity>

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
            size={27}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            My Registrations
          </Text>

          <Text style={styles.headerSubtitle}>
            {registrations.length} registration
            {registrations.length !== 1 ? "s" : ""}
          </Text>
        </View>

        <Ionicons
          name="ticket"
          size={27}
          color="#fff"
        />
      </View>

      {/* Search */}
      {registrations.length > 0 && (
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search registrations..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      )}

      {/* Categories */}
      {registrations.length > 0 && (
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
              onPress={() =>
                setSelectedCategory(item)
              }
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

      {/* Count */}
      {registrations.length > 0 && (
        <Text style={styles.resultText}>
          {filteredRegistrations.length} registration
          {filteredRegistrations.length !== 1
            ? "s"
            : ""}{" "}
          found
        </Text>
      )}

      {/* Empty State */}
      {registrations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="ticket-outline"
            size={75}
            color="#aaa"
          />

          <Text style={styles.emptyTitle}>
            No Registrations
          </Text>

          <Text style={styles.emptyText}>
            You have not registered for any events yet.
          </Text>

          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate("Events")}
          >
            <Text style={styles.browseText}>
              Browse Events
            </Text>
          </TouchableOpacity>
        </View>
      ) : filteredRegistrations.length === 0 ? (
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
          data={filteredRegistrations}
          keyExtractor={(item) => item.id}
          renderItem={renderRegistration}
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
    fontSize: 20,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#DCE7FF",
    fontSize: 13,
    marginTop: 3,
  },

  searchBox: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
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

  card: {
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
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#E8F0FF",
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },

  eventTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
    marginTop: 5,
  },

  categoryText: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "bold",
  },

  statusBadge: {
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  statusText: {
    color: "#16A34A",
    fontSize: 11,
    fontWeight: "bold",
  },

  infoContainer: {
    marginTop: 15,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  infoText: {
    marginLeft: 9,
    color: "#555",
    fontSize: 14,
  },

  registrationBox: {
    backgroundColor: "#F0FDF4",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  registrationLabel: {
    color: "#666",
    fontSize: 11,
  },

  registrationId: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 3,
  },

  registeredDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 9,
  },

  cancelButton: {
    height: 45,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 10,
    marginTop: 13,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFF",
  },

  cancelText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 7,
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