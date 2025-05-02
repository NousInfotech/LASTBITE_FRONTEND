import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  FlatList,
  Alert
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistItem {
  id: string;
  title: string;
  dishes: string;
  image: any;
  items?: WishlistItemDetail[];
}

interface WishlistItemDetail {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurant: string;
  restaurantId: string;
}

const WishList: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [wishlistData, setWishlistData] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "All Time Fav",
      dishes: "1 Dish • 1 Restaurant",
      image: require("../../assets/images/burger.png"),
    },
    {
      id: "2",
      title: "Late night cravings",
      dishes: "2 Dishes • 1 Restaurant",
      image: require("../../assets/images/Cake.png"),
    },
  ]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  // Load saved wishlists and associated items
  useEffect(() => {
    const loadWishlists = async () => {
      try {
        // Load wishlist lists
        const savedLists = await AsyncStorage.getItem('wishlistLists');
        const savedItems = await AsyncStorage.getItem('wishlistItems');
        
        if (savedLists) {
          const parsedLists = JSON.parse(savedLists);
          let updatedWishlists = [];
          
          if (savedItems) {
            const parsedItems = JSON.parse(savedItems);
            
            updatedWishlists = parsedLists.map((list: any) => {
              const listItems = parsedItems[list.id] || [];
              // Count unique restaurants
              const restaurants = new Set(listItems.map((item: any) => item.restaurantId));
              
              return {
                id: list.id,
                title: list.name,
                dishes: `${listItems.length} ${listItems.length === 1 ? 'Dish' : 'Dishes'} • ${restaurants.size} ${restaurants.size === 1 ? 'Restaurant' : 'Restaurants'}`,
                image: listItems.length > 0 ? listItems[0].image : require("../../assets/images/burger.png"),
                items: listItems
              };
            });
          } else {
            updatedWishlists = parsedLists.map((list: any) => ({
              id: list.id,
              title: list.name,
              dishes: '0 Dishes • 0 Restaurants',
              image: require("../../assets/images/burger.png"),
              items: []
            }));
          }
          
          setWishlistData(updatedWishlists);
        }
      } catch (error) {
        console.error("Error loading wishlist data:", error);
      }
    };
    
    loadWishlists();
  }, [fontsLoaded]);

  const handleDeleteWishlist = async (itemId: string) => {
    try {
      Alert.alert(
        "Delete Wishlist",
        "Are you sure you want to delete this wishlist?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: async () => {
              // Filter out the deleted wishlist
              const updatedWishlists = wishlistData.filter(item => item.id !== itemId);
              setWishlistData(updatedWishlists);
              
              // Update AsyncStorage
              const savedLists = await AsyncStorage.getItem('wishlistLists');
              if (savedLists) {
                const parsedLists = JSON.parse(savedLists);
                const filteredLists = parsedLists.filter((list: any) => list.id !== itemId);
                await AsyncStorage.setItem('wishlistLists', JSON.stringify(filteredLists));
              }
              
              // Remove associated items
              const savedItems = await AsyncStorage.getItem('wishlistItems');
              if (savedItems) {
                const parsedItems = JSON.parse(savedItems);
                delete parsedItems[itemId];
                await AsyncStorage.setItem('wishlistItems', JSON.stringify(parsedItems));
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error deleting wishlist:", error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>
      
      {wishlistData.length === 0 ? (
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/pana.png")}
            style={styles.mainImage}
          />
          <Text style={styles.emptyText}>No wishlists yet!</Text>
        </View>
      ) : selectedItem ? (
        <View style={styles.detailView}>
          <TouchableOpacity onPress={() => setSelectedItem(null)}>
            <Text style={styles.backText}>← Back to Wishlist</Text>
          </TouchableOpacity>

          <View style={styles.detailCard}>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>{selectedItem.title}</Text>
              <Text style={styles.subtitle}>{selectedItem.dishes}</Text>
              {selectedItem.items && selectedItem.items.length > 0 && (
                <>
                  <Text style={styles.description}>{selectedItem.items[0].name}</Text>
                  <Text style={styles.price}>₹{selectedItem.items[0].price.toFixed(2)}</Text>
                </>
              )}
              <Text style={styles.viewMore}>View More Details <AntDesign name="right" size={10} color="#757575" /></Text>
              <TouchableOpacity>
                <Text style={styles.menuButton}>
                  Explore Full Menu
                  <AntDesign name="right" size={14} color="#01615F" />
                </Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={typeof selectedItem.image === 'string' ? { uri: selectedItem.image } : selectedItem.image} 
              style={styles.detailImage} 
            />
          </View>
        </View>
      ) : (
        <FlatList
          data={wishlistData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.wishlistCard}
              onPress={() => setSelectedItem(item)}
            >
              <Image 
                source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                style={styles.image} 
              />
              <View style={styles.wishlistTextContainer}>
                <Text style={styles.wishlistTitle}>{item.title}</Text>
                <Text style={styles.dishes}>{item.dishes}</Text>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteWishlist(item.id)}
                >
                  <AntDesign name="delete" size={16} color="#FF375F" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flex: 1,
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  emptyText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#888",
    marginTop: 16,
  },
  listContainer: {
    padding: 16,
  },
  wishlistCard: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  wishlistTextContainer: {
    padding: 8,
  },
  wishlistTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  dishes: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  deleteButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    padding: 4,
  },
  detailView: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  backText: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2, // Shadow for Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailTitle: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: RFPercentage(2),
    color: "#666",
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#444",
    fontFamily: "Poppins-Regular",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#01615F",
    marginTop: 4,
  },
  viewMore: {
    fontSize: RFPercentage(2),
    color: "#444",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  detailImage: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 8,
  },
  menuButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#01615F",
    marginTop: 16,
    textAlign: "left",
  },
});








