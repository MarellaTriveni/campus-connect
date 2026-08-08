import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Header from "../components/Header";
import WelcomeCard from "../components/WelcomeCard";
import NoticeCard from "../components/NoticeCard";
import Footer from "../components/Footer";
import ProfileScreen from "./ProfileScreen";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const notices = [
      {
        id: 1,
        title: "React Native Workshop",
        date: "30 July",
        venue: "Seminar Hall",
        image: { uri: "https://picsum.photos/300?random=1" },
        // image: require("../assets/vignan nirula logo.jpg"),
      },
      {
        id: 2,
        title: "Hackathon",
        date: "10 August",
        venue: "Computer Lab",
        image: { uri: "https://picsum.photos/300?random=1" },
      },
      {
        id: 3,
        title: "Placement Drive",
        date: "15 August",
        venue: "Auditorium",
        image: { uri: "https://picsum.photos/300?random=2" },
      },
      {
        id: 4,
        title: "Exams Tomorrow",
        date: "23 August",
        venue: "NSF-404",
        image: { uri: "https://picsum.photos/300?random=3" },
      },
    ];

    setData(notices);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Ionicons
          name="home"
          size={40}
          color="blue"
          style={styles.icon}
        />

        <MaterialIcons
          name="school"
          size={40}
          color="green"
          style={styles.icon}
        />

        <Header />
        <WelcomeCard />

        {data.map((item) => (
          <NoticeCard
            key={item.id}
            title={item.title}
            date={item.date}
            venue={item.venue}
            image={item.image}
          />
        ))}

        <ProfileScreen navigation={navigation} />
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3E8FF",
    padding: 10,
  },
  icon: {
    alignSelf: "center",
    marginVertical: 10,
  },
});