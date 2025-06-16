import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DeliveryLocationScreen() {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Delivery location" titleStyle={{ fontSize: 18 }} />
      </Appbar.Header>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,  // Example coordinates
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Picked Orders Markers */}
        {pickedOrders.map((location, index) => (
          <Marker key={index} coordinate={location}>
            <View style={styles.labelContainer}>
              <Text allowFontScaling={false}  style={styles.labelText}>Picked Orders</Text>
            </View>
            <Icon name="map-marker" size={30} color="#0aad55" />
          </Marker>
        ))}

        {/* Your Location Marker */}
        <Marker coordinate={yourLocation}>
          <View style={styles.labelContainerBlue}>
            <Text allowFontScaling={false}  style={styles.labelText}>Your Location</Text>
          </View>
          <View style={styles.locationIconContainer}>
            <Icon name="crosshairs-gps" size={24} color="#007bff" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

// Dummy Data (replace with your real coordinates)
const pickedOrders = [
  { latitude: 37.78825, longitude: -122.4324 },
  { latitude: 37.7885, longitude: -122.433 },
  { latitude: 37.7879, longitude: -122.431 },
  { latitude: 37.7887, longitude: -122.4328 },
];

const yourLocation = {
  latitude: 37.7881,
  longitude: -122.432,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  labelContainer: {
    backgroundColor: '#0aad55',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 4,
    alignSelf: 'center',
  },
  labelContainerBlue: {
    backgroundColor: '#007bff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 4,
    alignSelf: 'center',
  },
  labelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  locationIconContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});