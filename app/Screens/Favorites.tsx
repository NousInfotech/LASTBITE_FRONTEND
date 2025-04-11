// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import GoBack from "@/components/GoBack";
// import FilterButtons from "@/components/filter";
// import { useRouter } from "expo-router";
// import * as Font from "expo-font";
// import RestaurantCard from "@/components/Foods"; // Corrected import
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RFPercentage } from "react-native-responsive-fontsize";

// const Favourites = () => {
//   const router = useRouter();
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [toastVisible, setToastVisible] = useState(false);

//   const restaurantData = [
//     {
//       id: 1,
//       name: "Pizza Palace",
//       image: "https://example.com/pizza.jpg",
//       rating: 4.5,
//       deliveryTime: "30 min",
//       location: "Downtown",
//     },
//     {
//       id: 2,
//       name: "Sushi Spot",
//       image: "https://example.com/sushi.jpg",
//       rating: 4.8,
//       deliveryTime: "25 min",
//       location: "Uptown",
//     },
//   ];

//   const handleFavorite = (id: number | string) => {
//     console.log(`Favorited restaurant with ID: ${id}`);
//   };

//   const handleHide = (id: number | string) => {
//     console.log(`Hidden restaurant with ID: ${id}`);
//   };

//   useEffect(() => {
//     const loadFonts = async () => {
//       try {
//         await Font.loadAsync({
//           "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
//           "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
//           "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
//         });
//         setFontsLoaded(true);
//       } catch (error) {
//         console.error("Error loading fonts:", error);
//       }
//     };

//     loadFonts();
//   }, []);

//   if (!fontsLoaded) {
//     return null; // Show a loading screen if needed
//   }

//   return (
//     <SafeAreaView>
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <GoBack />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Favorites</Text>
//       </View>

//       {/* Centered Image */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={require("../../assets/images/Fav.png")}
//           style={styles.mainImage}
//         />
//         <Text style={styles.Title}>Tasty Wishlist</Text>
//         <Text style={styles.subText}>
//           Hunt down your favorite dining spots and feast on flavors you can’t
//           resist.
//         </Text>
//       </View>

//       {/* Filter Buttons */}
//       <FilterButtons />

//       {/* Restaurant List */}
//       <FlatList
//         data={restaurantData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <RestaurantCard
//             restaurant={item}
//             onFavorite={handleFavorite}
//             onHide={handleHide}
//             setToastVisible={setToastVisible}
//           />
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// export default Favourites;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2),
//     marginLeft: 16,
//     fontWeight: "500",
//     fontFamily: "Poppins-SemiBold",
//   },
//   imageContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   mainImage: {
//     width: 300,
//     height: 300,
//     resizeMode: "contain",
//   },
//   Title: {
//     fontSize: RFPercentage(2),
//     marginLeft: 16,
//     fontWeight: "500",
//     fontFamily: "Poppins-SemiBold",
//   },
//   subText: {
//     fontSize: RFPercentage(2),
//     fontFamily: "Poppins-Regular",
//     color: "#929292",
//     marginBottom: 10,
//     textAlign: "center", // Centers the subtext
//     width: 300,
//   },
  
// });









// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import GoBack from "@/components/GoBack";
// import FilterButtons from "@/components/filter";
// import { useRouter } from "expo-router";
// import * as Font from "expo-font";
// import RestaurantCard from "@/components/Foods";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RFPercentage } from "react-native-responsive-fontsize";
// import { getFavoriteRestaurants, Restaurant } from "@/utils/RestaurantStorage";
// import { useFocusEffect } from "expo-router";

// const Favourites = () => {
//   const router = useRouter();
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [toastVisible, setToastVisible] = useState(false);
//   const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load favorites from storage
//   const loadFavorites = async () => {
//     setLoading(true);
//     try {
//       const favorites = await getFavoriteRestaurants();
//       setFavoriteRestaurants(favorites);
//     } catch (error) {
//       console.error("Error loading favorites:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle favorite toggling
//   const handleFavorite = (id: string) => {
//     // When a restaurant is unfavorited, remove it from the list
//     setFavoriteRestaurants(prev => prev.filter(item => item.restaurantId !== id));
//   };

//   const handleHide = (id: string) => {
//     // When a restaurant is hidden, remove it from the list
//     setFavoriteRestaurants(prev => prev.filter(item => item.restaurantId !== id));
//   };

//   // Load favorites when component mounts and when screen comes into focus
//   useFocusEffect(
//     useCallback(() => {
//       loadFavorites();
//     }, [])
//   );

