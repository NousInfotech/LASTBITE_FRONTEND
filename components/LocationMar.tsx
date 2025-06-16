// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { RFPercentage } from "react-native-responsive-fontsize";

// const LocationMarker = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <Text allowFontScaling={false}  style={styles.mainText}>Order will be delivered here</Text>
//         <Text allowFontScaling={false}  style={styles.subText}>Move the pin to change the location</Text>
//       </View>
//       <View style={styles.triangle} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   //   alignItems: "center",
//   // },
//   // content: {
//   //   backgroundColor: "#000000",
//   //   borderRadius: 12,
//   //   paddingHorizontal: 16, // Horizontal padding
//   //   paddingVertical: 12, // Vertical padding
//   //   maxWidth: 1000,
//   //   alignItems: "center", // Center align text horizontally
//   // },
//   // mainText: {
//   //   color: "#FFFFFF",
//   //   fontSize: RFPercentage(2),
//   //   fontWeight: "600",
//   //   textAlign: "center", // Center align text
//   //   marginBottom: 4,
//   // },
//   // subText: {
//   //   color: "#9CA3AF",
//   //   fontSize: 14,
//   //   textAlign: "center", // Center align text
//   // },
//   // triangle: {
//   //   padding:10,
//   //   backgroundColor: "transparent       ",
//   //   borderStyle: "solid",
//   //   borderLeftWidth: 10,
//   //   borderRightWidth: 10,
//   //   borderTopWidth: 12,
//   //   borderLeftColor: "transparent",
//   //   borderRightColor: "transparent",
//   //   borderTopColor: "#000000",
//   //   transform: [{ translateY: -1 }], // Connect triangle to the bubble
//   // },

//     container: {
//       backgroundColor: '#1c1c1e', // dark background like in the image
//       borderRadius: 8,
//       paddingVertical: 6,
//       paddingHorizontal: 10,
//       alignSelf: 'flex-start',
//       alignItems: 'center',
//       justifyContent: 'center',
//       position: 'relative',
//     },
//     content: {
//       alignItems: 'center',
//     },
//     mainText: {
//       color: '#ffffff',
//       fontWeight: '600',
//       fontSize: 13,
//     },
//     subText: {
//       color: '#b0b0b0',
//       fontSize: 11,
//       marginTop: 2,
//     },
//     triangle: {
//       position: 'absolute',
//       bottom: -6,
//       left: '50%',
//       marginLeft: -6,
//       width: 0,
//       height: 0,
//       borderLeftWidth: 6,
//       borderRightWidth: 6,
//       borderTopWidth: 6,
//       borderLeftColor: 'transparent',
//       borderRightColor: 'transparent',
//       borderTopColor: '#1c1c1e',
//     },
//   });


// export default LocationMarker;



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LocationMarker: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      {/* Tooltip */}
      <View style={styles.tooltipContainer}>
        <View style={styles.tooltip}>
          <Text allowFontScaling={false}  style={styles.mainText}>Order will be delivered here</Text>
          <Text allowFontScaling={false}  style={styles.subText}>Move the pin to change the location</Text>
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