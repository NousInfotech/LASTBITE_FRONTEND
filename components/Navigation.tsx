import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { ArrowLeft } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

interface NavigationProps {
  content?: string;
  routes?: {
    back?: string;
    skip?: string;
  };
}

const Navigation: React.FC<NavigationProps> = ({
  content = "Enter your mobile number to get OTP",
  routes,
}) => {
  const navigation = useNavigation();
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        "poppins-semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleBack = () => {
    const backRoute = routes?.back;

    if (backRoute) {
      navigation.navigate(backRoute as never); // 👈 type cast for TypeScript
    } else {
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    if (routes?.skip) {
      router.push(routes.skip as any); // 👈 force type to satisfy router.push
    } else {
      console.warn("No skip route specified!");
    }
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
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
        <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
          <ArrowLeft stroke="black" width={24} height={24} />
        </TouchableOpacity>

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
    fontSize: 14,
    fontFamily: "poppins",
  },
  contentContainer: {
    width: "100%",
    marginTop: 28,
  },
  contentText: {
    color: "black",
    fontSize: 20,
    textAlign: "left",
    fontFamily: "poppins-semibold",
  },
});

export default Navigation;
