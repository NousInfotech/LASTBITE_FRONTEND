import React from "react";
import { StatusBar, StyleSheet, View, ScrollView } from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";
import HotDeals from "@/components/HotDeals";
import ProductGrid from "@/components/ProductGrid";

const SuperMart: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <LocationHeader />
        <SearchBarVoice />
        <HotDeals />
        <ProductGrid />
      </ScrollView>
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
