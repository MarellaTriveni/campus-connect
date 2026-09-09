import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "my_registrations";

const MyRegistrationsScreen = ({ navigation }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected event for details modal
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Load registrations when screen opens
  useEffect(() => {
    loadRegistrations();
  }, []);

  // --------------------------------
  // LOAD REGISTRATIONS
  // --------------------------------
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
      console.log(
        "Error loading registrations:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // VIEW DETAILS
  // --------------------------------
  const viewDetails = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  // --------------------------------
  // CLOSE MODAL
  // --------------------------------
  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  // --------------------------------
  // CANCEL REGISTRATION
  // --------------------------------
  const cancelRegistration = async (id) => {
    try {
      const updatedData = registrations.filter(
        (item) => item.id !== id
      );

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedData)
      );

      setRegistrations(updatedData);
    } catch (error) {
      console.log(
        "Error cancelling registration:",
        error
      );
    }
  };

  // --------------------------------
  // REGISTRATION CARD
  // --------------------------------
  const renderRegistration = ({
    item,
    index,
  }) => {
    const registrationId = `REG${String(
      index + 1
    ).padStart(3, "0")}`;

    return (
      <View style={styles.card}>

        {/* ICON */}
        <View style={styles.iconBox}>
          <Ionicons
            name="clipboard-outline"
            size={28}
            color="#6C63FF"
          />
        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* TITLE + STATUS */}
          <View style={styles.titleRow}>

            <Text
              style={styles.title}
              numberOfLines={2}
            >
              {item.title}
            </Text>

            <View style={styles.statusBadge}>
              <Ionicons
                name="checkmark-circle"
                size={13}
                color="#2E8B57"
              />

              <Text style={styles.statusText}>
                Registered
              </Text>
            </View>

          </View>

          {/* REGISTRATION ID */}
          <Text style={styles.registrationId}>
            Registration ID: {registrationId}
          </Text>

          {/* CATEGORY */}
          <Text style={styles.category}>
            {item.category}
          </Text>

          {/* DATE */}
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

          {/* TIME */}
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

          {/* VENUE */}
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

          {/* BUTTONS */}
          <View style={styles.buttonRow}>

            {/* VIEW DETAILS */}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => viewDetails(item)}
            >
              <Ionicons
                name="eye-outline"
                size={18}
                color="#6C63FF"
              />

              <Text style={styles.detailsText}>
                View Details
              </Text>
            </TouchableOpacity>

            {/* CANCEL */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                cancelRegistration(item.id)
              }
            >
              <Ionicons
                name="close-circle-outline"
                size={18}
                color="white"
              />

              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* =========================
          HEADER
      ========================= */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Registrations
        </Text>

        {/* COUNT */}
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

      {/* =========================
          LOADING
      ========================= */}
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

          showsVerticalScrollIndicator={false}

          ListHeaderComponent={
            registrations.length > 0 ? (
              <View style={styles.infoCard}>

                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#6C63FF"
                />

                <Text style={styles.infoCardText}>
                  Here you can view and manage
                  your registered events.
                </Text>

              </View>
            ) : null
          }

          ListEmptyComponent={
            <View style={styles.emptyContainer}>

              <View style={styles.emptyIconCircle}>

                <Ionicons
                  name="clipboard-outline"
                  size={60}
                  color="#6C63FF"
                />

              </View>

              <Text style={styles.emptyTitle}>
                No Registrations
              </Text>

              <Text style={styles.emptyText}>
                You have not registered for any
                events yet.
              </Text>

              <TouchableOpacity
                style={styles.eventButton}
                onPress={() =>
                  navigation.navigate("Events")
                }
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="white"
                />

                <Text style={styles.eventButtonText}>
                  Browse Events
                </Text>

              </TouchableOpacity>

            </View>
          }
        />

      )}

      {/* =========================
          DETAILS MODAL
      ========================= */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalBox}>

            {/* CLOSE ICON */}
            <TouchableOpacity
              style={styles.modalCloseIcon}
              onPress={closeModal}
            >
              <Ionicons
                name="close"
                size={24}
                color="#555"
              />
            </TouchableOpacity>

            {/* SUCCESS ICON */}
            <View style={styles.successCircle}>

              <Ionicons
                name="checkmark"
                size={40}
                color="#2E8B57"
              />

            </View>

            {/* MODAL TITLE */}
            <Text style={styles.modalTitle}>
              Registration Confirmed
            </Text>

            {/* EVENT NAME */}
            <Text style={styles.modalEventTitle}>
              {selectedEvent?.title}
            </Text>

            {/* STATUS */}
            <View style={styles.modalStatus}>

              <Ionicons
                name="checkmark-circle"
                size={17}
                color="#2E8B57"
              />

              <Text style={styles.modalStatusText}>
                Registered
              </Text>

            </View>

            {/* DETAILS */}
            <View style={styles.detailsContainer}>

              {/* DATE */}
              <View style={styles.detailRow}>

                <View style={styles.detailIcon}>
                  <Ionicons
                    name="calendar-outline"
                    size={19}
                    color="#6C63FF"
                  />
                </View>

                <View>
                  <Text style={styles.detailLabel}>
                    Date
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedEvent?.date}
                  </Text>
                </View>

              </View>

              {/* TIME */}
              <View style={styles.detailRow}>

                <View style={styles.detailIcon}>
                  <Ionicons
                    name="time-outline"
                    size={19}
                    color="#6C63FF"
                  />
                </View>

                <View>
                  <Text style={styles.detailLabel}>
                    Time
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedEvent?.time}
                  </Text>
                </View>

              </View>

              {/* VENUE */}
              <View style={styles.detailRow}>

                <View style={styles.detailIcon}>
                  <Ionicons
                    name="location-outline"
                    size={19}
                    color="#6C63FF"
                  />
                </View>

                <View>
                  <Text style={styles.detailLabel}>
                    Venue
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedEvent?.venue}
                  </Text>
                </View>

              </View>

              {/* CATEGORY */}
              <View style={styles.detailRow}>

                <View style={styles.detailIcon}>
                  <Ionicons
                    name="pricetag-outline"
                    size={19}
                    color="#6C63FF"
                  />
                </View>

                <View>
                  <Text style={styles.detailLabel}>
                    Category
                  </Text>

                  <Text style={styles.detailValue}>
                    {selectedEvent?.category}
                  </Text>
                </View>

              </View>

            </View>

            {/* CLOSE BUTTON */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>
                Close
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>
  );
};

