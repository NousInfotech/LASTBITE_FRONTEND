// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   FlatList, 
//   Image,
//   ScrollView,
//   SafeAreaView
// } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import GoBack from '@/components/GoBack';
// import SearchBarVoice from '@/components/SearchBarVoice';

// // Define interfaces for our data types
// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
//   image?: string;
//   category?: string;
// }

// interface AddMoreItemsProps {
//   items?: Item[]; 
//   setItems: React.Dispatch<React.SetStateAction<Item[]>>;
//   navigation?: any;
// }

// interface MenuItem {
//   menuItemId: number;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   restaurantId: string;
//   image: string;
//   isAvailable: boolean;
// }

// // Mock menu items for display
// const mockMenuItems: MenuItem[] = [
//   {
//     menuItemId: 1,
//     name: "Chicken Biryani",
//     description: "Aromatic basmati rice cooked with tender chicken and spices.",
//     price: 12.99,
//     category: "Biryani",
//     restaurantId: "r1",
//     image: "https://via.placeholder.com/150",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 2,
//     name: "Gulab Jamun",
//     description: "Delicious deep-fried dumplings soaked in sugar syrup.",
//     price: 4.99,
//     category: "Desserts",
//     restaurantId: "r1",
//     image: "https://via.placeholder.com/150",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 3,
//     name: "Paneer Tikka",
//     description: "Soft paneer cubes marinated in spices and grilled to perfection.",
//     price: 9.99,
//     category: "North Indian",
//     restaurantId: "r1",
//     image: "https://via.placeholder.com/150",
//     isAvailable: true,
//   },
//   {
//     menuItemId: 4,
//     name: "Grilled Chicken",
//     description: "Juicy chicken grilled with herbs and spices.",
//     price: 14.99,
//     category: "Grill",
//     restaurantId: "r2",
//     image: "https://via.placeholder.com/150",
//     isAvailable: true,
//   },
// ];

// const AddMoreItems: React.FC<AddMoreItemsProps> = ({ items = [], setItems }) => {
//   const router = useRouter();
//   const { restaurantId, restaurantName } = useLocalSearchParams<{ restaurantId: string, restaurantName: string }>();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Biryani', 'Desserts', 'North Indian', 'Grill']));
  
//   // Group menu items by category
//   const menuCategories = Array.from(new Set(menuItems.map(item => item.category)));
  
//   // Filter menu items based on search query
//   const filteredMenuItems = searchQuery
//     ? menuItems.filter(item => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.description.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : menuItems;

//   const toggleCategory = (category: string) => {
//     setExpandedCategories(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(category)) {
//         newSet.delete(category);
//       } else {
//         newSet.add(category);
//       }
//       return newSet;
//     });
//   };

//   // Add an item to cart
//   const handleAddItem = (menuItem: MenuItem) => {
//     const existingItemIndex = items.findIndex(item => item.id === menuItem.menuItemId);
    
//     if (existingItemIndex !== -1) {
//       // Item already exists, increment quantity
//       const updatedItems = [...items];
//       updatedItems[existingItemIndex].quantity += 1;
//       setItems(updatedItems);
//     } else {
//       // Add new item
//       const newItem: Item = {
//         id: menuItem.menuItemId,
//         name: menuItem.name,
//         price: menuItem.price,
//         quantity: 1,
//         image: menuItem.image,
//         category: menuItem.category
//       };
//       setItems([...items, newItem]);
//     }
//   };

//   // Remove an item from cart
//   const handleRemoveItem = (id: number) => {
//     const existingItemIndex = items.findIndex(item => item.id === id);
    
//     if (existingItemIndex !== -1) {
//       const updatedItems = [...items];
//       if (updatedItems[existingItemIndex].quantity > 1) {
//         // Decrement quantity if more than 1
//         updatedItems[existingItemIndex].quantity -= 1;
//         setItems(updatedItems);
//       } else {
//         // Remove item if quantity is 1
//         setItems(updatedItems.filter(item => item.id !== id));
//       }
//     }
//   };

//   // Get the quantity of an item in the cart
//   const getItemQuantity = (menuItemId: number): number => {
//     const existingItem = items.find(item => item.id === menuItemId);
//     return existingItem ? existingItem.quantity : 0;
//   };

//   const renderMenuItem = (menuItem: MenuItem) => {
//     const quantity = getItemQuantity(menuItem.menuItemId);

