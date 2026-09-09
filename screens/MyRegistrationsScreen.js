import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const STORAGE_KEY = "my_registrations";

const MyRegistrationsScreen = ({ navigation }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // NEW - Search and filter
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Load whenever screen opens
  useFocusEffect(
    useCallback(() => {
      loadRegistrations();
    }, [])
  );

  const loadRegistrations = async () => {
    try {
      setLoading(true);

      const savedData =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (savedData) {
        setRegistrations(JSON.parse(savedData));
      } else {
        setRegistrations([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Counts
  const totalCount = registrations.length;

  const registeredCount = registrations.filter(
    (item) => item.status !== "Cancelled"
  ).length;

  const cancelledCount = registrations.filter(
    (item) => item.status === "Cancelled"
  ).length;

  // Search + Filter
  const filteredRegistrations = registrations.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText) ||
      item.venue.toLowerCase().includes(searchText) ||
      (item.registrationId &&
        item.registrationId
          .toLowerCase()
          .includes(searchText));

    let matchesFilter = true;

    if (selectedFilter === "Registered") {
      matchesFilter = item.status !== "Cancelled";
    }

    if (selectedFilter === "Cancelled") {
      matchesFilter = item.status === "Cancelled";
    }

    return matchesSearch && matchesFilter;
  });

  // View details
  const viewDetails = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  // Cancel registration
  const cancelRegistration = (item) => {
    Alert.alert(
      "Cancel Registration",
      `Are you sure you want to cancel ${item.title}?`,
      [
        {
          text: "Keep",
          style: "cancel",
        },
        {
          text: "Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedRegistrations =
                registrations.map((registration) => {
                  if (registration.id === item.id) {
                    return {
                      ...registration,
                      status: "Cancelled",
                    };
                  }

                  return registration;
                });

              await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedRegistrations)
              );

              setRegistrations(updatedRegistrations);
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

  // Empty state
  const EmptyState = () => {
    const isSearching =
      search.trim().length > 0 ||
      selectedFilter !== "All";

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons
            name={
              isSearching
                ? "search-outline"
                : "clipboard-outline"
            }
            size={48}
            color="#6C63FF"
          />
        </View>

        <Text style={styles.emptyTitle}>
          {isSearching
            ? "No registrations found"
            : "No Registrations"}
        </Text>

        <Text style={styles.emptyText}>
          {isSearching
            ? "Try a different search or filter."
            : "You have not registered for any events yet."}
        </Text>

        {!isSearching && (
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() =>
              navigation.navigate("Events")
            }
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color="white"
            />

            <Text style={styles.browseButtonText}>
              Browse Events
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Registration card
  const renderRegistration = ({ item }) => {
    const isCancelled =
      item.status === "Cancelled";

    return (
      <View style={styles.card}>

        {/* Top */}
        <View style={styles.cardTop}>
          <View style={styles.iconBox}>
            <Ionicons
              name="clipboard-outline"
              size={28}
              color="#6C63FF"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.eventTitle}>
              {item.title}
            </Text>

            <Text style={styles.registrationId}>
              Registration ID:{" "}
              {item.registrationId || "REG001"}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              isCancelled &&
                styles.cancelledBadge,
            ]}
          >
            <Ionicons
              name={
                isCancelled
                  ? "close-circle"
                  : "checkmark-circle"
              }
              size={15}
              color={
                isCancelled
                  ? "#D64545"
                  : "#249653"
              }
            />

            <Text
              style={[
                styles.statusText,
                isCancelled &&
                  styles.cancelledText,
              ]}
            >
              {isCancelled
                ? "Cancelled"
                : "Registered"}
            </Text>
          </View>
        </View>

        {/* Category */}
        <Text style={styles.category}>
          {item.category}
        </Text>

        {/* Date */}
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#666"
          />

          <Text style={styles.infoText}>
            {item.date}
          </Text>
        </View>

        {/* Time */}
        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={18}
            color="#666"
          />

          <Text style={styles.infoText}>
            {item.time}
          </Text>
        </View>

        {/* Venue */}
        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={18}
            color="#666"
          />

          <Text style={styles.infoText}>
            {item.venue}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => viewDetails(item)}
          >
            <Ionicons
              name="eye-outline"
              size={19}
              color="#6C63FF"
            />

            <Text style={styles.detailsText}>
              View Details
            </Text>
          </TouchableOpacity>

          {!isCancelled && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                cancelRegistration(item)
              }
            >
              <Ionicons
                name="close-circle-outline"
                size={19}
                color="white"
              />

              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
          )}

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Registrations
        </Text>

        <View style={styles.countBadge}>
          <Ionicons
            name="clipboard-outline"
            size={20}
            color="#6C63FF"
          />

          <Text style={styles.countText}>
            {totalCount}
          </Text>
        </View>

      </View>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {totalCount}
          </Text>

          <Text style={styles.summaryLabel}>
            Total
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text
            style={[
              styles.summaryNumber,
              { color: "#249653" },
            ]}
          >
            {registeredCount}
          </Text>

          <Text style={styles.summaryLabel}>
            Registered
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text
            style={[
              styles.summaryNumber,
              { color: "#D64545" },
            ]}
          >
            {cancelledCount}
          </Text>

          <Text style={styles.summaryLabel}>
            Cancelled
          </Text>
        </View>

      </View>

      {/* SEARCH */}
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

        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearch("")}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}

      </View>

      {/* FILTERS */}
      <View style={styles.filterContainer}>

        {[
          `All ${totalCount}`,
          `Registered ${registeredCount}`,
          `Cancelled ${cancelledCount}`,
        ].map((filter) => {

          const filterName = filter.split(" ")[0];

          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filterName &&
                  styles.selectedFilter,
              ]}
              onPress={() =>
                setSelectedFilter(filterName)
              }
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filterName &&
                    styles.selectedFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}

      </View>

      {/* LIST */}
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
          data={filteredRegistrations}
          keyExtractor={(item, index) =>
            item.registrationId ||
            `${item.id}-${index}`
          }
          renderItem={renderRegistration}
          contentContainerStyle={[
            styles.listContent,
            filteredRegistrations.length === 0 &&
              styles.emptyList,
          ]}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* DETAILS MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Registration Details
              </Text>

              <TouchableOpacity
                onPress={closeModal}
              >
                <Ionicons
                  name="close"
                  size={27}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {selectedEvent && (
              <>
                <View style={styles.modalIcon}>
                  <Ionicons
                    name="checkmark-circle"
                    size={45}
                    color={
                      selectedEvent.status ===
                      "Cancelled"
                        ? "#D64545"
                        : "#249653"
                    }
                  />
                </View>

                <Text style={styles.modalEventTitle}>
                  {selectedEvent.title}
                </Text>

                <View
                  style={[
                    styles.modalStatus,
                    selectedEvent.status ===
                      "Cancelled" &&
                      styles.modalCancelled,
                  ]}
                >
                  <Text
                    style={[
                      styles.modalStatusText,
                      selectedEvent.status ===
                        "Cancelled" &&
                        styles.modalCancelledText,
                    ]}
                  >
                    {selectedEvent.status ===
                    "Cancelled"
                      ? "Registration Cancelled"
                      : "Registration Confirmed"}
                  </Text>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons
                    name="id-card-outline"
                    size={21}
                    color="#6C63FF"
                  />

                  <View>
                    <Text style={styles.modalLabel}>
                      Registration ID
                    </Text>

                    <Text style={styles.modalValue}>
                      {selectedEvent.registrationId ||
                        "REG001"}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={21}
                    color="#6C63FF"
                  />

                  <View>
                    <Text style={styles.modalLabel}>
                      Date
                    </Text>

                    <Text style={styles.modalValue}>
                      {selectedEvent.date}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons
                    name="time-outline"
                    size={21}
                    color="#6C63FF"
                  />

                  <View>
                    <Text style={styles.modalLabel}>
                      Time
                    </Text>

                    <Text style={styles.modalValue}>
                      {selectedEvent.time}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons
                    name="location-outline"
                    size={21}
                    color="#6C63FF"
                  />

                  <View>
                    <Text style={styles.modalLabel}>
                      Venue
                    </Text>

                    <Text style={styles.modalValue}>
                      {selectedEvent.venue}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={closeModal}
                >
                  <Text
                    style={styles.modalCloseText}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}

          </View>
        </View>
      </Modal>
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
    fontSize: 21,
    fontWeight: "bold",
  },

  countBadge: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  countText: {
    color: "#6C63FF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },

  summaryCard: {
    backgroundColor: "white",
    margin: 15,
    borderRadius: 15,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 2,
  },

  summaryItem: {
    alignItems: "center",
    flex: 1,
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  summaryLabel: {
    color: "#777",
    fontSize: 12,
    marginTop: 3,
  },

  divider: {
    width: 1,
    backgroundColor: "#eee",
  },

  searchBox: {
    backgroundColor: "white",
    marginHorizontal: 15,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 15,
  },

  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  filterButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },

  selectedFilter: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  filterText: {
    color: "#555",
    fontWeight: "600",
    fontSize: 13,
  },

  selectedFilterText: {
    color: "white",
  },

  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },

  emptyList: {
    flexGrow: 1,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
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

  registrationId: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF8EF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  },

  cancelledBadge: {
    backgroundColor: "#FDECEC",
  },

  statusText: {
    color: "#249653",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 3,
  },

  cancelledText: {
    color: "#D64545",
  },

  category: {
    color: "#6C63FF",
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 7,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  infoText: {
    color: "#555",
    marginLeft: 8,
    fontSize: 14,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  detailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  detailsText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 6,
  },

  cancelButton: {
    flex: 0.65,
    backgroundColor: "#E94B3C",
    borderRadius: 11,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  cancelText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222",
    marginTop: 18,
  },

  emptyText: {
    color: "#777",
    fontSize: 15,
    marginTop: 7,
    textAlign: "center",
  },

  browseButton: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  browseButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 7,
    fontSize: 15,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#777",
    marginTop: 10,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 22,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },

  modalIcon: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#EAF8EF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
  },

  modalEventTitle: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },

  modalStatus: {
    alignSelf: "center",
    backgroundColor: "#EAF8EF",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 15,
    marginTop: 8,
    marginBottom: 15,
  },

  modalCancelled: {
    backgroundColor: "#FDECEC",
  },

  modalStatusText: {
    color: "#249653",
    fontWeight: "bold",
  },

  modalCancelledText: {
    color: "#D64545",
  },

  modalInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  modalLabel: {
    color: "#888",
    fontSize: 12,
    marginLeft: 12,
  },

  modalValue: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },

  modalCloseButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 18,
  },

  modalCloseText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});