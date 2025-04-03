import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DeliveryAddressSelector = ({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123, Green Valley, Lakeview Street',
    },
    {
      id: 2,
      type: 'Office',
      address: '456, River Side, Sunset Blvd',
    },
  ]);

  const handleAddressSelect = (address: { id: number; type: string; address: string }) => {
    console.log('Selected address:', address);
    // You can perform an action here after selecting the address
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.outerContainer}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Choose a delivery address</Text>
          <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {/* List of addresses */}
        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={styles.addressItem}
            onPress={() => handleAddressSelect(address)}
          >
            <View style={styles.addressContent}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="location-on" size={24} color="#00875A" />
              </View>
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>{address.type}</Text>
                <Text style={styles.addressText}>{address.address}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#CCCCCC" />
          </TouchableOpacity>
        ))}

        {/* Option to add a new address */}
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => console.log('Add new address')}
        >
          <MaterialIcons name="add" size={24} color="#00875A" />
          <Text style={styles.addAddressText}>Add new address</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
 backgroundColor:'#000',
  },
  outerContainer:{
    position: 'absolute',
    bottom: -10, // Fixed at the bottom of the screen
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end',
    zIndex: 1000, // Ensures it is above other content
    marginHorizontal: 0,
    
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 15,
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: RFPercentage(2),
    fontWeight: '500',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#777',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  addAddressText: {
    fontSize: RFPercentage(2),
    marginLeft: 10,
  },
});

export default DeliveryAddressSelector;