import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DeliveryTypeSelector = () => {
  const [deliveryType, setDeliveryType] = useState('standard');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Type</Text>
      <Text style={styles.subtitle}>Your food will always be fresh!</Text>

      <View style={styles.optionsContainer}>
        {/* Standard Delivery Option */}
        <TouchableOpacity 
          style={[styles.option, deliveryType === 'standard' && styles.selectedOption]}
          onPress={() => setDeliveryType('standard')}
        >
          <View style={styles.radioContainer}>
            <View style={[styles.radio, deliveryType === 'standard' && styles.radioSelected]} />
          </View>
          <Text style={styles.optionTitle}>Standard</Text>
          <Text style={styles.optionTime}>25-30 mins</Text>
          <Text style={styles.optionDetail}>• Recommended if you{"\n"}  are in a hurry</Text>
          <Text style={styles.optionDetail}>• Minimal order grouping</Text>
        </TouchableOpacity>

        {/* Eco Saver Option */}
        <TouchableOpacity 
          style={[styles.option, deliveryType === 'eco' && styles.selectedOption]}
          onPress={() => setDeliveryType('eco')}
        >
          <View style={styles.radioContainer}>
            <View style={[styles.radio, deliveryType === 'eco' && styles.radioSelected]} />
          </View>
          <Text style={styles.optionTitle}>Eco Saver</Text>
          <Text style={styles.optionTime}>30-35 mins</Text>
          <Text style={styles.optionDetail}>• Less fuel pollution by{"\n"}  grouping orders</Text>
          <View style={styles.ecoInfo}>
            <Image 
              source={require('./assets/eco-icon.png')}
              style={styles.ecoIcon}
            />
            <Text style={styles.ecoText}>8 tons CO2 saved daily</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Delivery Instructions */}
      <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
      <View style={styles.instructionsContainer}>
        <View style={styles.instruction}>
          <Image source={require('./assets/bell-icon.png')} style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Avoid{"\n"}ringing bell</Text>
        </View>
        <View style={styles.instruction}>
          <Image source={require('./assets/door-icon.png')} style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Leave at{"\n"}the door</Text>
        </View>
        <View style={styles.instruction}>
          <Image source={require('./assets/directions-icon.png')} style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Directions{"\n"}to reach</Text>
        </View>
        <View style={styles.instruction}>
          <Image source={require('./assets/call-icon.png')} style={styles.instructionIcon} />
          <Text style={styles.instructionText}>Avoid{"\n"}calling</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  optionsContainer: {
    marginTop: 20,
    gap: 15,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    position: 'relative',
  },
  selectedOption: {
    borderColor: '#00a0a0',
  },
  radioContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00a0a0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioSelected: {
    backgroundColor: '#00a0a0',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionTime: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  optionDetail: {
    color: '#666',
    marginTop: 8,
  },
  ecoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  ecoIcon: {
    width: 20,
    height: 20,
  },
  ecoText: {
    color: '#00a0a0',
    fontWeight: '500',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 15,
  },
  instructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  instruction: {
    alignItems: 'center',
  },
  instructionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
});

export default DeliveryTypeSelector;
