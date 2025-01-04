import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import * as Font from 'expo-font';
import AddMoreItems from '@/app/Screens/AddMoreItems';
import GoBack from '@/components/GoBack';
import MealCustomizer from '@/components/MealCustomizer';
import SavingsCorner from '@/components/SavingsCorner';
import DeliveryTypeSelector from '@/components/DeliveryTypeSelector';
import DeliveryInstructions from '@/components/DeliveryInstructions';
import BillDetails from '@/components/BillDetails';
import ReviewNotice from '@/components/ReviewNotice';
import DeliveryAddressSelector from '@/components/DeliveryAddressSelector';
import AddressSelector from '@/components/AddressSelector';



// Define the item type
interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Define the props type for this screen
interface AddMoreItemsProps {
  navigation: any; // Replace `any` with the proper type from `react-navigation` if needed
}

const checkoutPageNavigation: React.FC<AddMoreItemsProps> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Burger', quantity: 2, price: 150 },
    { id: 2, name: 'Fries', quantity: 1, price: 50 },
    { id: 3, name: 'Coke', quantity: 3, price: 40 },
  ]);

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null); // State for selected address
  const [showAddressSelector, setShowAddressSelector] = useState(false); // State to control modal visibility

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

  // Function to handle address selection (opens the DeliveryAddressSelector)
  const handleAddressSelection = () => {
    setShowAddressSelector(true); // Show the DeliveryAddressSelector modal
  };

  // Callback to handle address selection from DeliveryAddressSelector
  const onAddressSelected = (address: string) => {
    setSelectedAddress(address); // Update the selected address
    setShowAddressSelector(false); // Hide the modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.headerTitle}>Your cart</Text>
      </View>

      {/* Wrap the content in a ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cartContent}>
          <AddMoreItems items={items} setItems={setItems} />
        </View>

        <View>
          <MealCustomizer />
          <SavingsCorner />
          <DeliveryTypeSelector />
          <DeliveryInstructions />
          <BillDetails />
          <ReviewNotice />

          {/* Updated AddressSelector with proper onPress function */}
      

          {/* {selectedAddress && (
            <Text style={styles.selectedAddress}>
              Selected Address: {selectedAddress}
            </Text>
          )}

          {showAddressSelector && <DeliveryAddressSelector onAddressSelect={onAddressSelected} />} */}
        </View>
      </ScrollView>
      <AddressSelector />
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
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 16, // Adds padding at the bottom for better spacing
  },
  cartContent: {
    padding: 16,
  },
  selectedAddress: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 16,
  },
});

export default checkoutPageNavigation;
