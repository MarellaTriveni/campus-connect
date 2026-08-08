import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function EventScreen() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <View>
      <Text>ReactNative Workshop</Text>
      {
        loggedIn ?
          (
            <Text style={{ color: "green" }}
            >LoggedIn successfully</Text>

          ) : (
            <Button
              title="Login"
              onPress={() => setLoggedIn(true)}
            >

            </Button>
          )
      }
    </View>
  );
}