//     return (
//       <View key={menuItem.menuItemId} style={styles.menuCard}>
//         <Image 
//           source={{ uri: menuItem.image }} 
//           style={styles.menuImage} 
//         />
//         <View style={styles.menuDetails}>
//           <Text style={styles.menuName}>{menuItem.name}</Text>
//           <Text style={styles.menuCategory}>{menuItem.category}</Text>
//           <Text style={styles.menuPrice}>${menuItem.price.toFixed(2)}</Text>
//         </View>
//         <View style={styles.addButtonContainer}>
//           {quantity === 0 ? (
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => handleAddItem(menuItem)}
//             >
//               <Text style={styles.addButtonText}>Add</Text>
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.counterContainer}>
//               <TouchableOpacity
//                 style={styles.minusButton}
//                 onPress={() => handleRemoveItem(menuItem.menuItemId)}
//               >
//                 <Text style={styles.addButtonText}>-</Text>
//               </TouchableOpacity>
//               <Text style={styles.counterText}>{quantity}</Text>
//               <TouchableOpacity
//                 style={styles.plusButton}
//                 onPress={() => handleAddItem(menuItem)}
//               >
//                 <Text style={styles.addButtonText}>+</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   // Render existing cart items section
//   const renderCartItems = () => {
//     if (items.length === 0) {
//       return (
//         <View style={styles.emptyCartContainer}>
//           <Text style={styles.emptyCartText}>Your cart is empty</Text>
//         </View>
//       );
//     }

//     return (
//       <View style={styles.cartItemsContainer}>
//         <Text style={styles.sectionTitle}>Your Cart Items</Text>
//         {items.map(item => (
//           <View key={item.id} style={styles.cartItemCard}>
//             <View style={styles.cartItemDetails}>
//               <Text style={styles.cartItemName}>{item.name}</Text>
//               <Text style={styles.cartItemPrice}>${item.price.toFixed(2)} × {item.quantity}</Text>
//             </View>
//             <View style={styles.counterContainer}>
//               <TouchableOpacity
//                 style={styles.minusButton}
//                 onPress={() => handleRemoveItem(item.id)}
//               >
//                 <Text style={styles.addButtonText}>-</Text>
//               </TouchableOpacity>
//               <Text style={styles.counterText}>{item.quantity}</Text>
//               <TouchableOpacity
//                 style={styles.plusButton}
//                 onPress={() => handleAddItem(mockMenuItems.find(m => m.menuItemId === item.id) as MenuItem)}
//               >
//                 <Text style={styles.addButtonText}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   // Calculate total amount with safe default
//   const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <GoBack />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Add More Items</Text>
//       </View>
      
//       <SearchBarVoice
//         redirectTargets={["Dishes"]}
//         placeholder={`Search dishes to add`}
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Display already added items */}
//         {renderCartItems()}

//         {/* Add horizontal line separator */}
//         <View style={styles.separator} />

//         {/* Display menu items */}
//         <Text style={styles.sectionTitle}>Add More Items</Text>
        
//         {menuCategories.map(category => (
//           <View key={category}>
//             <TouchableOpacity
//               style={styles.categoryChip}
//               onPress={() => toggleCategory(category)}
//             >
//               <Text style={styles.categoryText}>{category}</Text>
//               <Ionicons
//                 name={expandedCategories.has(category) ? "caret-up" : "caret-down"}
//                 size={16}
//                 color="grey"
//               />
//             </TouchableOpacity>
            
//             {expandedCategories.has(category) &&
//               filteredMenuItems
//                 .filter(menuItem => menuItem.category === category)
//                 .map(menuItem => renderMenuItem(menuItem))}
//           </View>
//         ))}
//       </ScrollView>