//   useEffect(() => {
//     const loadFonts = async () => {
//       try {
//         await Font.loadAsync({
//           "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
//           "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
//           "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
//         });
//         setFontsLoaded(true);
//       } catch (error) {
//         console.error("Error loading fonts:", error);
//       }
//     };

//     loadFonts();
//   }, []);

//   if (!fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <GoBack />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Favorites</Text>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#000" />
//         </View>
//       ) : favoriteRestaurants.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           {/* Centered Image for empty state */}
//           <View style={styles.imageContainer}>
//             <Image
//               source={require("../../assets/images/Fav.png")}
//               style={styles.mainImage}
//             />
//             <Text style={styles.Title}>Tasty Wishlist</Text>
//             <Text style={styles.subText}>
//               Hunt down your favorite dining spots and feast on flavors you can't
//               resist.
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.listContainer}>
//           {/* Filter Buttons */}
//           <FilterButtons />

//           {/* Restaurant List */}
//           <FlatList
//             data={favoriteRestaurants}
//             keyExtractor={(item) => item.restaurantId}
//             renderItem={({ item }) => (
//               <RestaurantCard
//                 restaurant={item}
//                 onFavorite={handleFavorite}
//                 onHide={handleHide}
//                 setToastVisible={setToastVisible}
//                 onPress={(id) => {
//                   // Navigate to restaurant details
//                   router.push(`/restaurant/${id}`);
//                 }}
//               />
//             )}
//             showsVerticalScrollIndicator={true}
//             contentContainerStyle={styles.flatListContent}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Favourites;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//   },
//   headerTitle: {
//     fontSize: RFPercentage(2),
//     marginLeft: 16,
//     fontWeight: "500",
//     fontFamily: "Poppins-SemiBold",
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   imageContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   mainImage: {
//     width: 300,
//     height: 300,
//     resizeMode: "contain",
//   },
//   Title: {
//     fontSize: RFPercentage(2),
//     fontWeight: "500",
//     fontFamily: "Poppins-SemiBold",
//     marginVertical: 8,
//   },
//   subText: {
//     fontSize: RFPercentage(2),
//     fontFamily: "Poppins-Regular",
//     color: "#929292",
//     marginBottom: 10,
//     textAlign: "center",
//     width: 300,
//   },
//   listContainer: {
//     flex: 1,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
// });
















import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import GoBack from "@/components/GoBack";
import FilterButtons from "@/components/filter";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import RestaurantCard from "@/components/Foods";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";
import { 
  getFavoriteRestaurants, 
  Restaurant, 
  removeFromFavorites 
} from "@/utils/RestaurantStorage";
import { useFocusEffect } from "expo-router";

const Favourites = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from storage
  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favorites = await getFavoriteRestaurants();
      setFavoriteRestaurants(favorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle favorite toggling - now properly removes from storage
  const handleFavorite = async (id: string) => {
    try {
      // Remove from AsyncStorage
      await removeFromFavorites(id);
      
      // Update the local state
      setFavoriteRestaurants(prev => prev.filter(item => item.restaurantId !== id));
      
      // Show confirmation to user
      Alert.alert("Removed from Favorites", "Restaurant has been removed from your favorites.");
    } catch (error) {
      console.error("Error removing favorite:", error);
      Alert.alert("Error", "Could not remove from favorites. Please try again.");
    }
  };

  const handleHide = (id: string) => {
    // When a restaurant is hidden, remove it from the list
    setFavoriteRestaurants(prev => prev.filter(item => item.restaurantId !== id));
  };

  // Load favorites when component mounts and when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : favoriteRestaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          {/* Centered Image for empty state */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/Fav.png")}
              style={styles.mainImage}
            />
            <Text style={styles.Title}>Tasty Wishlist</Text>
            <Text style={styles.subText}>
              Hunt down your favorite dining spots and feast on flavors you can't
              resist.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {/* Filter Buttons */}
          <FilterButtons />

          {/* Restaurant List */}
          <FlatList
            data={favoriteRestaurants}
            keyExtractor={(item) => item.restaurantId}
            renderItem={({ item }) => (
              <RestaurantCard
                restaurant={item}
                onFavorite={handleFavorite}
                onHide={handleHide}
                setToastVisible={setToastVisible}
                onPress={(id) => {
                  // Navigate to restaurant details
                  router.push(`/restaurant/${id}`);
                }}
              />
            )}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  Title: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    marginVertical: 8,
  },
  subText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#929292",
    marginBottom: 10,
    textAlign: "center",
    width: 300,
  },
  listContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
