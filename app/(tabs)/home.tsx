import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  Text,
} from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";
import Banner from "@/components/Banner";
import FoodMenu from "@/components/FoodMenu";
import FilterButtons from "@/components/FilterButtons";
import RestaurantCard from "@/components/FoodList";
import SuccessToast from "@/components/SuccessToast";
import HiddenRestaurant from "@/components/HiddenRestaurant";
import { useRouter } from "expo-router";

interface Restaurant {
  restaurantId: string;
  name: string;
  details: string;
  coverImage: string;
  ratingCount: number;
  ratingAverage: number;
  categories: string[];
  menu: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  veg: boolean;
  nonVeg: boolean;
  vegan: boolean;
}

const restaurants: Restaurant[] = [
  {
    restaurantId: "r1",
    name: "The Spice Hub",
    details: "35-45 mins to Westside Park",
    coverImage:
      "https://www.seasonsandsuppers.ca/wp-content/uploads/2019/10/slow-cooker-pulled-pork-1200.jpg",
    ratingCount: 250,
    ratingAverage: 4.5,
    categories: ["Biryani", "North Indian", "Desserts"],
    menu: ["m1", "m2", "m3"],
    isActive: true,
    veg: false,
    nonVeg: true,
    vegan: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    restaurantId: "r2",
    name: "Westside Grill",
    details: "35-45 mins to Westside Park",
    coverImage:
      "https://www.seasonsandsuppers.ca/wp-content/uploads/2019/10/slow-cooker-pulled-pork-1200.jpg",
    ratingCount: 180,
    ratingAverage: 4.2,
    categories: ["Grill", "American", "Steakhouse"],
    menu: ["m4", "m5", "m6"],
    isActive: true,
    veg: false,
    nonVeg: true,
    vegan: false,
    createdAt: "2023-12-15T10:30:00.000Z",
    updatedAt: "2024-01-10T12:00:00.000Z",
  },
  {
    restaurantId: "r3",
    name: "Food Hut",
    details: "35-45 mins to Westside Park",
    coverImage:
      "https://www.seasonsandsuppers.ca/wp-content/uploads/2019/10/slow-cooker-pulled-pork-1200.jpg",
    ratingCount: 300,
    ratingAverage: 2.7,
    categories: ["South Indian", "Vegetarian", "Healthy"],
    menu: ["m7", "m8", "m9"],
    isActive: true,
    veg: true,
    nonVeg: false,
    vegan: true,
    createdAt: "2023-12-15T10:30:00.000Z",
    updatedAt: "2024-01-10T12:00:00.000Z",
  },
  {
    restaurantId: "r4",
    name: "Green Leaf Cafe",
    details: "30-40 mins to Westside Park",
    coverImage:
      "https://www.seasonsandsuppers.ca/wp-content/uploads/2019/10/slow-cooker-pulled-pork-1200.jpg",
    ratingCount: 220,
    ratingAverage: 3.6,
    categories: ["Vegan", "Organic", "Smoothies"],
    menu: ["m10", "m11", "m12"],
    isActive: true,
    veg: true,
    nonVeg: false,
    vegan: true,
    createdAt: "2024-01-05T08:45:00.000Z",
    updatedAt: "2024-02-02T14:20:00.000Z",
  },
];

