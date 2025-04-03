import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, StyleSheet, FlatList,Image } from "react-native";
import GoBack from "@/components/GoBack";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";

type SectionState = {
  mealRating: boolean;
  dishRating: boolean;
  detailedReview: boolean;
  deliveryRating: boolean;
};

type RatingState = {
  mealRating: number;
  deliveryRating: number;
  dishRatings: Record<string, number>; // Ratings for individual dishes
};

const RateOrder = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [expanded, setExpanded] = useState({
    mealRating: true,
    dishRating: false,
    detailedReview: false,
    deliveryRating: false,
  });
  const [ratings, setRatings] = useState({
    mealRating: 0,
    deliveryRating: 0,
    dishRatings: {}, // For storing ratings for individual dishes
  });
  const [showThankYou, setShowThankYou] = useState(false);

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

  if (!fontsLoaded) return null;

  const toggleSection = (section: keyof SectionState) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleRating = (section: keyof RatingState, rating: number) => {
    setRatings((prev) => ({ ...prev, [section]: rating }));
  };

  const handleDishRating = (dish: string, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      dishRatings: {
        ...prev.dishRatings,
        [dish]: rating,
      },
    }));
  };

  const handleSubmit = () => {
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      // Optionally reset ratings or navigate to another screen here
    }, 10000); // Show the thank-you screen for 10 seconds
  };

  if (showThankYou) {
    return (
      <SafeAreaView style={styles.thankYouContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowThankYou(false)}
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>

        <View style={styles.centerContent}>
          <Image
            source={require("../../assets/images/Star Struck.png")}
            style={styles.thankYouImage}
          />
          <Text style={styles.thankYouText}>
            Thank You for your valuable feedback!
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate Your Meal</Text>
      </View>

      {/* Meal Rating Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("mealRating")}>
        <View style={styles.mealRatingSection}>
          <Text style={[styles.sectionTitle, { color: "#01615F" }]}>Meal from Spice House</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating("mealRating", star)}>
                <Ionicons
                  name={star <= ratings.mealRating ? "star" : "star-outline"}
                  size={24}
                  color="#FFC107"
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>

      {/* Dish Rating Section */}
      <TouchableOpacity style={styles.sectionSubHeader} onPress={() => toggleSection("dishRating")}>
  <Text style={styles.sectionTitle}>Rate Your Ordered Dishes</Text>
  <Ionicons name={expanded.dishRating ? "chevron-up" : "chevron-down"} size={20} color="#444" />
</TouchableOpacity>
{expanded.dishRating && (
  <View style={styles.sectionContent}>
    <FlatList
      data={["Nawabi Biryani", "Tandoor"]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.dishRow}>
          <Text style={styles.dishName}>{item}</Text>
          <View style={styles.dishIcons}>
            <Ionicons name="thumbs-up-outline" size={20} color="#444" style={styles.icon} />
            <Ionicons name="thumbs-down-outline" size={20} color="#444" style={styles.icon} />
          </View>
        </View>
      )}
    />
  </View>
)}


      {/* Detailed Review Section */}
      <TouchableOpacity style={styles.sectionSubHeader} onPress={() => toggleSection("detailedReview")}>
        <Text style={styles.sectionTitle}>Add a Detailed Review</Text>
        <Ionicons name={expanded.detailedReview ? "chevron-up" : "chevron-down"} size={20} color="#444" />
      </TouchableOpacity>
      {expanded.detailedReview && (
        <View style={styles.sectionContent}>
          <TextInput style={styles.textInput} placeholder="Tell us about food you ordered here" multiline />
        </View>
      )}

      {/* Delivery Rating Section */}
      <TouchableOpacity style={styles.sectionSubHeader} onPress={() => toggleSection("deliveryRating")}>
        <Text style={styles.sectionTitle}>Rate Your Delivery Partner</Text>
        <Ionicons name={expanded.deliveryRating ? "chevron-up" : "chevron-down"} size={20} color="#444" />
      </TouchableOpacity>
      {expanded.deliveryRating && (
        <View style={styles.sectionContent}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating("deliveryRating", star)}>
                <Ionicons
                  name={star <= ratings.deliveryRating ? "star" : "star-outline"}
                  size={24}
                  color="#FFC107"
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton}  onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RateOrder;

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   paddingBottom: 16,
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
   marginLeft: 16,
   fontWeight: "500",
   fontFamily: "Poppins-SemiBold",
 },
 mealRatingSection: {
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "center", // Center-aligns the section title horizontally
    alignItems: "center",
    padding: 16,
  },
  sectionSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
    marginHorizontal:15,
    borderRadius:10,
    marginBottom:15,
  },
 sectionTitle: {
   fontSize: RFPercentage(2),
   fontWeight: "500",
   fontFamily: "Poppins-SemiBold",
 },
 sectionContent: {
   padding: 16,
   marginHorizontal:15,
 },
 stars: {
   flexDirection: "row",
 },
 starIcon: {
   marginHorizontal: 4,
 },
 dishRow: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   marginBottom: 8,
 },
 dishName: {
   fontSize: 14,
   fontFamily: "Poppins-Regular",
 },
 dishIcons: {
   flexDirection: "row",
 },
 icon: {
   marginHorizontal: 8,
 },
 textInput: {
   height: 80,
   borderColor: "#ddd",
   borderWidth: 1,
   borderRadius: 8,
   padding: 8,
   fontFamily: "Poppins-Regular",
 },
 submitButton: {
   backgroundColor: "#01615F",
   paddingVertical: 10,
   borderRadius: 8,
   marginHorizontal: 16,
   marginTop: 16,
   position: "absolute",
   bottom: 16,
   width: "90%",
   alignSelf: "center",
 },
 submitButtonText: {
   textAlign: "center",
   color: "#fff",
   fontSize: RFPercentage(2),
   fontFamily: "Poppins-Medium",
 },
 thankYouContainer: {
  flex: 1,
  backgroundColor: "#01615F",
  paddingHorizontal:20,
},
closeButton: {
  position: "absolute",
  top: 20,
  left: 20,
  zIndex: 1,
  borderRadius: 16,
  width: 32,
  height: 32,
  justifyContent: "center",
  alignItems: "center",
},
closeButtonText: {
  fontSize: 18,
  color: "#FFF",
  fontWeight: "bold",
},
centerContent: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
thankYouImage: {
  width: 100,
  height: 100,
  resizeMode: "contain",
},
thankYouText: {
  color: "#FFF",
  fontSize: 18,
  fontFamily: "Poppins-SemiBold",
  marginTop: 16,
  textAlign: "center",
},
});

