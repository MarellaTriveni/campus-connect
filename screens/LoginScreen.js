import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check login status when screen opens
 

  async function handleLogin() {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }

    // Hardcoded credentials
    const validEmail = "student@gmail.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      await AsyncStorage.setItem("isLoggedIn", "true");

      alert("Login Successful");

      navigation.replace("Main");
    } else {
      alert("Invalid Email or Password");
    }
  }
   useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const status = await AsyncStorage.getItem("isLoggedIn");

    if (status === "true") {
      navigation.replace("Main");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login page</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        onPress={handleLogin}
        style={({ hovered }) => [
          styles.button,
          hovered && styles.buttonHover,
        ]}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        style={({ hovered }) => [
          styles.backButton,
          hovered && styles.backButtonHover,
        ]}
      >
        <Text style={styles.buttonText}>Back to Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E0F2FE",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    borderWidth: 2,
    borderColor: "#60A5FA",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonHover: {
    backgroundColor: "#1D4ED8",
  },

  backButton: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  backButtonHover: {
    backgroundColor: "#059669",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});