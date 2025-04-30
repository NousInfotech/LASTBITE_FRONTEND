// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   FlatList,
//   SafeAreaView,
//   TextInput
// } from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import * as Font from 'expo-font';

// // Define the item type
// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
//   image?: string;
//   category?: string;
// }

// interface AddMoreItemsModalProps {
//   visible: boolean;
//   onClose: () => void;
//   currentItems: Item[];
//   onUpdateItems: (updatedItems: Item[]) => void;
//   onAddToCart: () => void;
// }

// const AddMoreItemsModal: React.FC<AddMoreItemsModalProps> = ({
//   visible,
//   onClose,
//   currentItems,
//   onUpdateItems,
//   onAddToCart
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [localItems, setLocalItems] = useState<Item[]>(currentItems);
  
//   // Mock data for suggested items
//   const suggestedItems: Item[] = [
//     { id: 4, name: 'Pizza', quantity: 0, price: 180, category: 'Fast Food', image: 'https://via.placeholder.com/100' },
//     { id: 5, name: 'Pasta', quantity: 0, price: 120, category: 'Italian', image: 'https://via.placeholder.com/100' },
//     { id: 6, name: 'Sandwich', quantity: 0, price: 90, category: 'Snacks', image: 'https://via.placeholder.com/100' },
//   ];

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
//     setLocalItems(currentItems);
//   }, [currentItems, visible]);

//   const updateItemQuantity = (id: number, change: number) => {
//     const updatedItems = localItems.map(item => {
//       if (item.id === id) {
//         // Don't allow quantity to go below 0
//         const newQuantity = Math.max(0, item.quantity + change);
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });
//     setLocalItems(updatedItems);
//   };

//   const addNewItem = (item: Item) => {
//     // Check if item already exists in localItems
//     const existingItem = localItems.find(i => i.id === item.id);
    
//     if (existingItem) {
//       // Update quantity if item exists
//       updateItemQuantity(item.id, 1);
//     } else {
//       // Add new item with quantity 1
//       setLocalItems([...localItems, { ...item, quantity: 1 }]);
//     }
//   };

//   const getTotalItems = () => {
//     return localItems.reduce((sum, item) => sum + item.quantity, 0);
//   };

//   const getTotalPrice = () => {
//     return localItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const handleSave = () => {
//     // Filter out items with quantity 0
//     const validItems = localItems.filter(item => item.quantity > 0);
//     onUpdateItems(validItems);
//     onAddToCart();
//     onClose();
//   };

//   const handleCancel = () => {
//     setLocalItems(currentItems); // Reset to original items
//     onClose();
//   };

//   // Filter items based on search query
//   const filteredSuggestedItems = suggestedItems.filter(item => 
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent={false}
//     >
//       <SafeAreaView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
//             <Ionicons name="arrow-back" size={24} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Add More Items</Text>
//           <View style={styles.placeholder} />
//         </View>

//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search for dishes..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#999"
//           />
//         </View>

//         <ScrollView style={styles.scrollView}>
//           {/* Current Cart Section */}
//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Your Current Cart</Text>
//             {localItems.length === 0 ? (
//               <Text style={styles.emptyCartText}>Your cart is empty</Text>
//             ) : (
//               localItems.map((item) => (
//                 <View key={item.id} style={styles.itemCard}>
//                   <View style={styles.itemDetails}>
//                     <Text style={styles.itemName}>{item.name}</Text>
//                     <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
//                   </View>
//                   <View style={styles.quantityControl}>
//                     <TouchableOpacity 
//                       style={styles.quantityButton}
//                       onPress={() => updateItemQuantity(item.id, -1)}
//                     >
//                       <Text style={styles.quantityButtonText}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.quantityText}>{item.quantity}</Text>
//                     <TouchableOpacity 
//                       style={styles.quantityButton}
//                       onPress={() => updateItemQuantity(item.id, 1)}
//                     >
//                       <Text style={styles.quantityButtonText}>+</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))
//             )}
//           </View>

//           {/* Suggested Items Section */}
//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Suggested Items</Text>
//             {filteredSuggestedItems.length === 0 ? (
//               <Text style={styles.noResultsText}>No items found for "{searchQuery}"</Text>
//             ) : (
//               filteredSuggestedItems.map((item) => {
//                 const isInCart = localItems.some(i => i.id === item.id && i.quantity > 0);
                
//                 return (
//                   <View key={item.id} style={styles.suggestedItemCard}>
//                     {item.image && (
//                       <Image source={{ uri: item.image }} style={styles.itemImage} />
//                     )}
//                     <View style={styles.itemDetails}>
//                       <Text style={styles.itemName}>{item.name}</Text>
//                       <Text style={styles.itemCategory}>{item.category}</Text>
//                       <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
//                     </View>
//                     {isInCart ? (
//                       <View style={styles.quantityControl}>
//                         <TouchableOpacity 
//                           style={styles.quantityButton}
//                           onPress={() => updateItemQuantity(item.id, -1)}
//                         >
//                           <Text style={styles.quantityButtonText}>-</Text>
//                         </TouchableOpacity>
//                         <Text style={styles.quantityText}>
//                           {localItems.find(i => i.id === item.id)?.quantity || 0}
//                         </Text>
//                         <TouchableOpacity 
//                           style={styles.quantityButton}
//                           onPress={() => updateItemQuantity(item.id, 1)}
//                         >
//                           <Text style={styles.quantityButtonText}>+</Text>
//                         </TouchableOpacity>
//                       </View>
//                     ) : (
//                       <TouchableOpacity 
//                         style={styles.addButton}
//                         onPress={() => addNewItem(item)}
//                       >
//                         <Text style={styles.addButtonText}>Add</Text>
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 );
//               })
//             )}
//           </View>
//         </ScrollView>

