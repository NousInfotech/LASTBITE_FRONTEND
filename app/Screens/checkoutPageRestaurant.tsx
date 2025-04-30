
// import React, { useEffect, useState, useMemo } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
// import * as Font from 'expo-font';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import GoBack from '@/components/GoBack';
// import MealCustomizer from '@/components/MealCustomizer';
// import SavingsCorner from '@/components/SavingsCorner';
// import DeliveryTypeSelector from '@/components/DeliveryTypeSelector';
// import DeliveryInstructions from '@/components/DeliveryInstructions';
// import BillDetails from '@/components/BillDetails';
// import ReviewNotice from '@/components/ReviewNotice';
// import AddressSelector from '@/components/AddressSelector';
// import AddMoreItems from '../../app/Screens/AddMoreItems';
// import { Link } from 'expo-router';
// import { useRouter } from 'expo-router';

// // Define the item type
// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
//   image?: string;
//   category?: string;
// }

// // Define the props type for this screen
// interface CheckoutPageProps {
//   navigation: any; // Replace `any` with the proper type from `react-navigation` if needed
// }

// const CheckoutPageNavigation: React.FC<CheckoutPageProps> = ({ navigation }) => {
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [items, setItems] = useState<Item[]>([
//     { id: 1, name: 'Burger', quantity: 2, price: 150 },
//     { id: 2, name: 'Fries', quantity: 1, price: 50 },
//     { id: 3, name: 'Coke', quantity: 3, price: 40 },
//   ]);

//   const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
//   const [showAddressSelector, setShowAddressSelector] = useState(false);
//   const [showAddMoreItemsModal, setShowAddMoreItemsModal] = useState(false);
  
//   const router = useRouter();

//   // Calculate the total amount - moved into a useMemo to ensure consistent hook order
//   const totalAmount = useMemo(() => {
//     return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   }, [items]);

//   useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync({
//         'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
//         'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
//         'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
//       });
//       setFontsLoaded(true);
//     }

//     loadFonts();
//   }, []);

//   if (!fontsLoaded) {
//     return null; // Optionally, show a loading screen or placeholder
//   }

//   const goToCheckout = (): void => {
//     if (!selectedAddress) {
//       Alert.alert('Address Required', 'Please add or select an address before proceeding to checkout.');
//       return;
//     }
//     navigation.navigate('CheckoutPage');
//   };

//   // Function to handle address selection
//   const handleAddressSelection = () => {
//     setShowAddressSelector(true);
//   };

//   // Callback to handle address selection
//   const onAddressSelected = (address: string) => {
//     setSelectedAddress(address);
//     setShowAddressSelector(false);
//   };

//   const navigateToRestaurantSelect = () => {
//     router.push('/Screens/DishesSearch');
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <GoBack />
//         <Text style={styles.headerTitle}>Your cart</Text>
//       </View>

//       {/* Main content */}
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.cartContent}>
//           {/* Display cart items */}
//           <View style={styles.itemsContainer}>
//             <View style={styles.itemsHeader}>
//               <Text style={styles.itemsTitle}>Items in your cart</Text>
//               <Link href="/Screens/DishesSearch" asChild>
//                 <TouchableOpacity style={styles.addMoreButton}>
//                   <Text style={styles.addMoreButtonText}>+ Add More</Text>
//                 </TouchableOpacity>
//               </Link>
//             </View>
            
//             {items.map((item, index) => (
//               <View key={index} style={styles.itemCard}>
//                 <View style={styles.itemDetails}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.itemPrice}>${item.price.toFixed(2)} × {item.quantity}</Text>
//                 </View>
//                 <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
//               </View>
//             ))}
            
//             <View style={styles.subtotalContainer}>
//               <Text style={styles.subtotalText}>Subtotal</Text>
//               <Text style={styles.subtotalAmount}>${totalAmount.toFixed(2)}</Text>
//             </View>
//           </View>
//         </View>

//         <View>
//           <MealCustomizer />
//           <SavingsCorner />
//           <DeliveryTypeSelector />
//           <DeliveryInstructions />
//           <BillDetails />
//           <ReviewNotice />
//         </View>
//       </ScrollView>
      
//       {/* Address selector at the bottom */}
//       <AddressSelector />
      
//       {/* Conditionally show AddMoreItems */}
//       {showAddMoreItemsModal && (
//         <AddMoreItems 
//           items={items} 
//           setItems={setItems} 
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//     marginLeft: 8,
//   },
//   scrollContent: {
//     paddingBottom: 16,
//   },
//   cartContent: {
//     padding: 16,
//   },
//   itemsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     marginBottom: 16,
//   },
//   itemsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   itemsTitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//   },
//   addMoreButton: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#01615F',
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },
//   addMoreButtonText: {
//     color: '#01615F',
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Medium',
//   },
//   itemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//     color: '#333',
//   },
//   itemPrice: {
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Regular',
//     color: '#666',
//     marginTop: 2,
//   },
//   itemTotal: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#01615F',
//   },
//   subtotalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   subtotalText: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//   },
//   subtotalAmount: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#01615F',
//   },
// });

