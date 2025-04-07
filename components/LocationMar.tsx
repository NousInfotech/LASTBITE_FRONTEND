import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const LocationMarker = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainText}>Order will be delivered here</Text>
        <Text style={styles.subText}>Move the pin to change the location</Text>
      </View>
      <View style={styles.triangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // position: "relative",
  },
  content: {
    backgroundColor: "#000000",
    borderRadius: 12,
    paddingHorizontal: 16, // Horizontal padding
    paddingVertical: 12, // Vertical padding
    maxWidth: 1000,
    alignItems: "center", // Center align text horizontally
  },
  mainText: {
    color: "#FFFFFF",
    fontSize: RFPercentage(2),
    fontWeight: "600",
    textAlign: "center", // Center align text
    marginBottom: 4,
  },
  subText: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center", // Center align text
  },
  triangle: {
    padding:10,
    backgroundColor: "transparent       ",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#000000",
    transform: [{ translateY: -1 }], // Connect triangle to the bubble
  },
});

export default LocationMarker;
