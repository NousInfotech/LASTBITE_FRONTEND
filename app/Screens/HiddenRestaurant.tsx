import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  FlatList,
} from "react-native";
import GoBack from "@/components/GoBack";
import FilterButtons from "@/components/filter";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import RestaurantCard from "@/components/Foods";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";
import { getHiddenRestaurants, Restaurant } from "@/utils/RestaurantStorage";

const HiddenRestaurant = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [hiddenRestaurants, setHiddenRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHiddenRestaurants = async () => {
    setLoading(true);
    const restaurants = await getHiddenRestaurants();
    setHiddenRestaurants(restaurants);
    setLoading(false);
  };

  const handleFavorite = (id: string) => {
    console.log(`Favorited restaurant with ID: ${id}`);
  };

  const handlePress = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    fetchHiddenRestaurants();
  }, []);

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

  if (!fontsLoaded || loading) {
    return null; // Show a loading screen if needed
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hidden Restaurants</Text>
      </View>

      {hiddenRestaurants.length === 0 ? (
        <>
          {/* Centered Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/Hidden.png")}
              style={styles.mainImage}
            />
            <Text style={styles.Title}>No Hidden Restaurants</Text>
            <Text style={styles.subText}>
              Restaurants you hide will appear here. You can unhide them anytime.
            </Text>
          </View>
        </>
      ) : (
        <>
          {/* Filter Buttons */}
          <FilterButtons />

          {/* Restaurant List */}
          <FlatList
            data={hiddenRestaurants}
            keyExtractor={(item) => item.restaurantId}
            renderItem={({ item }) => (
              <RestaurantCard
                restaurant={item}
                onFavorite={handleFavorite}
                setToastVisible={setToastVisible}
                onPress={handlePress}
                hideOption={false}
                refreshList={fetchHiddenRestaurants}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

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
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  Title: {
    fontSize: RFPercentage(2.5),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  subText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#929292",
    marginBottom: 10,
    textAlign: "center",
    width: 300,
  },
});

export default HiddenRestaurant;