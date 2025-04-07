// TrackOrder.tsx
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TrackOrder = () => {
  return (
    <View style={styles.container}>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.919,
          longitude: -77.035,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Start marker */}
        <Marker coordinate={{ latitude: 38.921, longitude: -77.035 }} title="Spice Haven">
          <Icon name="storefront" size={30} color="#000" />
        </Marker>

        {/* Destination marker */}
        <Marker coordinate={{ latitude: 38.918, longitude: -77.035 }} title="Your Location">
          <Icon name="home" size={30} color="#000" />
        </Marker>

        {/* Route polyline */}
        <Polyline
          coordinates={[
            { latitude: 38.921, longitude: -77.035 },
            { latitude: 38.918, longitude: -77.035 },
          ]}
          strokeColor="#00B386"
          strokeWidth={4}
        />
      </MapView>

      {/* Delivery Info Panel */}
      <View style={styles.infoPanel}>
        <View style={styles.statusRow}>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>7 mins</Text>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.statusTitle}>Out for delivery</Text>
            <Text style={styles.statusDescription}>
              David is on the way to deliver your order, and will assist you t...
            </Text>
          </View>

          <Icon name="check-circle" size={20} color="#00B386" />
        </View>

        <TouchableOpacity style={styles.instructionsButton}>
          <Icon name="plus" size={16} color="#00B386" style={{ marginRight: 6 }} />
          <Text style={styles.instructionsText}>Add Delivery Instructions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '75%',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeBadge: {
    backgroundColor: '#00B386',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 12,
  },
  timeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textSection: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statusDescription: {
    fontSize: 14,
    color: '#555',
  },
  instructionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  instructionsText: {
    fontSize: 14,
    color: '#00B386',
    fontWeight: '600',
  },
});

export default TrackOrder;