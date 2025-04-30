import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { RFPercentage } from 'react-native-responsive-fontsize';
import GoBack from '@/components/GoBack';
import MealCustomizer from '@/components/MealCustomizer';
import SavingsCorner from '@/components/SavingsCorner';
import DeliveryTypeSelector from '@/components/DeliveryTypeSelector';
import DeliveryInstructions from '@/components/DeliveryInstructions';
import BillDetails from '@/components/BillDetails';
import ReviewNotice from '@/components/ReviewNotice';
import AddressSelector from '@/components/AddressSelector';
import AddMoreItems from '../../app/Screens/AddMoreItems';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { GROCERY_DATA } from '../../src/constants/groceryData'; // You'll need to create this file

// Define the item type
interface Item {
  id: string;
  name: string;
  quantity: number;
  price: string;
  weight: string;
  category?: string;
  image?: any;
}

// Define the props type for this screen
interface CheckoutPageProps {
  navigation?: any; // Replace `any` with the proper type from `react-navigation` if needed
}

const CheckoutPageNavigation: React.FC<CheckoutPageProps> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [cartItemsObj, setCartItemsObj] = useState<{[key: string]: number}>({});
  
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [showAddMoreItemsModal, setShowAddMoreItemsModal] = useState(false);
  
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Process cart items from URL params
    if (params.cartItems) {
      try {
        const parsedCartItems = JSON.parse(decodeURIComponent(params.cartItems as string));
        setCartItemsObj(parsedCartItems);
        
        // Convert cart items object to array with item details
        const cartItemsArray = Object.entries(parsedCartItems).map(([itemId, quantity]) => {
          const itemDetails = GROCERY_DATA.find(item => item.id === itemId);
          if (!itemDetails) return null;
          
          return {
            id: itemDetails.id,
            name: itemDetails.name,
            quantity: quantity as number,
            price: itemDetails.price.replace('$', ''), // Remove $ symbol for calculations
            weight: itemDetails.weight,
            category: itemDetails.category,
            image: itemDetails.image
          };
        }).filter(item => item !== null) as Item[];
        
        setItems(cartItemsArray);
      } catch (error) {
        console.error("Error parsing cart items:", error);
        // Fallback to default items if there's an error
        setItems([
          { id: '1', name: 'Fresh Oranges', quantity: 1, price: '2.99', weight: '1 lb' },
          { id: '2', name: 'Organic Broccoli', quantity: 1, price: '3.49', weight: '1 bunch' }
        ]);
      }
    }
  }, [params.cartItems]);

  // Calculate the total amount
  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  }, [items]);

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

  const goToCheckout = (): void => {
    if (!selectedAddress) {
      Alert.alert('Address Required', 'Please add or select an address before proceeding to checkout.');
      return;
    }
    navigation.navigate('CheckoutPage');
  };

  // Function to handle address selection
  const handleAddressSelection = () => {
    setShowAddressSelector(true);
  };

  // Callback to handle address selection
  const onAddressSelected = (address: string) => {
    setSelectedAddress(address);
    setShowAddressSelector(false);
  };

  // Navigate to ProductList with current cart items
  const navigateToProductList = () => {
    try {
      // Pass existing cart items back to product list
      const existingCartParam = encodeURIComponent(JSON.stringify(cartItemsObj));
      
      router.push({
        pathname: '/Screens/ProductList',
        params: { existingCart: existingCartParam }
      });
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to simple navigation if there's an error
      router.push('/Screens/ProductList');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.headerTitle}>Your cart</Text>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cartContent}>
          {/* Display cart items */}
          <View style={styles.itemsContainer}>
            <View style={styles.itemsHeader}>
              <Text style={styles.itemsTitle}>Items in your cart</Text>
              <TouchableOpacity style={styles.addMoreButton} onPress={navigateToProductList}>
                <Text style={styles.addMoreButtonText}>+ Add More</Text>
              </TouchableOpacity>
            </View>
            
            {items.length > 0 ? (
              items.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price} × {item.quantity} ({item.weight})</Text>
                  </View>
                  <Text style={styles.itemTotal}>${(parseFloat(item.price) * item.quantity).toFixed(2)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            )}
            
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={styles.subtotalAmount}>${totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View>
          <MealCustomizer />
          <SavingsCorner />
          <DeliveryTypeSelector />
          <DeliveryInstructions />
          <BillDetails />
          <ReviewNotice />
        </View>
      </ScrollView>
      
      {/* Address selector at the bottom */}
      <AddressSelector />
      
      {/* Conditionally show AddMoreItems */}
      {showAddMoreItemsModal && (
        <AddMoreItems 
          items={items} 
          setItems={setItems} 
        />
      )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  cartContent: {
    padding: 16,
  },
  itemsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-SemiBold',
  },
  addMoreButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#01615F',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  addMoreButtonText: {
    color: '#01615F',
    fontSize: RFPercentage(1.6),
    fontFamily: 'Poppins-Medium',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  itemPrice: {
    fontSize: RFPercentage(1.6),
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 2,
  },
  itemTotal: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-SemiBold',
    color: '#01615F',
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  subtotalText: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
  },
  subtotalAmount: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-SemiBold',
    color: '#01615F',
  },
  emptyCartText: {
    textAlign: 'center',
    padding: 16,
    fontSize: RFPercentage(1.8),
    color: '#666',
    fontFamily: 'Poppins-Regular',
  }
});

export default CheckoutPageNavigation;