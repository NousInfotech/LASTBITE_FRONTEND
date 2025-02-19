import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { useNavigation } from "expo-router";
const WelcomeScreen = () => {
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [boxAnimation] = useState(new Animated.Value(-200));
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        myCustomFont: require("../../assets/fonts/Itim-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(boxAnimation, {
        toValue: 0, 
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0, 
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      router.push("/UserDetails/GetUserDetails"); 
    }, 3000); 
  }, [boxAnimation, fadeAnim, router]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Animated.Image
          source={require("../../assets/images/welcome.png")} 
          style={[
            styles.image,
            {
              transform: [{ translateY: boxAnimation }],
            },
          ]}
        />
        <Text style={[styles.welcome, { fontFamily: "myCustomFont" }]}>
          Welcome!
        </Text>
        <Text style={[styles.offer, { fontFamily: "Poppins-Medium" }]}>
          Finish the next steps to unlock
        </Text>
        <Text style={[styles.discount, { fontFamily: "Poppins-Medium" }]}>
          50% off & Free Delivery
        </Text>
        <Text style={[styles.offer, { fontFamily: "Poppins-Medium" }]}>
          on your first order!
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 40,
    marginBottom: 24,
    fontFamily: "myCustomFont", 
    textAlign: "center",
  },
  image: {
    width: 350, 
    height: 350,
    marginVertical: 24,
  },
  offer: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  discount: {
    fontSize: 27,
    color: "#01615F", 
    textAlign: "center",
    fontFamily: "Poppins-Medium", 
    paddingHorizontal: 24,
  },
});

export default WelcomeScreen;
