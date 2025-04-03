import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

const reviewsData = [
  {
    id: "1",
    name: "John Doe",
    date: "January 15, 2025",
    rating: 5,
    review: "The food was delicious and delivered on time!",
  },
  {
    id: "2",
    name: "John Doe",
    date: "January 15, 2025",
    rating: 5,
    review: "The food was delicious and delivered on time!",
  },
];

const ratingSummary = [
  { stars: 5, percentage: 0.8, text: "" },
  { stars: 4, percentage: 0.6, text: "" },
  { stars: 3, percentage: 0.5, text: "" },
  { stars: 2, percentage: 0.3, text: "" },
  { stars: 1, percentage: 0.2, text: "" },
];

const feedbackHighlights = [
  { id: "1", count: 129, text: "Great service!" },
];

const RatingReview = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const ProgressBar = ({ progress}) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
    </View>
  );

  const ReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewName}>{item.name}</Text>
        <View style={styles.ratingRow}>
          <FontAwesome name="star" size={16} color="#FFC107" />
          <Text style={styles.reviewRating}> {item.rating}</Text>
        </View>
      </View>
      <Text style={styles.reviewDate}>Date: {item.date}</Text>
      <Text style={styles.reviewText}>"{item.review}"</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews and Ratings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingHeaderRow}>
            <View>
              <Text style={styles.avgRatingLabel}>Average Rating</Text>
              <Text style={styles.subText}>(based on 120 reviews)</Text>
            </View>
            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={20} color="#FFC107" />
              <Text style={styles.ratingNumber}> 4.3/5</Text>
            </View>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Reviews</Text>
            <Text style={styles.infoValue}>120</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Feedback Highlights</Text>
            <Text style={styles.highlightText}>"Great service!"</Text>
          </View>
        </View>

        <View style={styles.reviewSummaryContainer}>
          <Text style={styles.sectionTitle}>Reviews Summary</Text>
          {ratingSummary.map((item) => (
            <View key={item.stars} style={styles.progressRow}>
              <Text style={styles.starText}>{item.stars}-Star</Text>
              <ProgressBar progress={item.percentage} />
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Individual Reviews</Text>
        {reviewsData.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RatingReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 16,
    fontFamily: "Poppins-SemiBold",
  },
  ratingContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  ratingHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avgRatingLabel: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
  },
  subText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Poppins-Regular",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#01615F",
  },
  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  highlightText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#333",
  },
  reviewSummaryContainer: {
    marginVertical: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  starText: {
    width: 55,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#01615F",
    borderRadius: 4,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  reviewRating: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  reviewDate: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
  reviewText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginTop: 8,
  },
});