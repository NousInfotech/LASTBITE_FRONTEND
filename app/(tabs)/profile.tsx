import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNewExpanded, setIsNewExpanded] = useState(false);

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
    // <SafeAreaView style={styles.container}>
    <SafeAreaView>
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
          <TouchableOpacity onPress={() => router.push("/Screens/EditAccount")}>
            <Text style={styles.editProfile}>Edit Profile &gt;</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => router.push("/Screens/CreditCard")}
        >
          <View>
            <Text style={styles.menuTitle}>HDFC Bank Credit Card</Text>
            <Text style={styles.menuSubtitle}>
              Apply for the card and start earning cashbacks
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <View>
          {/* My Account Button */}
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <View>
              <Text style={styles.menuTitle}>My Account</Text>
              <Text style={styles.menuSubtitle}>
                Favourites, Hidden restaurants & settings
              </Text>
            </View>
            <AntDesign
              name={isExpanded ? "up" : "down"}
              size={16}
              color="#757575"
            />
          </TouchableOpacity>

          {/* Expandable Menu Items */}
          {isExpanded && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push("/Screens/Favorites")}
              >
                <View style={styles.iconBox}>
                  <AntDesign name="hearto" size={16} color="#000" />
                </View>
                <Text style={styles.menuItemText}>Favorites</Text>
                <AntDesign name="right" size={16} color="#757575" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push("/Screens/HiddenRestaurant")}
              >
                <View style={styles.iconBox}>
                  <AntDesign name="home" size={16} color="#000" />
                </View>
                <Text style={styles.menuItemText}>Hidden Restaurants</Text>
                <AntDesign name="right" size={16} color="#757575" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/Screens/Settings")}>
                <View style={styles.iconBox}>
                  <AntDesign name="setting" size={16} color="#000" />
                </View>
                <Text style={styles.menuItemText}>Settings</Text>
                <AntDesign name="right" size={16} color="#757575" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.menuBox} onPress={() => router.push("/Screens/WishList")}>
          <View>
            <Text style={styles.menuTitle}>My Wishlist</Text>
            <Text style={styles.menuSubtitle}>View all your saved lists</Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => router.push("/initialscreens/AddressManagementScreen")}
        >
          <View>
            <Text style={styles.menuTitle}>Addresses</Text>
            <Text style={styles.menuSubtitle}>
              Share, Edit & Add new address
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => setIsNewExpanded(!isNewExpanded)}
        >
          <View>
            <Text style={styles.menuTitle}>Payments & Refunds</Text>
            <Text style={styles.menuSubtitle}>
              Refund status & Payment modes
            </Text>
          </View>
          <AntDesign
            name={isExpanded ? "up" : "down"}
            size={16}
            color="#757575"
          />
        </TouchableOpacity>

        {/* Dropdown Menu Items */}
        {isNewExpanded && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.iconBox}>
                <Image
                  source={require("../../assets/images/Transaction-1.png")} // Replace with correct path
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.menuItemText}>Refund Status</Text>
              <AntDesign name="right" size={16} color="#757575" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.iconBox}>
                <Image
                  source={require("../../assets/images/MasterCard.png")} // Replace with correct path
                  style={styles.iconImage}
                />
              </View>
              <Text style={styles.menuItemText}>Payment Modes</Text>
              <AntDesign name="right" size={16} color="#757575" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>Money & Gift cards</Text>
            <Text style={styles.menuSubtitle}>
              Account balance, Gift cards & Transaction History
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox}>
          <View>
            <Text style={styles.menuTitle}>Refer & Earn Program</Text>
            <Text style={styles.menuSubtitle}>
              Refer friends & earn upto ₹15 cashback
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => router.push("/Screens/LogOut")}
        >
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
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#757575",
    fontFamily: "Poppins-Regular",
    marginTop: 2,
  },
  dropdownMenu: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 8, // Fix for border radius
    borderBottomRightRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    marginBottom: 16,
    marginTop: -20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    flex: 1,
    marginLeft: 8,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default ProfileScreen;
