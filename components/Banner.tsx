import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Update Banner Component to accept `right` and `bottom` props
const Banner = ({
    // Title and subtitle
    title = "Instamart Essentials",
    subtitle = "Fresh groceries delivered within",
    deliveryTime = "15 minutes.",
    
    // Button
    buttonText = "Shop Groceries",
    buttonColor = "#006B4D",
    buttonTextColor = "#FFFFFF",
    
    // Colors
    backgroundColor = "#E2FFEC",
    titleColor = "#000000",
    subtitleColor = "#4A4A4A",
    
    // Image
    groceryImage = require('../assets/images/instamart-img.png'),
    
    // Component dimensions
    height = 180,
    borderRadius = 12,
    
    // Positioning
    right = -5,   // Default value for right
    bottom = 0,   // Default value for bottom
    
    // Optional callback
    onButtonPress = () => {},
  }) => {
    return (
      <View style={[styles.container, { backgroundColor, height, borderRadius }]}>
        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: titleColor }]} className='poppins-font-bold'>
              {title}
            </Text>
            <View style={styles.subtitleContainer}>
              <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}{' '}
                <Text style={[styles.subtitle, { color: subtitleColor }]}>
                  {deliveryTime}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: buttonColor }]}
              onPress={onButtonPress}
            >
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
  
          {/* Image Container with Absolute Positioning */}
          <View style={[styles.imageWrapper, { right, bottom }]}>
            <Image
              source={groceryImage}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    );
  };
  

  
const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 'auto'
  },
  contentContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 16,
  },
  textContainer: {
    zIndex: 2,  
  },
  title: {
    fontSize: 13,
    maxWidth: '80%',
    marginBottom: 0,
  },
  subtitleContainer: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 8,
    color: "#929292",
    maxWidth: '50%',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 8,
    fontWeight: '600',
  },
  imageWrapper: {
    position: 'absolute',
    right: -5, // Extend slightly beyond container
    top: '20%',
    transform: [{ translateY: -50 }],
    width: '65%', // Adjust based on your needs
    height: '170%', // Make image slightly larger than container
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Banner;