//         {/* Bottom checkout bar */}
//         <View style={styles.checkoutBar}>
//           <View style={styles.totalContainer}>
//             <Text style={styles.totalItems}>{getTotalItems()} items</Text>
//             <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
//           </View>
//           <TouchableOpacity style={styles.checkoutButton} onPress={handleSave}>
//             <Text style={styles.checkoutButtonText}>Add to Cart</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </Modal>
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
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   closeButton: {
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2.2),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#333',
//   },
//   placeholder: {
//     width: 24,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     marginHorizontal: 16,
//     marginVertical: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontFamily: 'Poppins-Regular',
//     fontSize: RFPercentage(1.8),
//     padding: 0,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   sectionContainer: {
//     padding: 16,
//     borderBottomWidth: 8,
//     borderBottomColor: '#f5f5f5',
//   },
//   sectionTitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#333',
//     marginBottom: 12,
//   },
//   emptyCartText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: RFPercentage(1.8),
//     color: '#999',
//     textAlign: 'center',
//     paddingVertical: 16,
//   },
//   noResultsText: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: RFPercentage(1.8),
//     color: '#999',
//     textAlign: 'center',
//     paddingVertical: 16,
//   },
//   itemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   suggestedItemCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 6,
//     marginRight: 10,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: RFPercentage(1.8),
//     color: '#333',
//   },
//   itemCategory: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: RFPercentage(1.6),
//     color: '#888',
//     marginTop: 2,
//   },
//   itemPrice: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: RFPercentage(1.8),
//     color: '#01615F',
//     marginTop: 4,
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#01615F',
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   quantityButton: {
//     backgroundColor: '#01615F',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 28,
//     height: 28,
//   },
//   quantityButtonText: {
//     color: 'white',
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Medium',
//   },
//   quantityText: {
//     paddingHorizontal: 12,
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//     color: '#333',
//   },
//   addButton: {
//     backgroundColor: '#01615F',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 4,
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Medium',
//   },
//   checkoutBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     backgroundColor: 'white',
//   },
//   totalContainer: {
//     flex: 1,
//   },
//   totalItems: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: RFPercentage(1.6),
//     color: '#666',
//   },
//   totalPrice: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: RFPercentage(2),
//     color: '#01615F',
//   },
//   checkoutButton: {
//     backgroundColor: '#01615F',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 6,
//   },
//   checkoutButtonText: {
//     color: 'white',
//     fontFamily: 'Poppins-Medium',
//     fontSize: RFPercentage(1.8),
//   },
// });

// export default AddMoreItemsModal;





















// Modified AddMoreItemsModal.tsx component
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Define the item type
interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  category?: string;
}

interface AddMoreItemsModalProps {
  visible: boolean;
  onClose: () => void;
  currentItems: Item[];
  onUpdateItems: (items: Item[]) => void;
  onAddToCart: () => void;
  restaurantId?: string;
}

const AddMoreItemsModal: React.FC<AddMoreItemsModalProps> = ({
  visible,
  onClose,
  currentItems,
  onUpdateItems,
  onAddToCart,
  restaurantId
}) => {
  const router = useRouter();
  
  const navigateToRestaurantSelect = () => {
    // Serialize the current cart items to pass to the restaurant select screen
    const cartItemsParam = JSON.stringify(currentItems);
    
    // Navigate to the restaurant select screen with the cart items
    router.push({
      pathname: '/Screens/DishesSearch',
      params: { 
        restaurantId: restaurantId || '',
        cartItems: cartItemsParam
      }
    });
    
    // Close the modal after navigation
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Your Cart</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              {currentItems.length > 0 ? (
                <FlatList
                  data={currentItems}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${item.price.toFixed(2)} × {item.quantity}</Text>
                      </View>
                      <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                  )}
                  style={styles.itemsList}
                />
              ) : (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
              )}
              
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={navigateToRestaurantSelect}
              >
                <Text style={styles.addMoreButtonText}>Add More Items</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.continueButton}
                onPress={onClose}
              >
                <Text style={styles.continueButtonText}>Continue with current items</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: RFPercentage(2.4),
    fontFamily: 'Poppins-SemiBold',
    color: '#01615F',
  },
  closeButton: {
    fontSize: RFPercentage(2.4),
    color: '#777',
  },
  itemsList: {
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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
  emptyCartText: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Regular',
    color: '#777',
    textAlign: 'center',
    paddingVertical: 20,
  },
  addMoreButton: {
    backgroundColor: '#01615F',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addMoreButtonText: {
    color: 'white',
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
  },
  continueButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#01615F',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#01615F',
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
  },
});

export default AddMoreItemsModal;