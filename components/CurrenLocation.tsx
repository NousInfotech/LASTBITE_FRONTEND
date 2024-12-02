// CurrentLocationButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CurrentLocationButtonProps {
  handleGetLocation: () => void;
}

const CurrentLocation: React.FC<CurrentLocationButtonProps> = ({ handleGetLocation }) => {
  return (
    <TouchableOpacity 
      onPress={handleGetLocation}
      activeOpacity={0.7}
      style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}
    >
      <Icon name="map-pin" size={18} color="#01615F" />
      <Text style={{ marginLeft: 8, color: '#01615F', fontWeight: '600', fontSize:11 }}>
        Use my current location
      </Text>
    </TouchableOpacity>
  );
};

export default CurrentLocation;
