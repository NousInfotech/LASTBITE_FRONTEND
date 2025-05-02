import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Params {
  photoUri?: string;
}

const VerifiedScreen: React.FC = () => {
  const params = useLocalSearchParams<Params>();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animation for check mark
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();
    
    // Start the rider's shift
    startShift();
    
    // Redirect back to home after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabsthree)/home');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const startShift = async (): Promise<void> => {
    try {
      // Save shift data to AsyncStorage
      const now = new Date();
      await AsyncStorage.setItem('shiftActive', 'true');
      await AsyncStorage.setItem('shiftStartTime', now.toString());
      await AsyncStorage.setItem('currentEarnings', '0');
      
      // If photoUri was passed, we could save it here
      if (params.photoUri) {
        await AsyncStorage.setItem('lastVerificationPhoto', params.photoUri);
      }
    } catch (error) {
      console.error('Error starting shift:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.checkCircle,
            {
              transform: [
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Text style={styles.checkmark}>✓</Text>
        </Animated.View>
        
        <Text style={styles.verifiedText}>Verified!</Text>
        <Text style={styles.messageText}>Your shift has been started.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006666', // Same teal color as loading screen
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  checkmark: {
    color: '#006666',
    fontSize: 60,
    fontWeight: 'bold',
  },
  verifiedText: {
    color: 'white',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    color: 'white',
    fontSize: RFPercentage(2.5),
  },
});

export default VerifiedScreen;