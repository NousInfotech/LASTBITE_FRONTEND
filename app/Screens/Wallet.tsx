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
import { RFPercentage } from "react-native-responsive-fontsize";

const Wallet = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const wallets = [
    { id: 1, name: "Amazon Pay Balance", icon: require("../../assets/images/Amazon Pay.png") },
    { id: 2, name: "PhonePe", icon: require("../../assets/images/Phone Pe.png") },
    { id: 3, name: "MobiKwik", icon: require("../../assets/images/image 4.png") },
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
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() =>
                router.push({
                  pathname: "./LinkAccount", // Update with the correct path to your LinkAccount component
                  params: {
                    walletName: wallet.name,
                  },
                })
              }
            >
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
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  walletList: {
    marginTop: 16,
    padding: 16,
  },
  walletItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  walletIcon: {
    width: 32,
    height: 32,
    resizeMode:'contain',
    marginRight: 12,
  },
  walletName: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  linkButton: {
    backgroundColor: "transparent",
  },
  linkButtonText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
});
