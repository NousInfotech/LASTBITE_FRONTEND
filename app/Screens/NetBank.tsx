import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import GoBack from "@/components/GoBack";
// import SearchBarVoice from "@/components/SearchBarVoice";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

const NetBank = () => {
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
      return null; // Optionally, show a loading screen or placeholder
    }

    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity>
              <GoBack />
            </TouchableOpacity>
            <Text allowFontScaling={false}  style={styles.headerTitle}>Select a Bank</Text>
          </View>
          <ScrollView>
          <View style={styles.paymentContainer}>
          <Text allowFontScaling={false}  style={styles.paymentHeader}>Popular Banks</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../../assets/images/image 7.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>HDFC</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption} >
            <Image
              source={require("../../assets/images/image 6.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>ICICI</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../../assets/images/image 8.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>SBI</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../../assets/images/image 9.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>AXIS</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../../assets/images/image 10.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>KOTAK</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../../assets/images/image 14.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>YES</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../../assets/images/image 15.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>CITI</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
        </View>

        <View style={styles.paymentContainer}>
          <Text allowFontScaling={false}  style={styles.paymentHeader}>All Banks</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentOption} >
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>Bank of Baroda</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption} >
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>Central Bank of India</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>Syndicate Bank</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>Federal Bank</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>DBS</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>Canara Bank</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentDetails}>
              <Text allowFontScaling={false}  style={styles.paymentText}>IDFC</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
        </View>
        </ScrollView>
          </SafeAreaView>
    )
}

export default NetBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 14,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  paymentContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
  },
  paymentHeader: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  payImage: {
    height: 30,
    width: 36,
  },
  
  aImage: {
    height: 20,
    width: 20,
  },
  
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  paymentDetails: {
    flex: 1, // Ensures text and subtext wrap properly and align to the left
    marginLeft: 16, // Adds spacing between the image and text
  },

  paymentText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  subText: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
});