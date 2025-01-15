import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const Wallet = () => {
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

  const wallets = [
    { id: 1, name: "Amazon Pay Balance", icon: require("../../assets/images/Amazon Pay.png") },
    { id: 2, name: "PhonePe", icon: require("../../assets/images/Google Pay.png") },
    { id: 3, name: "MobiKwik", icon: require("../../assets/images/Amazon Pay.png") },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Wallet</Text>
      </View>

      {/* Wallet List */}
      <View style={styles.walletList}>
        {wallets.map((wallet) => (
          <View key={wallet.id} style={styles.walletItem}>
            <Image source={wallet.icon} style={styles.walletIcon} />
            <Text style={styles.walletName}>{wallet.name}</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkButtonText}>Link Account</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

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
  walletList: {
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
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  walletIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 12,
  },
  walletName: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  linkButton: {
    backgroundColor: "transparent",
  },
  linkButtonText: {
    color: "#01615F",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
});
