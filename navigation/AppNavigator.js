import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import StudentRegistration from "../screens/StudentRegistration";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BottomTabs from "./BottomTabs";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentRegistration"
        component={StudentRegistration}
      />
      <Stack.Screen
        name="Logout"
        component={ProfileScreen}
      />

      <Stack.Screen
        name="Main"
        component={BottomTabs}
      />
      <Stack.Screen 
      name="Login" 
      component={LoginScreen}
     />
    </Stack.Navigator>
    
  );
}