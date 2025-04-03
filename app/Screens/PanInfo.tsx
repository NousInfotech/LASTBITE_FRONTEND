import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Modal,
  Animated,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const PanInfo = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300)); // Initial position off-screen

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

  const handleContinue = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (!fontsLoaded) {
    return null;
  }

  const isButtonActive = phoneNumber.trim() !== "" && panNumber.trim() !== "";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Your Mobile & PAN number</Text>
        <Text style={styles.subText}>An OTP will be sent to this mobile number</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="PAN Number"
            value={panNumber}
            onChangeText={setPanNumber}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.bankInfoContainer}>
          <Text style={styles.bankInfoTitle}>
            Having an HDFC Bank savings account/card?
          </Text>
          <Text style={styles.bankInfoSubText}>
            Ensure mobile number matches your bank records by logging in here
            with registered mobile number.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: isButtonActive ? "#01615F" : "#C7C7C7" },
          ]}
          onPress={handleContinue}
          disabled={!isButtonActive}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.modalTitle}>Terms of Service</Text>
            <Text style={styles.modalText}>
            I have read, understood, and agree to Consent Terms and General Terms & Conditions, Most Important Terms & Conditions, Card Member Agreement, Key Fact Statement of HDFC Bank Ltd.
            </Text>
            <Text style={styles.modalText}>
            I hereby provide my express consent to HDFC Bank Limited ("Bank"). for collecting, disclosing, sharing, displaying, and transferring my personal, demographic information for my credit card application.
            </Text>
            <Text style={styles.modalText}>
            By submitting, I confirm that I am an Indian above 18 years of age, residing in India, and have read & agreed to HDFC Bank Privacy Policy and T&C. I agree to receive calls, SMS, WhatsApp messages from HDFC Bank for personalized offerings regarding new products.
            </Text>
            <Text style={styles.modalText}>
            I agree to receive cashback benefits of the card in the form of Statement Credit and here are its terms & conditions.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.agreeButton}
                onPress={() => {
                  setModalVisible(false);
                  router.push({
                    pathname: "./EnterOTP",
                    params: { phoneNumber },
                  });
                }}
              >
                <Text style={styles.agreeButtonText}>I agree</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PanInfo;

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: "Poppins-Medium",
  },
  bankInfoContainer: {
    backgroundColor: "#EFFFF4",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  bankInfoTitle: {
    fontSize: RFPercentage(2),,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginBottom: 8,
  },
  bankInfoSubText: {
    fontSize: RFPercentage(1.3),,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
    
  },
  continueButton: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: RFPercentage(2),,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal:20,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#01615F",
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#01615F",
    paddingHorizontal:40,

  },
  agreeButton: {
    padding: 12,
    backgroundColor: "#01615F",
    borderRadius: 8,
  },
  agreeButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#fff",
    paddingHorizontal:40,

  },
});