//       {/* Checkout button at bottom */}
//       <View style={styles.checkoutContainer}>
//         <View style={styles.totalContainer}>
//           <Text style={styles.totalText}>Total:</Text>
//           <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.checkoutButton}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.checkoutButtonText}>Done</Text>
//         </TouchableOpacity>
//       </View>
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
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2.2),
//     fontFamily: 'Poppins-SemiBold',
//     marginLeft: 12,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 100,
//   },
//   sectionTitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//     marginHorizontal: 20,
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyCartContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   emptyCartText: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//     color: '#666',
//   },
//   cartItemsContainer: {
//     marginBottom: 16,
//   },
//   cartItemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     marginHorizontal: 20,
//     marginVertical: 4,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 8,
//   },
//   cartItemDetails: {
//     flex: 1,
//   },
//   cartItemName: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//     color: '#333',
//   },
//   cartItemPrice: {
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Regular',
//     color: '#666',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginHorizontal: 20,
//     marginVertical: 16,
//   },
//   categoryChip: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     marginVertical: 8,
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryText: {
//     fontSize: RFPercentage(1.8),
//     color: '#333',
//     fontFamily: 'Poppins-Medium',
//   },
//   menuCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     marginHorizontal: 20,
//     marginVertical: 4,
//     padding: 10,
//     backgroundColor: '#EFFFF4',
//   },
//   menuImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   menuDetails: {
//     flex: 1,
//   },
//   menuName: {
//     fontSize: RFPercentage(1.8),
//     color: '#333',
//     fontFamily: 'Poppins-SemiBold',
//   },
//   menuCategory: {
//     fontSize: RFPercentage(1.3),
//     color: '#777',
//     marginVertical: 2,
//     fontFamily: 'Poppins-Regular',
//   },
//   menuPrice: {
//     fontSize: RFPercentage(1.8),
//     color: '#01615F',
//     fontFamily: 'Poppins-Medium',
//   },
//   addButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   counterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   minusButton: {
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     backgroundColor: '#01615F',
//     borderRadius: 4,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusButton: {
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     backgroundColor: '#01615F',
//     borderRadius: 4,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   counterText: {
//     fontSize: RFPercentage(1.6),
//     marginHorizontal: 10,
//     color: 'black',
//     fontFamily: 'Poppins-Regular',
//   },
//   addButton: {
//     backgroundColor: '#01615F',
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: RFPercentage(1.4),
//     fontFamily: 'Poppins-Regular',
//   },
//   checkoutContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   totalContainer: {
//     flex: 1,
//   },
//   totalText: {
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Regular',
//     color: '#666',
//   },
//   totalAmount: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#01615F',
//   },
//   checkoutButton: {
//     backgroundColor: '#01615F',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   checkoutButtonText: {
//     color: 'white',
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//   },
// });

// export default AddMoreItems;













// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   SafeAreaView,
//   TextInput,
// } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { RFPercentage } from 'react-native-responsive-fontsize';

// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
//   image?: string;
//   category?: string;
// }

// interface AddMoreItemsProps {
//   items: Item[];
//   setItems: React.Dispatch<React.SetStateAction<Item[]>>;
// }

// interface MenuItem {
//   menuItemId: number;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   restaurantId: string;
//   image: string;
//   isAvailable: boolean;
// }

// const mockMenuItems: MenuItem[] = [
//   {
//     menuItemId: 1,
//     name: 'Chicken Biryani',
//     description: 'Aromatic basmati rice cooked with tender chicken and spices.',
//     price: 12.99,
//     category: 'Biryani',
//     restaurantId: 'r1',
//     image: 'https://via.placeholder.com/150',
//     isAvailable: true,
//   },
//   {
//     menuItemId: 2,
//     name: 'Gulab Jamun',
//     description: 'Delicious deep-fried dumplings soaked in sugar syrup.',
//     price: 4.99,
//     category: 'Desserts',
//     restaurantId: 'r1',
//     image: 'https://via.placeholder.com/150',
//     isAvailable: true,
//   },
//   {
//     menuItemId: 3,
//     name: 'Paneer Tikka',
//     description: 'Soft paneer cubes marinated in spices and grilled to perfection.',
//     price: 9.99,
//     category: 'North Indian',
//     restaurantId: 'r1',
//     image: 'https://via.placeholder.com/150',
//     isAvailable: true,
//   },
//   {
//     menuItemId: 4,
//     name: 'Grilled Chicken',
//     description: 'Juicy chicken grilled with herbs and spices.',
//     price: 14.99,
//     category: 'Grill',
//     restaurantId: 'r2',
//     image: 'https://via.placeholder.com/150',
//     isAvailable: true,
//   },
// ];

// const AddMoreItems: React.FC<AddMoreItemsProps> = ({ items = [], setItems }) => {
//   const router = useRouter();
//   const { restaurantId, restaurantName } = useLocalSearchParams<{
//     restaurantId: string;
//     restaurantName: string;
//   }>();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [menuItems] = useState<MenuItem[]>(mockMenuItems);
//   const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
//     new Set(['Biryani', 'Desserts', 'North Indian', 'Grill'])
//   );

//   const toggleCategory = (category: string) => {
//     setExpandedCategories((prev) => {
//       const newSet = new Set(prev);
//       newSet.has(category) ? newSet.delete(category) : newSet.add(category);
//       return newSet;
//     });
//   };

//   const handleAddItem = (menuItem: MenuItem) => {
//     const existingItemIndex = items.findIndex((item) => item.id === menuItem.menuItemId);
//     if (existingItemIndex !== -1) {
//       const updatedItems = [...items];
//       updatedItems[existingItemIndex].quantity += 1;
//       setItems(updatedItems);
//     } else {
//       const newItem: Item = {
//         id: menuItem.menuItemId,
//         name: menuItem.name,
//         price: menuItem.price,
//         quantity: 1,
//         image: menuItem.image,
//         category: menuItem.category,
//       };
//       setItems([...items, newItem]);
//     }
//   };

//   const handleRemoveItem = (id: number) => {
//     const index = items.findIndex((item) => item.id === id);
//     if (index !== -1) {
//       const updated = [...items];
//       if (updated[index].quantity > 1) {
//         updated[index].quantity -= 1;
//         setItems(updated);
//       } else {
//         setItems(updated.filter((item) => item.id !== id));
//       }
//     }
//   };

//   const getItemQuantity = (menuItemId: number): number => {
//     const found = items.find((item) => item.id === menuItemId);
//     return found ? found.quantity : 0;
//   };

//   const filteredMenuItems = searchQuery
//     ? menuItems.filter((item) => {
//         const searchableText = `${item.name} ${item.category} ${item.description}`.toLowerCase();
//         return searchableText.includes(searchQuery.toLowerCase());
//       })
//     : menuItems;

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.headerTitle}>Add More Items</Text>

        

