import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const LocationSelector = ({ onLocationSelect }) => {
  const [location, setLocation] = useState({
    latitude: 38.8977,
    longitude: -77.0365,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });

  const [address, setAddress] = useState({
    street: "LakeView street",
    details: "123, Green Valley, Lakeview Street",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select delivery location</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a building, street or area.."
          placeholderTextColor="#666"
        />
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={location}
          onRegionChangeComplete={setLocation}
        >
          <Marker coordinate={location}>
            <View style={styles.markerContainer}>
              <View style={styles.markerBubble}>
                <Text style={styles.markerText}>
                  Order will be delivered here
                </Text>
                <Text style={styles.markerSubtext}>
                  Move the pin to change the location
                </Text>
              </View>
            </View>
          </Marker>
        </MapView>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <TouchableOpacity style={styles.currentLocationButton}>
          <Ionicons name="locate" size={20} color="#006B5E" />
          <Text style={styles.currentLocationText}>Use Current Location</Text>
        </TouchableOpacity>

        <View style={styles.addressContainer}>
          <View style={styles.addressLeft}>
            <View style={styles.pinIconContainer}>
              <MaterialIcons name="location-on" size={24} color="#006B5E" />
            </View>
            <View style={styles.addressTextContainer}>
              <Text style={styles.streetName}>{address.street}</Text>
              <Text style={styles.addressDetails}>{address.details}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  mapContainer: {
    flex: 1,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: "center",
  },
  markerBubble: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 6,
    maxWidth: 200,
  },
  markerText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  markerSubtext: {
    color: "#999",
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  currentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#006B5E",
    borderRadius: 8,
    marginBottom: 16,
  },
  currentLocationText: {
    color: "#006B5E",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addressLeft: {
    flexDirection: "row",
    flex: 1,
  },
  pinIconContainer: {
    marginRight: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  streetName: {
    fontSize: 14,
    fontWeight: "500",
  },
  addressDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  changeButton: {
    marginLeft: 16,
  },
  changeButtonText: {
    color: "#006B5E",
    fontSize: 14,
    fontWeight: "500",
  },
  confirmButton: {
    backgroundColor: "#006B5E",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default LocationSelector;
