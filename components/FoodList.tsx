import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FilterModal from "./FilterModal";
import { RFPercentage } from "react-native-responsive-fontsize";

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
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavorite?: (id: string) => void;
  onHide?: (id: string) => void;
  setToastVisible?: (visible: boolean) => void;
  onPress: (restaurantId: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onFavorite,
  onHide,
  setToastVisible,
  onPress
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.(restaurant.restaurantId);
    if (!isFavorite) {
      setToastVisible?.(true);
    }
  };

  const handleHide = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = () => {
    setIsModalVisible(false);
    onHide?.(restaurant.restaurantId);
  };

  return (
    <TouchableOpacity onPress={() => onPress(restaurant.restaurantId)}>
    <View style={styles.card}>
      <Image
        source={{ uri: restaurant.coverImage }}
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

      {isMenuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleFavorite}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? "green" : "black"}
            />
            <Text style={styles.menuText}>Add to favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleHide}>
            <MaterialIcons name="visibility-off" size={24} color="black" />
            <Text style={styles.menuText}>Hide this restaurant</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoContainer}>
        <View style={styles.mainInfo}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{restaurant.ratingAverage}</Text>
            <Text style={styles.ratingCount}>({restaurant.ratingCount})</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{restaurant.details}</Text>
        {/* <Text style={styles.categories}>{restaurant.categories.join(" • ")}</Text> */}
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
    width: 200,
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
