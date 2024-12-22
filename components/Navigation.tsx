import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ArrowLeft } from "react-native-feather";
import { useNavigation, useRouter } from "expo-router";
import * as Font from "expo-font";

interface NavigationProps {
  content?: string;
  routes?: {
    back?: string; // Route to navigate back
    skip?: string; // Route to navigate on skip
  };
}
const Navigation: React.FC<NavigationProps> = ({
  content = "Enter your mobile number to get OTP",
  routes,
}) => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        "poppins-semibold": require("../assets/fonts/Poppins-SemiBold.ttf"), // Ensure the font file exists
      });
      setFontsLoaded(true);
    };

    loadFonts();

    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleBack = () => {
    const backRoute = routes?.back as string | undefined;

    if (backRoute) {
      navigation.navigate(backRoute); // Navigate to the back route
    } else {
      navigation.goBack(); // Default to goBack if no back route is provided
    }
  };

  const handleSkip = () => {
    if (routes?.skip) {
      router.push(routes.skip); // Navigate to the skip route
    } else {
      console.warn("No skip route specified!");
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show loading text while fonts are being loaded
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      {/* Top Row for Back Arrow and Skip Button */}
      <View style={styles.topRow}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
          <ArrowLeft stroke="black" width={24} height={24} />
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },
  iconButton: {
    padding: 8,
  },
  skipButton: {
    backgroundColor: "black",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skipText: {
    color: "white",

    fontSize: 16,
    fontFamily: "poppins",
  },
  contentContainer: {
    width: "100%",
    marginTop: 28,
  },
  contentText: {
    color: "black",
    fontSize: 24,

    textAlign: "left",
    fontFamily: "poppins-semibold",
  },
});

export default Navigation;