// export default CheckoutPageNavigation;































// import React, { useEffect, useState, useMemo } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
// import * as Font from 'expo-font';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import GoBack from '@/components/GoBack';
// import MealCustomizer from '@/components/MealCustomizer';
// import SavingsCorner from '@/components/SavingsCorner';
// import DeliveryTypeSelector from '@/components/DeliveryTypeSelector';
// import DeliveryInstructions from '@/components/DeliveryInstructions';
// import BillDetails from '@/components/BillDetails';
// import ReviewNotice from '@/components/ReviewNotice';
// import AddressSelector from '@/components/AddressSelector';
// import AddMoreItemsModal from './AddMoreItems';
// import { Link } from 'expo-router';
// import { useRouter } from 'expo-router';

// // Define the item type
// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
//   image?: string;
//   category?: string;
// }

// // Define the props type for this screen
// interface CheckoutPageProps {
//   navigation: any; // Replace `any` with the proper type from `react-navigation` if needed
// }

// const CheckoutPageNavigation: React.FC<CheckoutPageProps> = ({ navigation }) => {
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [items, setItems] = useState<Item[]>([
//     { id: 1, name: 'Burger', quantity: 2, price: 150 },
//     { id: 2, name: 'Fries', quantity: 1, price: 50 },
//     { id: 3, name: 'Coke', quantity: 3, price: 40 },
//   ]);

//   const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
//   const [showAddressSelector, setShowAddressSelector] = useState(false);
//   const [showAddMoreItemsModal, setShowAddMoreItemsModal] = useState(false);
  
//   const router = useRouter();

//   // Calculate the total amount - moved into a useMemo to ensure consistent hook order
//   const totalAmount = useMemo(() => {
//     return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   }, [items]);

//   useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync({
//         'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
//         'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
//         'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
//       });
//       setFontsLoaded(true);
//     }

//     loadFonts();
//   }, []);

//   if (!fontsLoaded) {
//     return null; // Optionally, show a loading screen or placeholder
//   }

//   const goToCheckout = (): void => {
//     if (!selectedAddress) {
//       Alert.alert('Address Required', 'Please add or select an address before proceeding to checkout.');
//       return;
//     }
//     navigation.navigate('CheckoutPage');
//   };

//   // Function to handle address selection
//   const handleAddressSelection = () => {
//     setShowAddressSelector(true);
//   };

//   // Function to handle adding more items
//   const handleAddMoreItems = () => {
//     setShowAddMoreItemsModal(true);
//   };

//   // Update items when modal is closed with new items
//   const handleUpdateItems = (updatedItems: Item[]) => {
//     setItems(updatedItems);
//   };

//   // Callback to handle address selection
//   const onAddressSelected = (address: string) => {
//     setSelectedAddress(address);
//     setShowAddressSelector(false);
//   };

//   // Handle adding items to cart from modal
//   const handleAddToCart = () => {
//     // This could do additional processing if needed
//     Alert.alert("Success", "Items updated in your cart!");
//   };

//   const navigateToRestaurantSelect = () => {
//     router.push('/Screens/DishesSearch');
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <GoBack />
//         <Text style={styles.headerTitle}>Your cart</Text>
//       </View>

//       {/* Main content */}
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.cartContent}>
//           {/* Display cart items */}
//           <View style={styles.itemsContainer}>
//             <View style={styles.itemsHeader}>
//               <Text style={styles.itemsTitle}>Items in your cart</Text>
//               <TouchableOpacity 
//                 style={styles.addMoreButton}
//                 onPress={handleAddMoreItems}
//               >
//                 <Text style={styles.addMoreButtonText}>+ Add More</Text>
//               </TouchableOpacity>
//             </View>
            
//             {items.map((item, index) => (
//               <View key={index} style={styles.itemCard}>
//                 <View style={styles.itemDetails}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.itemPrice}>${item.price.toFixed(2)} × {item.quantity}</Text>
//                 </View>
//                 <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
//               </View>
//             ))}
            
//             <View style={styles.subtotalContainer}>
//               <Text style={styles.subtotalText}>Subtotal</Text>
//               <Text style={styles.subtotalAmount}>${totalAmount.toFixed(2)}</Text>
//             </View>
//           </View>
//         </View>

//         <View>
//           <MealCustomizer />
//           <SavingsCorner />
//           <DeliveryTypeSelector />
//           <DeliveryInstructions />
//           <BillDetails />
//           <ReviewNotice />
//         </View>
//       </ScrollView>
      
//       {/* Address selector at the bottom */}
//       <AddressSelector />
      
//       {/* Add More Items Modal */}
//       <AddMoreItemsModal 
//         visible={showAddMoreItemsModal}
//         onClose={() => setShowAddMoreItemsModal(false)}
//         currentItems={items}
//         onUpdateItems={handleUpdateItems}
//         onAddToCart={handleAddToCart}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//     marginLeft: 8,
//   },
//   scrollContent: {
//     paddingBottom: 16,
//   },
//   cartContent: {
//     padding: 16,
//   },
//   itemsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     marginBottom: 16,
//   },
//   itemsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   itemsTitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//   },
//   addMoreButton: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#01615F',
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },
//   addMoreButtonText: {
//     color: '#01615F',
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Medium',
//   },
//   itemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//     color: '#333',
//   },
//   itemPrice: {
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Regular',
//     color: '#666',
//     marginTop: 2,
//   },
//   itemTotal: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#01615F',
//   },
//   subtotalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   subtotalText: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//   },
//   subtotalAmount: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#01615F',
//   },
// });

