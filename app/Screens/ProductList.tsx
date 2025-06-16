// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter, useLocalSearchParams } from 'expo-router';

// // Realistic grocery mock data with quantity added
// const GROCERY_DATA = [
//   { id: '1', name: 'Fresh Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$2.99', weight: '1 lb', quantity: 15 },
//   { id: '2', name: 'Organic Broccoli', category: 'Vegetables', image: require('../../assets/images/Broccoli.png'), price: '$3.49', weight: '1 bunch', quantity: 8 },
//   { id: '3', name: 'Red Apples', category: 'Fruits', image: require('../../assets/images/Apple.png'), price: '$1.99', weight: '1 lb', quantity: 20 },
//   { id: '4', name: 'Naval Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$3.29', weight: '2 lb', quantity: 0 },
//   { id: '5', name: 'Broccoli Florets', category: 'Vegetables', image: require('../../assets/images/Broccoli.png'), price: '$2.99', weight: '8 oz', quantity: 12 },
//   { id: '6', name: 'Green Apples', category: 'Fruits', image: require('../../assets/images/Apple.png'), price: '$2.19', weight: '1 lb', quantity: 25 },
//   { id: '7', name: 'Blood Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$3.99', weight: '1 lb', quantity: 5 },
//   { id: '8', name: 'Baby Broccoli', category: 'Vegetables', image: require('../../assets/images/Broccoli.png'), price: '$3.89', weight: '6 oz', quantity: 9 },
//   { id: '9', name: 'Honeycrisp Apples', category: 'Fruits', image: require('../../assets/images/Apple.png'), price: '$2.79', weight: '1 lb', quantity: 18 },
//   { id: '10', name: 'Mandarin Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$4.99', weight: '2 lb bag', quantity: 7 },
//   // ... rest of the data
// ];

// // Create a separate file for this data in your project
// // Export the grocery data so it can be imported in checkoutPageNavigation
// export { GROCERY_DATA };

// export default function ProductList() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredItems, setFilteredItems] = useState(GROCERY_DATA);
//   const [currentCategory, setCurrentCategory] = useState('All');
//   const [cartItems, setCartItems] = useState({});
//   const router = useRouter();
//   const params = useLocalSearchParams();
  
//   // Calculate total number of items in cart
//   const totalCartItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
  
//   // Categories for filtering
//   const categories = ['All', 'Fruits', 'Vegetables'];

//   // Load cart items from params if coming from checkout page
//   useEffect(() => {
//     if (params.existingCart) {
//       try {
//         const existingCartItems = JSON.parse(decodeURIComponent(params.existingCart));
//         setCartItems(existingCartItems);
//       } catch (error) {
//         console.error("Error parsing existing cart items:", error);
//       }
//     }
//   }, [params.existingCart]);

//   // Filter items based on search query and category
//   useEffect(() => {
//     let results = GROCERY_DATA;
    
//     // Filter by category if not "All"
//     if (currentCategory !== 'All') {
//       results = results.filter(item => item.category === currentCategory);
//     }
    
//     // Filter by search query if it exists
//     if (searchQuery) {
//       const searchTerms = searchQuery.toLowerCase();
//       results = results.filter(item => 
//         item.name.toLowerCase().includes(searchTerms) || 
//         item.category.toLowerCase().includes(searchTerms)
//       );
//     }
    
//     setFilteredItems(results);
//   }, [searchQuery, currentCategory]);

//   const handleProductDetails = (item) => {
//     // We would normally pass item details to the product page
//     router.push('/Screens/ProductDetails');
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//   };
  
//   const handleAddToCart = (itemId) => {
//     // Find the item to check its quantity
//     const item = GROCERY_DATA.find(item => item.id === itemId);
    
//     // Only allow adding to cart if item has quantity > 0
//     if (item && item.quantity > 0) {
//       setCartItems(prevItems => {
//         const newItems = {...prevItems};
//         const currentQuantity = newItems[itemId] || 0;
        
//         // Make sure we don't add more than the available quantity
//         if (currentQuantity < item.quantity) {
//           newItems[itemId] = currentQuantity + 1;
//         }
        
//         return newItems;
//       });
//     }
//   };
  
