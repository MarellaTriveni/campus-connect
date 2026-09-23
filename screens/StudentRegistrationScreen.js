import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";

export default function StudentRegistration({ navigation }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (
      name === "" ||
      rollNo === "" ||
      department === "" ||
      email === "" ||
      phone === "" ||
      password === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number should be 10 digits");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 letters");
      return;
    }

    alert("Registration Successful");

    console.log({
      name,
      rollNo,
      department,
      email,
      phone,
      password,
    });

    setName("");
    setRollNo("");
    setDepartment("");
    setEmail("");
    setPhone("");
    setPassword("");

    navigation.navigate("Login");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Registration</Text>

      <Text>Student Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <Text>Roll No</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Roll Number"
        value={rollNo}
        onChangeText={setRollNo}
      />

      <Text>Department</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Department"
        value={department}
        onChangeText={setDepartment}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />

      <Text>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={handleLogin} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6D28D9",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 2,
    borderColor: "#C4B5FD",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#F9FAFB",
    marginBottom: 10,
  },
});