// export default CheckoutPageNavigation;

























// Modified CheckoutPageNavigation.tsx
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
import AddMoreItemsModal from './AddMoreItems';
import { Link, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

// Define the item type
interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  category?: string;
}

// Define the props type for this screen
interface CheckoutPageProps {
  navigation: any; // Replace `any` with the proper type from `react-navigation` if needed
}

const CheckoutPageNavigation: React.FC<CheckoutPageProps> = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Burger', quantity: 2, price: 150 },
    { id: 2, name: 'Fries', quantity: 1, price: 50 },
    { id: 3, name: 'Coke', quantity: 3, price: 40 },
  ]);

  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Check if incoming items from params
  useEffect(() => {
    if (params.updatedCartItems) {
      try {
        const parsedItems = JSON.parse(params.updatedCartItems as string);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems);
        }
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
  }, [params.updatedCartItems]);
  
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [showAddMoreItemsModal, setShowAddMoreItemsModal] = useState(false);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  
  // Set restaurant ID from params if available
  useEffect(() => {
    if (params.restaurantId) {
      setRestaurantId(params.restaurantId as string);
    }
  }, [params.restaurantId]);

  // Calculate the total amount - moved into a useMemo to ensure consistent hook order
  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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

  // Function to handle adding more items
  const handleAddMoreItems = () => {
    setShowAddMoreItemsModal(true);
  };

  // Update items when modal is closed with new items
  const handleUpdateItems = (updatedItems: Item[]) => {
    setItems(updatedItems);
  };

  // Callback to handle address selection
  const onAddressSelected = (address: string) => {
    setSelectedAddress(address);
    setShowAddressSelector(false);
  };

  // Handle adding items to cart from modal
  const handleAddToCart = () => {
    // This could do additional processing if needed
    Alert.alert("Success", "Items updated in your cart!");
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
              <TouchableOpacity 
                style={styles.addMoreButton}
                onPress={handleAddMoreItems}
              >
                <Text style={styles.addMoreButtonText}>+ Add More</Text>
              </TouchableOpacity>
            </View>
            
            {items.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)} × {item.quantity}</Text>
                </View>
                <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            
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
      
      {/* Add More Items Modal */}
      <AddMoreItemsModal 
        visible={showAddMoreItemsModal}
        onClose={() => setShowAddMoreItemsModal(false)}
        currentItems={items}
        onUpdateItems={handleUpdateItems}
        onAddToCart={handleAddToCart}
        restaurantId={restaurantId || undefined}
      />
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
});

export default CheckoutPageNavigation;