const Home = () => {
  const [restaurantList, setRestaurantList] =
    useState<Restaurant[]>(restaurants);
  const router = useRouter();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [hiddenRestaurants, setHiddenRestaurants] = useState<string[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [hiddenPopup, setHiddenPopup] = useState<Restaurant | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(restaurantList);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const applyFilters = (filters: string[]) => {
    setSelectedFilters(filters);

    let filtered = restaurantList.filter((restaurant) => {
      if (filters.includes("Pure Veg") && !restaurant.veg) return false;
      if (filters.includes("Non Veg") && !restaurant.nonVeg) return false;
      if (filters.includes("Vegan") && !restaurant.vegan) return false;
      if (filters.includes("Ratings 4.0+") && restaurant.ratingAverage < 4.0)
        return false;
      if (filters.includes("Rating 4.5+") && restaurant.ratingAverage < 4.5)
        return false;
      return true;
    });

    setFilteredRestaurants(filtered);
  };

  const handleFavorite = (id: string | number) => {
    console.log("Added to favorites:", id);
  };

  const handleHide = (restaurantId: string) => {
    console.log("Hidden restaurant:", restaurantId);
    const hiddenRestaurant = restaurantList.find(
      (restaurant) => restaurant.restaurantId === restaurantId
    );
    if (hiddenRestaurant) {
      setHiddenRestaurants((prev) => [...prev, restaurantId]);
      setHiddenPopup(hiddenRestaurant);
    }
  };

  const handleUndo = (restaurantId: string | number) => {
    setHiddenRestaurants((prev) => prev.filter((id) => id !== restaurantId));
  };

  const handleInputRedirect = () => {
    router.push("/Screens/SearchScreen");
  };

  const banners = [
    {
      title: "Supermart Essentials",
      subtitle: "Fresh groceries delivered within",
      deliveryTime: "15 minutes.",
      buttonText: "Shop Groceries",
      buttonColor: "#006B4D",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#E2FFEC",
      titleColor: "#000000",
      subtitleColor: "#4A4A4A",
      groceryImage: require("../../assets/images/instamart-img.png"),
      height: 180,
      borderRadius: 12,
    },
    ,
    {
      title: "Craving  Special?",
      subtitle: "Popular cuisines and discover",
      deliveryTime: "what you're in the mood for!",
      buttonText: "Explore Cuisines",
      buttonColor: "#FF6347",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#FFF0E1",
      titleColor: "#333333",
      subtitleColor: "#7D7D7D",
      groceryImage: require("../../assets/images/Img 1.png"),
      height: 180,
      borderRadius: 12,
    },
    {
      title: "Top Picks Around You",
      subtitle: "Order from the trending restaurants",
      deliveryTime: "in your area.",
      buttonText: "Grab a Snack",
      buttonColor: "#FFC107",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#FFF7E1",
      titleColor: "#333333",
      subtitleColor: "#7D7D7D",
      groceryImage: require("../../assets/images/Img 3.png"),
      height: 180,
      borderRadius: 12,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
    applyFilters(selectedFilters);
  }, [selectedFilters]);

  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuSelection = (menuName: string) => {
    setSelectedMenu(menuName);
    console.log(menuName);
    router.push({
      pathname: "/Screens/DishesSearch",
      params: { name: menuName },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LocationHeader />
      <SearchBarVoice
        onInputPress={handleInputRedirect}
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder="Dishes, restaurants & more"
        onChangeText={handleMenuSelection}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner
          {...banners[currentBannerIndex]}
          onButtonPress={() => console.log("Button pressed")}
        />
        <FoodMenu onSelectMenu={handleMenuSelection} />

        <FilterButtons onFilterChange={applyFilters} />
        {filteredRestaurants
          .filter(
            (restaurant) => !hiddenRestaurants.includes(restaurant.restaurantId)
          )
          .map((restaurant) => (
            <RestaurantCard
              key={restaurant.restaurantId}
              restaurant={restaurant}
              onFavorite={handleFavorite}
              onHide={handleHide}
              setToastVisible={setToastVisible}
              onPress={() =>
                router.push({
                  pathname: "/Screens/RestaurantSelect",
                  params: { restaurantId: restaurant.restaurantId },
                })
              }
            />
          ))}
      </ScrollView>
      <SuccessToast
        visible={toastVisible}
        message="Added to Wishlist Successfully!"
        subMessage="Enjoy your day with your favorite food!"
        onHide={() => setToastVisible(false)}
      />

      <Modal
        transparent
        animationType="fade"
        visible={!!hiddenPopup}
        onRequestClose={() => setHiddenPopup(null)}
      >
        <View style={styles.modalCentered}>
          {hiddenPopup && (
            <HiddenRestaurant
              restaurant={hiddenPopup}
              onClose={() => setHiddenPopup(null)}
              onUndo={handleUndo}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
