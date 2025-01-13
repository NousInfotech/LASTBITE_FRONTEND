import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from 'expo-router';
import * as Font from "expo-font";
import GoBack from "@/components/GoBack";
import {  Ionicons } from "@expo/vector-icons";
import SearchBarVoice from "@/components/SearchBarVoice";
// Define the types for the query params
interface DishesSearchParams {
  id: string | undefined;
  name: string | undefined;
  type: string | undefined;
}
interface Restaurant {
  restaurantId: string;
  name: string;
  googleLocation?: string;
  location: string;
  coverImage: string;
  ratingCount: number;
  ratingAverage: number;
  categories: string[];
  menu: string[];
  isActive: boolean;
  details?: string;
}
interface CheckoutPopupProps {
  totalItems: number;
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

const mockRestaurants: Restaurant[] = [
  {
    restaurantId: "r1",
    name: "The Spice Hub",
    googleLocation: "https://maps.google.com/?q=The+Spice+Hub",
    location: "123 Flavor Street, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 250,
    ratingAverage: 4.5,
    categories: ["Biryani", "North Indian", "Desserts"],
    menu: ["m1", "m2", "m3"],
    isActive: true,
  },
  {
    restaurantId: "r2",
    name: "Westside Grill",
    googleLocation: "https://maps.google.com/?q=Westside+Grill",
    location: "456 Grilling Avenue, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 300,
    ratingAverage: 4.7,
    categories: ["Grill", "North Indian", "Burgers"],
    menu: ["m4"],
    isActive: true,
  },
];

const mockMenu: MenuItem[] = [
  {
    menuItemId: 1,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and spices.",
    price: 12.99,
    category: "Biryani",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 2,
    name: "pasta",
    description: "Delicious deep-fried dumplings soaked in sugar syrup.",
    price: 4.99,
    category: "Desserts",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 3,
    name: "Paneer Tikka",
    description: "Soft paneer cubes marinated in spices and grilled to perfection.",
    price: 9.99,
    category: "North Indian",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 4,
    name: "pasta",
    description: "Juicy chicken grilled with herbs and spices.",
    price: 14.99,
    category: "Grill",
    restaurantId: "r2",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 5,
    name: "burger",
    description: "Aromatic basmati rice cooked with tender chicken and spices.",
    price: 12.99,
    category: "Biryani",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 6,
    name: "Pasta",
    description: "Soft paneer cubes marinated in spices and grilled to perfection.",
    price: 9.99,
    category: "North Indian",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
];
const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ totalItems, onCheckout }) => {
  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <Text style={styles.checkoutText}>
          {`Checkout ${totalItems} item${totalItems > 1 ? 's' : ''}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DishesSearch: React.FC = () => {
  const { id, name, type } = useLocalSearchParams<DishesSearchParams>();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [cartCounts, setCartCounts] = useState<Record<number, number>>({});
  const router = useRouter();

  const totalItemsInCart = Object.values(cartCounts).reduce((sum, count) => sum + count, 0);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("./../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("./../../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("./../../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };
    loadFonts();
  }, []);

  const handleCheckout = () => {
    const selectedItems = Object.entries(cartCounts)
      .filter(([_, quantity]) => quantity > 0) // Only include items with a quantity > 0
      .map(([menuItemId, quantity]) => {
        const menuItem = mockMenu.find((item) => item.menuItemId === parseInt(menuItemId));
        return {
          name: menuItem?.name,
          quantity,
          price: menuItem?.price,
        };
      });
  
    // Find the restaurant details for the selected items (assuming items belong to the same restaurant)
    const restaurantId = Object.keys(groupedMenu)[0];
    const restaurant = mockRestaurants.find((rest) => rest.restaurantId === restaurantId);
  
    // Navigate to the BillingScreen with the necessary parameters
    router.push({
      pathname: './BillingScreen',
      params: {
        restaurantId: restaurant?.restaurantId,
        restaurantName: restaurant?.name,
        cart: JSON.stringify(selectedItems), // Pass the cart details as a JSON string
      },
    });
  };
  

  const handleAddToCart = (item: MenuItem) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [item.menuItemId]: (prevCounts[item.menuItemId] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [item.menuItemId]: Math.max((prevCounts[item.menuItemId] || 0) - 1, 0)
    }));
  };

  const handleViewDetails = (item: MenuItem) => {
    // Implement view details logic
    console.log('View details for:', item.name);
  };

  const filterMenuByDishName = (dishName: string | undefined): Record<string, MenuItem[]> => {
    if (!dishName) return {};
    
    const grouped: Record<string, MenuItem[]> = {};
    const searchTerm = dishName.toLowerCase();

    mockMenu.forEach((menuItem) => {
      if (menuItem.name.toLowerCase().includes(searchTerm)) {
        if (!grouped[menuItem.restaurantId]) {
          grouped[menuItem.restaurantId] = [];
        }
        grouped[menuItem.restaurantId].push(menuItem);
      }
    });

    return grouped;
  };

  const renderRestaurantSection = (restaurantId: string, menuItems: MenuItem[]) => {
    const restaurant = mockRestaurants.find((rest) => rest.restaurantId === restaurantId);
    if (!restaurant) return null;

    const navigateToAddMoreItems = () => {
      router.push({
        pathname: './AddMoreItems',
        params: {
          restaurantId,
          restaurantName: restaurant.name,
        },
      });
    };

    return (
      <View style={styles.restaurantSection} key={restaurantId}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <TouchableOpacity onPress={navigateToAddMoreItems}>
            <Ionicons name="arrow-forward-outline" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.restaurantSubContainer}>
          <Text style={styles.restaurantSub}>{restaurant.ratingAverage}</Text>
          <Image 
            source={require("./../../assets/images/Star.png")} 
            style={styles.starIcon} 
          /><Text style={styles.headerLocation}>{restaurant?.location}</Text>
        </View>
        
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          style={styles.horizontalScroll}
        >
          {menuItems.map((item) => (
            <View style={styles.menuCard} key={item.menuItemId}>
              <View style={styles.leftSection}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuCategory}>{item.category}</Text>
                <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity 
                  style={styles.viewDetailsButton} 
                  onPress={() => handleViewDetails(item)}
                >
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.rightSection}>
                <View style={styles.imageContainer}>
                  <Image style={styles.menuImage} source={{ uri: item.image }} />
                </View>
                <View style={styles.addButtonContainer}>
                  {cartCounts[item.menuItemId] ? (
                    <View style={styles.counterContainer}>
                      <TouchableOpacity 
                        style={styles.minusButton} 
                        onPress={() => handleRemoveFromCart(item)}
                      >
                        <Text style={styles.ButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.counterText}>
                        {cartCounts[item.menuItemId]}
                      </Text>
                      <TouchableOpacity 
                        style={styles.plusButton} 
                        onPress={() => handleAddToCart(item)}
                      >
                        <Text style={styles.ButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.addButton} 
                      onPress={() => handleAddToCart(item)}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  const groupedMenu = filterMenuByDishName(name);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search for dishes & Restaurant</Text>
      </View>

      <SearchBarVoice
        onInputPress={() => {}}
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder={name || ''}
      />
      
      <ScrollView>
        {Object.entries(groupedMenu).map(([restaurantId, menuItems]) =>
          renderRestaurantSection(restaurantId, menuItems)
        )}
      </ScrollView>
      
      {totalItemsInCart > 0 && (
        <CheckoutPopup 
          totalItems={totalItemsInCart} 
          onCheckout={handleCheckout}
        />
      )}
    </SafeAreaView>
  );
};
export default DishesSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  restaurantSection: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 14,
    marginLeft: 30,
    fontFamily: 'Poppins-SemiBold',
  },
  headerLocation: {
    fontSize: 10,
    marginLeft: 10,
    color:"grey",
    fontFamily: "Poppins-Regular",
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
  },

  restaurantSubContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: -2, 
    marginLeft: 10,
  },
  restaurantSub: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Poppins-Regular",
    marginRight: 4, 
  },
  starIcon: {
    width: 14, 
    height: 14, 
  },
  restaurantName: {
    fontSize: 15,
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  horizontalScroll: {
    marginTop: 10,
  },
  menuCard: {
    width: 300, // Fixed width for stability
    flexDirection: "row",
    justifyContent: 'space-between',
    borderRadius: 8,
    marginLeft: 2,
    padding: 10,
    backgroundColor: "#fff",
  },
  
  leftSection: {
    width: '50%', // Fixed width percentage
    justifyContent: 'space-between',
    // paddingRight: 10,
  },
  
  rightSection: {
    width: '50%', // Fixed width percentage
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  
  menuImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  
  addButtonContainer: {
    width: 60, // Fixed width matching image container
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 0,
    marginTop:-30,
  },
  
  addButton: {
    borderColor: '#01615F',
    backgroundColor: "#fff",
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%', // Takes full width of container
    alignItems: 'center',
  },
  menuName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  menuCategory: {
    fontSize: 10,
    color: "gray",
    fontFamily: 'Poppins-Regular',
  },
  menuPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: "#01615F",
  },
  viewDetailsButton: {
    marginTop: 8,
    width:85,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00796b",
  },
  viewDetailsText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
 
  addButtonText: {
    color: "#01615F",
    fontSize: 12,
  },
  ButtonText: {
    color: "#FFF",
    fontSize: 20,
  },
  counterContainer: {
    flexDirection: "row",
    // alignItems: "center",
    // marginLeft: 10,
  },
  minusButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#01615F',
    borderRadius: 2,
    marginRight: 10,
    paddingHorizontal: 4,
    width:25,
    color: "white",
  },
  plusButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#01615F',
    borderRadius: 2,
    width:25,
    paddingHorizontal: 4,
    marginLeft: 10,
    color: "#fff",
  },
counterText: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#01615F',
    borderRadius: 2,
    width: 30, // Slightly increase the width for better proportions
    height: 30, // Increase height for a larger container
    padding: 4, // Equal padding on all sides
    borderWidth: 1,
    backgroundColor: "#fff",
    textAlign: "center", // Centers text horizontally
},
  popupContainer: {
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    backgroundColor: 'white', 
    padding: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, 
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
  },
  checkoutButton: {
    backgroundColor: '#01615F', 
    borderRadius: 8,
    paddingVertical: 12, 
    alignItems: 'center', 
  },
  checkoutText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