//         {Array.from(new Set(filteredMenuItems.map((item) => item.category))).map((category) => (
//           <View key={category}>
//             <TouchableOpacity
//               onPress={() => toggleCategory(category)}
//               style={styles.categoryChip}
//             >
//               <Text style={styles.categoryText}>{category}</Text>
//               <Text>{expandedCategories.has(category) ? '-' : '+'}</Text>
//             </TouchableOpacity>

//             {expandedCategories.has(category) &&
//               filteredMenuItems
//                 .filter((item) => item.category === category)
//                 .map((menuItem) => (
//                   <View key={menuItem.menuItemId} style={styles.menuCard}>
//                     <Image source={{ uri: menuItem.image }} style={styles.menuImage} />
//                     <View style={styles.menuDetails}>
//                       <Text style={styles.menuName}>{menuItem.name}</Text>
//                       <Text style={styles.menuPrice}>${menuItem.price.toFixed(2)}</Text>
//                     </View>
//                     <View style={styles.addButtonContainer}>
//                       {getItemQuantity(menuItem.menuItemId) === 0 ? (
//                         <TouchableOpacity
//                           style={styles.addButton}
//                           onPress={() => handleAddItem(menuItem)}
//                         >
//                           <Text style={styles.addButtonText}>Add</Text>
//                         </TouchableOpacity>
//                       ) : (
//                         <View style={styles.counterContainer}>
//                           <TouchableOpacity
//                             style={styles.minusButton}
//                             onPress={() => handleRemoveItem(menuItem.menuItemId)}
//                           >
//                             <Text style={styles.addButtonText}>-</Text>
//                           </TouchableOpacity>
//                           <Text style={styles.counterText}>
//                             {getItemQuantity(menuItem.menuItemId)}
//                           </Text>
//                           <TouchableOpacity
//                             style={styles.plusButton}
//                             onPress={() => handleAddItem(menuItem)}
//                           >
//                             <Text style={styles.addButtonText}>+</Text>
//                           </TouchableOpacity>
//                         </View>
//                       )}
//                     </View>
//                   </View>
//                 ))}
//           </View>
//         ))}
//       </ScrollView>
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
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2.2),
//     fontFamily: 'Poppins-SemiBold',
//     marginLeft: 12,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 100,
//   },
//   sectionTitle: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//     marginHorizontal: 20,
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyCartContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   emptyCartText: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//     color: '#666',
//   },
//   cartItemsContainer: {
//     marginBottom: 16,
//   },
//   cartItemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     marginHorizontal: 20,
//     marginVertical: 4,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 8,
//   },
//   cartItemDetails: {
//     flex: 1,
//   },
//   cartItemName: {
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//     color: '#333',
//   },
//   cartItemPrice: {
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Regular',
//     color: '#666',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginHorizontal: 20,
//     marginVertical: 16,
//   },
//   categoryChip: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     marginVertical: 8,
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryText: {
//     fontSize: RFPercentage(1.8),
//     color: '#333',
//     fontFamily: 'Poppins-Medium',
//   },
//   menuCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     marginHorizontal: 20,
//     marginVertical: 4,
//     padding: 10,
//     backgroundColor: '#EFFFF4',
//   },
//   menuImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   menuDetails: {
//     flex: 1,
//   },
//   menuName: {
//     fontSize: RFPercentage(1.8),
//     color: '#333',
//     fontFamily: 'Poppins-SemiBold',
//   },
//   menuCategory: {
//     fontSize: RFPercentage(1.3),
//     color: '#777',
//     marginVertical: 2,
//     fontFamily: 'Poppins-Regular',
//   },
//   menuPrice: {
//     fontSize: RFPercentage(1.8),
//     color: '#01615F',
//     fontFamily: 'Poppins-Medium',
//   },
//   addButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   counterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   minusButton: {
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     backgroundColor: '#01615F',
//     borderRadius: 4,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   plusButton: {
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     backgroundColor: '#01615F',
//     borderRadius: 4,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   counterText: {
//     fontSize: RFPercentage(1.6),
//     marginHorizontal: 10,
//     color: 'black',
//     fontFamily: 'Poppins-Regular',
//   },
//   addButton: {
//     backgroundColor: '#01615F',
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: RFPercentage(1.4),
//     fontFamily: 'Poppins-Regular',
//   },
//   checkoutContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   totalContainer: {
//     flex: 1,
//   },
//   totalText: {
//     fontSize: RFPercentage(1.6),
//     fontFamily: 'Poppins-Regular',
//     color: '#666',
//   },
//   totalAmount: {
//     fontSize: RFPercentage(2),
//     fontFamily: 'Poppins-SemiBold',
//     color: '#01615F',
//   },
//   checkoutButton: {
//     backgroundColor: '#01615F',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   checkoutButtonText: {
//     color: 'white',
//     fontSize: RFPercentage(1.8),
//     fontFamily: 'Poppins-Medium',
//   },
// });

// export default AddMoreItems;





import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  category?: string;
}

