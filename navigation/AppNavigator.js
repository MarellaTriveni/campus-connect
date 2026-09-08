import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";

import NotificationScreen from "../screens/NotificationScreen";
import EventScreen from "../screens/EventScreen";
import MyRegistrationsScreen from "../screens/MyRegistrationsScreen";
import SavedScreen from "../screens/SavedScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >

      {/* BOTTOM TABS */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
      />

      {/* NOTIFICATIONS */}
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      {/* EVENTS */}
      <Stack.Screen
        name="Event"
        component={EventScreen}
      />

      {/* MY REGISTRATIONS */}
      <Stack.Screen
        name="MyRegistrations"
        component={MyRegistrationsScreen}
      />

      {/* SAVED */}
      <Stack.Screen
        name="Saved"
        component={SavedScreen}
      />

      {/* SETTINGS */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      {/* PROFILE */}
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;