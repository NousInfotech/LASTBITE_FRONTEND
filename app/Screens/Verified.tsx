import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function VerificationSuccessScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.checkCircle}>
        <Ionicons name="checkmark" size={36} color="white" />
      </View>
      <Text style={styles.verifiedText}>Verified!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006666', // Teal color matching the screenshot
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: 'white',
    fontSize: RFPercentage(3),
    fontWeight: '500',
    marginTop: 20,
  },
});

