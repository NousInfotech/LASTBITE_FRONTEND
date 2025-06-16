import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";
import SearchInput from "@/components/SearchInput";
import LocationMarker from "@/components/LocationMar";
import { RFPercentage } from "react-native-responsive-fontsize";

import * as Font from "expo-font"; // For font loading
import { useRouter } from "expo-router";

// Define the type for the props
interface LocationSelectorProps {
  onLocationSelect: (location: { latitude: number; longitude: number }) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelect,
}) => {
  const [location, setLocation] = useState({
    latitude: 38.8977,
    longitude: -77.0365,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });

  const [address, setAddress] = useState({
    street: "LakeView Street",
    details: "123, Green Valley, Lakeview Street",
  });

  const [searchText, setSearchText] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false); // State to check if fonts are loaded
  const router = useRouter(); // Hook for router navigation

  // Load custom fonts
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleConfirmLocation = () => {
    // onLocationSelect(location); // Call the onLocationSelect function
    router.push("/Screens/AddressInput"); // Replace with the actual route path
  };

  const handleChangeLocation = () => {
    router.push("/initialscreens/LocationInputScreen");
  };
  const handleCurrentLocation = () => {
    router.push("/(tabs)/home"); // Replace with the actual route path
  };

  return fontsLoaded ? (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <GoBack />
        <Text allowFontScaling={false}  style={styles.headerTitle}>Select delivery location</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          handleClearSearch={handleClearSearch}
          placeholder="Search for a building, street or area..."
        />
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={location}
        onRegionChangeComplete={setLocation}
      >
        {/* Custom Location Marker */}
        <Marker coordinate={location}>
          <LocationMarker />{" "}
          {/* Render the LocationMarker component inside the Marker */}
        </Marker>
      </MapView>

      {/* Current Location Button */}
      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={handleCurrentLocation}
      >
        <Ionicons name="locate" size={20} color="#006B5E" />
        <Text allowFontScaling={false}  style={styles.currentLocationText}>Use Current Location</Text>
      </TouchableOpacity>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.addressContainer}>
          <View style={styles.addressLeft}>
            <MaterialIcons name="location-on" size={24} color="#006B5E" />
            <View style={styles.addressTextContainer}>
              <Text allowFontScaling={false}  style={styles.streetName}>{address.street}</Text>
              <Text allowFontScaling={false}  style={styles.addressDetails}>{address.details}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={handleChangeLocation}
          >
            <Text allowFontScaling={false}  style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
        >
          <Text allowFontScaling={false}  style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    <Text allowFontScaling={false} >Loading fonts...</Text> // Fallback until fonts are loaded
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    borderRadius: 8,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  searchContainer: {
    position: "absolute",
    top: 70,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  map: {
    flex: 1,
    position: "absolute", 
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 170,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 12,
    marginHorizontal: 60,
    borderRadius: 8,
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#01615F",
  },
  currentLocationText: {
    color: "#006B5E",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  bottomSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 20, // Ensure this stays above the MapView
    position: "absolute", // Stick it to the bottom
    left: 0,
    right: 0,
    bottom: 0,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addressLeft: {
    flexDirection: "row",
    flex: 1,
  },
  addressTextContainer: {
    marginLeft: 2,
  },
  streetName: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  addressDetails: {
    fontSize: 13,
    color: "#929292",
    fontFamily: "Poppins-Regular",
  },
  changeButton: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    padding: 6,
    borderRadius: 8,
  },
  changeButtonText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
  },
  confirmButton: {
    backgroundColor: "#01615F",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
});

export default LocationSelector;
