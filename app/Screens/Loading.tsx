import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function LoadingScreen() {
  // Create animated values for each dot
  const dot1Animation = useRef(new Animated.Value(0)).current;
  const dot2Animation = useRef(new Animated.Value(0)).current;
  const dot3Animation = useRef(new Animated.Value(0)).current;
  const dot4Animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Reset all animations
    dot1Animation.setValue(0);
    dot2Animation.setValue(0);
    dot3Animation.setValue(0);
    dot4Animation.setValue(0);

    // Create sequential animation
    Animated.sequence([
      // Dot 1 animation
      Animated.timing(dot1Animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(dot1Animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      
      // Dot 2 animation
      Animated.timing(dot2Animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(dot2Animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      
      // Dot 3 animation
      Animated.timing(dot3Animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(dot3Animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      
      // Dot 4 animation
      Animated.timing(dot4Animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(dot4Animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start(() => {
      // Restart the animation when it completes
      startAnimation();
    });
  };

  // Calculate the translateY for each dot - move up by 2% of screen height
  const dot1TranslateY = dot1Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8], // 8 is approximately 2% of screen height
  });
  
  const dot2TranslateY = dot2Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });
  
  const dot3TranslateY = dot3Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });
  
  const dot4TranslateY = dot4Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.dotsContainer}>
        <Animated.View 
          style={[
            styles.dot, 
            styles.dot1, 
            { transform: [{ translateY: dot1TranslateY }] }
          ]} 
        />
        <Animated.View 
          style={[
            styles.dot, 
            styles.dot2, 
            { transform: [{ translateY: dot2TranslateY }] }
          ]} 
        />
        <Animated.View 
          style={[
            styles.dot, 
            styles.dot3, 
            { transform: [{ translateY: dot3TranslateY }] }
          ]} 
        />
        <Animated.View 
          style={[
            styles.dot, 
            styles.dot4, 
            { transform: [{ translateY: dot4TranslateY }] }
          ]} 
        />
      </View>
      <Text allowFontScaling={false}  style={styles.loadingText}>Loading for Verification...</Text>
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
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  dot1: {
    backgroundColor: '#FF4B6B', // Pink/red dot
  },
  dot2: {
    backgroundColor: '#80C342', // Green dot
  },
  dot3: {
    backgroundColor: '#6BBEE8', // Light blue dot
  },
  dot4: {
    backgroundColor: '#F8981D', // Orange dot
  },
  loadingText: {
    color: 'white',
    fontSize: RFPercentage(3),
    marginTop: 10,
  },
});