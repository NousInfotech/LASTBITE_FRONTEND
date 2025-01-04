import GoBack from '@/components/GoBack';
import HotDealsList from '@/components/HotDealsList';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, ImageSourcePropType } from 'react-native';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import AddMoreItems from '@/app/Screens/AddMoreItems'; // Import AddMoreItems component

// Define types for product data and cart items
interface Product {
  id: string;
  title: string;
  weight: string;
  price: string;
  image: ImageSourcePropType;
}

const HotDealsProduct = () => {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [items, setItems] = useState<any[]>([]);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  const checkoutPageNavigation = () => {
    router.push("/Screens/checkoutPageNavigation");
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, show a loading screen or placeholder
  }

  // Sample product data
  const products: Product[] = [
    {
      id: '1',
      title: 'Lorem Ipsum and',
      weight: '48 g',
      price: '300',
      image: require('../../assets/images/cabbage.png'),
    },
    {
      id: '2',
      title: 'Lorem Ipsum and',
      weight: '48 g',
      price: '300',
      image: require('../../assets/images/cabbage.png'),
    },
    {
      id: '3',
      title: 'Lorem Ipsum and',
      weight: '48 g',
      price: '300',
      image: require('../../assets/images/Cheetos.png'),
    },
    {
      id: '4',
      title: 'Lorem Ipsum and',
      weight: '48 g',
      price: '300',
      image: require('../../assets/images/cabbage.png'),
    },
    {
      id: '5',
      title: 'Lorem Ipsum and',
      weight: '48 g',
      price: '300',
      image: require('../../assets/images/cabbage.png'),
    },
    {
      id: '6',
      title: 'Lorem Ipsum and',
      weight: '48 g',
      price: '300',
      image: require('../../assets/images/Chips.png'),
    },
  ];

  const handleAdd = (productId: string) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = { ...prevCartItems };
        updatedCartItems[productId] = (updatedCartItems[productId] || 0) + 1;
        return updatedCartItems;
      });

      // Pass the selected product details to the AddMoreItems component
      setItems((prevItems) => [
        ...prevItems,
        {
          id: selectedProduct.id,
          name: selectedProduct.title,
          quantity: 1,
          price: selectedProduct.price,
        },
      ]);
    }
  };

  const handleIncrement = (productId: string) => {
    setCartItems({
      ...cartItems,
      [productId]: (cartItems[productId] || 0) + 1,
    });
  };

  const handleDecrement = (productId: string) => {
    if (cartItems[productId] > 0) {
      setCartItems({
        ...cartItems,
        [productId]: cartItems[productId] - 1,
      });
    }
  };

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.headerTitle}>Hot deals</Text>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <HotDealsList
            item={item}
            onAdd={() => handleAdd(item.id)}
            cartCount={cartItems[item.id] || 0}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.productRow}
      />
      <View style={styles.checkoutBackground}>
        {totalItems > 0 && (
          <TouchableOpacity style={styles.checkoutButton} onPress={checkoutPageNavigation}>
            <Text style={styles.checkoutButtonText}>Checkout {totalItems} items</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Pass cart items to AddMoreItems */}
      <AddMoreItems items={items} setItems={setItems} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  checkoutBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  checkoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#01615F',
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HotDealsProduct;
