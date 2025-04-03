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
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";


interface WishlistItem {
  id: string;
  title: string;
  dishes: string;
  image: any;
}

const wishlistData: WishlistItem[] = [
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
];

const WishList: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);

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
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/pana.png")}
          style={styles.mainImage}
        />
      </View>

      {selectedItem ? (
        <View style={styles.detailView}>
          <TouchableOpacity onPress={() => setSelectedItem(null)}>
            <Text style={styles.backText}>← Back to Wishlist</Text>
          </TouchableOpacity>

          <View style={styles.detailCard}>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>{selectedItem.title}</Text>
              <Text style={styles.subtitle}>40-45 min • Downtown City</Text>
              <Text style={styles.description}>Lorem Ipsum and Starters</Text>
              <Text style={styles.price}>₹300</Text>
              <Text style={styles.viewMore}>View More Details <AntDesign name="right" size={10} color="#757575" /></Text>
              <TouchableOpacity>
            <Text style={styles.menuButton}>Explore Full Menu
          <AntDesign name="right" size={14} color="#01615F" /> </Text>
          </TouchableOpacity>
            </View>
            <Image source={selectedItem.image} style={styles.detailImage} />
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
              <Image source={item.image} style={styles.image} />
              <View style={styles.wishlistTextContainer}>
                <Text style={styles.wishlistTitle}>{item.title}</Text>
                <Text style={styles.dishes}>{item.dishes}</Text>
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
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
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
  },
  image: {
    width: "100%",
    height: 120,
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
    fontSize: 12,
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
    fontSize: 12,
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
