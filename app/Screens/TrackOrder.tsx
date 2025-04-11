// // TrackOrder.tsx
// import React from 'react';
// import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const TrackOrder = () => {
//   return (
//     <View style={styles.container}>
      
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 38.919,
//           longitude: -77.035,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//       >
//         {/* Start marker */}
//         <Marker coordinate={{ latitude: 38.921, longitude: -77.035 }} title="Spice Haven">
//           <Icon name="storefront" size={30} color="#000" />
//         </Marker>

//         {/* Destination marker */}
//         <Marker coordinate={{ latitude: 38.918, longitude: -77.035 }} title="Your Location">
//           <Icon name="home" size={30} color="#000" />
//         </Marker>

//         {/* Route polyline */}
//         <Polyline
//           coordinates={[
//             { latitude: 38.921, longitude: -77.035 },
//             { latitude: 38.918, longitude: -77.035 },
//           ]}
//           strokeColor="#01615F"
//           strokeWidth={4}
//         />
//       </MapView>

//       {/* Delivery Info Panel */}
//       <View style={styles.infoPanel}>
//         <View style={styles.statusRow}>
//           <View style={styles.timeBadge}>
//             <Text style={styles.timeText}>7 mins</Text>
//           </View>

//           <View style={styles.textSection}>
//             <Text style={styles.statusTitle}>Out for delivery</Text>
//             <Text style={styles.statusDescription}>
//               David is on the way to deliver your order, and will assist you t...
//             </Text>
//           </View>

//           <Icon name="check-circle" size={20} color="#01615F" />
//         </View>

//         <TouchableOpacity style={styles.instructionsButton}>
//           <Icon name="plus" size={16} color="#01615F" style={{ marginRight: 6 }} />
//           <Text style={styles.instructionsText}>Add Delivery Instructions</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: '75%',
//   },
//   infoPanel: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     elevation: 8,
//   },
//   statusRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   timeBadge: {
//     backgroundColor: '#01615F',
//     borderRadius: 20,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     marginRight: 12,
//   },
//   timeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   textSection: {
//     flex: 1,
//   },
//   statusTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 2,
//   },
//   statusDescription: {
//     fontSize: 14,
//     color: '#555',
//   },
//   instructionsButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   instructionsText: {
//     fontSize: 14,
//     color: '#01615F',
//     fontWeight: '600',
//   },
// });

// export default TrackOrder;



// TrackOrder.tsx
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
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
        {/* Restaurant marker */}
        {/* <Marker
  coordinate={{ latitude: 38.921, longitude: -77.035 }}
  title="Your Location"
  image={require('../../assets/images/rider.png')} // use your image path here
/>


        <Marker
  coordinate={{ latitude: 38.918, longitude: -77.035 }}
  title="Your Location"
  image={require('../../assets/images/destination.png')} 
/> */}


<Marker coordinate={{ latitude: 38.921, longitude: -77.035 }} title="Your Location">
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={require('../../assets/images/rider.png')}
      style={{ width: 40, height: 20 }} // Adjust size here
      resizeMode="contain"
    />
  </View>
</Marker>

<Marker coordinate={{ latitude: 38.918, longitude: -77.035 }} title="Destination">
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={require('../../assets/images/destination.png')}
      style={{ width: 20, height: 50 }} // Adjust size here too
      resizeMode="contain"
    />
  </View>
</Marker>

        {/* Route polyline */}
        <Polyline
          coordinates={[
            { latitude: 38.921, longitude: -77.035 },
            { latitude: 38.921, longitude: -77.038 },
            { latitude: 38.919, longitude: -77.038 },
            { latitude: 38.919, longitude: -77.035 },
            { latitude: 38.918, longitude: -77.035 },
          ]}
          strokeColor="#01615F"
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
              David is on the way to deliver your order and will assist you.
            </Text>
          </View>

          <View style={styles.onTimeIndicator}>
            <Text style={styles.onTimeText}>On Time</Text>
            <Icon name="check-circle" size={20} color="#01615F" />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.instructionsButton}>
            <Icon name="message-text-outline" size={18} color="#01615F" style={{ marginRight: 6 }} />
            <Text style={styles.instructionsText}>Add Delivery Instructions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.phoneButton}>
            <Icon name="phone" size={22} color="#01615F" />
          </TouchableOpacity>
        </View>
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
    height: '80%',
  },
  restaurantMarker: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: '#01615F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  destinationMarker: {
    alignItems: 'center',
    backgroundColor: "#01615F",
    
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeBadge: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
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
  onTimeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onTimeText: {
    fontSize: 14,
    color: '#01615F',
    marginRight: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  instructionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionsText: {
    fontSize: 14,
    color: '#01615F',
    fontWeight: '500',
  },
  phoneButton: {
    backgroundColor: '#f0f8f6',
    borderRadius: 50,
    padding: 8,
    marginLeft: 10,
  },
});

export default TrackOrder;