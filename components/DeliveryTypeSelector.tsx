import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons'; // Correct import

const DeliveryTypeSelector = () => {
  const [selectedType, setSelectedType] = useState('eco');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const deliveryTypes: {
    [key: string]: {
      title: string;
      time: string;
      features: string[];
      eco?: string; // Optional property
    };
  } = {
    standard: {
      title: 'Standard',
      time: '25-30 mins',
      features: [
        'Recommended if you are in a hurry',
        'Minimal order grouping',
      ],
    },
    eco: {
      title: 'Eco Saver',
      time: '30-35 mins',
      features: [
        'Less fuel pollution by grouping orders',
      ],
      eco: '8 tons CO2 saved daily', // Only for 'eco'
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Object.entries(deliveryTypes).map(([type, data]) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.card,
              selectedType === type ? styles.selectedCard : styles.unselectedCard,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>{data.title}</Text>
                <Text style={styles.cardTime}>{data.time}</Text>
              </View>
              {selectedType === type && (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark" size={18} color="#fff" />
                </View>
              )}
            </View>

            <View>
              {data.features.map((feature, index) => (
                <View style={styles.featureItem} key={index}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
              {data.eco && (
                <View style={styles.ecoContainer}>
                  <MaterialIcons name="eco" size={16} color="#01615F" />
                  <Text style={styles.ecoText}>{data.eco}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    marginTop: 10,
    alignSelf: 'center',
    width: '95%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal:8,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 2,
  },
  selectedCard: {
    borderColor: '#01615F',
    backgroundColor: '#fff',
  },
  unselectedCard: {
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: RFPercentage(1.3),
    color: '#929292',
  },
  cardTime: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#1p1A1F',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#01615F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bullet: {
    fontSize: RFPercentage(1.3),
    color: '#929292',
    marginRight:4,
    fontFamily: 'Poppins-Regular',
  },
  featureText: {
    fontSize: RFPercentage(1.3),
    marginRight:4,
    fontFamily: 'Poppins-Regular',
    color: '#929292',
  },
  ecoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ecoText: {
    fontSize: RFPercentage(1.3),
    fontFamily: 'Poppins-Medium',
    color: '#01615F',
    marginLeft: 0,
  },
});

export default DeliveryTypeSelector;
