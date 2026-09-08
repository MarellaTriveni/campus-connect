import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import NoticeScreen from "../screens/NoticeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#777",

        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 5,
          backgroundColor: "white",
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "home"
              : "home-outline";
          } else if (route.name === "Events") {
            iconName = focused
              ? "calendar"
              : "calendar-outline";
          } else if (route.name === "Notices") {
            iconName = focused
              ? "notifications"
              : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person"
              : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Events"
        component={EventScreen}
      />

      <Tab.Screen
        name="Notices"
        component={NoticeScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;