interface AddMoreItemsProps {
  route?: {
    params: {
      items: Item[];
      updateItems: React.Dispatch<React.SetStateAction<Item[]>>;
    }
  };
  items?: Item[];
  setItems?: React.Dispatch<React.SetStateAction<Item[]>>;
}

interface MenuItem {
  menuItemId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: string;
  image: string;
  isAvailable: boolean;
}

const mockMenuItems: MenuItem[] = [
  {
    menuItemId: 1,
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and spices.',
    price: 12.99,
    category: 'Biryani',
    restaurantId: 'r1',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
  {
    menuItemId: 2,
    name: 'Gulab Jamun',
    description: 'Delicious deep-fried dumplings soaked in sugar syrup.',
    price: 4.99,
    category: 'Desserts',
    restaurantId: 'r1',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
  {
    menuItemId: 3,
    name: 'Paneer Tikka',
    description: 'Soft paneer cubes marinated in spices and grilled to perfection.',
    price: 9.99,
    category: 'North Indian',
    restaurantId: 'r1',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
  {
    menuItemId: 4,
    name: 'Grilled Chicken',
    description: 'Juicy chicken grilled with herbs and spices.',
    price: 14.99,
    category: 'Grill',
    restaurantId: 'r2',
    image: 'https://via.placeholder.com/150',
    isAvailable: true,
  },
];

const AddMoreItems: React.FC<AddMoreItemsProps> = (props) => {
  const router = useRouter();
  const { restaurantId, restaurantName } = useLocalSearchParams<{
    restaurantId: string;
    restaurantName: string;
  }>();
  
  // Handle both direct props and route params for maximum compatibility
  let currentItems: Item[] = [];
  let setCurrentItems: React.Dispatch<React.SetStateAction<Item[]>> | null = null;
  
  // Check if we have route params
  if (props.route?.params) {
    currentItems = props.route.params.items || [];
    setCurrentItems = props.route.params.updateItems;
  } 
  // If not, use the direct props
  else {
    currentItems = props.items || [];
    setCurrentItems = props.setItems || null;
  }
  
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems] = useState<MenuItem[]>(mockMenuItems);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Biryani', 'Desserts', 'North Indian', 'Grill'])
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(category) ? newSet.delete(category) : newSet.add(category);
      return newSet;
    });
  };

  const handleAddItem = (menuItem: MenuItem) => {
    if (!setCurrentItems) return;
    
    const existingItemIndex = currentItems.findIndex((item) => item.id === menuItem.menuItemId);
    if (existingItemIndex !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCurrentItems(updatedItems);
    } else {
      const newItem: Item = {
        id: menuItem.menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        image: menuItem.image,
        category: menuItem.category,
      };
      setCurrentItems([...currentItems, newItem]);
    }
  };

  const handleRemoveItem = (id: number) => {
    if (!setCurrentItems) return;
    
    const index = currentItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updated = [...currentItems];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
        setCurrentItems(updated);
      } else {
        setCurrentItems(updated.filter((item) => item.id !== id));
      }
    }
  };

  const getItemQuantity = (menuItemId: number): number => {
    const found = currentItems.find((item) => item.id === menuItemId);
    return found ? found.quantity : 0;
  };

  const filteredMenuItems = searchQuery
    ? menuItems.filter((item) => {
        const searchableText = `${item.name} ${item.category} ${item.description}`.toLowerCase();
        return searchableText.includes(searchQuery.toLowerCase());
      })
    : menuItems;

  // Added search input field
  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Add More Items</Text>
        
        {renderSearchBar()}

        {Array.from(new Set(filteredMenuItems.map((item) => item.category))).map((category) => (
          <View key={category}>
            <TouchableOpacity
              onPress={() => toggleCategory(category)}
              style={styles.categoryChip}
            >
              <Text style={styles.categoryText}>{category}</Text>
              <Text>{expandedCategories.has(category) ? '-' : '+'}</Text>
            </TouchableOpacity>

            {expandedCategories.has(category) &&
              filteredMenuItems
                .filter((item) => item.category === category)
                .map((menuItem) => (
                  <View key={menuItem.menuItemId} style={styles.menuCard}>
                    <Image source={{ uri: menuItem.image }} style={styles.menuImage} />
                    <View style={styles.menuDetails}>
                      <Text style={styles.menuName}>{menuItem.name}</Text>
                      <Text style={styles.menuPrice}>${menuItem.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.addButtonContainer}>
                      {getItemQuantity(menuItem.menuItemId) === 0 ? (
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => handleAddItem(menuItem)}
                        >
                          <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.counterContainer}>
                          <TouchableOpacity
                            style={styles.minusButton}
                            onPress={() => handleRemoveItem(menuItem.menuItemId)}
                          >
                            <Text style={styles.addButtonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.counterText}>
                            {getItemQuantity(menuItem.menuItemId)}
                          </Text>
                          <TouchableOpacity
                            style={styles.plusButton}
                            onPress={() => handleAddItem(menuItem)}
                          >
                            <Text style={styles.addButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
          </View>
        ))}
      </ScrollView>
      
      {/* Optional: Add a bottom bar for Done/Back button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => router.back()}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: RFPercentage(2.2),
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 12,
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  cartItemsContainer: {
    marginBottom: 16,
  },
  cartItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 4,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: RFPercentage(1.6),
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginVertical: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: RFPercentage(1.8),
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 10,
    backgroundColor: '#EFFFF4',
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: RFPercentage(1.8),
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  menuCategory: {
    fontSize: RFPercentage(1.3),
    color: '#777',
    marginVertical: 2,
    fontFamily: 'Poppins-Regular',
  },
  menuPrice: {
    fontSize: RFPercentage(1.8),
    color: '#01615F',
    fontFamily: 'Poppins-Medium',
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minusButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#01615F',
    borderRadius: 4,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#01615F',
    borderRadius: 4,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: RFPercentage(1.6),
    marginHorizontal: 10,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    backgroundColor: '#01615F',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: RFPercentage(1.4),
    fontFamily: 'Poppins-Regular',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#01615F',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: RFPercentage(1.8),
    fontFamily: 'Poppins-Medium',
  },
});

export default AddMoreItems;