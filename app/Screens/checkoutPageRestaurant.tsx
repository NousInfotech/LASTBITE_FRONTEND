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
import { useLocalSearchParams, useRouter } from 'expo-router';

// Define the item type
interface CartItem {
  id?: number;
  menuItemId?: number;
  name?: string;
  quantity: number;
  price?: number;
  image?: string;
  category?: string;
}

const CheckoutPageNavigation: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<{id: string, name: string} | null>(null);
  
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Parse cart items from params
  useEffect(() => {
    if (params.cart) {
      try {
        const parsedItems = JSON.parse(params.cart as string);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems);
        }
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
    
    // Set restaurant info from params
    if (params.restaurantId && params.restaurantName) {
      setRestaurantInfo({
        id: params.restaurantId as string,
        name: params.restaurantName as string
      });
    }
  }, [params]);

  // Calculate the total amount
  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
  }, [items]);

  // Calculate total items count
  const totalItemsCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
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
    return null; // Show a loading screen or placeholder
  }

  // Function to handle address selection
  const handleAddressSelection = () => {
    setShowAddressSelector(true);
  };

  // Function to navigate to DishesSearch for adding more items
  const handleAddMoreItems = () => {
    if (restaurantInfo) {
      router.push({
        pathname: "./DishesSearch",
        params: {
          id: restaurantInfo.id,
          name: restaurantInfo.name,
          existingCart: JSON.stringify(items),
          fromCheckout: "true"
        }
      });
    } else {
      Alert.alert("Error", "Restaurant information is missing.");
    }
  };

  // Callback to handle address selection
  const onAddressSelected = (address: string) => {
    setSelectedAddress(address);
    setShowAddressSelector(false);
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      Alert.alert('Address Required', 'Please add or select an address before proceeding to checkout.');
      return;
    }
    
    // Navigate to payment screen
    Alert.alert("Success", "Proceeding to payment...");
    // router.push({ pathname: "./PaymentScreen", params: { cart: JSON.stringify(items) } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text allowFontScaling={false}  style={styles.headerTitle}>Your cart</Text>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cartContent}>
          {/* Restaurant Info */}
          {restaurantInfo && (
            <View style={styles.restaurantInfoContainer}>
              <Text allowFontScaling={false}  style={styles.restaurantName}>{restaurantInfo.name}</Text>
            </View>
          )}

          {/* Display cart items */}
          <View style={styles.itemsContainer}>
            <View style={styles.itemsHeader}>
              <Text allowFontScaling={false}  style={styles.itemsTitle}>Items in your cart</Text>
              <TouchableOpacity 
                style={styles.addMoreButton}
                onPress={handleAddMoreItems}
              >
                <Text allowFontScaling={false}  style={styles.addMoreButtonText}>+ Add More</Text>
              </TouchableOpacity>
            </View>
            
            {items.length > 0 ? (
              items.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemDetails}>
                    <Text allowFontScaling={false}  style={styles.itemName}>{item.name}</Text>
                    <Text allowFontScaling={false}  style={styles.itemPrice}>${(item.price || 0).toFixed(2)} × {item.quantity}</Text>
                  </View>
                  <Text allowFontScaling={false}  style={styles.itemTotal}>${((item.price || 0) * item.quantity).toFixed(2)}</Text>
                </View>
              ))
            ) : (
              <Text allowFontScaling={false}  style={styles.emptyCartText}>Your cart is empty</Text>
            )}
            
            {items.length > 0 && (
              <View style={styles.subtotalContainer}>
                <Text allowFontScaling={false}  style={styles.subtotalText}>Subtotal</Text>
                <Text allowFontScaling={false}  style={styles.subtotalAmount}>${totalAmount.toFixed(2)}</Text>
              </View>
            )}
          </View>
        </View>

        {items.length > 0 && (
          <View>
            <MealCustomizer />
            <SavingsCorner />
            <DeliveryTypeSelector />
            <DeliveryInstructions />
            <BillDetails />
            <ReviewNotice />
          </View>
        )}
      </ScrollView>
      
      {/* Address selector at the bottom */}
      <AddressSelector />
      
      {/* Payment Button */}
      {items.length > 0 && (
        <View style={styles.checkoutButtonContainer}>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleProceedToPayment}
          >
            <Text allowFontScaling={false}  style={styles.checkoutButtonText}>
              Proceed to Payment (${totalAmount.toFixed(2)})
            </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  scrollContent: {
    paddingBottom: 80, // Give space for the fixed button at bottom
  },
  cartContent: {
    padding: 16,
  },
  restaurantInfoContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-SemiBold',
    color: '#01615F',
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
    padding: 20,
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  checkoutButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  checkoutButton: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-Medium',
  },
});

export default CheckoutPageNavigation;