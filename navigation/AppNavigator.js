import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import StudentRegistration from "../screens/StudentRegistration";
import BottomTabs from "./BottomTabs";
import SettingsScreen from "../screens/SettingsScreen";
import SavedScreen from "../screens/SavedScreen";
import NotificationScreen from "../screens/NotificationScreen";
import NoticeScreen  from "../screens/NoticeScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="StudentRegistration"
        component={StudentRegistration}
      />

      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Saved"
        component={SavedScreen}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
      />
      <Stack.Screen
        name="Notices"
        component={NoticeScreen}
      />
    </Stack.Navigator>
  );
}