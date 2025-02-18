import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign, Entypo } from "@expo/vector-icons";

const ProfileScreen = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImagePlaceholder} />
          <TouchableOpacity style={styles.addButton}>
            <Entypo name="camera" size={13} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Lorem Ipsum</Text>
      </View>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.sectionBox} onPress={() => router.push("/Screens/RidersDetails")}
        >
          <Text style={styles.sectionTitle}>Basic Details</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionBox} onPress={() => router.push("/Screens/RidersAddress")}>
          <Text style={styles.sectionTitle}>Address</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionBox} onPress={() => router.push("/Screens/RidersDocument")}>
          <Text style={styles.sectionTitle}>Documentations</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionBox} onPress={() => router.push("/Screens/RatingReview")}>
          <Text style={styles.sectionTitle}>Reviews and Ratings</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  profileCard: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E0E0",
  },
  addButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#01615F",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginTop: 8,
  },
  content: {
    paddingHorizontal: 16,
  },
  sectionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default ProfileScreen;
