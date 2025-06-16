import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { X } from "react-native-feather";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Octicons from "@expo/vector-icons/Octicons";
import FilterModal from "./FilterModal";

// Keep the splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

const FilterButtons = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [filters, setFilters] = useState(["Filter by", "Pure Veg", "Non Veg"]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Load fonts and hide splash screen
  useEffect(() => {
    const prepareResources = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        });
      } catch (e) {
        console.warn("Error loading fonts:", e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareResources();
  }, []);

  // Callback to tell React Native when layout is done (to hide splash screen)
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep splash screen shown until fonts are ready
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

  const handleApply = (selectedOption: string | string[]) => {
    if (Array.isArray(selectedOption)) {
      console.log("Multiple selected:", selectedOption);
    } else {
      console.log("Single selected:", selectedOption);
    }
  };

  return (
    <View onLayout={onLayoutRootView}>
      <Text allowFontScaling={false}  style={styles.title}>Where to Eat Next</Text>
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilters.includes(filter) && styles.activeFilter,
              index === 0 && styles.firstButtonWithMargin,
            ]}
            onPress={() => {
              if (filter === "Filter by") {
                setIsModalVisible(true);
              } else {
                toggleActiveFilter(filter);
              }
            }}
          >
            <Text allowFontScaling={false} 
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
          onApply={handleApply}
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
    fontSize: 16,
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
    marginLeft: 16,
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