//   const handleRemoveFromCart = (itemId) => {
//     setCartItems(prevItems => {
//       const newItems = {...prevItems};
//       if (newItems[itemId] > 0) {
//         newItems[itemId] -= 1;
//         // Remove the item from cart if quantity becomes 0
//         if (newItems[itemId] === 0) {
//           delete newItems[itemId];
//         }
//       }
//       return newItems;
//     });
//   };
  
//   const handleCheckout = () => {
//     // Prepare cart items to pass to checkout page
//     try {
//       // Check if there are items in the cart
//       if (Object.keys(cartItems).length === 0) {
//         return; // Don't navigate if cart is empty
//       }
      
//       // Encode cart items as query parameter
//       const cartItemsParam = encodeURIComponent(JSON.stringify(cartItems));
      
//       // Navigate to checkout page with cart items as URL parameter
//       router.push({
//         pathname: '/Screens/checkoutPageNavigation',
//         params: { cartItems: cartItemsParam }
//       });
//     } catch (error) {
//       console.error("Navigation error:", error);
//     }
//   };
  
//   const handleBackToHome = () => {
//     router.back();
//   };

//   const renderGroceryItem = ({ item }) => {
//     const isOutOfStock = item.quantity === 0;
    
//     return (
//       <View style={styles.itemContainer}>
//         <View style={styles.itemImageContainer}>
//           {!isOutOfStock && cartItems[item.id] ? (
//             <View style={styles.quantityControlContainer}>
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={() => handleRemoveFromCart(item.id)}
//               >
//                 <Ionicons name="remove" size={16} color="white" />
//               </TouchableOpacity>
//               <Text allowFontScaling={false}  style={styles.quantityText}>{cartItems[item.id]}</Text>
//               <TouchableOpacity
//                 style={styles.quantityButton}
//                 onPress={() => handleAddToCart(item.id)}
//               >
//                 <Ionicons name="add" size={16} color="white" />
//               </TouchableOpacity>
//             </View>
//           ) : (
//             !isOutOfStock && (
//               <TouchableOpacity 
//                 style={styles.addButton}
//                 onPress={() => handleAddToCart(item.id)}
//               >
//                 <Ionicons name="add" size={16} color="white" />
//               </TouchableOpacity>
//             )
//           )}
          
//           {isOutOfStock && (
//             <View style={styles.outOfStockBadge}>
//               <Text allowFontScaling={false}  style={styles.outOfStockText}>Out of Stock</Text>
//             </View>
//           )}
          
//           <TouchableOpacity onPress={() => handleProductDetails(item)}>
//             <Image 
//               source={item.image} 
//               style={styles.itemImage} 
//               onError={(e) => console.log("Image loading error:", e.nativeEvent.error)}
//             />
//             {isOutOfStock && (
//               <View style={styles.outOfStockOverlay} />
//             )}
//           </TouchableOpacity>
//         </View>
//         <Text allowFontScaling={false}  style={[
//           styles.itemName,
//           isOutOfStock && { color: '#888888' }
//         ]}>
//           {item.name}
//         </Text>
//         <Text allowFontScaling={false}  style={[
//           styles.itemPrice,
//           isOutOfStock && { color: '#AAAAAA' }
//         ]}>
//           {item.price} · {item.weight}
//         </Text>
        
//         {!isOutOfStock && (
//           <Text allowFontScaling={false}  style={styles.stockIndicator}>
//             In stock: {item.quantity}
//           </Text>
//         )}
//       </View>
//     );
//   };

//   const renderCategoryButton = (category) => (
//     <TouchableOpacity 
//       key={category}
//       style={[
//         styles.categoryButton,
//         currentCategory === category && styles.activeCategoryButton
//       ]}
//       onPress={() => setCurrentCategory(category)}
//     >
//       <Text allowFontScaling={false}  
//         style={[
//           styles.categoryText,
//           currentCategory === category && styles.activeCategoryText
//         ]}
//       >
//         {category}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text allowFontScaling={false}  style={styles.headerTitle}>Search groceries and essentials</Text>
//       </View>
      
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
//        <TextInput allowFontScaling={false} 
//           style={styles.searchInput}
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           placeholder="Search for items"
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={clearSearch}>
//             <Ionicons name="close-circle" size={20} color="gray" style={styles.clearIcon} />
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity>
//           <Ionicons name="filter" size={20} color="#01615F" style={styles.filterIcon} />
//         </TouchableOpacity>
//       </View>
      
