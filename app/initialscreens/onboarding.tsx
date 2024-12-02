import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Animated, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import Button from "@/components/ButtoN";

const Onboarding = () => {
  const navigation = useNavigation();
  const [activeOption, setActiveOption] = useState<string>('Food');
  const [fadeAnim] = useState(new Animated.Value(1)); // For image transition
  const options: string[] = ['Food', 'Instamart', 'Dineout'];

  const images: Record<string, any> = {
    Food: require('../../assets/images/Food.gif'),
    Instamart: require('../../assets/images/supermart.gif'),
    Dineout: require('../../assets/images/OrderTracking.gif'),
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const interval = setInterval(() => {
      handleOptionChange(
        options[(options.indexOf(activeOption) + 1) % options.length]
      );
    }, 2000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [activeOption]);

  const handleOptionChange = (option: string) => {
    // Fade out the image
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setActiveOption(option); // Change the active option
      // Fade in the new image
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' }}>
        {/* Main Illustration Container */}
        <View style={{ width: '100%', aspectRatio: 1, marginBottom: 32, alignItems: 'center', justifyContent: 'center' }}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={images[activeOption]} // Dynamically render the current option's GIF
              style={{ width: 400, height: 400, resizeMode: 'contain' }}
            />
          </Animated.View>
        </View>

        {/* Logo and Text */}
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', marginTop: 32, marginBottom: 8 }}>
            <Image 
              source={require('../../assets/images/logo2.png')}
              style={{ width: 300, height: 50, resizeMode: 'contain' }}
            />
          </View>

          <Text style={{ color: '#929292', textAlign: 'center', fontSize: 10, fontFamily: 'myCustomFont' }}>
            Enjoy meals from popular spots around you
          </Text>
        </View>

        {/* Service Options */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32 }}>
          {options.map((option, index) => (
            <View key={option} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: 'myCustomFont',
                  fontWeight: activeOption === option ? '600' : 'normal',
                  color: activeOption === option ? 'black' : '#4a4a4a',
                  fontSize: Platform.OS === 'ios' ? 18 : 16,
                }}
              >
                {option}
              </Text>

              {index < options.length - 1 && (
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#01615F', margin: 8 }} />
              )}
            </View>
          ))}
        </View>

        {/* Get Started Button */}
        <Button buttonContent="Get Started" onPress={() => router.push('/auth/NumberLogin/otpscreen')} backgroundColor="#01615F" />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
