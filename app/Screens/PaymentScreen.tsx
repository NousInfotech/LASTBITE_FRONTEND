import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const PaymentScreen = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

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
  // const togglePopup = () => {
  //   setIsPopupVisible(!isPopupVisible);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Payment Options</Text>
          <Text style={styles.subTitle}>1 item | Total : $ 26</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.horizontalContainer}>
          {/* Double Round Container */}
          <View style={styles.doubleRoundContainer}>
            <View style={styles.circle} />
            <View style={styles.line} />
            <View style={styles.circle} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.lineText}>
              <Text style={styles.mainText}>Gourmet Delights </Text>
              <Text style={styles.subText}>| Delivery in 50-55 mins</Text>
            </Text>
            <Text style={styles.lineText}>
              <Text style={styles.mainText}>Address </Text>
              <Text style={styles.subText}>
                | 1234 Foodie Street, Flavor Town, CA
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.offerContainer}>
          <Image
            source={require("../../assets/images/Discount.png")}
            style={styles.offerImage}
          />
          <Text style={styles.offerText}>
            Save up to $19 more with payment offers
          </Text>
          <View style={styles.chevronContainer}>
            <AntDesign name="right" size={16} color="#01615F" />
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentHeader}>Pay by any UPI App</Text>
          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment("Google Pay")}
          >
            <Image
              source={require("../../assets/images/Google Pay.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>Google Pay</Text>
            </View>
            <View
              style={[
                styles.radioButton,
                selectedPayment === "Google Pay" && styles.radioSelected,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setSelectedPayment("Amazon Pay")}
          >
            <Image
              source={require("../../assets/images/Amazon Pay.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>Amazon Pay UPI</Text>
            </View>
            <View
              style={[
                styles.radioButton,
                selectedPayment === "Amazon Pay" && styles.radioSelected,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption} onPress={() => router.push('./AddUpi')}>
            <Image
              source={require("../../assets/images/Plus Math.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentNewText}>Add New UPI ID</Text>
              <Text style={styles.subNewText}>
                You need to have a registered UPI ID
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentHeader}>Credit & Debit Cards</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentOption} onPress={() => router.push('./AddCard')}>
            <Image
              source={require("../../assets/images/Plus Math.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentNewText}>Add New Card</Text>
              <Text style={styles.subText}>Save and pay via cards</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentHeader}>More Payment Options</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentOption} onPress={() => router.push('./Wallet')}>
            <Image
              source={require("../../assets/images/Wallet.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>Wallet</Text>
              <Text style={styles.subText}>PhonePe, Amazon Pay & more</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption} onPress={() => router.push('./Pluxee')}>
            <Image
              source={require("../../assets/images/Credit Card.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>Pluxee</Text>
              <Text style={styles.subText}>
                Pluxee card only valid only on food & instamart
              </Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption} onPress={() => router.push('./NetBank')}>
            <Image
              source={require("../../assets/images/Merchant Account.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>Netbanking</Text>
              <Text style={styles.subText}>Select from list of banks</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}  onPress={() => router.push('./PayLater')}>
            <Image
              source={require("../../assets/images/Time to Pay.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>Pay Later</Text>
              <Text style={styles.subText}>simpi</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}  onPress={() => router.push('./PayOnCash')}>
            <Image
              source={require("../../assets/images/Cash in Hand.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>Pay on Delievery</Text>
              <Text style={styles.subText}>Pay in cash or pay online</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}  onPress={() => router.push('./cred')}>
            <Image
              source={require("../../assets/images/image 2.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentText}>CRED Pay</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={isPopupVisible} transparent={true} animationType="slide">
  <View style={styles.popupContainer}>
    <View style={styles.popupContent}>
      <View style={styles.headerRow}>
        <Text style={styles.popupTitle}>Introducing Last Bites</Text>
        <Image
          source={require("../../assets/images/image 1 1.png")}
          style={styles.pImage}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsPopupVisible(false)}
        >
          <AntDesign name="close" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.popupSubText}>
        Unlock 3x faster in-app UPI payment on LastBites
      </Text>
      <TouchableOpacity style={styles.activateButton}>
        <Text style={styles.activateButtonText}>
          Activate in 10 seconds
        </Text>
      </TouchableOpacity>
      <View style={styles.poweredByRow}>
        <Text style={styles.popupBottom}>Powered by</Text>
        <Image
          source={require("../../assets/images/image 1 1.png")}
          style={styles.imageIcon}
        />
        <Image
          source={require("../../assets/images/image 1 1.png")}
          style={styles.imageIcon}
        />
        <Image
          source={require("../../assets/images/image 1 1.png")}
          style={styles.imageIcon}
        />
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

export default PaymentScreen;

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
  titleContainer: {
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  subTitle: {
    fontSize: RFPercentage(1.3),
    color: "grey",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  lineText: {
    marginBottom: 8,
  },
  mainText: {
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
  doubleRoundContainer: {
    alignItems: "center",
    marginRight: 10,
    marginTop: -10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#01615F",
  },
  line: {
    width: 2,
    height: 15,
    backgroundColor: "#01615F",
    // marginVertical: 4,
  },
  offerContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFFFF4",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerImage: {
    width: 20, // Adjust width
    height: 20, // Adjust height
  },
  offerText: {
    marginLeft: -30,
    fontSize: RFPercentage(2),
    fontWeight: "500",
    color: "#01615F",
    fontFamily: "Poppins-Medium",
  },
  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EFFFF4",
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
    height: 30,
    width: 30,
  },
  
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
  paymentNewText: {
    marginBottom: 2,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  subNewText: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "white",
  },
  radioSelected: {
    borderColor: "#01615F",
    backgroundColor: "#01615F",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    // marginRight: 10,
  },
  // popupContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // popupContent: {
  //   backgroundColor: '#fff',
  //   padding: 20,
  //   borderRadius: 10,
  //   width: '80%',
  // },
  // headerRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  pImage: {
    height: 30,
    width: 38,
    marginLeft: -70,
    marginTop: -8,
  },
  popupSubText: {
    fontSize: RFPercentage(2),
    fontWeight: '500',
    color: 'grey',
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
  },
  activateButton: {
    backgroundColor: '#01615F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  popupBottom: {
    fontSize: RFPercentage(2),
    fontWeight: '500',
    color: 'grey',
    fontFamily: 'Poppins-Regular',
  },
  poweredByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  imageIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
});