//       <View style={styles.categoriesContainer}>
//         {categories.map(renderCategoryButton)}
//       </View>

//       {filteredItems.length === 0 ? (
//         <View style={styles.noResultsContainer}>
//           <Ionicons name="search-outline" size={60} color="#CCCCCC" />
//           <Text allowFontScaling={false}  style={styles.noResultsText}>No items match your search</Text>
//           <Text allowFontScaling={false}  style={styles.noResultsSubText}>Try different keywords or browse categories</Text>
//         </View>
//       ) : (
//         <View style={{flex: 1}}>
//           <FlatList
//             data={filteredItems}
//             renderItem={renderGroceryItem}
//             keyExtractor={(item) => item.id}
//             numColumns={3}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={[
//               styles.listContent,
//               totalCartItems > 0 && { paddingBottom: 80 } // Add padding if checkout bar is visible
//             ]}
//           />
          
//           {totalCartItems > 0 && (
//             <View style={styles.checkoutContainer}>
//               <TouchableOpacity 
//                 style={styles.checkoutButton}
//                 onPress={handleCheckout}
//               >
//                 <Text allowFontScaling={false}  style={styles.checkoutButtonText}>
//                   Checkout {totalCartItems > 1 ? `${totalCartItems} items` : '1 item'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     marginTop: 30,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginBottom: 8,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 8,
//     paddingHorizontal: 36,
//     marginRight: 8,
//     fontSize: 16,
//   },
//   searchIcon: {
//     position: 'absolute',
//     left: 26,
//     zIndex: 1,
//   },
//   clearIcon: {
//     marginHorizontal: 8,
//   },
//   filterIcon: {
//     marginLeft: 4,
//   },
//   categoriesContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   categoryButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 8,
//     backgroundColor: '#F5F5F5',
//   },
//   activeCategoryButton: {
//     backgroundColor: '#01615F',
//   },
//   categoryText: {
//     fontSize: 14,
//     color: '#555555',
//   },
//   activeCategoryText: {
//     color: 'white',
//     fontWeight: '500',
//   },
//   listContent: {
//     paddingHorizontal: 12,
//     paddingBottom: 16,
//   },
//   itemContainer: {
//     flex: 1/3,
//     padding: 4,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   itemImageContainer: {
//     position: 'relative',
//     width: '100%',
//     aspectRatio: 1,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#F5F5F5',
//   },
//   itemImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   addButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     backgroundColor: '#01615F',
//     width: 24,
//     height: 24,
//     borderRadius: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityControlContainer: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(1, 97, 95, 0.85)',
//     borderRadius: 16,
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//   },
//   quantityButton: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginHorizontal: 4,
//     minWidth: 16,
//     textAlign: 'center',
//   },
//   itemName: {
//     marginTop: 4,
//     fontSize: 12,
//     textAlign: 'center',
//     fontWeight: '500',
//   },
//   itemPrice: {
//     fontSize: 11,
//     color: '#666666',
//     textAlign: 'center',
//   },
//   stockIndicator: {
//     fontSize: 10,
//     color: '#01615F',
//     marginTop: 2,
//   },
//   outOfStockBadge: {
//     position: 'absolute',
//     top: '50%',
//     left: 0,
//     right: 0,
//     zIndex: 15,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     paddingVertical: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     transform: [{ translateY: -10 }],
//   },
//   outOfStockOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(92, 92, 92, 0.7)',
//     zIndex: 5,
//   },
//   outOfStockText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   noResultsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//   },
//   noResultsText: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginTop: 16,
//     color: '#555555',
//   },
//   noResultsSubText: {
//     fontSize: 14,
//     color: '#888888',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   checkoutContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 16,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   checkoutButton: {
//     backgroundColor: '#01615F',
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkoutButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });





