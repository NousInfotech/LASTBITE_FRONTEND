import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FilterModal from "./FilterModal";
import { RFPercentage } from "react-native-responsive-fontsize";
import { 
  isRestaurantFavorite, 
  removeFromFavoriteRestaurants, 
  addToFavoriteRestaurants, 
  removeFromHiddenRestaurants 
} from "../utils/RestaurantStorage";

interface Restaurant {
  id?: string | number;
  restaurantId: string;
  name: string;
  image?: string;
  coverImage?: string;
  rating?: number;
  ratingAverage?: number;
  deliveryTime?: string;
  location?: string;
  details?: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavorite?: (id: string) => void;
  onHide?: (id: string) => void;
  setToastVisible?: (visible: boolean) => void;
  onPress?: (id: string) => void;
  hideOption?: boolean;
  isFavoritesScreen?: boolean;
  isHiddenScreen?: boolean;
  refreshList?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onFavorite,
  onHide,
  setToastVisible,
  onPress,
  hideOption = true,
  isFavoritesScreen = false,
  isHiddenScreen = false,
  refreshList,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const restaurantId = restaurant.restaurantId || restaurant.id?.toString() || "";
  const imageUrl = restaurant.image || restaurant.coverImage || "";
  const rating = restaurant.rating || restaurant.ratingAverage || 0;
  const locationText = restaurant.location || restaurant.details || "";

  // Check if restaurant is favorite on component mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorite = await isRestaurantFavorite(restaurantId);
      setIsFavorite(favorite);
    };
    
    checkFavoriteStatus();
  }, [restaurantId]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        await removeFromFavoriteRestaurants(restaurantId);
        setIsFavorite(false);
      } else {
        // Add to favorites
        await addToFavoriteRestaurants(restaurant);
        setIsFavorite(true);
        if (!isFavoritesScreen) {
          setToastVisible?.(true);
        }
      }
      onFavorite?.(restaurantId);
      
      // If we're on the favorites screen, we need to refresh the list
      if (isFavoritesScreen && refreshList) {
        refreshList();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleHide = () => {
    setIsModalVisible(true);
  };

  const handleUnhide = async () => {
    try {
      await removeFromHiddenRestaurants(restaurantId);
      if (isHiddenScreen && refreshList) {
        refreshList();
      }
      onHide?.(restaurantId);
    } catch (error) {
      console.error("Error unhiding restaurant:", error);
    }
  };

  const handleModalSubmit = () => {
    setIsModalVisible(false);
    onHide?.(restaurantId);
  };

  const handleRestaurantPress = () => {
    onPress?.(restaurantId);
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handleRestaurantPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <TouchableOpacity
        style={styles.menuButtonLeft}
        onPress={() => setIsMenuVisible(!isMenuVisible)}
      >
        <View style={styles.menuCircle}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButtonHeart}
        onPress={handleFavoriteToggle}
      >
        <View style={styles.menuCircle}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "#FF6347" : "black"}
          />
        </View>
      </TouchableOpacity>

      {isMenuVisible && (
        <View style={styles.menuContainer}>
          {/* Show unhide option only in Hidden Restaurants screen */}
          {isHiddenScreen && (
            <TouchableOpacity style={styles.menuItem} onPress={handleUnhide}>
              <MaterialIcons name="visibility" size={24} color="black" />
              <Text style={styles.menuText}>Unhide this restaurant</Text>
            </TouchableOpacity>
          )}
          
          {/* Show hide option only if not in Hidden Restaurants screen */}
          {!isHiddenScreen && hideOption && (
            <TouchableOpacity style={styles.menuItem} onPress={handleHide}>
              <MaterialIcons name="visibility-off" size={24} color="black" />
              <Text style={styles.menuText}>Hide this restaurant</Text>
            </TouchableOpacity>
          )}
          
          {/* Always show favorite toggle option */}
          <TouchableOpacity style={styles.menuItem} onPress={handleFavoriteToggle}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? "#FF6347" : "black"}
            />
            <Text style={styles.menuText}>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoContainer}>
        <View style={styles.mainInfo}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{locationText}</Text>
      </View>

      <FilterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={`Why did you hide ${restaurant.name}?`}
        tellUsMoreText="Tell us more"
        filterOptions={[
          "I'm bored of ordering from here",
          "I don't like the cuisines available",
          "Delivery Time: Low To High",
          "The menu is unhealthy for me", 
          "My past experience has been bad",
          "Don't recommend this restaurant during this slot",
        ]}
        buttonText={{
          cancel: "Cancel",
          apply: "Submit",
        }}
        inputType="checkbox"
        onApply={handleModalSubmit}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  menuButtonLeft: {
    position: "absolute",
    right: 8,
    top: 8,
    borderRadius: 50,
    padding: 8,
    zIndex: 10,
  },
  menuButtonHeart: {
    position: "absolute",
    right: 8,
    top: 55,
    borderRadius: 50,
    padding: 8,
    zIndex: 4,
  },
  menuCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    position: "absolute",
    top: 48,
    right: 8,
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  menuItem: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    marginLeft: 10,
    fontSize: RFPercentage(2),
  },
  infoContainer: {
    padding: 16,
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: RFPercentage(2),
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default RestaurantCard;