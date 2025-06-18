import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useUserData } from "@/utils/UserDataStore";
import Header from "@/components/GoBack";

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isNewExpanded, setIsNewExpanded] = useState<boolean>(false);
  
  // Get user data from store
  const userData = useUserData();

  useEffect(() => {
    async function loadFonts(): Promise<void> {
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

  const handleMoney = (): void => {
    router.push('/Screens/MoneyGifts')  
  } 

  const handleReferEarn = (): void => {
    router.push('/Screens/ReferEarn')  
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
     
      <Header 
  buttonText="Help" 
  buttonRoute="/Screens/Help"
/>
      <ScrollView style={styles.content}>
        <View style={styles.profileInfo}>
          <View>
            <Text allowFontScaling={false}  style={styles.userName}>{userData.name}</Text>
            <Text allowFontScaling={false}  style={styles.userPhone}>{userData.phone}</Text>
            {userData.email && <Text allowFontScaling={false}  style={styles.userEmail}>{userData.email}</Text>}
          </View>
          <TouchableOpacity onPress={() => router.push("/Screens/EditAccount")}>
            <Text allowFontScaling={false}  style={styles.editProfile}>Edit Profile &gt;</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => router.push("/Screens/CreditCard")}
        >
          <View>
            <Text allowFontScaling={false}  style={styles.menuTitle}>HDFC Bank Credit Card</Text>
            <Text allowFontScaling={false}  style={styles.menuSubtitle}>
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
              <Text allowFontScaling={false}  style={styles.menuTitle}>My Account</Text>
              <Text allowFontScaling={false}  style={styles.menuSubtitle}>
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
                <Text allowFontScaling={false}  style={styles.menuItemText}>Favorites</Text>
                <AntDesign name="right" size={16} color="#757575" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push("/Screens/HiddenRestaurant")}
              >
                <View style={styles.iconBox}>
                  <AntDesign name="home" size={16} color="#000" />
                </View>
                <Text allowFontScaling={false}  style={styles.menuItemText}>Hidden Restaurants</Text>
                <AntDesign name="right" size={16} color="#757575" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/Screens/Settings")}>
                <View style={styles.iconBox}>
                  <AntDesign name="setting" size={16} color="#000" />
                </View>
                <Text allowFontScaling={false}  style={styles.menuItemText}>Settings</Text>
                <AntDesign name="right" size={16} color="#757575" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.menuBox} onPress={() => router.push("/Screens/WishList")}>
          <View>
            <Text allowFontScaling={false}  style={styles.menuTitle}>My Wishlist</Text>
            <Text allowFontScaling={false}  style={styles.menuSubtitle}>View all your saved lists</Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => router.push("/initialscreens/AddressManagementScreen")}
        >
          <View>
            <Text allowFontScaling={false}  style={styles.menuTitle}>Addresses</Text>
            <Text allowFontScaling={false}  style={styles.menuSubtitle}>
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
            <Text allowFontScaling={false}  style={styles.menuTitle}>Payments & Refunds</Text>
            <Text allowFontScaling={false}  style={styles.menuSubtitle}>
              Refund status & Payment modes
            </Text>
          </View>
          <AntDesign
            name={isNewExpanded ? "up" : "down"}
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
                  source={require("../../assets/images/Transaction-1.png") as ImageSourcePropType} 
                  style={styles.iconImage}
                />
              </View>
              <Text allowFontScaling={false}  style={styles.menuItemText}>Refund Status</Text>
              <AntDesign name="right" size={16} color="#757575" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.iconBox}>
                <Image
                  source={require("../../assets/images/MasterCard.png") as ImageSourcePropType}
                  style={styles.iconImage}
                />
              </View>
              <Text allowFontScaling={false}  style={styles.menuItemText}>Payment Modes</Text>
              <AntDesign name="right" size={16} color="#757575" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.menuBox} onPress={handleMoney}>
          <View>
            <Text allowFontScaling={false}  style={styles.menuTitle}>Money & Gift cards</Text>
            <Text allowFontScaling={false}  style={styles.menuSubtitle}>
              Account balance, Gift cards & Transaction History
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBox} onPress={handleReferEarn}>
          <View>
            <Text allowFontScaling={false}  style={styles.menuTitle}>Refer & Earn Program</Text>
            <Text allowFontScaling={false}  style={styles.menuSubtitle}>
              Refer friends & earn upto ₹15 cashback
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => router.push("/Screens/LogOut")}
        >
          <Text allowFontScaling={false}  style={styles.menuTitle}>Logout Options</Text>
          <AntDesign name="right" size={16} color="#757575" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

interface Styles {
  container: object;
  header: object;
  helpButton: object;
  helpText: object;
  content: object;
  profileInfo: object;
  userName: object;
  userPhone: object;
  userEmail: object;
  editProfile: object;
  menuBox: object;
  menuTitle: object;
  menuSubtitle: object;
  dropdownMenu: object;
  menuItem: object;
  menuItemText: object;
  iconBox: object;
  iconImage: object;
}

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
    marginTop: RFPercentage(2),
  },
  helpText: {
    color: "#01615F",
    fontFamily: "Poppins-Medium",
    fontSize: RFPercentage(2),
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
  userEmail: {
    fontSize: 14,
    color: "#757575",
    fontFamily: "Poppins-Regular",
    marginTop: 2,
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  menuTitle: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
  menuSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#757575",
    marginTop: 2,
  },
  dropdownMenu: {
    marginBottom: 16,
    paddingLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuItemText: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
  },
  iconBox: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9F5F3",
    borderRadius: 14,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default ProfileScreen;
