import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import GoBack from '@/components/GoBack';
import DeliveryTypeSelection from '@/components/DeliveryTypeSelection';
import DeliveryPopup from '@/components/DeliveryPopup';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

const BillingScreen = () => {
  const router = useRouter();
  const { cart, restaurantName } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>([]);
  const [deliveryFee, setDeliveryFee] = useState<number>(50); // Example fee
  const [platformFee, setPlatformFee] = useState<number>(30); // Example fee
  const [gstPercentage, setGstPercentage] = useState<number>(5); // GST as a percentage
  const [restaurantCharges, setRestaurantCharges] = useState<number>(20); 
  const [showPopup, setShowPopup] = useState<boolean>(true);

  const calculateGST = (amount: number) => (amount * gstPercentage) / 100;

  const calculateTotal = () => {
    const gstAmount = calculateGST(totalAmount);
    return totalAmount + deliveryFee + platformFee + gstAmount + restaurantCharges;
  };

  useEffect(() => {
    if (cart) {
      try {
        const cartString = Array.isArray(cart) ? cart[0] : cart;
        const cartData: CartItem[] = JSON.parse(cartString);
        setCartItems(cartData);

        const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, [cart]);

  const deliveryOptions = [
    {
      label: 'Avoid ringing Bell',
      image: require('./../../assets/images/Doorbell.png'),
      selectedImage: require('./../../assets/images/Doorbell-1.png'),
    },
    {
      label: 'Leave at the door',
      image: require('./../../assets/images/Open Door.png'),
      selectedImage: require('./../../assets/images/Open Door-1.png'),
    },
    {
      label: 'Direction to reach',
      image: require('./../../assets/images/Microphone.png'),
      selectedImage: require('./../../assets/images/Microphone-1.png'),
    },
    {
      label: 'Avoid calling',
      image: require('./../../assets/images/Phonelink Ring.png'),
      selectedImage: require('./../../assets/images/Phonelink Ring-1.png'),
    },
  ];
  
  const toggleSelection = (label: string) => {
    setSelectedInstructions((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    if (cart) {
      try {
        const cartString = Array.isArray(cart) ? cart[0] : cart;
        const cartData: CartItem[] = JSON.parse(cartString);
        setCartItems(cartData);

        const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, [cart]);

  const handleQuantityChange = (index: number, action: 'increment' | 'decrement') => {
    const updatedCartItems = [...cartItems];
    const item = updatedCartItems[index];
    if (action === 'increment') {
      item.quantity += 1;
    } else if (action === 'decrement' && item.quantity > 1) {
      item.quantity -= 1;
    }
    setCartItems(updatedCartItems);
    updateTotalAmount(updatedCartItems);
  };

  const updateTotalAmount = (updatedCartItems: CartItem[]) => {
    const total = updatedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const handlePlaceOrder = () => {
    console.log('Order placed:', cartItems);
    // router.push('/Screens/Home');
  };

  const renderCartItem = ({ item, index }: { item: CartItem; index: number }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemText}>{item.name}</Text>

      <View style={styles.quantityControls}>
        <QuantityButton onPress={() => handleQuantityChange(index, 'decrement')} label="-" />
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <QuantityButton onPress={() => handleQuantityChange(index, 'increment')} label="+" />
      </View>

      <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  const QuantityButton = ({ onPress, label }: { onPress: () => void; label: string }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const SavingsCorner = () => (
    <View style={styles.savingsCornerContainer}>
      <Text style={styles.savingsCornerText}>SAVINGS CORNER</Text>
      <TouchableOpacity style={styles.applyCouponContainer} onPress={() => console.log('Apply Coupon pressed')}>
        <Image source={require('./../../assets/images/coupon.png')} style={styles.couponImage} />
        <Text style={styles.applyCouponText}>Apply Coupon</Text>
        <Text style={styles.chevron}>&gt;</Text>
      </TouchableOpacity>
    </View>
  );
  
  const AddMoreButton = () => (
    <TouchableOpacity style={styles.addMoreButton} onPress={() => console.log('Add More Items pressed')}>
      <Text style={styles.addMoreButtonText}>+ Add More Items</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurantName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cartListContainer}>
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => renderCartItem({ item, index })}
            keyExtractor={(item, index) => `${item.name}-${index}`}
          />
          <AddMoreButton />
        </View>

        <View style={styles.completeMealContainer}>
          <Text style={styles.completeMealText}>COMPLETE YOUR MEAL</Text>
          {/* You can add more content here like additional options or suggestions */}
        </View>

        <SavingsCorner />

        {/* Delivery Type Section */}
        <View style={styles.Delivery}>
          <Text style={styles.DelieveryText}>Delivery Type</Text>
          <Text style={styles.DelieverySubText}>Your food will always be fresh!</Text>
        </View>
        <DeliveryTypeSelection />
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
          <View style={styles.optionsRow}>
            {deliveryOptions.map((option) => (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionContainer,
                  selectedInstructions.includes(option.label) && styles.optionSelected,
                ]}
                onPress={() => toggleSelection(option.label)}
              >
                <Image source={
          selectedInstructions.includes(option.label)
            ? option.selectedImage
            : option.image
        } style={styles.optionImage} />
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
        </View>
        <View style={styles.billSection}>
          <Text style={styles.billTitle}>Bill Details</Text>
        </View>
        <View style={styles.billContainer}>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Item Total</Text>
            <Text style={styles.billText}>${totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Delivery Fee || 11.0 Kms</Text>
            <Text style={styles.billText}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Platform Fee</Text>
            <Text style={styles.billText}>${platformFee.toFixed(2)}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>GST ({gstPercentage}%)</Text>
            <Text style={styles.billText}>${calculateGST(totalAmount).toFixed(2)}</Text>
          </View>
          <View style={styles.billItem}>
            <Text style={styles.billText}>Restaurant Charges</Text>
            <Text style={styles.billText}>${restaurantCharges.toFixed(2)}</Text>
          </View>
          <View style={styles.billTotal}>
            <Text style={styles.totaltoText}>To Pay</Text>
            <Text style={styles.totaltoText}>${calculateTotal().toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      {showPopup && <DeliveryPopup onClose={() => setShowPopup(false)} />}
    </SafeAreaView>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cartListContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cartItemText: {
    fontSize: 16,
    flex: 2,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1.5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#01615F',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addMoreButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#01615F',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  addMoreButtonText: {
    color: '#01615F',
    fontSize: 16,
    fontWeight: 'bold',
  },

  completeMealContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  
  completeMealText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  
  savingsCornerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  savingsCornerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  applyCouponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  applyCouponText: {
    fontSize: 16,
  },
  chevron: {
    fontSize: 30,
    color: '#01615F',
  },
  couponImage: {
    width: 24,
    height: 24,
    marginRight: -150,
  },
  Delivery: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  DelieveryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  DelieverySubText: {
    fontSize: 14,
    marginTop: 5,
    color: '#7a7a7a',
  },
  instructionsSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginHorizontal: 0,
    marginTop: 7
  },
    optionContainer: {
    width: 75, 
    height: 80, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    margin: 2, 
    padding: 7, 
  },
  optionSelected: {
    borderColor: '#01615F', 
    borderWidth: 2,
  },
  optionImage: {
    width: 30, 
    height: 30,
    resizeMode: 'contain',
    marginBottom: 8, 
  },
  optionLabel: {
    fontSize: 12,
    color: '#333',
  },
  billSection: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  billTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  billContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  billText: {
    fontSize: 16,
  },
  billTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
  },
  totaltoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
