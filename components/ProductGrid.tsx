import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const router = useRouter();

interface ProductItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

interface Category {
  title: string;
  items: ProductItem[];
}

// Define props for ProductGrid component
interface ProductGridProps {
  categories: Category[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ categories }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, show a loading screen or placeholder
  }

  // const renderProductItem = (item: ProductItem) => (
  //   <TouchableOpacity key={item.id} style={styles.productItem}>
  //     <View style={styles.imageContainer}>
  //       <Image source={item.image} style={styles.productImage} />
  //     </View>
  //     <Text style={styles.productName}>{item.name}</Text>
  //   </TouchableOpacity>
  // );

  const renderCategory = (category: Category) => (
    <View key={category.title} style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <View style={styles.productsGrid}>
        {category.items.map((item) => renderProductItem(item))}
      </View>
    </View>
  );

  const handleProductDetails = () => {
    router.push('/Screens/ProductList')
  }

  const renderProductItem = (item: ProductItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.productItem}
      onPress={handleProductDetails}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => renderCategory(category))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex:40,
  },
  categoryContainer: {
    padding: 16,
    paddingVertical: 4,
  },
  categoryTitle: {
    fontSize: RFPercentage(2),
    marginBottom: 16,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: (windowWidth - 48) / 3,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    paddingBottom: 8,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
});

export default ProductGrid;
