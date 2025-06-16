import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FilterModal from "./FilterModal";
import { RFPercentage } from "react-native-responsive-fontsize";

import { 
  addToHiddenRestaurants, 
  removeFromHiddenRestaurants, 
  isRestaurantHidden,
  addToFavoriteRestaurants,
  removeFromFavoriteRestaurants,
  isRestaurantFavorite,
  Restaurant
} from "../utils/RestaurantStorage";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavorite?: (id: string) => void;
  onHide?: (id: string) => void;
  setToastVisible?: (visible: boolean) => void;
  onPress?: (restaurantId: string) => void;
  hideOption?: boolean;
  refreshList?: () => void;
  isUnavailable?: boolean; // Changed from isGrayscale to isUnavailable
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onFavorite,
  onHide,
  setToastVisible,
  onPress,
  hideOption = true,
  refreshList,
  isUnavailable = false // Changed from isGrayscale to isUnavailable
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorited = await isRestaurantFavorite(restaurant.restaurantId);
      setIsFavorite(favorited);
    };
    
    checkFavoriteStatus();
  }, [restaurant.restaurantId]);

  const handleFavorite = async () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    
    if (newFavoriteStatus) {
      await addToFavoriteRestaurants(restaurant);
      setToastVisible?.(true);
    } else {
      await removeFromFavoriteRestaurants(restaurant.restaurantId);
    }
    
    if (onFavorite) {
      onFavorite(restaurant.restaurantId);
    }
  };

  const handleHide = () => {
    setIsModalVisible(true);
  };

  const handleUnhide = async () => {
    await removeFromHiddenRestaurants(restaurant.restaurantId);
    if (refreshList) {
      refreshList();
    }
  };

  const handleModalSubmit = async () => {
    setIsModalVisible(false);
    await addToHiddenRestaurants(restaurant);
    if (onHide) {
      onHide(restaurant.restaurantId);
    }
    if (refreshList) {
      refreshList();
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress?.(restaurant.restaurantId)}>
      <View style={[
        styles.card,
        isUnavailable && styles.unavailableCard
      ]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: restaurant.coverImage }}
            style={[
              styles.image,
              isUnavailable && styles.unavailableImage
            ]}
            resizeMode="cover"
          />
          
          {/* Overlay for unavailable state */}
          {isUnavailable && (
            <View style={styles.unavailableOverlay}>
              <View style={styles.unavailableBadge}>
                <MaterialIcons name="schedule" size={20} color="white" />
                <Text allowFontScaling={false}  style={styles.unavailableText}>Currently Unavailable</Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.menuButtonLeft}
          onPress={() => setIsMenuVisible(!isMenuVisible)}
        >
          <View style={styles.menuCircle}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleFavorite}>
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={24}
                color={isFavorite ? "green" : "black"}
              />
              <Text allowFontScaling={false}  style={styles.menuText}>{isFavorite ? "Remove from favorites" : "Add to favorites"}</Text>
            </TouchableOpacity>
            
            {hideOption ? (
              <TouchableOpacity style={styles.menuItem} onPress={handleHide}>
                <MaterialIcons name="visibility-off" size={24} color="black" />
                <Text allowFontScaling={false}  style={styles.menuText}>Hide this restaurant</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.menuItem} onPress={handleUnhide}>
                <MaterialIcons name="visibility" size={24} color="black" />
                <Text allowFontScaling={false}  style={styles.menuText}>Unhide this restaurant</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={[
          styles.infoContainer,
          isUnavailable && styles.unavailableInfoContainer
        ]}>
          <View style={styles.mainInfo}>
            <Text allowFontScaling={false}  style={[
              styles.title,
              isUnavailable && styles.unavailableTitle
            ]}>
              {restaurant.name}
            </Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <Text allowFontScaling={false}  style={[
                styles.rating,
                isUnavailable && styles.unavailableText
              ]}>
                {restaurant.ratingAverage}
              </Text>
              <Text allowFontScaling={false}  style={[
                styles.ratingCount,
                isUnavailable && styles.unavailableText
              ]}>
                ({restaurant.ratingCount})
              </Text>
            </View>
          </View>
          <Text allowFontScaling={false}  style={[
            styles.subtitle,
            isUnavailable && styles.unavailableSubtitle
          ]}>
            {restaurant.details}
          </Text>
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
      </View>
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
  unavailableCard: {
    opacity: 0.7,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  unavailableImage: {
    opacity: 0.5,
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  unavailableBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unavailableText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  menuButtonLeft: {
    position: "absolute",
    right: 8,
    top: 8,
    borderRadius: 50,
    padding: 8,
    zIndex: 10,
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
  unavailableInfoContainer: {
    backgroundColor: '#F8F8F8',
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  unavailableTitle: {
    color: '#999',
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
  unavailableSubtitle: {
    color: '#999',
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  categories: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default RestaurantCard;