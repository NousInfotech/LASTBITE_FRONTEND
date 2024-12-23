import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    position: "relative",
  },
  content: {
    backgroundColor: "#000000",
    borderRadius: 12,
    padding: 12,
    maxWidth: 280,
  },
  mainText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#000000",
    transform: [{ translateY: -1 }], // Helps connect triangle to bubble smoothly
  },
});

export default LocationMarker;