export default MyRegistrationsScreen;

const styles = StyleSheet.create({

  // MAIN
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  // HEADER
  header: {
    height: 65,
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  backButton: {
    width: 40,
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  countText: {
    color: "#6C63FF",
    fontWeight: "bold",
    marginLeft: 4,
  },

  // LIST
  list: {
    padding: 15,
    paddingBottom: 30,
    flexGrow: 1,
  },

  // INFORMATION CARD
  infoCard: {
    backgroundColor: "#EEEEFF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  infoCardText: {
    flex: 1,
    marginLeft: 8,
    color: "#555",
    fontSize: 13,
    lineHeight: 18,
  },

  // REGISTRATION CARD
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 13,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  // TITLE
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginRight: 7,
  },

  // STATUS
  statusBadge: {
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  statusText: {
    color: "#2E8B57",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 3,
  },

  registrationId: {
    color: "#888",
    fontSize: 11,
    marginTop: 5,
  },

  category: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 7,
    marginBottom: 8,
  },

  // EVENT INFORMATION
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

  // BUTTONS
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  detailsButton: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 7,
  },

  detailsText: {
    color: "#6C63FF",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 5,
  },

  cancelButton: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#E74C3C",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 7,
  },

  cancelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 5,
  },

  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  // EMPTY
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    minHeight: 500,
  },

  emptyIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
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
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  eventButton: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  eventButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 7,
  },

  // =========================
  // MODAL
  // =========================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalBox: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
  },

  modalCloseIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },

  successCircle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#E8F7EE",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginTop: 15,
  },

  modalEventTitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },

  modalStatus: {
    backgroundColor: "#E8F7EE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  modalStatusText: {
    color: "#2E8B57",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 12,
  },

  detailsContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#F7F7FB",
    borderRadius: 15,
    padding: 15,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  detailRowLast: {
    marginBottom: 0,
  },

  detailIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EEEEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  detailLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 2,
  },

  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  closeButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  closeButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

});