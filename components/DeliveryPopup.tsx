import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DeliveryPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={styles.popupContainer}>
      <View style={styles.rowContainer}>
        <Image
          source={require('./../assets/images/Navigation.png')} // Replace with your image path
          style={styles.navigationImage}
          resizeMode="contain"
        />
        <Text style={styles.popupText}>Where would you like us to deliver this order?</Text>
      </View>
      <TouchableOpacity style={styles.popupButton} onPress={onClose}>
        <Text style={styles.popupButtonText}>Add or Select Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryPopup;

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 10,
  },
  navigationImage: {
    width: 30,
    height: 30,
    marginRight: 10, // Add space between the image and text
  },
  popupText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left', // Align text to the left
    flex: 1, // Allow text to take up remaining space
  },
  popupButton: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