import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Realistic grocery mock data with quantity added
const GROCERY_DATA = [
  { id: '1', name: 'Fresh Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$2.99', weight: '1 lb', quantity: 15 },
  { id: '2', name: 'Organic Broccoli', category: 'Vegetables', image: require('../../assets/images/Broccoli.png'), price: '$3.49', weight: '1 bunch', quantity: 8 },
  { id: '3', name: 'Red Apples', category: 'Fruits', image: require('../../assets/images/Apple.png'), price: '$1.99', weight: '1 lb', quantity: 20 },
  { id: '4', name: 'Naval Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$3.29', weight: '2 lb', quantity: 0 },
  { id: '5', name: 'Broccoli Florets', category: 'Vegetables', image: require('../../assets/images/Broccoli.png'), price: '$2.99', weight: '8 oz', quantity: 12 },
  { id: '6', name: 'Green Apples', category: 'Fruits', image: require('../../assets/images/Apple.png'), price: '$2.19', weight: '1 lb', quantity: 25 },
  { id: '7', name: 'Blood Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$3.99', weight: '1 lb', quantity: 5 },
  { id: '8', name: 'Baby Broccoli', category: 'Vegetables', image: require('../../assets/images/Broccoli.png'), price: '$3.89', weight: '6 oz', quantity: 9 },
  { id: '9', name: 'Honeycrisp Apples', category: 'Fruits', image: require('../../assets/images/Apple.png'), price: '$2.79', weight: '1 lb', quantity: 18 },
  { id: '10', name: 'Mandarin Oranges', category: 'Fruits', image: require('../../assets/images/Orange.png'), price: '$4.99', weight: '2 lb bag', quantity: 7 },
  // ... rest of the data
];

