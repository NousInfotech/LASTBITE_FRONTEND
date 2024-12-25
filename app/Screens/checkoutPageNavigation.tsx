import AddMoreItems from '@/components/AddMoreItems';
import BillDetails from '@/components/BillDetails';
import DeliveryTypeSelector from '@/components/DeliveryTypeSelector';
import GoBack from '@/components/GoBack';
import MealCustomizer from '@/components/MealCustomizer';
import OrderReviewNotice from '@/components/OrderReviewNotice';
import SavingsCorner from '@/components/SavingsCorner';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';


// Define the props type for this screen
interface AddMoreItemsProps {
  navigation: any;  // Replace `any` with the proper type from `react-navigation` if needed
}

const checkoutPageNavigation: React.FC<AddMoreItemsProps> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Lorem ipsum', quantity: 1, price: 100 },
    { id: 2, name: 'Lorem', quantity: 1, price: 100 },
  ]);

  const updateQuantity = (itemId: number, newQuantity: number): void => {
    if (newQuantity < 1) return;

    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const goToCheckout = (): void => {
    navigation.navigate('CheckoutPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.headerTitle}>Your cart</Text>
      </View>

      <View style={styles.cartContent}>
        {cartItems.map(item => (
          <AddMoreItems
            key={item.id}
            item={item}                // Pass `item` here
            onUpdateQuantity={updateQuantity} // Pass `onUpdateQuantity` here
          />
        ))}

        <TouchableOpacity style={styles.addMoreButton} onPress={goToCheckout}>
          <Text style={styles.addMoreButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      <View>
        <MealCustomizer/>
      </View>

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
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cartContent: {
    padding: 16,
  },
  addMoreButton: {
    borderWidth: 1,
    borderColor: '#008080',
    borderRadius: 4,
    padding: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  addMoreButtonText: {
    color: '#008080',
    fontSize: 14,
  },
});

export default checkoutPageNavigation;
