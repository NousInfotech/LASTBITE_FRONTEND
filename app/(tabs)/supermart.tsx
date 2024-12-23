import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";

const SuperMart = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />{" "}
      <LocationHeader />
      <SearchBarVoice />
    </View>
  );
};

export default SuperMart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
