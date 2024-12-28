import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For icons (Expo)
import DeliveryAddressSelector from '@/components/DeliveryAddressSelector'; // Assuming the modal component

const AddressSelector: React.FC = () => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Toggle the modal visibility
  const handlePress = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Question Section */}
        <View style={styles.questionContainer}>
          <Feather name="map-pin" size={20} color="#006B5E" />
          <Text style={styles.questionText}>
            Where would you like us to deliver this order?
          </Text>
        </View>

        {/* Button Section */}
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Add or Select address</Text>
        </TouchableOpacity>
      </View>

      {/* Directly render Delivery Address Selector when clicked */}
      {showModal && <DeliveryAddressSelector setShowModal={setShowModal} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

   borderTopRightRadius:25,
   borderTopLeftRadius:25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
   
  },
  contentContainer: {
    gap: 16, // Adjusts spacing between question and button
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Adjusts spacing between icon and text
  },
  questionText: {
    fontSize: 15,
    color: '#333333',
    flex: 1,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: '#006B5E',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default AddressSelector;