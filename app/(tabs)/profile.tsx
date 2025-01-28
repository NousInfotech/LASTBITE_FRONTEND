import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";

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
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => router.push("/Screens/Help")}
        >
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.userName}>John Daron</Text>
            <Text style={styles.userPhone}>+91 91234 65891</Text>
          </View>
          <TouchableOpacity onPress={() => alert("Edit Profile Clicked")}>
            <Text style={styles.editProfile}>Edit Profile &gt;</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>HDFC Bank Credit Card</Text>
            <Text style={styles.menuSubtitle}>Apply for the card and start earning cashbacks</Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>My Account</Text>
            <Text style={styles.menuSubtitle}>Favourites, Hidden restaurants & settings</Text>
          </View>
          <AntDesign name="down" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>My Wishlist</Text>
            <Text style={styles.menuSubtitle}>View all your saved lists</Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>Addresses</Text>
            <Text style={styles.menuSubtitle}>Share, Edit & Add new address</Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>Payments & Refunds</Text>
            <Text style={styles.menuSubtitle}>Refund status & Payment modes</Text>
          </View>
          <AntDesign name="down" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>Money & Gift cards</Text>
            <Text style={styles.menuSubtitle}>Account balance, Gift cards & Transaction History</Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>Refer & Earn Program</Text>
            <Text style={styles.menuSubtitle}>Refer friends & earn upto ₹15 cashback</Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <Text style={styles.menuTitle}>Logout Options</Text>
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
    justifyContent: "space-between",
    padding: 16,
  },
  helpButton: {
    backgroundColor: "#EFFFF4",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  helpText: {
    color: "#01615F",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 16,
  },
  profileInfo: {
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
  userPhone: {
    fontSize: 14,
    color: "#757575",
    fontFamily: "Poppins-Regular",
  },
  editProfile: {
    color: "#01615F",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  menuBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    // paddingVertical: 40,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#757575",
    fontFamily: "Poppins-Regular",
    marginTop: 4,
  },
});

export default ProfileScreen;
