// CurrentLocationButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RFPercentage } from "react-native-responsive-fontsize";

interface CurrentLocationButtonProps {
  handleGetLocation: () => void;
}

const CurrentLocation: React.FC<CurrentLocationButtonProps> = ({
  handleGetLocation,
}) => {
  return (
    <TouchableOpacity
      onPress={handleGetLocation}
      activeOpacity={0.7}
      style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
    >
      <Icon name="map-pin" size={18} color="#01615F" />
      <Text
        style={{
          marginLeft: 8,
          color: "#01615F",
          fontWeight: "600",
          fontSize: RFPercentage(2),
        }}
      >
        Use my current location
      </Text>
    </TouchableOpacity>
  );
};

export default CurrentLocation;
