import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const LocationHeader = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // State to store the user's profile image
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  // Load Fonts
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemibold: require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // Get User's Location
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Location Permission', 'Please enable location access.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      setLocation(`${address[0]?.street}, ${address[0]?.city}, ${address[0]?.region}`);
    };

    getLocation();
  }, []);

  // Simulate fetching user profile image (replace with actual fetch logic)
  useEffect(() => {
    const fetchUserProfileImage = () => {
      // Example: Replace with actual user profile image fetching logic (e.g., API call)
      const fetchedProfileImage = 'https://via.placeholder.com/150'; // Placeholder or actual image URL
      setUserProfileImage(fetchedProfileImage);
    };

    fetchUserProfileImage();
  }, []);

  if (!fontsLoaded) {
    return null; // Show a loader or placeholder while fonts are loading
  }

  return (
    <View style={styles.container}>
      {/* Location Header */}
      <View style={styles.locationContainer}>
        <View style={styles.locationContent}>
          <View style={styles.locationLabelContainer}>
            <Entypo name="location-pin" size={24} color="#01615F" />
            <Text style={styles.locationLabel}>Location</Text>
            <AntDesign name="caretdown" size={13} color="black" style={styles.arrowIcon} />
          </View>
          <TouchableOpacity style={styles.locationSelector}>
            <Text style={styles.locationText} className='font-medium'>
              {location || (errorMsg || 'Fetching location...')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image Button */}
        <TouchableOpacity style={styles.profileButton}>
          <Image
            style={styles.profileImage}
            source={{
              uri: userProfileImage || 'https://via.placeholder.com/32', // Use user profile image or fallback
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    paddingTop: 44, // Safe area for iOS
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationContent: {
    flex: 1,
    marginRight: 12,
  },
  locationLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 12,
    fontFamily: 'PoppinsSemibold',
    color: '#191A1F',
    marginLeft: 4,
  },
  arrowIcon: {
    marginLeft: 6,
    marginBottom: 6,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 7,

    color: '#929292',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});

export default LocationHeader;
