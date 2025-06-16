import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

interface TitleComponentProps {
  title: string;
}

const TitleComponent: React.FC<TitleComponentProps> = ({ title }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text allowFontScaling={false}  style={[styles.title, { fontFamily: "Poppins-SemiBold" }]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(3),

    marginBottom: 24,
  },
});

export default TitleComponent;
