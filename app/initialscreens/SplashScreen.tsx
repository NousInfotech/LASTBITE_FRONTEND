
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Animated,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#01615F", true);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.push("/initialscreens/SelectRole");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.fullScreen}>
      <StatusBar backgroundColor="#01615F" barStyle="light-content" />
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: '#01615F',
    zIndex: 9999,
  },
  container: {
    flex: 1,
    backgroundColor: '#01615F',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    width: '80%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});