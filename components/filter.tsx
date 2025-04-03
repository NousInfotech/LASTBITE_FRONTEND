import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { X } from "react-native-feather"; // For the X icon
import * as Font from "expo-font"; // Correct way to load fonts
import AppLoading from "expo-app-loading"; // To handle font loading splash
import Octicons from "@expo/vector-icons/Octicons";
import FilterModal from "./FilterModal"; // Ensure this file/component exists and is correctly implemented

const FilterButtons = () => {
  const [filters, setFilters] = useState([
    "Filter by",
    "Pure Veg",
    "Non Veg",
  ]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const toggleActiveFilter = (filter: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const removeActiveFilter = (filter: string) => {
    setActiveFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  };

  return (
    <View>
      <Text style={styles.title}>Where to Eat Next</Text>
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilters.includes(filter) && styles.activeFilter,
              index === 0 && styles.firstButtonWithMargin, // Add left margin to the first button
            ]}
            onPress={() => {
              if (filter === "Filter by") {
                setIsModalVisible(true); // Open modal
              } else {
                toggleActiveFilter(filter);
              }
            }}
          >
            <Text
              style={[
                styles.filterText,
                activeFilters.includes(filter) && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
            {activeFilters.includes(filter) && (
              <X
                stroke="#fff"
                width={16}
                height={16}
                onPress={() => removeActiveFilter(filter)}
                style={styles.icon}
              />
            )}
            {filter === "Filter by" && (
              <Octicons
                name="filter"
                size={16}
                color="#01615F"
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {isModalVisible && (
        <FilterModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Filter"
          filterOptions={[
            "Relevance",
            "Rating: High To Low",
            "Delivery Time: Low To High",
            "Delivery Time And Relevance",
            "Cost: Low To High",
            "Cost: High To Low",
            "Distance: Low To High",
          ]}
          buttonText={{
            cancel: "Cancel",
            apply: "Apply",
          }}
          inputType="radio"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  firstButtonWithMargin: {
    marginLeft: 16, // Add default left margin to the first button
  },
  activeFilter: {
    backgroundColor: "#01615F",
  },
  filterText: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    marginRight: 4,
    fontSize: 15,
  },
  activeFilterText: {
    color: "#fff",
  },
  icon: {
    marginLeft: 4,
  },
});

export default FilterButtons;
