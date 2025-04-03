import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";

type SearchParams = {
  walletName: string;
};

const LinkAccount = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showBalanceScreen, setShowBalanceScreen] = useState(false);
  const [balance, setBalance] = useState("₹1,234.56"); // Mock balance
  const [showModal, setShowModal] = useState(false);
  const { walletName } = useLocalSearchParams<SearchParams>();

  const iconMapping: Record<string, any> = {
    "Amazon Pay Balance": require("../../assets/images/Amazon Pay.png"),
    "MobiKwik": require("../../assets/images/image 4.png"),
    "PhonePe": require("../../assets/images/Phone Pe.png"),
  };

  const walletIconSource = iconMapping[walletName] || iconMapping["PhonePe"];

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleResend = () => {
    console.log("Resend OTP triggered");
  };

  const handlePhoneSubmit = () => {
    setShowOtpScreen(true);
  };

  const handleOtpVerification = () => {
    setShowBalanceScreen(true);
  };

  const handleDelink = () => {
    setShowModal(true);
  };

  const confirmDelink = () => {
    setShowModal(false);
    console.log("Account delinked");
  };

  const handleGoBack = () => {
    if (showBalanceScreen) {
      setShowBalanceScreen(false);
      setShowOtpScreen(true);
    } else if (showOtpScreen) {
      setShowOtpScreen(false);
    } else {
      router.back();
    }
  };

  const renderPhoneInput = () => (
    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            Enter mobile number to link {walletName} account
          </Text>
          <Text style={styles.subtitle}>
            If you don't have an account, we will create one for you
          </Text>
        </View>
        <Image source={walletIconSource} style={styles.walletIcon} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor="#A0A0A0"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity
        style={[
          styles.button,
          phoneNumber ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
        disabled={!phoneNumber}
        onPress={handlePhoneSubmit}
      >
        <Text style={styles.buttonText}>Confirm and Proceed</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOtpInput = () => (
    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            Enter OTP received on {phoneNumber}
          </Text>
        </View>
        <Image source={walletIconSource} style={styles.walletIcon} />
      </View>
      <View style={styles.inputNewContainer}>
        <TextInput
          style={styles.inputNew}
          placeholder="Enter OTP"
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendText}>Resend</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          otp ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
        disabled={!otp}
        onPress={handleOtpVerification}
      >
        <Text style={styles.buttonText}>Verify and Link Account</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBalanceView = () => (
    <View style={styles.content}>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>{balance}</Text>
        </View>
        <Image source={walletIconSource} style={styles.walletIcon} />
      </View>
      <View style={styles.delinkContainer}>
        <TouchableOpacity onPress={handleDelink}>
          <Text style={styles.delinkText}>Delink</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Link {walletName} Account</Text>
      </View>
      {showBalanceScreen 
        ? renderBalanceView() 
        : showOtpScreen 
        ? renderOtpInput() 
        : renderPhoneInput()}

<Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delink Wallet?
            </Text>
            <TouchableOpacity
              style={styles.modalButtonConfirm}
              onPress={confirmDelink}
            >
              <Text style={styles.modalButtonText}>Yes, Delink Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    padding: 16,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#808080",
    fontFamily: "Poppins-Regular",
  },
  walletIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 16,
  },
  inputNewContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  inputNew: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  resendButton: {
    backgroundColor: "#EFFFF4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 4,
  },
  resendText: {
    color: "#01615F",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonEnabled: {
    backgroundColor: "#01615F",
  },
  buttonDisabled: {
    backgroundColor: "#D0D0D0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
   
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 14,
    color: "#808080",
    fontFamily: "Poppins-SemiBold",
  },
  delinkContainer: {
    flex: 1,
    // justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 50,
  },
  delinkText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonConfirm: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  modalButtonCancel: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#01615F",
  },
  modalButtonTextCancel: {
    color: "#01615F",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});

export default LinkAccount;