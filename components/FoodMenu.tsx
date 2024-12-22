import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { useFonts } from 'expo-font'; // Font loader hook

const { width } = Dimensions.get('window');

const FoodMenu: React.FC = () => {
  const [menuData, setMenuData] = useState<any[]>([]);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  // Fetch menu data from local JSON file
  useEffect(() => {
    const fetchMenuData = async () => {
      const data = require('../JSON DATA/food.json'); // Use require to load local JSON
      setMenuData(data);
    };
    
    fetchMenuData();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flavors for Every Mood</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {menuData.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text
              style={styles.icon}
              accessibilityLabel={`${item.name} icon`}
              accessible
            >
              {item.icon}
            </Text>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    paddingHorizontal:16,
  },
  scrollView: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  itemContainer: {
    width: width * 0.25,
    height: width * 0.25,
    marginRight: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    elevation: Platform.OS === 'android' ? 3 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    fontSize: 45,
    marginBottom: 6,
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default FoodMenu;