// Create a separate file for this data in your project
// Export the grocery data so it can be imported in checkoutPageNavigation
export { GROCERY_DATA };

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(GROCERY_DATA);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [cartItems, setCartItems] = useState({});
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Calculate total number of items in cart
  const totalCartItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
  
  // Categories for filtering
  const categories = ['All', 'Fruits', 'Vegetables'];

  // Load cart items from params if coming from checkout page
  useEffect(() => {
    if (params.existingCart) {
      try {
        const existingCartItems = JSON.parse(decodeURIComponent(params.existingCart));
        setCartItems(existingCartItems);
      } catch (error) {
        console.error("Error parsing existing cart items:", error);
      }
    }
  }, [params.existingCart]);

  // Filter items based on search query and category
  useEffect(() => {
    let results = GROCERY_DATA;
    
    // Filter by category if not "All"
    if (currentCategory !== 'All') {
      results = results.filter(item => item.category === currentCategory);
    }
    
    // Filter by search query if it exists
    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(searchTerms) || 
        item.category.toLowerCase().includes(searchTerms)
      );
    }
    
    setFilteredItems(results);
  }, [searchQuery, currentCategory]);

  const handleProductDetails = (item) => {
    // Pass item details including out of stock status to the product details page
    const isOutOfStock = item.quantity === 0;
    
    router.push({
      pathname: '/Screens/ProductDetails',
      params: {
        name: item.name,
        price: item.price,
        image: item.image,
        weight: item.weight,
        category: item.category,
        isOutOfStock: isOutOfStock.toString() // Convert boolean to string for params
      }
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const handleAddToCart = (itemId) => {
    // Find the item to check its quantity
    const item = GROCERY_DATA.find(item => item.id === itemId);
    
    // Only allow adding to cart if item has quantity > 0
    if (item && item.quantity > 0) {
      setCartItems(prevItems => {
        const newItems = {...prevItems};
        const currentQuantity = newItems[itemId] || 0;
        
        // Make sure we don't add more than the available quantity
        if (currentQuantity < item.quantity) {
          newItems[itemId] = currentQuantity + 1;
        }
        
        return newItems;
      });
    }
  };
  
  const handleRemoveFromCart = (itemId) => {
    setCartItems(prevItems => {
      const newItems = {...prevItems};
      if (newItems[itemId] > 0) {
        newItems[itemId] -= 1;
        // Remove the item from cart if quantity becomes 0
        if (newItems[itemId] === 0) {
          delete newItems[itemId];
        }
      }
      return newItems;
    });
  };
  
  const handleCheckout = () => {
    // Prepare cart items to pass to checkout page
    try {
      // Check if there are items in the cart
      if (Object.keys(cartItems).length === 0) {
        return; // Don't navigate if cart is empty
      }
      
      // Encode cart items as query parameter
      const cartItemsParam = encodeURIComponent(JSON.stringify(cartItems));
      
      // Navigate to checkout page with cart items as URL parameter
      router.push({
        pathname: '/Screens/checkoutPageNavigation',
        params: { cartItems: cartItemsParam }
      });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  
  const handleBackToHome = () => {
    router.back();
  };

  const renderGroceryItem = ({ item }) => {
    const isOutOfStock = item.quantity === 0;
    
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          {!isOutOfStock && cartItems[item.id] ? (
            <View style={styles.quantityControlContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleRemoveFromCart(item.id)}
              >
                <Ionicons name="remove" size={16} color="white" />
              </TouchableOpacity>
              <Text allowFontScaling={false}  style={styles.quantityText}>{cartItems[item.id]}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleAddToCart(item.id)}
              >
                <Ionicons name="add" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            !isOutOfStock && (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddToCart(item.id)}
              >
                <Ionicons name="add" size={16} color="white" />
              </TouchableOpacity>
            )
          )}
          
          {isOutOfStock && (
            <View style={styles.outOfStockBadge}>
              <Text allowFontScaling={false}  style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          
          <TouchableOpacity onPress={() => handleProductDetails(item)}>
            <Image 
              source={item.image} 
              style={styles.itemImage} 
              onError={(e) => console.log("Image loading error:", e.nativeEvent.error)}
            />
            {isOutOfStock && (
              <View style={styles.outOfStockOverlay} />
            )}
          </TouchableOpacity>
        </View>
        <Text allowFontScaling={false}  style={[
          styles.itemName,
          isOutOfStock && { color: '#888888' }
        ]}>
          {item.name}
        </Text>
        <Text allowFontScaling={false}  style={[
          styles.itemPrice,
          isOutOfStock && { color: '#AAAAAA' }
        ]}>
          {item.price} · {item.weight}
        </Text>
        
        {!isOutOfStock && (
          <Text allowFontScaling={false}  style={styles.stockIndicator}>
            In stock: {item.quantity}
          </Text>
        )}
      </View>
    );
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity 
      key={category}
      style={[
        styles.categoryButton,
        currentCategory === category && styles.activeCategoryButton
      ]}
      onPress={() => setCurrentCategory(category)}
    >
      <Text allowFontScaling={false}  
        style={[
          styles.categoryText,
          currentCategory === category && styles.activeCategoryText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text allowFontScaling={false}  style={styles.headerTitle}>Search groceries and essentials</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
       <TextInput allowFontScaling={false} 
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for items"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="gray" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Ionicons name="filter" size={20} color="#01615F" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoriesContainer}>
        {categories.map(renderCategoryButton)}
      </View>

      {filteredItems.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={60} color="#CCCCCC" />
          <Text allowFontScaling={false}  style={styles.noResultsText}>No items match your search</Text>
          <Text allowFontScaling={false}  style={styles.noResultsSubText}>Try different keywords or browse categories</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={filteredItems}
            renderItem={renderGroceryItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.listContent,
              totalCartItems > 0 && { paddingBottom: 80 } // Add padding if checkout bar is visible
            ]}
          />
          
          {totalCartItems > 0 && (
            <View style={styles.checkoutContainer}>
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text allowFontScaling={false}  style={styles.checkoutButtonText}>
                  Checkout {totalCartItems > 1 ? `${totalCartItems} items` : '1 item'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 30,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 36,
    marginRight: 8,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 26,
    zIndex: 1,
  },
  clearIcon: {
    marginHorizontal: 8,
  },
  filterIcon: {
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
  },
  activeCategoryButton: {
    backgroundColor: '#01615F',
  },
  categoryText: {
    fontSize: 14,
    color: '#555555',
  },
  activeCategoryText: {
    color: 'white',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  itemContainer: {
    flex: 1/3,
    padding: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#01615F',
    width: 24,
    height: 24,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControlContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 97, 95, 0.85)',
    borderRadius: 16,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 4,
    minWidth: 16,
    textAlign: 'center',
  },
  itemName: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
  },
  stockIndicator: {
    fontSize: 10,
    color: '#01615F',
    marginTop: 2,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    zIndex: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -10 }],
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(92, 92, 92, 0.7)',
    zIndex: 5,
  },
  outOfStockText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    color: '#555555',
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 8,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  checkoutButton: {
    backgroundColor: '#01615F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});