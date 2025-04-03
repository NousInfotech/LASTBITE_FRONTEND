import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;

const Banner = ({
    title = "Instamart Essentials",
    subtitle = "Fresh groceries delivered within",
    deliveryTime = "15 minutes.",
    
    buttonText = "Shop Groceries",
    buttonColor = "#006B4D",
    buttonTextColor = "#FFFFFF",
    
    backgroundColor = "#E2FFEC",
    titleColor = "#000000",
    subtitleColor = "#4A4A4A",
    
    groceryImage = require('../assets/images/instamart-img.png'),
    
    height = 180,
    borderRadius = 12,
    
    right = -5,   
    bottom = 0,   
    
    onButtonPress = () => {},
  }) => {
    const router = useRouter();
    return (
      <View style={[styles.container, { backgroundColor, height, borderRadius }]}>
        <View style={styles.contentContainer}>
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
              onPress={() => router.push('/(tabs)/supermart')}
            >
              <Text style={[styles.buttonText, { color: buttonTextColor }]}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
  
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
    width: '95%',
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
    fontSize: RFPercentage(3),,
    maxWidth: '90%',
    marginBottom: 0,
  },
  subtitleContainer: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#929292",
    maxWidth: '60%',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  imageWrapper: {
    position: 'absolute',
    right: -5, 
    top: '20%',
    transform: [{ translateY: -50 }],
    width: '65%', 
    height: '170%', 
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Banner;
