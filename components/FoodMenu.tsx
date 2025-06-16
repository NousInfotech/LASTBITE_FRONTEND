import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  Platform, 
  TouchableOpacity 
} from 'react-native';
import { useFonts } from 'expo-font';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

interface FoodMenuProps {
  onSelectMenu: (menuName: string) => void;
}

const FoodMenu: React.FC<FoodMenuProps> = ({ onSelectMenu }) => {
  const [menuData, setMenuData] = useState<{ id: string; name: string; icon: string }[]>([]);

  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Itim-Regular.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    const fetchMenuData = async () => {
      const data = require('../JSON DATA/food.json');
      setMenuData(data);
    };
    fetchMenuData();
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false}  style={styles.title}>Flavors for Every Mood</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {menuData.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.itemContainer} 
            onPress={() => onSelectMenu(item.name)}
          >
            <Text allowFontScaling={false} 
              style={styles.icon}
              accessibilityLabel={`${item.name} icon`}
              accessible
            >
              {item.icon}
            </Text>
            <Text allowFontScaling={false}  style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
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
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    paddingHorizontal: 16,
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
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-Regular',
  },
});

export default FoodMenu;
