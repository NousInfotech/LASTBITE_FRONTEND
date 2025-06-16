import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const Verifiedscreen = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
      router.push("/(tabsthree)/home"); 
    }
    loadFonts();
    
    const timer = setTimeout(() => {
      setIsVerified(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.contentContainer}>
        {!isVerified ? (
          <View style={styles.loadingContainer}>
            <View style={styles.dotsContainer}>
              <View style={[styles.dot, { backgroundColor: '#FF5757' }]} />
              <View style={[styles.dot, { backgroundColor: '#ADFF57' }]} />
              <View style={[styles.dot, { backgroundColor: '#57ADFF' }]} />
              <View style={[styles.dot, { backgroundColor: '#FF9F57' }]} />
            </View>
            <Text allowFontScaling={false}  style={styles.loadingText}>Loading for Verification...</Text>
          </View>
        ) : (
          <View style={styles.verifiedContainer}>
            <View style={styles.checkCircle}>
              <View style={styles.checkmark} />
            </View>
            <Text allowFontScaling={false}  style={styles.verifiedText}>Verified!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Verifiedscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006E6E",
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  loadingText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: RFPercentage(2),
  },
  verifiedContainer: {
    alignItems: 'center',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkmark: {
    width: 30,
    height: 15,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '-45deg' }, { translateY: -4 }],
  },
  verifiedText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});