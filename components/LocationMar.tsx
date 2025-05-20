import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LocationMarker: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      {/* Tooltip */}
      <View style={styles.tooltipContainer}>
        <View style={styles.tooltip}>
          <Text style={styles.mainText}>Order will be delivered here</Text>
          <Text style={styles.subText}>Move the pin to change the location</Text>
        </View>
        <View style={styles.triangle} />
      </View>

      {/* Location Pin Icon */}
      <MaterialIcons name="location-on" size={36} color="red" />
    </View>
  );
};

export default LocationMarker;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  tooltipContainer: {
    marginBottom: 6,
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    maxWidth: 240,
  },
  mainText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  subText: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1c1c1e',
  },
});